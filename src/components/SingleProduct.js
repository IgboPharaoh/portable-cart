import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import "./styles.css";

const SingleProduct = ({ prod }) => {
  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod.image} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle>
            <span style={{ paddingBottom: 10 }}>
              ${prod.price.split(".")[0]}
              {prod.fastDelivery ? (
                <div>Fast Delivery</div>
              ) : (
                <div>4 days Delivery</div>
              )}
            </span>
            <Rating rating={prod.rating} />
          </Card.Subtitle>
          <Button variant="danger">Remove From Cart</Button>
          <Button disabled={!prod.inStock} >{ !prod.inStock ? "Out of Stock" : "Add To Cart"}</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
