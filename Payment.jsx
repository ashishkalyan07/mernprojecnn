import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";
import instance from "../../network/instance";
import EndPoints from "../../network/endPoints";
import { useNavigate } from "react-router-dom";
export default function Payment({ totalAmount, step, handleOrder }) {
  console.log(totalAmount);
  const navigate = useNavigate();
  const [userWalletAmount, setUserWalletAmount] = useState(0);
  const [paymentMessage, setPaymentMessage] = useState(null);
  const responseDataString = localStorage.getItem("userData");
  const responseData = JSON.parse(responseDataString);
  const userId = responseData.data._id;
  const fetchUserWalletAmount = async () => {
    try {
      const response = await instance.get(EndPoints.wallet + `/${userId}`);
      setUserWalletAmount(response.data.amount);
    } catch (error) {
      console.error("Error fetching user wallet amount:", error);
    }
  };

  fetchUserWalletAmount(userId)
    .then(() => {})
    .catch((error) => {
      console.error("Error:", error);
    });
  const handlePayAmount = async () => {
    await handleOrder();
    try {
      if (userWalletAmount >= totalAmount) {
        await instance.post(EndPoints.walletUpdate + `/${userId}`, {
          amount: totalAmount,
        });

        setPaymentMessage("Payment successful!");
        navigate("/app/orderConfirm");
      } else {
        setPaymentMessage("Insufficient funds in the wallet!");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setPaymentMessage("Payment failed. Please try again.");
    }
  };
  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBCard className="rounded-3">
            <MDBCardBody className="mx-1 my-2">
              <div className="d-flex align-items-center">
                <div>
                  <MDBIcon
                    fab
                    icon="cc-visa"
                    size="4x"
                    className="text-black pe-3"
                  />
                </div>
                <div>
                  <p className="d-flex flex-column mb-0">
                    <b>Payment Cart</b>
                  </p>
                </div>
              </div>
              <div className="pt-3">
                <div className="d-flex flex-row pb-3">
                  <div
                    className="rounded border border-primary border-2 d-flex w-100 p-3 align-items-center"
                    style={{ backgroundColor: "rgba(18, 101, 241, 0.07)" }}
                  >
                    <div className="d-flex align-items-center pe-3">
                      <MDBRadio
                        name="radioNoLabelX"
                        id="radioNoLabel11"
                        defaultChecked
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <p className="mb-1 small text-primary"></p>
                      <h6 className="mb-0 text-primary">${totalAmount}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row pb-3">
                <div className="rounded border d-flex w-100 px-3 py-2 align-items-center">
                  <div className="d-flex align-items-center pe-3">
                    <MDBRadio name="radioNoLabelX" id="radioNoLabel11" />
                  </div>
                  <div className="d-flex flex-column py-1">
                    <p className="mb-1 small text-primary">Wallet amount</p>
                    <div className="d-flex flex-row align-items-center">
                      <h6 className="mb-0 text-primary pe-1">$</h6>
                      <MDBInput
                        id="typeNumber"
                        type="number"
                        size="sm"
                        value={userWalletAmount}
                        readOnly
                        style={{ width: "100px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center pb-1">
                <span style={{ cursor: "pointer" }} onClick={() => step(false)}>
                  {" "}
                  Go back
                </span>
                <MDBBtn size="lg" onClick={handlePayAmount}>
                  Pay amount
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      {paymentMessage && (
        <div
          className={`alert ${
            paymentMessage.includes("successful")
              ? "alert-success"
              : "alert-danger"
          }`}
          role="alert"
        >
          {paymentMessage}
        </div>
      )}
    </MDBContainer>
  );
}
