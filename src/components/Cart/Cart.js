import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import {useContext, useState} from 'react'
import {CardContext} from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'
import React from 'react'

function Cart(props){

    const ctx = useContext(CardContext);

    const [isCheckOut,setIsCheckout] = useState(false)
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [didSubmit,setDidSubmit] = useState(false)

    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`

    const cartRemoveHandler = (id)=>{
        ctx.removeItem(id);
    }

    const cartAddHander = (item)=>{
        ctx.addItem(item)
    }

    const orderHandler = ()=>{
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData)=>{
        setIsSubmitting(true)
        await fetch('https://react-start-pro-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems:ctx.items
            })
        })
        setIsSubmitting(false);
        setDidSubmit(true);
        ctx.clearCart();
    }
    const hasItems = ctx.items.length > 0;
    const cartItems = <ul>{
            ctx.items.map((item)=>{
                return <CartItem key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartRemoveHandler.bind(null,item.id)}
                onAdd={cartAddHander.bind(null,item)}/>
            })
        }
        </ul>

        const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const modalContent = <React.Fragment>
        {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>

            </div>
            {isCheckOut && <Checkout onSubmit={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckOut && modalActions}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending data....</p>

    const didSubmitModalContent = <p>Order placed successfully.You will be contactd soon</p>

    return (
        <Modal onClose={props.onHideCart}>
            {isSubmitting && didSubmit && isSubmittingModalContent}
            {!isSubmitting && modalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;