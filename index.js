const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

const whitelist = ["http://127.0.0.1:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("hello");
});

// searching on query
app.get("/search/:index", async (req, res) => {
  const { phraseSearch } = require("./SearchEngine");
  const data = await phraseSearch(req.params.index, req.query.q);
  res.json(data);
});

app.get("/delete/:index", async (req, res) => {
  const { deleteIndex } = require("./SearchEngine");
  res.json(await deleteIndex(req.params.index));
});

app.get("/add", async (req, res) => {
  const { addData } = require("./SearchEngine");
  await addData();
  res.send("DONE");
});

app.listen(3333, () => console.log("server running at 3333"));
