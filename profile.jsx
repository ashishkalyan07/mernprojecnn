import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [userData, setUserData] = useState({});
  const navigate=useNavigate()

  const fetchUserDetails = async () => {
    try {

      const { data } = JSON.parse(localStorage.getItem('userData'));
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const handleLogout=() =>{
    localStorage.clear();
    navigate('/login');
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                   <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />

                  <MDBTypography tag="h5">{userData.name}</MDBTypography>
                  <MDBCardText>{userData.role}</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Id</MDBTypography>  
                        <MDBCardText className="text-muted">{userData._id}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <MDBCardText className="text-muted">{userData.name}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">PhoneNumber</MDBTypography>
                        <MDBCardText className="text-muted">{userData.phoneNumber}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    {/* Additional details as needed */}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>

          </MDBCol>
        </MDBRow>
        <div className='text-center'>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      </MDBContainer>
    
    </section>
  );
}
