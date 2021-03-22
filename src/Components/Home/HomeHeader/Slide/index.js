import classes from './Slide.module.css';

const Slide = ({title, text}) => {
  return (
    <section className={classes.Slide}>
      <div className={classes.Info + ' container'}>
        <h2 className={classes.Title}>{title}</h2>
        <p className={classes.Text}>{text}</p>
      </div>
    </section>
  );
};

export default Slide;
