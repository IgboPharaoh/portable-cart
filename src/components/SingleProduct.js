import React from "react";
import { Button, Card } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import "./styles.css";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod.image} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }} >
            <span >
              ${prod.price.split(".")[0]}
              {prod.fastDelivery ? (
                <div>Fast Delivery</div>
              ) : (
                <div>4 days Delivery</div>
              )}
            </span>
            <Rating rating={prod.rating} />
          </Card.Subtitle>
          {cart.some((x) => x.id === prod.id) ? (
            <Button variant="danger" onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                });
              }}>Remove From Cart</Button>
          ) : (
            <Button
              disabled={!prod.inStock}
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                });
              }}
            >
              {!prod.inStock ? "Out of Stock" : "Add To Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
