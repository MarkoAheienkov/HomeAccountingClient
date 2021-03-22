import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import Home from '@Layouts/Home';
import SignUp from '@Layouts/SignUp';
import SignIn from '@Layouts/SignIn';
import Groups from '@Layouts/Groups';
import Rate from '@Layouts/Rate';
import Rates from '@Layouts/Rates';
import GroupCreate from '@Layouts/GroupCreate';
import SingleGroup from '@Layouts/SingleGroup';

import SideBar from '@Components/SideBar';
import Backdrop from '@Components/UI/Backdrop';
import Header from '@Components/Header';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBackdropShowing, setIsBackdropShowing] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const isAuth = useSelector((state) => state.isAuth);

  const backdropClick = () => {
    setIsSidebarOpen(false);
    setIsBackdropShowing(false);
  };

  const toggleClick = () => {
    setIsSidebarOpen(true);
    setIsBackdropShowing(true);
  };

  const scrollHandler = () => {
    if (window.pageYOffset > 0) {
      setIsHeaderSticky(true);
    } else {
      setIsHeaderSticky(false);
    }
  };

  const linkClick = () => {
    setIsSidebarOpen(false);
    setIsBackdropShowing(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  let routes = [
    <Route key={"/auth/sign-up"} path="/auth/sign-up" component={SignUp}/>,
    <Route key={"/auth/sign-in"} path="/auth/sign-in" component={SignIn}/>,
    <Route key={"/rates"} path="/rates" component={Rates}/>,
  ];

  if (isAuth) {
    routes = [
      <Route key={"/groups"} path="/groups" component={Groups} exact/>,
      <Route key={"/rate"} path="/rate" component={Rate}/>,
      <Route key={"/rates"} path="/rates" component={Rates}/>,
      <Route key={"/groups/create"} path="/groups/create" component={GroupCreate}/>,
      <Route key={"/groups/:id"} path="/groups/:id" component={SingleGroup}/>
    ]
  }

  return (
    <div className="App">
      <Header isSticky={isHeaderSticky} toggleClick={toggleClick}/>
      <SideBar linkClick={linkClick} isOpen={isSidebarOpen}/>
      <Backdrop click={backdropClick} isShowing={isBackdropShowing}/>

      <Switch>
        <Route path="/" exact component={Home}/>
        {routes}
        <Redirect to="/"/>
      </Switch>

    </div>
  );
};

export default App;
