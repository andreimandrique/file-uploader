import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const signupGet = (req, res) => {
  res.render("signup");
};

const validateUser = [
  body("username").notEmpty().withMessage("Username cannot be empty"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password cannot be empty")
    .custom(async (value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password and confirm password do not match");
      }
    }),
];

const signupPost = [
  validateUser,
  async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("signup", { errors: errors.array() });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });
      res.render("signup", { success: "Account registered successfully" });
    } catch (error) {
      res.render("signup", {
        errors: [{ msg: "Username already exists" }],
      });
    }
  },
];

export { signupGet, signupPost };
