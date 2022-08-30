import classes from './InputArea.module.css'
import React from 'react';

const InputArea = React.forwardRef((props,ref)=>{
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input}/>
        </div>
        
    )
})

export default InputArea;