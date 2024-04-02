import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { makeApi } from "../../api/callApi";
import "../../adminCss/adminProductDetaills.css";
import Loader from "../../components/loader/loader";

function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  // slider
  const [swiperRef, setSwiperRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSlideChange = () => {
    if (swiperRef) {
      setActiveIndex(swiperRef.activeIndex);
    }
  };

  const handlePrevClick = () => {
    if (swiperRef) {
      swiperRef.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  // slider end

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await makeApi(
          `/api/get-single-product/${productId}`,
          "GET"
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="product-details">
          <div>
            <Link to={"/admin/allproducts"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="36"
                fill="currentColor"
                className="bi bi-arrow-left back_arrow_icon"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
          </div>
          {/* slider */}
          <div className="main-slider-section-start pt-3">
            <div className="main-slider-div">
              <div className="our-product-slider-start ">
                <Swiper
                  loop={true}
                  onSwiper={setSwiperRef}
                  onSlideChange={handleSlideChange}
                  slidesPerView={2.5}
                  initialSlide={1}
                  // centeredSlides={true}
                  spaceBetween={100}
                  // pagination={{
                  //   type: "fraction",
                  // }}
                  className="mySwiper"
                >
                  {product?.image?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt="images_Testing"
                        className="slider_images"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* left */}
                <div className="prev-next-buttons">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-caret-left-fill"
                      viewBox="0 0 16 16"
                      onClick={handlePrevClick}
                      className="prev-button"
                    >
                      <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                  </div>

                  {/* right */}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-caret-right-fill"
                      viewBox="0 0 16 16"
                      onClick={handleNextClick}
                      className="next-button"
                    >
                      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* messsage */}

          {/* text */}
          <div className="product_text_bottom_section">
            <div className="admin_prioduct_details">
              <span className="admin_prioduct_details_heading">Name : </span>{" "}
              <div>{product?.name}</div>
            </div>
            <div className="admin_prioduct_details">
              {" "}
              <span className="admin_prioduct_details_heading">
                Description :
              </span>{" "}
              <div>{product?.description}</div>
            </div>
            <div className="admin_prioduct_details">
              {" "}
              <span className="admin_prioduct_details_heading">
                Price :{" "}
              </span>{" "}
              <div>{product?.price}</div>
            </div>
            <div className="admin_prioduct_details">
              {" "}
              <span className="admin_prioduct_details_heading">
              Discount Percentage :{" "}
              </span>{" "}
              <div>{product?.discountPercentage} %</div>
            </div>
            <div className="admin_prioduct_details">
              {" "}
              <span className="admin_prioduct_details_heading">
              PriceAfter Discount :{" "}
              </span>{" "}
              <div>{product?.PriceAfterDiscount} </div>
            </div>
            <div className="admin_prioduct_details">
              {" "}
              <span className="admin_prioduct_details_heading">
                Category :{" "}
              </span>{" "}
              <div>{product?.category?.name}</div>
            </div>
            <div className="admin_prioduct_details">
              {" "}
              <span className="admin_prioduct_details_heading">
                Brand :{" "}
              </span>{" "}
              <div>{product?.brand}</div>
            </div>
            <div className="admin_prioduct_details">
              {" "}
              <span className="admin_prioduct_details_heading">
                Quantity :{" "}
              </span>{" "}
              <div>{product?.quantity}</div>
            </div>
           
            <div className="admin_prioduct_details">
              {" "}
              <span className="admin_prioduct_details_heading">
              IsOutOfStock :{" "}
              </span>{" "}
              <div>{product?.IsOutOfStock}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
