import React, { useState, useEffect } from "react";
import EndPoints from "../../network/endPoints";
import instance from "../../network/instance";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Payment from "../Payment/Payment";

const Summary = () => {
  const navigate=useNavigate()
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    correspondence: "",
    permanent: "",
    PinCode: "",
    PhoneNumber: "",
  });
const [step,setStep]=useState(false)
  const responseDataString = localStorage.getItem('userData');
  const responseData = JSON.parse(responseDataString);
  const userId = responseData.data._id;
    console.log(userId);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await instance.get(EndPoints.cart);
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);   
  const placeOrder = async () => {
    try {
      const orderResponse = await instance.post(EndPoints.order, {
        userId:userId,
        cartItems: cartItems.map((cart) => ({
          productId: cart.products_detail[0]._id,
          quantity: cart.products_detail[0].Qty,
        })),
        address,
      });
      console.log("Order placed successfully:", orderResponse.data);
      navigate("/app/payment");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  const calculateTotalAmount = () => {
    let totalAmount = 0;

    cartItems.forEach((cart) => {
      cart.products_detail.forEach((product) => {
        totalAmount +=
          (product.price - (product.price * product.discount) / 100) *
          product.Qty;
      });
    });

    return totalAmount;
  }

  return (
    <>
    {!step?<div className="container rounded border">
      <h2 className="text-center text-primary">Cart Summary</h2>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            {cartItems?.map((cart) => (
              <MDBCard key={cart._id} className="rounded-3 mb-4">
                <MDBCardBody className="p-4">
                  {cart.products_detail.map((product) => (
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
                        {/* <p>
                          <span className="text-muted">Qty:</span> {product.Qty}
                        </p> */}
                      </MDBCol>
                      <MDBCol
                        md="3"
                        lg="3"
                        xl="2"
                        className="d-flex align-items-center justify-content-around"
                      ></MDBCol>
                      {/* <h4>Total Price =</h4>
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
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div class="container">
        <h3>Address Information</h3>
        <form>
          <div class="row">
            <div class="col-md-12">
              <label className="col-12">
                Correspondence Address:
                <input
                  type="text box"
                  class="form-control"
                  name="correspondence"
                  value={address.correspondence}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div class="col-md-12">
              <label className="col-12">
                Permanent Address:
                <input
                  type="text"
                  class="form-control"
                  name="permanent"
                  value={address.permanent}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <label className="col-6">
                PINCode:
                <input
                  type="number"
                  class="form-control"
                  name="PinCode"
                  value={address.PinCode}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 ">
              <label className="col-6">
                PhoneNumber:
                <input
                  type="string"
                  class="form-control"
                  name="PhoneNumber"
                  value={address.PhoneNumber}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
        </form> 
      </div>
      <h4>Total Amount With Discount: ${Number(calculateTotalAmount()).toFixed(2)}</h4>
      <button className="btn btn-success" onClick={()=>setStep(true)}>
        Place Order
      </button>
    </div>:(
<Payment totalAmount={Number(calculateTotalAmount()).toFixed(2)} step={setStep} handleOrder={placeOrder}/>
    )
  }
  </>
  );
};
export default Summary;

