import mongoose from "mongoose";
import Project from "./Project.js";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Email is alreay taken"],
    lowercase: true,
    validate(value) {
      if (!value.includes("@gmail.com")) {
        throw new Error("Enter a valid email");
      }
    },

    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

//remove projects created by the client when client is deleted

clientSchema.post("findOneAndDelete", async function (doc, next) {
  try {
    if (doc && doc._id) {
      await Project.deleteMany({ clientId: doc._id });
    }
    next();
  } catch (error) {
    next(error);
  }
});

let Client = mongoose.model("Client", clientSchema);

export default Client;
