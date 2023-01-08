const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

//Constants declarations
const { PORT } = process.env;
const app = express();
const port = PORT;

//Routes imports
const usersRoute = require("./Routes/users");

//Use Body Parser to format the body´s reponse

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Assigning a route file to a path
app.use("/users", usersRoute);

app.get("/", (req, res) => res.send("Hello World"));

//Starting a server and make it listen to a specific port
app.listen(port, () => console.log(`Server running on port${port}`));
