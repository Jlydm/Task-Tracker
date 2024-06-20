import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/user.model.js";

export const logIn = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Find one user with this info
    const correctUser = await User.findOne({
      where: {
        [Op.and]: [{ name }, { email }],
      },
    });

    if (!correctUser) {
      res.status(401).send({ message: "Invalid name or email..." });
    }

    // Compare the passwords
    const validPassword = await bcrypt.compare(password, correctUser.password);
    if (!validPassword) {
      res.status(401).send({ message: "Invalid password..." });
    }

    const token = jwt.sign({ id: correctUser.user_id, name, email },
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.status(200).send({ message: `Welcome ${name}`, token });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const logOut = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

export const dashboard = async (req, res) => {
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      message: `Hello ${req.user.name}`,
      secret: `Here is your authorized data, you'r lucky number is ${luckyNumber}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
