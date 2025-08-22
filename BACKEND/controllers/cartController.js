import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
    let cartData = userData.cartData;
    if(!cartData[req.body.itemId]){
      cartData[req.body.itemId] = 1;
    }else{
        cartData[req.body.itemId]++;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });
    res.json({sucess:true,massage:cartData})
    }
   
    catch(error){
        console.log(error);
        res.json({seccess:false,massage:error.message})

    }
};
const removeFromCart = async (req, res) => {
    const userId = await userModel.findById(req.body.userId);
    const cartData = await userId.cartData;
    if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId]--;
      }
    await userModel.findOneAndUpdate({ _id: req.body.userId },{cartData})
    res.json({ success: true, data: cartData });
};
const getCart = async (req, res) => {
    const userId = await userModel.findById(req.body.userId);
    const cartData  = await userId.cartData;
    if(cartData){
        res.json({sucess:true,data:cartData});
    }
};

export { addToCart, removeFromCart, getCart };