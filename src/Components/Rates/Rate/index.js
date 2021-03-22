import classes from './Rate.module.css'

const Rate = ({title, text, mark, creator}) => {
  return (
    <section className={classes.Rate}>
      <h2 className={classes.Author}>{creator.username}({creator.email})</h2>
      <h2 className={classes.Title}>{title}</h2>
      <p className={classes.Text}>{text}</p>
      <p className={classes.Mark}>{mark} / 5</p>
    </section>
  );
};

export default Rate;
