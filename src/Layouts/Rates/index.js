import {useState, useEffect} from 'react';

import RatesList from '@Components/Rates'

import axios from '@Axios';

import classes from './Rates.module.css';

const Rates = () => {
  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRates = async () => {
    setIsLoading(true);
    const response = await axios.get('rates');
    const rates = response.data.rates;
    setRates(rates);
    setIsLoading(false);
  };

  useEffect(() => {
    getRates();
  },[]);

  return (
    <section className={classes.Section}>
      <div className="container">
          <h1 className={classes.Title}>Rates:</h1>
          {
            isLoading ?
            null:
            <RatesList rates={rates}/>
          }
      </div>
    </section>
  );
};

export default Rates;
