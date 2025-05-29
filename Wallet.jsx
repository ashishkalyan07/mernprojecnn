import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import instance from "../../network/instance";
import EndPoints from "../../network/endPoints";

export default function Wallet() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [userWalletAmount, setUserWalletAmount] = useState(0);

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
  .then(() => {
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  const handleAddAmount = async () => {
    try {
      const orderResponse = await instance.post(EndPoints.wallet, {
        amount: amount,
        userId: userId,
      });
      setUserWalletAmount(orderResponse.data.amount);
      setAmount(0);

      fetchUserWalletAmount();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <MDBContainer fluid className="py-5 gradient-custom">
      <h2 className="text-center text-primary">Add Wallet Amount</h2>
      <MDBRow className="d-flex justify-content-center py-5">
        <MDBCol md="7" lg="5" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-4">
              <MDBRow className="d-flex align-items-center">
                <MDBCol size="9">
                  <MDBInput
                    label="Name"
                    id="form2"
                    type="text"
                    placeholder="Cardholder's Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </MDBCol>
                <MDBCol size="9">
                  <MDBInput
                    label="Amount"
                    id="form3"
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>
              <div className="text-right">
                <button className="btn btn-success " onClick={handleAddAmount}>
                  Add Amount
                </button>
              </div>
              <div className="text-right m-2 ">
              </div>
              <div className="mt-3">
                <p>User's Current Wallet Amount: {userWalletAmount}</p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
