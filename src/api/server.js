const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const cors = require("cors");
const DB = require("../../db.json");

server.use(cors());

// Add custom routes before JSON Server router
server.get("/search/:name", (req, res) => {
  console.log(DB);
  res.json(req.params.name);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
// Continue to JSON Server router

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
