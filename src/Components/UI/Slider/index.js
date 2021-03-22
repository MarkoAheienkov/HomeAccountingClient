import {useState, useEffect} from 'react';

import SliderItems from './SliderItems';

import classes from './Slider.module.css';

const setSides = (current, items) => {
  return items.map((item, idx, items) => {
    return {...item, side: getSide(current, idx, items)}
  });
}

const getSide = (current, idx, items) => {
  let side = '';
  if (current < idx || current - 1 > idx) {
    side = 'right';
  }
  if (current - 1 === idx || (current === 0 && items.length - 1 === idx)) {
    side = 'left';
  }
  return side;
}

const transformItem = (current, content, idx, items) => {
  return {
    content: content,
    side: getSide(current, idx, items)
  };
};

const Slider = ({items, delay = 2000}) => {
  const [current, setCurrent] = useState(0);
  const [sliderItems, setSliderItems] = useState(items.map(transformItem.bind(items, current)));

  useEffect(() => {
    const intervalId = setInterval(() => {
      slideToRight();
    }, delay);
    return () => {
      clearInterval(intervalId);
    };
  });

  const slideToRight = () => {
    let newCurrent;
    if (current === items.length - 1) {
      newCurrent = 0;
      setCurrent(newCurrent);
      setSliderItems(setSides(newCurrent, sliderItems));
    }
    else {
      newCurrent = current + 1;
      setCurrent(newCurrent);
      setSliderItems(setSides(newCurrent, sliderItems));
    }
  };


  return (
    <div className={classes.Slider}>
      <SliderItems sliderItems={sliderItems}/>
    </div>
  );
};

export default Slider;
