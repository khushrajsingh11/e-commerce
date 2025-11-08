import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const getDefaultCart = (foodList = []) => {
    let cart = {};
    foodList.forEach((item) => {
      cart[item._id] = 0;
    });
    return cart;
  };

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

const url = import.meta.env.VITE_API_URL;

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data.data);
      setFoodList(response.data.data);
      setCartItems(getDefaultCart(response.data.data));
    } catch (err) {
      console.error("Error fetching food list:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }
    };
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    }
  };

  const removeItem = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, prev[itemId] - 1),
    }));
    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) total += itemInfo.price * cartItems[item];
      }
    }
    return total;
  };

  const deliveryFee = 2.0;

  const contextValue = {
    food_list,
    addToCart,
    removeItem,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    deliveryFee,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
