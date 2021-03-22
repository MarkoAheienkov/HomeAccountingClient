import classes from './Card.module.css';

const Card = ({children}) => {
  return (
    <section className={classes.Card}>
      {children}
    </section>
  );
};

export default Card;
