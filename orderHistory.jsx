import {useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import instance from "../../network/instance";
import EndPoints from "../../network/endPoints";


export default function OrderHistory() {
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();
  
    const navigateToSummary = () => {
      navigate('/dashboard');
    };
    const responseDataString = localStorage.getItem('userData');
    const responseData = JSON.parse(responseDataString);
    const userId = responseData.data._id;
      console.log(userId);
    const fetchProducts = async () => {
        try {
          const { data } = await instance.get(`${EndPoints.orderHistory}/${userId}`);
          console.log(data);
          setCartData(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
    
      useEffect(() => {
        fetchProducts();
      }, [userId]);
  
    return (
      <section className="h-100" style={{ backgroundColor: "#eee" }}>
        <h2 className=" text-center text-primary m-3">OrderHistory</h2>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="10">
              {cartData.map((cart) => (
                <MDBCard key={cart._id} className="rounded-3 mb-4">
                  <MDBCardBody className="p-4">
                    {cart.cartItems.map((cartItem) => (
                      <MDBRow
                        key={cartItem.productId._id}
                        className="justify-content-between align-items-center"
                      >
                        <MDBCol md="2" lg="2" xl="2">
                          <MDBCardImage
                            className="rounded-3"
                            fluid
                            src={"http://localhost:8000/" + cartItem.productId?.image}
                            alt={cartItem.productId.title}
                          />
                        </MDBCol>
                        <MDBCol md="3" lg="3" xl="3">
                          <p className="lead fw-normal mb-2">{cartItem.productId.title}</p>
                          <p>
                            <span className="text-muted">Price:</span> $
                            {cartItem.productId.price}
                          </p>
                          <p>
                            <span className="text-muted">Qty:</span> {cartItem.quantity}
                          </p>
                        </MDBCol>
                        <h4>Total Price =</h4>
                        <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                          <MDBTypography tag="h5" className="mb-0">
                            ${cartItem.quantity * cartItem.productId.price}
                          </MDBTypography>
                        </MDBCol>
                      </MDBRow>
                    ))}
                  </MDBCardBody>
                </MDBCard>
              ))}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div class="align-self-center  text-center mx-auto"> 
          <button type="button" class="btn btn-success" onClick={navigateToSummary}> 
            Continue Shopping...................
          </button> 
        </div> 
      </section>
    );
  }
  