const app = require("./src/app");

app.get("/", (req, res) => {
  res.send("Hello from sever.");
});

app.listen(3000, () => {
  console.log("Server is Running on port 3000.");
});
