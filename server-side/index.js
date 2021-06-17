const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const connectDB = require("./db/db");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const {
  errorMiddleware,
  notFoundRoute,
} = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();

// app middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/uploads`));

// database connection
connectDB();

// all routes
app.use("/auth", userRoute);
app.use("/post", postRoute);

// error and not found route middleware
app.use(notFoundRoute);
app.use(errorMiddleware);

// app listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listening on port", PORT));
