import User from "../models/user.model.js";

// CRUD → Create
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error creating user" });
  }
};

// CRUD → Read
export const getUser = async (req, res) => {
  res.send("Get Santi!");
};

export const getAllUsers = async (req, res) => {
  res.send("Get all users!");
};

// CRUD → Update
export const updateUser = async (req, res) => {
  res.send("Update user Santi");
};

// CRUD → Delete
export const deleteUser = async (req, res) => {
  res.send("Delete user Santi");
};
