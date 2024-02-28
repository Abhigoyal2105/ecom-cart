import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

getLocalCartData = ()=>{
  let newLocalData = localStorage.getItem("cartData")
  if(newLocalData == []){
    return []
  }
  else{
    return JSON.parse(newLocalData)
    //JSON.parse helps to convert string to object to object or value
  }
}

const initialState = {
  // cart: [],
  cart: getLocalCartData(),
  total_item: "",
  total_amount: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  useEffect(()=>{
    localStorage.setItem("cartData", JSON.stringify(state.cart))
    //JSON.stringify helps to convert Object or Value to String
  }, [state.cart])
  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
