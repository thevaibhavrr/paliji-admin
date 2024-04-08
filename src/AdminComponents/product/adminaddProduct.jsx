import React, { useState, useEffect } from "react";
import "../../adminCss/product/adminaddProduct.css";
import { makeApi } from "../../api/callApi";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminaddProduct() {
  const [categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("0");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([{}]);
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!name || !price || !quantity || !category || !brand || !thumbnail || !images ) {
    //   toast.error('Please fill all required fields');
    //   return;
    // }
    const requiredFields = [];
    if (!name) {
      requiredFields.push("Name");
    }
    if (!price) {
      requiredFields.push("Price");
    }
    if (!quantity) {
      requiredFields.push("Quantity");
    }
    if (!category) {
      requiredFields.push("Category");
    }
    if (!thumbnail) {
      requiredFields.push("Thumbnail");
    }
    if (images.length == 1) {
      requiredFields.push(" Product Images");
    }

    if (requiredFields.length > 0) {
      const fieldNames = requiredFields.join(", ");
      toast.error(`Please fill all required fields: ${fieldNames}`);
      return;
    }
    try {
      const response = await makeApi("/api/create-product", "POST", {
        name,
        description,
        price,
        discountPercentage,
        quantity,
        image: images,
        thumbnail,
        category,
        brand,
        size,
      });
      setName("");
      setDescription("");
      setPrice("");
      setDiscountPercentage("");
      setQuantity("");
      setImages([""]);
      setThumbnail("");
      setCategory("");
      setBrand("");
      setSize("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const handleAddMoreImages = () => {
    setImages([...images, ""]);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await makeApi("/api/get-all-categories", "GET");
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleImageUpload = async (event, index) => {
    try {
      const file = event.target.files[0];

      // if (file.type.startsWith("image/")) {
      if (file) {
        console.log(file);

        const compressedFile = await file;

        const data = new FormData();
        data.append("file", compressedFile);
        data.append("upload_preset", "ou1fk438");

        await axios
          .post(
            `https://api.cloudinary.com/v1_1/dyl3gzm7d/image/upload`,

            data
          )
          .then((response) => {
            if (response.status === 200) {
              const imageURL = response.data.url;
              // setFormData({ ...formData, screenshot: imageURL });
              handleImageChange(index, imageURL);
            }
          });
      }
    } catch (error) {
      console.log("image upload error", error);
    }
  };
  const handleThumbnailUpload = async (event, index) => {
    try {
      const file = event.target.files[0];

      // if (file.type.startsWith("image/")) {
      if (file) {
        console.log(file);

        const compressedFile = await file;

        const data = new FormData();
        data.append("file", compressedFile);
        data.append("upload_preset", "ou1fk438");

        await axios
          .post(
            `https://api.cloudinary.com/v1_1/dyl3gzm7d/image/upload`,

            data
          )
          .then((response) => {
            if (response.status === 200) {
              const imageURL = response.data.url;
              // setFormData({ ...formData, screenshot: imageURL });
              setThumbnail(imageURL);
            }
          });
      }
    } catch (error) {
      console.log("image upload error", error);
    }
  };

  return (
    <div>
      <div className="add-product-container">
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
        <div className="add_product_text">Add Product</div>
        <div>
          <ToastContainer />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required
          />
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            className="add_product_input_filed"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            // required
          />
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Discount Percentage"
            defaultValue={0}
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
          <input
            type="number"
            className="add_product_input_filed"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            // required
          />
          {/* {images.map((image, index) => (
            <input
              key={index}
              type="text"
              className="add_product_input_filed"
              placeholder={`Image URL ${index + 1}`}
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              // required
            />
          ))} */}
          <h3>Add Images of Product</h3>
          {images.map((image, index) => (
            <input
              key={index}
              type="file"
              className="add_product_input_filed add_product_input_filed_image"
              // placeholder={`Image URL ${index + 1}`}
              // value={image}
              // onChange={(e) => handleImageChange(index, e.target.value)}
              onChange={(event) => {
                handleImageUpload(event, index);
              }}
              // required
            />
          ))}
          <div>
            {images.map((image, index) => (
              <img src={image} alt="" width={150} height={150} />
            ))}
          </div>
          <div className="add_product_page_add_more_div">
            <button
              type="button"
              className="admin_add_product_button add_product_page_button"
              onClick={handleAddMoreImages}
            >
              Add More
            </button>
          </div>
          {/* <input
            type="text"
            className="add_product_input_filed"
            placeholder="Thumbnail URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            // required
          /> */}
          <h3>Add thumbnail of Product</h3>
          <form className="file-upload-form file_upload_form_upload_image d-flex justify-content-between">
            <div>
              <label for="file" className="file-upload-label">
                <div className="file-upload-design">
                  <svg viewBox="0 0 640 512" height="1em">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                  </svg>
                  <p>Drag and Drop</p>
                  <p>or</p>
                  <span className="browse-button">Browse file</span>
                </div>
                <input
                  id="file"
                  type="file"
                  onChange={(e) => handleThumbnailUpload(e)}
                  // required
                />
              </label>
            </div>
            <div>
              {thumbnail === "" ? (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWRhb8uI0vKINdZJCfOmdIWu0uMBsKNCzlAk2myawr1rr3xFE-5g_B575p5H9V5S5nH3E&usqp=CAU"
                  alt="no image"
                  width={150}
                  height={150}
                />
              )
            
            :(
              <img src={thumbnail} alt="thumbnail" width={150} height={150} />
            )}
              {/* {thumbnail && <img src={thumbnail} alt="thumbnail" width={150} height={150} />} */}
            </div>
          </form>

          {/* <input
            type="file"
            className="add_product_input_filed add_product_input_filed_image"
            placeholder="Thumbnail URL"
            // value={thumbnail}
            onChange={(e) => handleThumbnailUpload(e)}
            // required
          /> */}

          <select
            className="add_product_input_filed add_product_dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          {/* <input
            type="text"
            className="add_product_input_filed"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          /> */}
          <div className="add_product_page_button_div">
            <button
              type="submit"
              className="admin_add_product_button add_product_page_button"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminaddProduct;
