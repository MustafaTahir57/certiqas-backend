import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database connected");

    // ✅ Check if email already exists
    const existingUser = await User.findOne({
      email: process.env.SUPERADMIN_EMAIL,
    });

    if (existingUser) {
      console.log("⚠️ User with this email already exists!");
      process.exit(0);
    }

    // ✅ Create SuperAdmin
    await User.create({
      name: "Super Admin",
      email: process.env.SUPERADMIN_EMAIL,
      password: process.env.SUPERADMIN_PASSWORD,
      role: "SuperAdmin",
    });

    console.log("✅ SuperAdmin created successfully!");
    process.exit(0);

  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
};

createSuperAdmin();
