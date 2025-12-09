import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true }, // hashed
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

const User =
  (mongoose.models.User as mongoose.Model<any>) ||
  mongoose.model("User", UserSchema);

export default User;
