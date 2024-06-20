import bcrypt from "bcrypt";
import { Op } from "sequelize";
import User from "../../models/user.model.js";

// Function to check if the user exist by name or email
const checkUserExist = async (name, email) => {
  return await User.findOne({
    where: {
      [Op.or]: [{ name }, { email }],
    },
  });
};

// Function to check if user exists by ID
const findUserById = async (id) => {
  return await User.findByPk(id);
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (checkUserExist(name, email)) {
      return res
        .status(409)
        .json({ message: "The name or email are already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = findUserById(user_id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const findAllUser = await User.findAll();
    res.status(200).json(findAllUser);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify if the name exist and not is the same user
    if ( name && name !== user.name && (await User.findOne({ where: { name } })) ) { 
      return res.status(400).json({ message: "Name already in use" });
    }

    if ( email && email !== user.email && (await User.findOne({ where: { email } })) ) {
      return res.status(400).json({ message: "Name already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update(
      { 
        name, 
        email, 
        password: hashedPassword 
      }, { where: { user_id: id } }
    );

    // User update
    const updateUser = await User.findByPk(id);
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const name = req.body.name;

    const deleteUser = await User.destroy({
      where: {
        user_id: id,
        name,
      },
    });

    if (deleteUser === 0) {
      return res.status(404).json({ message: "User not found or name does not match" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};