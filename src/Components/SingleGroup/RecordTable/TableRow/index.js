import classes from './TableRow.module.css';

const TableRow = ({creator, title, description, amount, type}) => {
  return (
    <tr className={classes.TableRow}>
      <td className={classes.Td}>{title}</td>
      <td className={classes.Td}>{description}</td>
      <td className={classes.Td}>{amount}</td>
      <td className={classes.Td}>{creator.username}</td>
      <td className={classes.Td}>{type}</td>
    </tr>
  );
};

export default TableRow;
