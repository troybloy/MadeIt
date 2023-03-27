import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllShopsThunk } from '../../store/shop'
import { getAllUsersThunk } from '../../store/user'
import ShopsCard from '../ShopCard'


const AllShops = () => {
    const dispatch = useDispatch()
    const shops = useSelector(state => state?.shops)

    useEffect(() => {
        dispatch(getAllShopsThunk())
        dispatch(getAllUsersThunk())
    }, [dispatch])


    return (
        <div>
            {Object.values(shops).map(shop => (
                    <ShopsCard shop={shop} />
            ))}
        </div>
    )
}

export default AllShops;
