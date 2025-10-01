import express from "express";

const app = express();
const port = 8000;

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

// Function to find users by name
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

// Function to find users by ID
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

// Basic API endpoint
app.get("/", (req, res) => {
  res.send("Hello world!");
});

//API endpoint to get user by name
app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

//API endpoint to get users by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
