import "dotenv/config";
import app from "./app.js";
import mongoose from "mongoose";

app.listen(process.env.PORT, () => {
  console.log("app listen on port 4000");
});

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => console.log("successfully connected to mongoDB"));
