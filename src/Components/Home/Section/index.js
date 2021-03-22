import classes from './Section.module.css';

const Section = ({id, title, text, isBackgroundDark}) => {
  const sectionClasses = [classes.Section];
  if (isBackgroundDark) {
    sectionClasses.push(classes.Dark);
  }
  return (
    <section id={id} className={sectionClasses.join(' ')}>
      <div className="container">
        <h2 className={classes.Title}>{title}</h2>
        <p className={classes.Text}>{text}</p>
      </div>
    </section>
  );
};

export default Section;
