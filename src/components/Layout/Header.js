import classes from './Header.module.css'
import {Fragment} from 'react'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

function Header(props){


    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='A table full of delicious food'/>
            </div>
            
        </Fragment>
        
    )
}

export default Header;