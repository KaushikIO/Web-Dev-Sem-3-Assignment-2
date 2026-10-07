import express from "express";
import logger from "./middleware/logger.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/students", studentRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});