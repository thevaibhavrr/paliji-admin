import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import "../../adminCss/adminProductDetaills.css";
import PrimaryLoader from "../../components/loader/loader";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [includes, setIncludes] = useState([]);

  // Fetch product details from API
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-single-product/${productId}`, "GET");
      setProduct(response.data.product);
      setIncludes(response.data.include);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image click to set selected image
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Fetch product details when component mounts or productId changes
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
        <div className="product_Details_All_Product_loader">
          <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <PrimaryLoader />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Link to={"/admin/allproducts"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="36"
                fill="currentColor"
                className="product_Details_back_arrow_icon"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
          </div>
          {product && (
            <div>
              <div className="product_Details_productDisplay">
                <div className="product_Details_product-display-left">
                  <div className="product_Details_productdisplay-img-list">
                    {product.image.map((item, i) => (
                      <div className='d-flex justify-content-center align-items-center' key={i}>
                        <img
                          src={item}
                          alt=""
                          onClick={() => handleImageClick(item)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="product_Details_productdisplay-img">
                    <img
                      src={selectedImage || product.thumbnail}
                      alt=""
                      className="product_Details_productdisplay-main-img"
                    />
                  </div>
                </div>
                <div className="product_Details_product-display-right">
                  <div>
                    <Link to={`/admin/product-update/${productId}`} target='_blank'>
                      <div className='btn btn-success'>Edit</div>
                    </Link>
                  </div>

                  <div className="product_Details_section">
                    <h1 className="product_Details_section-title">{product.name}</h1>
                    <h2>{product.subTitle}</h2>
                  </div>

                  <div className="product_Details_section">
                    <h2 className="product_Details_section-title">Description</h2>
                    <p>{product.description}</p>
                  </div>

                  <div className="product_Details_section">
                    <h2 className="product_Details_section-title">Price</h2>
                    <p><strong>Price:</strong> ₹{product.price}</p>
                    <p><strong>Price After Discount:</strong> ₹{product.PriceAfterDiscount}</p>
                    <p><strong>Discount Percentage:</strong> {product.discountPercentage}%</p>
                  </div>

                  <div className="product_Details_section">
                    <h2 className="product_Details_section-title">Stock</h2>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Is Out Of Stock:</strong> {product.IsOutOfStock ? "Yes" : "No"}</p>
                  </div>

                  <div className="product_Details_section">
                    <h2 className="product_Details_section-title">Images</h2>
                    <div className="product_Details_product-images">
                      {product.image.map((img, index) => (
                        <img key={index} src={img} alt={`Product Image ${index + 1}`} />
                      ))}
                    </div>
                  </div>

                  {/* <div className="product_Details_section">
                    <h2 className="product_Details_section-title">Sizes</h2>
                    <p>{product.Size.join(", ")}</p>
                  </div> */}

                  <div className="product_Details_section">
                    <h2 className="product_Details_section-title">Brand</h2>
                    <p><strong>Brand:</strong> {product.brand}</p>
                  </div>
                  {/* 
                  <div className="product_Details_section">
                    <h2 className="product_Details_section-title">Tax</h2>
                    <p><strong>Tax:</strong> {product.Tax * 100}%</p>
                  </div> */}

                  <div className="product_Details_section">
                    <h2 className="product_Details_section-title">Includes</h2>
                    <ul>
                      {includes.map((item, index) => (
                        <li key={index}>{item.include}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProductDetails;
