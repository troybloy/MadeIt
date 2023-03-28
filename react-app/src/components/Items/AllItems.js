import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllItemsThunk } from "../../store/item";
import { getAllShopsThunk } from "../../store/shop";
import { getAllUsersThunk } from "../../store/user";
import ItemsCard from "../ItemCard";

const AllItems = () => {
  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.items);

  // console.log("all items", allItems)
  useEffect(() => {
    dispatch(getAllItemsThunk())
    dispatch(getAllShopsThunk())
    dispatch(getAllUsersThunk())
  }, [dispatch])

  return (
    <div>
      {Object.values(allItems).map((item) => (
        <ItemsCard item={item} />
        ))}
    </div>
  );
}

export default AllItems;
