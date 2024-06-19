const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Import routes
const bookingsRouter = require("./Routes/bookings");
const userRouter = require("./Routes/user");

const connectDb = require("./config/db");

dotenv.config();

connectDb();

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Use routes
app.use("/api/bookings", bookingsRouter);
app.use("/api/user", userRouter);

app.listen(4000, () => {
  console.log("server started on port 4000");
});
