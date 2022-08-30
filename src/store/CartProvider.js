import {CardContext} from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items:[],
    totalAmount:0
}

const cartReducer = (state,action)=>{
    
    if(action.type === 'ADD ITEMS'){
        
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount)

        const existingCartIndex = state.items.findIndex(item=> item.id === action.item.id)

        const existingCartItem = state.items[existingCartIndex]

        
        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount:existingCartItem.amount + action.item.amount 
            }

            updatedItems = [...state.items]
            updatedItems[existingCartIndex] = updatedItem;
        }else{
             updatedItems = state.items.concat(action.item)
        }

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }else if(action.type === 'REMOVE ITEMS'){
        const existingCartIndex = state.items.findIndex(item=> item.id === action.id)

        const existingCartItem = state.items[existingCartIndex]
        const updatedTotalAmount = state.totalAmount - existingCartItem.price
        let updatedItems;
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id)
        }else{
            const updatedItem = {...existingCartItem,amount:existingCartItem.amount - 1}
            console.log(existingCartItem)
            updatedItems = [...state.items]
            updatedItems[existingCartIndex] = updatedItem
        }
        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }else if(action.type === 'CLEAR'){
        return defaultCartState
    }
    return defaultCartState;
}

function CartProvider(props){

    const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCartState)

    const addItemHandler = (item)=>{
        dispatchCartAction({type:'ADD ITEMS',item:item})
    }
    const removeItemHandler = (id)=>{
        dispatchCartAction({type:'REMOVE ITEMS',id:id})
    }

    const clearCartHandler = () =>{
        dispatchCartAction({type:'CLEAR'})
    }
    
    const values = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemHandler,
        removeItem:removeItemHandler,
        clearCart:clearCartHandler
    }

    
    return (
        <CardContext.Provider value={values}>
            {props.children}
        </CardContext.Provider>
    )
}

export default CartProvider;