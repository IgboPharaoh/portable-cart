import React, { createContext, useReducer, useContext } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();
faker.seed(99)
// randomly generated data
const Context = ({ children }) => {
  const products = [...Array(20)].map((x) => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>{children}</Cart.Provider>;
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
