import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createShopThunk } from "../../store/shop";

const CreateShopForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [shop_name, setShop_Name] = useState("");
  const [shop_description, setShop_Description] = useState("");
  const [shop_img, setShop_Img] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const imageRegX = /\.(jpeg|jpg|png|svg)$/

  useEffect(() => {
    let errors = [];

    if (!user) {
      errors.push("You must be logged in to create a shop");
      setErrors(errors);
    }
    else {

      if (shop_name.length < 2 || shop_name.length > 50) {
        errors.push("shop name: must be between 2 and 50 characters.")
      }
      if (shop_description.length < 2 || shop_description.length > 255) {
        errors.push("shop name: must be between 2 and 255 characters.")
      }
      if (shop_img.length < 2 || !shop_img.split('?')[0].match(imageRegX)) {
        errors.push("image: must be a valid type: jpg, jpeg, png, svg.")
      }

      setErrors(errors);
    }
  }, [shop_name, shop_description, shop_img, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (errors.length) return

    const shopData = {
      owner_id: user.id,
      shop_name: shop_name,
      shop_description: shop_description,
      shop_img: shop_img,
    };
    return await dispatch(createShopThunk(shopData))
    .then((res) => history.push(`/shops/${res.id}`))
    // if (createdShop) {
    //   history.push(`/shops/${createdShop.id}`);
    // }
  }

  return (
    <div className="form-outer-container">
      <form onSubmit={handleSubmit}>
        <div className="form-header">Please Fill Out The Following Fields:</div>
        <div className="form-container">
          <div className="create_errors">
            {submitted && (errors).map((error, i) => (
              <div className="errorMessageContainer" key={i}>
                <i className="fa-solid fa-exclamation exclamation-point"></i>
                <div className="errorMessage">{error}</div>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor='Shop Name' className='form-field-label'>Shop Name</label>
            <input
              className="form-field"
              name="Shop Name"
              type="text"
              value={shop_name}
              placeholder="Shop Name"
              onChange={(e) => setShop_Name(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='Shop Description' className='form-field-label'>Shop Description</label>
            <input
              className="form-field"
              name="Shop Description"
              type="text"
              value={shop_description}
              placeholder="Shop Description"
              onChange={(e) => setShop_Description(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='Shop Image' className='form-field-label'>Shop Image</label>
            <input
              className="form-field"
              name="Shop Image"
              type="text"
              value={shop_img}
              placeholder="Shop Image"
              onChange={(e) => setShop_Img(e.target.value)}
              required
            />
          </div>
          <div>
            <button name="submit" type="submit" className="form-button">
              Create Shop
            </button>
          </div>
        </div>
      </form>
    </div>
  );

}

export default CreateShopForm;
