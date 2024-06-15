// import { where } from "sequelize";
import User from "../models/user.model.js";

// CRUD → Create
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUserByName = await User.findOne({ where: { name } });
    if (existingUserByName) {
      return res.status(409).json({ message: "Name already in use" });
    }

    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res
        .status(409)
        .json({ message: "A user is registered with this email" });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CRUD → Read
export const getUser = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const findUser = await User.findByPk(user_id);
    if (findUser) {
      res.status(200).json(findUser);
    } else {
      res.status(404).json({ message: "Error searching user" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const findAllUser = await User.findAll();
    res.status(200).json(findAllUser);
  } catch (err) {
    console.error("Error searching users:", err);
    res.status(404).json({ message: "Error searching all users" });
  }
};

// CRUD → Update
export const updateUser = async (req, res) => {
  try {
    // Take the id from the rute (use the ":")
    const { id } = req.params;

    const { name, email, password } = req.body;

    // Verify if the user exist
    const userExist = await User.findByPk(id);
    // If no exist return error
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify if the name exist and not is the same user
    if (name && name !== userExist.name) {
      const existingUserByName = await User.findOne({ where: { name } });
      if (existingUserByName && existingUserByName.user_id !== id) {
        return res.status(400).json({ message: "Name already in use" });
      }
    }

    // Verify if the email exist and not is the same user
    if (email && email !== userExist.email) {
      const existingUserByEmail = await User.findOne({ where: { email } });
      if (existingUserByEmail && existingUserByEmail.user_id !== id) {
        return res
          .status(400)
          .json({ message: "A user is registered with this email" });
      }
    }

    // Update the user
    await User.update({ name, email, password }, { where: { user_id: id } });

    // User update
    const updateUser = await User.findByPk(id);
    res.status(200).json(updateUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CRUD → Delete
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const name = req.body.name;

    const deleteUser = await User.destroy({
      where: {
        user_id: id,
        name: name,
      },
    });
    
    res.status(200).json(deleteUser);
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
