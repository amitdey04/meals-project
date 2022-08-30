import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import {CardContext} from '../../store/cart-context';
import { useContext,useEffect, useState } from 'react';

function HeaderCartButton(props){
    const [buttonHighlighted,setButtonHighlighted] = useState(false)
    const ctx = useContext(CardContext);

    const {items} = ctx
    //console.log(ctx)
    let numberOfItem = 0;
    if(ctx.items.length > 0){
        for(let item of items){
            numberOfItem = numberOfItem + item.amount
        }
    }

    

    const btnClass = `${classes.button} ${buttonHighlighted ? classes.bump:''}`

    useEffect(()=>{

        if(items.length === 0){
            return;
        }
        setButtonHighlighted(true);

        const timer = setTimeout(()=>{
            setButtonHighlighted(false)
        },300)

        return ()=>{
            clearTimeout(timer)
        }
    },[items])
    
    return (
        <button className={btnClass} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItem}</span>
        </button>
    )
}

export default HeaderCartButton;