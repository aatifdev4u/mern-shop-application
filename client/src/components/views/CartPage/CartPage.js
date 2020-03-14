import React, { useEffect } from 'react'
import {  useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/userActions';
import UserCardBlock from './Sections/UserCardBlock';

import { Result, Empty } from 'antd';

function CartPage(props) {
    // console.log(props.user.userData.cart);
    const dispatch = useDispatch();

    useEffect(()=>{
        let cartItems = []; // contains the productId 
        if(props.user.userData && props.user.userData.cart){
            props.user.userData.cart.forEach(item=>{
                cartItems.push(item.id)
            })

            dispatch(getCartItems(cartItems, props.user.userData.cart));
        }
    }, [props.user.userData])

    const removeFromCart = ()=>{

    }

    return (
        <div style={{ width: '85%', padding: '2rem 4rem'}}>
            <UserCardBlock 
                products={props.user.cartDetail}
                removeItem={removeFromCart}
            />

            <div style={{ marginTop: '3rem' }}>
                <h2>Total amount: 10 </h2>
            </div>

            <Result
                status="success"
                title="Successfully Purchased Items"
            />

            <div style={{
                    width: '100%', display: 'flex', flexDirection: 'column',
                    justifyContent: 'center'
            }}>
                <br />
                <Empty description={false} />
                <p>No Items In the Cart</p>

            </div>

        </div>
    )
}

export default CartPage
