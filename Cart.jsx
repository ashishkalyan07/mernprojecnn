import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Button } from "antd";
import instance from "../../network/instance";
import EndPoints from "../../network/endPoints";
import DeleteOutlined from "@ant-design/icons"

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const navigateToSummary = () => {
    navigate('/app/summary');
  };
  const fetchProducts = async () => {
    try {
      const { data } = await instance.get(EndPoints.cart);
      console.log(data);
      setCartData(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleRemoveFromCart = async (cartIndex) => {
    try {
      const updatedCartData = [...cartData];
      const cartItemIdToRemove = updatedCartData[cartIndex]._id;
  
      await instance.delete(`${EndPoints.cart}/${cartItemIdToRemove}`);
      updatedCartData.splice(cartIndex, 1);
  
      setCartData(updatedCartData);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleIncrement = (cartIndex, productIndex) => {
    const updatedCartData = [...cartData];
    const product = updatedCartData[cartIndex].products_detail[productIndex];

    updatedCartData[cartIndex].products_detail[productIndex].Qty += 1;
    product.totalPrice =
      (product.price - (product.price * product.discount) / 100) * product.Qty;

    setCartData(updatedCartData);
  };

  const handleDecrement = (cartIndex, productIndex) => {
    const updatedCartData = [...cartData];
    const product = updatedCartData[cartIndex].products_detail[productIndex];
    updatedCartData[cartIndex].products_detail[productIndex].Qty = Math.max(
      0,
      updatedCartData[cartIndex].products_detail[productIndex].Qty - 1
    );
    product.totalPrice =
      (product.price - (product.price * product.discount) / 100) * product.Qty;
      console.log(product);

    setCartData(updatedCartData);
  };
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cartData.forEach((cart) => {
      cart.products_detail.forEach((product) => {
        totalAmount +=
          (product.price - (product.price * product.discount) / 100) *
          product.Qty;
      });
    });
    return totalAmount;

  }

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <h2 className=" text-center text-primary m-3">Cart Details</h2>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            {cartData.map((cart, cartIndex) => (
              <MDBCard key={cart._id} className="rounded-3 mb-4">
                <MDBCardBody className="p-4">
                  {cart.products_detail.map((product, productIndex) => (
                    <MDBRow
                      key={product._id}
                      className="justify-content-between align-items-center"
                    >
                      <MDBCol md="2" lg="2" xl="2">
                        <MDBCardImage
                          className="rounded-3"
                          fluid
                          src={"http://localhost:8000/" + product?.image}
                          alt={product.title}
                        />
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="3">
                        <p className="lead fw-normal mb-2">{product.title}</p>
                        <p>
                          <span className="text-muted">Price:</span> $
                          {product.price}
                        </p>
                        <p>
                          <span className="text-muted">Discount:</span>{" "}
                          {product.discount}%
                        </p>
                        <p>
                          <span className="text-muted">Qty:</span> {product.Qty}
                        </p>
                      </MDBCol>
                      <MDBCol
                        md="3"
                        lg="3"
                        xl="2"
                        className="d-flex align-items-center justify-content-around"
                      >
                        <Button
                          color="link"
                          className="px-2"
                          onClick={() =>
                            handleDecrement(cartIndex, productIndex)
                          }
                        >
                          <MDBIcon fas icon="minus" /> -
                        </Button>
                        <Button
                          color="link"
                          className="px-2"
                          onClick={() =>
                            handleIncrement(cartIndex, productIndex)
                          }
                        >
                          <MDBIcon fas icon="plus" /> +
                        </Button>
                        <Button
                        color="link"
                          onClick={() =>
                            handleRemoveFromCart(cartIndex, productIndex)
                          }
                        >Remove
                         <DeleteOutlined /> 
                        </Button>
                      </MDBCol>
                      {/* <h4>PriceWithDiscount=</h4>
                      <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                        <MDBTypography tag="h5" className="mb-0">
                          $
                          {product.price -
                            (product.price * product.discount) / 100}
                        </MDBTypography>
                      </MDBCol> */}
                    </MDBRow>
                  ))}
                </MDBCardBody>
              </MDBCard>
            ))}
          <button className="btn btn-primary">
                Total Price: ${Number(calculateTotalAmount()).toFixed(2)  }
              </button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div class="align-self-center  text-center mx-auto"> 
                <button type="button" class="btn btn-success" onClick={navigateToSummary}> 
                  Summary
                </button> 
            </div> 
    </section>
  );
}
