import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

  function AvailableMeals(props){

    const [meals,setMeals] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    const [httpError,setHttpError] = useState();

    useEffect(()=>{

      const fetchMeals = async ()=>{
        const response = await fetch('https://react-start-pro-default-rtdb.firebaseio.com/meals.json');

        if(!response.ok){
          throw new Error('Something went wrong!!!!')
        }

        const responseData = await response.json()
        const loadedMeals = []
        for(const key in responseData){
          loadedMeals.push({
            id:key,
            name:responseData[key].name,
            description:responseData[key].description,
            price:responseData[key].price
          })
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      }

      
      
        fetchMeals().catch(err=>{
          setIsLoading(false);
          setHttpError(err.message);
        });
      
      
      
    },[])

    if(isLoading){
      return (
        <div className={classes.loadingWrapper}><div className={classes.loading}></div></div>
        
      )
    }

    if(httpError){
      return (
        <div className={classes.errorMessage}>
          <span className={classes.errorText}>{httpError}</span>
        </div>
      )
    }

    const menuList = meals.map(ele=>{
    return <MealItem key={ele.id}
            id={ele.id}
            name={ele.name}
            description={ele.description}
            price={ele.price} />
  })

    return (
      <section className={classes.meals}>
        <Card>
          <ul>
            {menuList}
          </ul>
        </Card>
        
      </section>
      
    )
  }

  export default AvailableMeals;