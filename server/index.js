import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./typeDefs/schema.js";
import { dbConnection } from "./config/db_connection.js";
import cors from "cors";

const PORT = process.env.PORT;

const app = express();

dbConnection();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, () => {
  console.log("Running on port", PORT);
});
