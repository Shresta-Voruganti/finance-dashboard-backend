const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: "Too many requests, please try again later"
});

app.use(limiter);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/records", recordRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Finance API is running");
});


// Error handler
app.use((err, req, res, next) => {
  console.error(err); 

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));