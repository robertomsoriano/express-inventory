const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// const config = require("config");
// const cors = require("cors");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();
// Allow cross-origin
// app.use(cors());
// app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// Bodyparser Middleware
app.use(express.json());

// Start DB

// SET UP Mongoose Promises.
mongoose.Promise = global.Promise;

// DB Config
// const db = config.get("mongoURI");
const db = process.env.MONGO_URI;
// Connect to Mongo

const options = {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

const connectWithRetry = () => {
  console.log("MongoDB connection with retry");
  try {
    mongoose.connect(db, options);
  } catch (err) {
    console.log("MongoDB connection unsuccessful, retry after 5 seconds.", err);
    setTimeout(connectWithRetry, 5000);
  }

  // If the connection throws an error
  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection error: " + err);
    setTimeout(connectWithRetry, 3000);
  });
  // When the connection is disconnected
  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection disconnected");
    setTimeout(connectWithRetry, 3000);
  });

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });
  return;
};
connectWithRetry();

// Use Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/books", require("./routes/api/books"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/checkout", require("./routes/api/checkout"));
app.use("/api/transactions", require("./routes/api/transactions"));

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
//   });
// }

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
