import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {BsPlusCircle} from 'react-icons/bs';
import {Link} from 'react-router-dom';

import axios from '@Axios';

import Groups from '@Components/Groups';
import Card from '@Components/UI/Card';

import classes from './Groups.module.css';

const GroupsPage = () => {
  const webToken = useSelector((state) => state.webToken);
  const [groupsList, setGroupsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getGroupsList = async () => {
    setIsLoading(true);
    const response = await axios.get('groups',{
      params: {
        _token: webToken,
      },
    });
    const {data} = response;
    const groupsList = data.groupsList.map((group) => ({...group, path: `groups/${group._id}`}));
    setGroupsList(groupsList);
    setIsLoading(false);
  };

  useEffect(()=>{
    getGroupsList();
  }, []);

  return (
    <section className={classes.GroupsPage}>
      <div className="container">
        <h1>List of your Groups</h1>
        <div className={classes.Groups}>
          {isLoading? null:<Groups groupsList={groupsList}/>}
          <Card>
            <Link to="/groups/create">
              <div className={classes.AddGroup}>
                <BsPlusCircle size={64} className={classes.Add}/>
              </div>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GroupsPage;
