import mongoose from "mongoose";
import chalk from "chalk";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log(chalk.green.inverse.bold("Successfully connected to MongoDB"));
  } catch (error) {
    console.error(
      chalk.red.inverse.bold("Error connecting to MongoDB:", error.message)
    );
  }
};
