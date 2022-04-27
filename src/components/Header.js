import React from "react";
import {
  Badge,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
  NavbarBrand,
  Button,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";

const Header = () => {
  const {
    state: { cart },
    dispatch, productDispatch
  } = CartState();
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <NavbarBrand>
          <Link to="/">Shopping Cart</Link>
        </NavbarBrand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a Product"
            className="m-auto"
            onChange={(e)=>{
              productDispatch({
                type: 'FILTER_BY_SEARCH',
                payload: e.target.value
              })
            }}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown  >
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge bg="">{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }} align='end'>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="cartItemImg"
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>{prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
