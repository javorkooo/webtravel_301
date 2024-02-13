import express from "express";
import cors from "cors";
import articleRoutes from "./routes/article.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 8081;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Article Site API!");
});

app.use("/article", articleRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
