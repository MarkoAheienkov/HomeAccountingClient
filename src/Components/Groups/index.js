import Group from './Group';

const Groups = ({groupsList}) => {
  return groupsList.map((group) => {
    const {_id} = group;
    return <Group key={_id} {...group}/>;
  });
};

export default Groups;
