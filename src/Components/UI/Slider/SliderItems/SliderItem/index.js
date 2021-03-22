import classes from './SliderItem.module.css';

const SliderItem = ({children, side}) => {
  const sliderItemClasses = [classes.SliderItem];
  switch(side) {
    case('left'):
      sliderItemClasses.push(classes.Left);
      break;
    case('right'):
      sliderItemClasses.push(classes.Right);
      break;
    default:
  }
  return (
    <div className={sliderItemClasses.join(' ')}>{children}</div>
  );
};

export default SliderItem;
