import {app} from "./app.js";
import connectDB from "./db/index.db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("SERVER is running at port ", process.env.PORT);
      console.log("DB is successfully connected");
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection failed in index.js", error);
  });
