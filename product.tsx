import React, { useState } from "react";
import instance from "../../network/instance";
import EndPoints from "../../network/endPoints";

export const Product = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    Qty: "",
    discount: "",
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: files[0],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    instance
      .post(EndPoints.PRODUCT, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        // Handle the API response as needed
        console.log("Product added successfully:", data);
        setSuccessMessage("Product added successfully!");
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        setErrorMessage("Error adding product. Please try again.");
        setSuccessMessage("");
      });
  };

  return (
    <div>
      <h2 className=" text-center text-primary">Add Product</h2>
      <div className="container rounded border">
        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <label htmlFor="title">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Product Name"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="Qty">Quantity</label>
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <input
                  type="number"
                  className="form-control"
                  id="Qty"
                  placeholder="Ouantity"
                  value={formData.Qty}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="discount">Discount</label>
              <input
                type="text"
                className="form-control"
                id="discount"
                placeholder="Discount"
                value={formData.discount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                placeholder="Image"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </form>
        {successMessage && <p className="text-success">{successMessage}</p>}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </div>
    </div>
  );
};
