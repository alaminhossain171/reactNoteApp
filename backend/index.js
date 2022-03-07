const CallMongo = require("./db");
const express = require("express");
const app = express();
const port = 5000;
CallMongo();
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// routes
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
