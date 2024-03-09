import jwt from "jsonwebtoken";

const generateToken = async (res, userId) => {
  console.log('generate token hitted ');
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log('token: ', token);
  
  return token;
  
};

export default generateToken;
