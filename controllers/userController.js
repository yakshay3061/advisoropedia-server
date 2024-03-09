import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Post from "../models/postList.js";
import axios from 'axios'

// @description  Register user 
// route  POST /api/users 
// @access Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
 
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  console.log(name, email, password);

  // if user was created successfully
  if (user) {
    const token = await generateToken(res, user._id);
    console.log("token inside register: ", token);
    res.status(200).json({ message: "Registered successfully", token: token });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@description  PostList 
// route GET /api/users/postList
// @ access Private - means user must have a valid jwt token
const posts = asyncHandler(async (req, res, next) => {
  // console.log("postlist hitted");
  const filter = parseInt(req.query.filter, 10) || 1;
  // console.log('filter: ', typeof(filter),  filter);
  try {
    const myResult = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${filter}`
    );
    const myData = myResult.data;

    res.json({ message: "hitted successfully ", data: myData });
  } catch (error) {
    console.error("Error in Axios request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { registerUser, posts };
 