import React from "react";
import { CartState } from "../context/Context";
import Filter from "./Filter";
import SingleProduct from "./SingleProduct";

const Home = () => {
  const {
    state: { products }, productState: {byStock, byFastDelivery, sort, byRating, searchQuery}
  } = CartState();

  const transformProducts = () =>{
      let sortedProducts = products
      if(sort){
          sortedProducts.sort((a,b) => (
              sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
          ))
      }
      if(!byStock){
          sortedProducts = sortedProducts.filter((x) => (x.inStock))
      }
      if(byFastDelivery){
          sortedProducts = sortedProducts.filter((x) => (x.fastDelivery))
      }
      if(byRating){
          sortedProducts = sortedProducts.filter((x) => (x.ratings) === byRating)
      }
      if(searchQuery){
          sortedProducts = sortedProducts.filter((x) => (x.name.lowerCase().includes(searchQuery)) )
      }
      
      return sortedProducts
  }

  return (
    <div className="home">
        <Filter/>
      <div className="productContainer">
        {transformProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
