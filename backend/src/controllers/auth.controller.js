import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";


const isPasswordCorrect = async (typedPassword, hashPassword) => {
  try {

    const isMatch = await bcrypt.compare(typedPassword, hashPassword);
    return isMatch;
    
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
}

export const signupUser = async (req, res) => {
  try {

    const {name, email, password} = req.body;
    if (
      !name || 
      !email || 
      !password || 
      [name, email, password].some((field) => field.trim() === "")) {
      return res
      .status(400)
      .json({
        message: "All fields are required"
      })
    };

    const existedUser = await User.findOne({email: email});

    if (existedUser) {
      return res
      .status(409)
      .json({
        message: "You have already an account in the email"
      })
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res
      .status(500)
      .json({
        message: "Something went wrong while registering the user"
      })
    }

    return res
    .status(201)
    .json({
      message: "User register successful",
      user: createdUser
    })
    
  } catch (error) {
    console.error("Error in signup:", error.message || error);
    return res
    .status(500)
    .json({
      message: "Internal server error"
    })
  }
};

export const loginUser = async (req, res) => {
  try {

    const {email, password} = req.body;

    if ([email, password].some((field) => field.trim() === "")) {
      return res
      .status(400)
      .json({
        message: "All fields are required"
      })
    }

    const user = await User.findOne({email});

    if (!user) {
      return res
      .status(401)
      .json({
        message: "Invalid credentials"
      })
    };

    const ispasswordValid = await isPasswordCorrect(password, user.password);

    if (!ispasswordValid) {
      return res
      .status(401)
      .json({
        message: "Invalid credentials",
      })
    };

    // delete password for return the user details to frontend
    const loggedUser = user.toObject();
    delete loggedUser.password;

    return res
    .status(200)
    .json({
      message: "User logged in successful",
      user: loggedUser,
    })
    
  } catch (error) {
    console.error("Error in login:", error.message || error);
    return res
    .status(500)
    .json({
      message: "Internal server error"
    })
  }
};