import { useRef,useState } from 'react'
import classes from './Checkout.module.css'

const Checkout = props =>{

    const isEmpty = val => val.trim() === ''
    const isFiveChars = val => val.trim().length === 5

    const [formInputValidity,setFormInputValidity] = useState({
        name:true,
        street:true,
        city:true,
        postalCode:true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const submitHandler = (event)=>{
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredPostalCodeIsValid  = !isEmpty(enteredPostalCode) && isFiveChars(enteredPostalCode)

        setFormInputValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            city:enteredCityIsValid,
            postalCode:enteredPostalCodeIsValid
        })

        const formIsValid = enteredNameIsValid && 
                            enteredCityIsValid && 
                            enteredPostalCodeIsValid && 
                            enteredStreetIsValid

        if(!formIsValid){
            return null;
        }

        props.onSubmit({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postalCode:enteredPostalCode
        })
}

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={`${classes.control} ${formInputValidity.name ? '':classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputValidity.name && <p>Please enter valid name</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.street ? '':classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputValidity.street && <p>Please enter valid street</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.postalCode ? '':classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef}/>
                {!formInputValidity.postalCode && <p>Please enter valid postal code</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.city ? '':classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!formInputValidity.city && <p>Please enter valid city name</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button>Confirm</button>
            </div>
            
        </form>
    )
}

export default Checkout;