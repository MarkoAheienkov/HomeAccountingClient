import HomeHeader from '@Components/Home/HomeHeader';
import Section from '@Components/Home/Section';

const Home = () => {
  return (
    <>
      <HomeHeader/>
      <Section title={'About us'} text={
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero dolorum vel, perferendis quae distinctio asperiores ut illo cumque sed natus totam doloribus, eos quibusdam unde ipsum laudantium sapiente. Qui laborum a et omnis sunt, quo ab illum, nam provident fugiat consequatur. Impedit quaerat veniam autem libero quae, neque eum cumque voluptas voluptatem nemo ipsam quasi optio sit odit asperiores! Aliquid quasi praesentium nobis sint quaerat delectus dicta architecto quae fuga iste eius quos incidunt, quisquam numquam placeat ad corrupti tenetur ratione id. Dicta molestias fugit, officiis animi vel consectetur distinctio placeat, quis dolores minima itaque eius asperiores! Laboriosam, itaque nam!'
      } id='about-us'/>

      <Section title={'About Our Website'} text={
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero dolorum vel, perferendis quae distinctio asperiores ut illo cumque sed natus totam doloribus, eos quibusdam unde ipsum laudantium sapiente. Qui laborum a et omnis sunt, quo ab illum, nam provident fugiat consequatur. Impedit quaerat veniam autem libero quae, neque eum cumque voluptas voluptatem nemo ipsam quasi optio sit odit asperiores! Aliquid quasi praesentium nobis sint quaerat delectus dicta architecto quae fuga iste eius quos incidunt, quisquam numquam placeat ad corrupti tenetur ratione id. Dicta molestias fugit, officiis animi vel consectetur distinctio placeat, quis dolores minima itaque eius asperiores! Laboriosam, itaque nam!'
      } id='about-web' isBackgroundDark/>
    </>
  );
};

export default Home;
