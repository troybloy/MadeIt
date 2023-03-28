import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { createItemThunk, getAllItemsThunk } from "../../store/item";
import { getAllShopsThunk } from "../../store/shop";
import { getAllUsersThunk } from "../../store/user";


const CreateItemForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const { shopId } = useParams();


  const [item_name, setItem_Name] = useState("");
  const [item_price, setItem_Price] = useState("");
  const [item_description, setItem_Description] = useState("");
  const [item_img, setItem_Img] = useState("");
  // const defaultItemImg = useState("https://i.imgur.com/wbRhn3O.png")
  // const [shop_id, setShop_Id] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);


  // const parsedPriceInput = Number(item_price.replace(/[^0-9.,]/g, '')).toFixed(2)
  // console.log("parsedPriceInput", parsedPriceInput)


  const parsedPrice = Number(item_price.replace(/[^0-9.]/g, '')).toFixed(2)
  // const onlyNums = /^[0-9]+(\.[0-9]{1,2})?$/  // doesn't account for commas
  const onlyNums = /^\$?([0-9]{0,2})([0-9]{0,3})?(\.[0-9]{2})?$/
  const imageRegX = /\.(jpeg|jpg|png|svg)$/

  // console.log("priceRegex", item_price.match(priceRegex))
console.log("parsedPrice****", parsedPrice)
  /************************************** */
  // Item Price handling Logic

  // USER INPUT (anything)
  // const numOne = "$1000000"
  // const parsedPriceOne = parseFloat(numOne.replace(/[^0-9.]/g, '')).toFixed(2)
  // console.log("parsed Price One*******", parsedPriceOne)
  // output: "1000000.00"  (string)


  //INPUT
  // const toStringNum = 1000000.65
  // const toStringPrice = toStringNum.toString()
  // console.log("toStringPrice****", toStringPrice)
  // output: "1000000.65"  (string)

  //CONDITION
  // const numTwo = "$1,000,000.65"
  // const parsedPriceTwo = parseFloat(numTwo.replace(/[^0-9.]/g, ''))
  // console.log("parsed Price Two*******", parsedPriceTwo)
  // // output: 1000000.65 (integer)

  // if (parsedPriceTwo >= 100000.00) console.log("THROW ERROR")


  //OUTPUT - for item display forms
  // const parseNum = 1000000.65
  // const formattedPrice = (parseNum).toLocaleString("en-US", { style: "currency", currency: "USD" })
  // console.log("formatted Price*******", formattedPrice)
  // output: "$1,000,000.65"  (string)

  // if (1000000 < 1000000.65) console.log(true)
  // else console.log(false)

  /************************************** */

  useEffect(() => {
    dispatch(getAllShopsThunk()).then(dispatch(getAllUsersThunk()))
  }, [dispatch]);


  useEffect(() => {
    let errors = [];

    if (!user) {
      errors.push("You must be logged in to create an item");
      setErrors(errors);
    }
    else {

      if (item_name.length < 2 || item_name.length > 50 || item_name.includes("  ")) {
        errors.push("Item name must be between 2 and 50 characters and must not contain any doubled or more white space")
      }
      if (parsedPrice >= 100000.00 || parsedPrice <= 0.00 || !onlyNums.test(item_price) || item_price.includes("  ")) {
        errors.push("Item prices must must not contain any white space and be a number greater than '$0.00' and less than '$100,000.00' with no commas (prices with cents must be in '$.$$' format)")
      }
      if (item_description.length < 2 || item_description.length > 255 || item_description.includes("  ")) {
        errors.push("Item description must be between 2 and 255 characters and contain no doubled white space")
      }
      if (item_img.length > 0 && !item_img.split('?')[0].match(imageRegX)) {
        errors.push("Image must be a valid type: jpg, jpeg, png, svg")
      }

      setErrors(errors);
    }
  }, [item_name, item_price, item_description, item_img, user]);
  //comment

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (errors.length) return

    // let itemPhoto = submitted ? item.item_img : defaultItemImg
    const itemData = {
      owner_id: user.id,
      item_name: item_name.trimStart().trimEnd(),
      item_price: parsedPrice.trimStart().trimEnd(),
      item_description: item_description.trimStart().trimEnd(),
      item_img: item_img,
      shop_id: Number(shopId)
    };
    return await dispatch(createItemThunk(itemData))
      .then(() => dispatch(getAllShopsThunk()))
      .then(() => dispatch(getAllItemsThunk()))
      // .then(() => setLoaded(true))
      .then(history.push(`/shops/${shopId}`))
  }

  // console.log("shopId", shopId);
  // console.log("shop_id with number", Number(shopId));


  return (
    <div className="form-outer-container">
      <form onSubmit={handleSubmit}>
        <div className="form-header">Please Fill Out The Following Fields:</div>
        <div className="required-field">(Fields labeled with&nbsp;<div className="asterisk">*</div>&nbsp;are required)</div>
        <div className="required-field">(Fields must not contain any doubled or more white space)</div>
        <div className="form-container">
          <div className="create_errors">
            {submitted && (errors).map((error, i) => (
              <div className="errorMessageContainer" key={i}>
                <div className="errorMessage">{error}</div>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor='Item Name' className='form-field-label'>Item Name&nbsp;<div className="asterisk">*</div></label>
            <input
              className="form-field"
              name="Item Name"
              type="text"
              value={item_name}
              placeholder="Item Name"
              onChange={(e) => setItem_Name(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='Item Price' className='form-field-label'>Item Price&nbsp;<div className="asterisk">*</div></label>
            <input
              className="form-field"
              name="Item Price"
              type="text"
              value={item_price}
              placeholder="Item Price"
              onChange={(e) => setItem_Price(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='Item Description' className='form-field-label'>Item Description&nbsp;<div className="asterisk">*</div></label>
            <input
              className="form-field"
              name="Item Description"
              type="text"
              value={item_description}
              placeholder="Item Description"
              onChange={(e) => setItem_Description(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='Item Image' className='form-field-label'>Item Image</label>
            <input
              className="form-field"
              name="Item Image"
              type="text"
              value={item_img}
              placeholder="Item Image"
              onChange={(e) => setItem_Img(e.target.value)}
            />
          </div>
          <div>
            <button name="submit" type="submit" className="form-button">
              Add Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );

}

export default CreateItemForm;
