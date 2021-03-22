import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import axios from '@Axios';

import UserList from '@Components/SingleGroup/UserList';
import Chart from '@Components/SingleGroup/Chart';
import RecordTable from '@Components/SingleGroup/RecordTable';
import Modal from '@Components/UI/Modal';
import Backdrop from '@Components/UI/Backdrop';
import ModalAddUser from '@Components/SingleGroup/ModalAddUser';
import ModalAddRecord from '@Components/SingleGroup/ModalAddRecord';

import classes from './SingleGroup.module.css';

const SingleGroup = () => {
  const webToken = useSelector((state) => state.webToken);
  const [groupInfo, setGroupInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserModal, setIsAddUserModal] = useState(true);

  const {id} = useParams();

  const getGroupInfo = async (id) => {
    setIsLoading(true);
    if(!id) {
      return;
    }
    const response = await axios.get(`groups/${id}`, {
      params: {
        _token: webToken,
      },
    });
    const groupInfo = response.data;
    setGroupInfo(groupInfo);
    setIsLoading(false);
  };

  useEffect(() => {
    getGroupInfo(id);
  }, [id]);

  const addUser = () => {
    setIsModalOpen(true);
    setIsAddUserModal(true);
  };

  const addRecord = () => {
    setIsModalOpen(true);
    setIsAddUserModal(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSuccess = () => {
    getGroupInfo(id);
  };

  return (
    <section className={classes.Section}>
      <div className="container">
        {
          !isLoading ?
            <>
              <div className={classes.Grid}>
                <div className={classes.Info}>
                  <h1 className={classes.Title}>Group Title: {groupInfo.title}</h1>
                  <p className={classes.Description}>Group Description: {groupInfo.description}</p>
                  <p className={classes.Balance}>Balance: {groupInfo.balance}</p>
                  <Chart
                    startBalance={groupInfo.startBalance}
                    records={groupInfo.records}
                    groupCreationDate={groupInfo.creationDate}
                  />
                </div>
                <UserList addUser={addUser} users={groupInfo.members}/>
              </div>
              <RecordTable addRecord={addRecord} records={groupInfo.records}/>

            </>
          : null
        }
        <Modal isOpen={isModalOpen}>
                {
                  isAddUserModal ?
                  <ModalAddUser onSuccess={onSuccess} groupId={groupInfo._id} closeModal={closeModal}/>:
                  <ModalAddRecord onSuccess={onSuccess} groupId={groupInfo._id} closeModal={closeModal}/>
                }
        </Modal>
        <Backdrop click={closeModal} isShowing={isModalOpen}/>
      </div>
    </section>
  );
};

export default SingleGroup;
