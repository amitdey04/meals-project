import classes from './MealItemForm.module.css'
import InputArea from './InputArea'
import { useRef, useState } from 'react'

function MealItemForm(props){

    const [amountIsValid,setAmountIsValid] = useState(true)

    const amountInputRef = useRef();

    const submitHandler = (event)=>{
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = parseInt(enteredAmount)

        if(enteredAmount.trim().length === 0 ||
        enteredAmountNumber <1  ||
        enteredAmount > 5){
            return setAmountIsValid(false);
        }
        props.onAddToCart(enteredAmountNumber)
    }

    
    return (
        
        <form className={classes.form} onSubmit={submitHandler}>
            <InputArea 
            label='Amount'
            ref={amountInputRef}
            input={{
                
                id:'amount_'+props.id,
                type:'number',
                min:'1',
                max:'10',
                step:'1',
                defaultValue:'1'
            }}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter amount between (1-5)</p>}
        </form>
        
    )
}

export default MealItemForm;