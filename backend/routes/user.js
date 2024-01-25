const express = require("express");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");
//creating a user router
const userRouter = express.Router();
//adding the signup auth
const signUpObject = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
userRouter.post("/signup", async (req, res) => {
  const { success } = signUpObject.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }
  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET_KEY
  );
  res.json({
    message: "User created successfully",
    token: token,
  });
  // 5. Giving user a random balance
  const randomBalance = Math.floor(Math.random() * 10000) + 1;
  await Account.create({
    userId,
    balance: randomBalance
  });
  
});

//2. Route to Sign In
const signInPostBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
userRouter.post("/signin", async (req, res) => {
  const { success } = signInPostBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  const userId = user._id;
  if (user) {
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET_KEY
    );
    res.json({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});
//3. Router to update the user info
const updatePutBody = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});
userRouter.put("/user", authMiddleware, async (req, res) => {
  const { success } = updatePutBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating the information",
    });
  }
  await User.updateOne(req.body, {
    id: req.userId,
  });
  res.json({
    message: "Updated successfully",
  });
});
// 4. Bulk Route

userRouter.get("/bulk", async (req, res) => {
  const requestedName = req.query.filter || "";
  console.log(requestedName)
  if (!requestedName) {
    return res.json({
      message: "Name has not been given",
    });
  }
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: requestedName,
          $options: "i",
        },
        lastName: {
          $regex: requestedName,
          $options: "i",
        },
      },
    ],
  });
  res.json({
    message: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    })),
    
  });
});

module.exports = userRouter;
