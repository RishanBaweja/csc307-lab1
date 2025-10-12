import express from "express";
import cors from "cors";
import user_functions from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

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
  if (name != undefined && job != undefined) {
    let result = user_functions.findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

//API endpoint to get users by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = user_functions.findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

//Add a user to users_list
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  if (
    !userToAdd ||
    typeof userToAdd !== "object" ||
    typeof userToAdd.name !== "string" ||
    typeof userToAdd.job !== "string"
  ) {
    return res.status(422).json({ error: "Invalid input" });
  }

  const newUser = user_functions.addUser({
    id: String(Math.random()),
    ...userToAdd,
  });
  return res.status(201).json({
    message: "User successfully added!",
    user: newUser,
  });
});

//Delete user from users_list by id
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = user_functions.findUserById(id);
  if (result === undefined) {
    return res.status(404).send("Resource not found.");
  } else {
    user_functions.getUsers();
  }

  return res.status(204).json({
    message: "User successfully deleted!",
    deleted: result,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
