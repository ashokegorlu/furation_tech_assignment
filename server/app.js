const express = require("express");
const cors = require("cors");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const dbPath = path.join(__dirname, "bookstore.db");

const app = express();
app.use(express.json());
app.use(cors());

let db = null;
initialiseDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Error:${error.message}`);
    process.exit(1);
  }
};
initialiseDbAndServer();

app.post("/register", async (request, response) => {
  const { name, username, password } = request.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const isDbUser = `
  SELECT * FROM user WHERE username = '${username}'
  `;
  const dbUser = await db.get(isDbUser);

  if (dbUser === undefined) {
    const insertUserQuery = `
    INSERT INTO user (name,username,password)VALUES('${name}','${username}','${hashedPassword}')
    `;
    await db.run(insertUserQuery);
    response.status(200).json({ message: "Registation Successful" });
  } else {
    response.status(400).json({ message: "user already exists" });
  }
});

app.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const isDbUser = `  
    SELECT * FROM user WHERE username = '${username}'
    `;
  const dbUser = await db.get(isDbUser);

  if (dbUser === undefined) {
    response.status(400).json({ message: "username doesn't exist" });
  } else {
    const comparePassword = await bcrypt.compare(password, dbUser.password);
    if (comparePassword === true) {
      const payload = {
        username: `${username}`,
      };

      const jwtToken = jwt.sign(payload, "SECRET_CODE");
      response.status(200);
      response.send({ token: jwtToken });
    } else {
      response.status(400).json({ message: "Invalid Password" });
    }
  }
});

const authentication = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.send("Invalid Access Token");
    response.status(401);
  } else {
    jwt.verify(jwtToken, "SECRET_CODE", (error, payload) => {
      if (error) {
        response.send("invalid access token");
        response.status(401);
      } else {
        next();
      }
    });
  }
};

app.get("/", authentication, async (req, res) => {
  const getUser = `
    SELECT * FROM user
    `;
  const getUsers = await db.all(getUser);
  res.send(getUsers);
});

app.get("/books", authentication, async (req, res) => {
  const getBooksQuery = `
    SELECT * FROM book
    `;
  const getBooks = await db.all(getBooksQuery);
  res.send(getBooks);
});

app.get("/books/:bookId", authentication, async (req, res) => {
  const { bookId } = req.params;
  const getBookQuery = `
    SELECT * FROM book WHERE id=${bookId}
    `;
  const getBook = await db.get(getBookQuery);
  res.send(getBook);
});

app.get("/cart/:cartId", authentication, async (req, res) => {
  const { cartId } = req.params;
  const getBookQuery = `
    SELECT * FROM book WHERE id=${cartId}
    `;
  const getBook = await db.get(getBookQuery);
  res.send(getBook);
});
