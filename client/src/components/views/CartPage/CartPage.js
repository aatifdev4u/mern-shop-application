import React, { useEffect, useState } from 'react'
import {  useDispatch } from 'react-redux';
import { getCartItems, removeCartItem,  onSuccessBuy } from '../../../_actions/userActions';
import UserCardBlock from './Sections/UserCardBlock';
import Axios from 'axios';
import Paypal from '../../utils/Paypal';

import { Result, Empty } from 'antd';

function CartPage(props) {
    // console.log(props.user.userData.cart);
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

    useEffect(()=>{
        let cartItems = []; // contains the productId 
        if(props.user.userData && props.user.userData.cart){
            props.user.userData.cart.forEach(item=>{
                cartItems.push(item.id)
            })

            dispatch(getCartItems(cartItems, props.user.userData.cart));
        }
    }, [props.user.userData])

    useEffect(() => {

        if (props.user.cartDetail && props.user.cartDetail.length > 0) {
            calculateTotal(props.user.cartDetail)
        }


    }, [props.user.cartDetail])

    const calculateTotal = (cartDetail) => {
        let total = 0;
        console.log(cartDetail);
        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        setTotal(total)
        setShowTotal(true)
    }

    const removeFromCart = (productId)=>{
        console.log(productId);
        dispatch(removeCartItem(productId))
        .then(()=>{
            Axios.get('/api/users/userCartInfo')
            .then(response => {
                if (response.data.success) {
                    if (response.data.cartDetail.length <= 0) {
                        setShowTotal(false)
                    } else {
                        // console.log(response.data.cartDetail);
                        calculateTotal(response.data.cartDetail)
                    }
                } else {
                    alert('Failed to get cart info')
                }
            })
        })
    }
    
    const transactionSuccess = (data) => {

        let variables = {
            cartDetail: props.user.cartDetail, paymentData: data
        }

        Axios.post('/api/users/successBuy', variables)
            .then(response => {
                if (response.data.success) {
                    setShowSuccess(true)
                    setShowTotal(false)

                    dispatch(onSuccessBuy({
                        cart: response.data.cart,
                        cartDetail: response.data.cartDetail
                    }))

                } else {
                    alert('Failed to buy it')
                }
            })

    }

    const transactionError = () => {
        console.log('Paypal error')
    }

    const transactionCanceled = () => {
        console.log('Transaction canceled')
    }
    return (
        <div style={{ width: '85%', padding: '2rem 4rem'}}>
            <UserCardBlock 
                products={props.user.cartDetail}
                removeItem={removeFromCart}
            />

            {ShowTotal ? 
                <div style={{ marginTop: '3rem' }}>
                <h2>Total amount: {Total} </h2>
            </div>
            : ShowSuccess ? 
                <Result
                status="success"
                title="Successfully Purchased Items"
                /> : 
                <div style={{
                    width: '100%', display: 'flex', flexDirection: 'column',
                    justifyContent: 'center'
            }}>
                <br />
                <Empty description={false} />
                <p>No Items In the Cart</p>

            </div>
        }

            {/* Paypal button */}
            {
                ShowTotal && 
                <Paypal
                    toPay={Total}
                    onSuccess={transactionSuccess}
                    transactionError={transactionError}
                    transactionCanceled={transactionCanceled}
                />
            }

        </div>
    )
}

export default CartPage
