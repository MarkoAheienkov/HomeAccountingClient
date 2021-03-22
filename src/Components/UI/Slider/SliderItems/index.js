import SliderItem from './SliderItem';

const SliderItems = ({sliderItems}) => {
  return sliderItems.map(({content, side}, idx) => {
    return <SliderItem side={side} key={idx}>{content}</SliderItem>;
  });
};

export default SliderItems;
