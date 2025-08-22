import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);
        

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
        });

        await food.save();
        res.json({ success: true, message: "Food added successfully" });

    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



const listFood = async (req,res)=>{
    
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    }
    catch{
        console.log(error);
        res.json({success:false,message:error});
    }
    
}

const removeFood = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,massage:"Food removed successfully"});

       
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error});
    }
}

export { addFood ,listFood , removeFood  };
