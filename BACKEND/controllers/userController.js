import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';


const login = async (req, res) => {
  const {email,password} = req.body;
  try{
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"User not found"});
    }
    const valid = await bcrypt.compare(password,user.password);
    if(!valid){
      return res.json({success:false,message:"Invalid password"});
    }
        const token = createToken(user._id);
        res.json({success:true,token});

    
   
  }catch(error){
    console.error(error);
    res.json({success:false,message:"Failed to login"});
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const register = async (req, res) => {
  const { name, password, email } = req.body;

  try {
   
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    if (password.length > 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    // Save user to database
    const newuser = new userModel({
      name,
      email,
      password: hashpassword,
    });

    const user = await newuser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to register" });
  }
};

export { login, register };
