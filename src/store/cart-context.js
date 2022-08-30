import React from "react";

export const CardContext = React.createContext({
    items:[],
    totalAmount:0,
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{}
})
