import Rate from './Rate';

const Rates = ({rates}) => {
  return rates.map((rate) => {
    return <Rate key={rate._id} {...rate}/>;
  });
};

export default Rates;
