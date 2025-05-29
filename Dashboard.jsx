import React, { useEffect, useState } from "react";
import { Card, Row, Col, message as antdMessage } from "antd";
import instance from "../network/instance";
import EndPoints from "../network/endPoints";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
    const responseDataString = localStorage.getItem('userData');
  const responseData = JSON.parse(responseDataString);
  const userId = responseData.data._id;
  const fetchProducts = async () => {
    try {
      const { data } = await instance.get(EndPoints.PRODUCT);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    setLoadingProductId(productId);
    try {
      const response = await instance.post(EndPoints.cart, {
        productId: productId,
        userId: userId
      });
      console.log("Item added to cart:", response.data);
      setIsAddedToCart(true);
      antdMessage.success('Product added to cart successfully');
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setLoadingProductId(null);
    }
  };
  const isProductLoading = (productId) => loadingProductId === productId;
  return (
    <div>
      <div className="container">
        <h2 className="text-center text-primary">
          Welcome to Our Laptop Shopping Portal
        </h2>  
        <Row gutter={16}>
          {products.map((product, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card title={product.title} style={{ width: 300 }}>
                <p>Price: {product.price}</p>
                <p>Discount: {product.discount}</p>
                <p>Stock: {product.Qty}</p>
                <img
                  src={"http://localhost:8000/" + product?.image}
                  alt="Product"
                  style={{ maxWidth: "100%" }}
                />
                <button
                  className="btn btn-success m-2"
                  onClick={() => addToCart(product._id)}
                  disabled={isProductLoading(product._id)}>
                  {isProductLoading(product._id) ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin /> Adding to Cart...
                    </>
                  ) : (
                    'Add To Cart'
                  )}
                </button>
              </Card>
            </Col>
          ))}
        </Row>
        {isAddedToCart && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ color: 'green' }}>Product added to cart successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};
