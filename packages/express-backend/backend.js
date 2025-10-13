import express from "express";
import cors from "cors";
import user_functions from "./user-services.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));

mongoose.set("debug", true);

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME, // since your URI has no db name path
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Mongo connected");

    //List of users
    const users = {
      users_list: [
        {
          id: "xyz789",
          name: "Charlie",
          job: "Janitor",
        },
        {
          id: "abc123",
          name: "Mac",
          job: "Bouncer",
        },
        {
          id: "ppp222",
          name: "Mac",
          job: "Professor",
        },
        {
          id: "yat999",
          name: "Dee",
          job: "Aspring actress",
        },
        {
          id: "zap555",
          name: "Dennis",
          job: "Bartender",
        },
      ],
    };

    // Basic API endpoint
    app.get("/", (req, res) => {
      res.send("Hello world!");
    });

    //API endpoint to get user by name and job
    app.get("/users", (req, res) => {
      const name = req.query.name;
      const job = req.query.job;

      if (name !== undefined && job !== undefined) {
        user_functions.findUserByNameAndJob(name, job).then((result) => {
          res.send(result);
        });
      } else {
        res.send(users);
      }
    });

    //API endpoint to get users by ID
    app.get("/users/:id", (req, res) => {
      const id = req.params.id;
      if (id !== undefined) {
        user_functions.findUserById(id).then((result) => {
          res.send(result);
        });
      } else {
        res.status(404).send("Resource not found.");
      }
    });

    //Add a user to users_list
    app.post("/users", (req, res) => {
      const { name, job } = req.body ?? {};
      return user_functions
        .addUser({ name, job })
        .then((result) => res.status(201).json(result))
        .catch((err) => {
          console.error("addUser failed:", err);
        });
    });

    //Delete user from users_list by id
    app.delete("/users/:id", (req, res) => {
      const { id } = req.params.id;
      return user_functions
        .deleteUser(id)
        .then((result) => res.status(204).json(result))
        .catch((err) => {
          console.error("deleteUser failed:", err);
        });
    });
  } catch (err) {
    console.error("Mongo connect failed:", err);
    process.exit(1);
  }
}
start();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
