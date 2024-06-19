import { Op } from "sequelize";
import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";

export const logIn = async (req, res) => {
  // Video en 5:56:20
  try {
    const { name, email, password } = req.body;

    const id = new Date().getDate();

    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const correctUser = await User.findOne({
      where: {
        [Op.and]: [{ name: name }, { email: email }, { password: password }],
      },
    });

    if (!correctUser) {
      res.status(404).send({ message: "Error..." });
    }

    res.status(200).send({ message: `Welcome ${name}`, token });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const logOut = async (req, res) => {
  res.send("Hello");
};

export const dashboard = async (req, res) => {
  try {
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      message: `Hello ${req.user.name}`,
      secret: `Here is your authorized data, you'r lucky number is ${luckyNumber}`,
    });
  } catch (err) {
    onsole.log(err);
    res.status(500).json({ message: "Internal Server Error", err });
  }
};
