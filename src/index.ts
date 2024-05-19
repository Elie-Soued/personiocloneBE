import express, { Express, Request, Response } from "express";
import cors from "cors";
import usersRoute from "./Routes/users";
import dotenv from "dotenv";
dotenv.config();

//Constants declarations
const { PORT } = process.env;
const app: Express = express();

//Use Body Parser to format the body´s reponse
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Assigning a route file to a path
app.use("/users", usersRoute);

app.get("/", (req: Request, res: Response) => res.send("Hello World"));

//Starting a server and make it listen to a specific port
app.listen(PORT, () => console.log(`Server running on port${PORT}`));
