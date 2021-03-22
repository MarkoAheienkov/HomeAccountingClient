import {Link} from 'react-router-dom';

import Slider from '@Components/UI/Slider';
import Slide from './Slide';

import classes from './Header.module.css';

const HomeHeader = () => {
  const sliderItems = [
    <a className={classes.Link} href="#about-us">
      <Slide title={'About Us'} text="We are very cool company. Click here to get more info."/>
    </a>,
    <a className={classes.Link} href="#about-web">
      <Slide title={'About Our WebSite'} text="It is very cool website. Click here to get more info." />
    </a>,
    <Link className={classes.Link}  to='/auth/sign-up'>
      <Slide title={'Sign Up'} text="Join us. Click here to go to sign up form." />
    </Link>
  ];
  return (
    <header className={classes.Header}>
      <Slider items={sliderItems}/>
    </header>
  );
};

export default HomeHeader;
