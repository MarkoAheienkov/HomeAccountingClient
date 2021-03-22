import {AiFillPlusCircle} from 'react-icons/ai';
import TableRow from './TableRow';

import classes from './RecordTable.module.css';

const RecordTable = ({addRecord, records}) => {
  return (
    <section className={classes.Section}>
      <table className={classes.Table}>
      <thead className={classes.THead}>
        <tr className={classes.TableRow}>
          <th className={classes.Th}>Title</th>
          <th className={classes.Th}>Description</th>
          <th className={classes.Th}>Amount</th>
          <th className={classes.Th}>Belongs</th>
          <th className={classes.Th}>Type</th>
        </tr>
      </thead>
      <tbody className={classes.TBody}>
        {records.map((record) => {
          return <TableRow key={record._id} {...record}/>
        })}
      </tbody>

    </table>
    <AiFillPlusCircle size={24} onClick={addRecord} className={classes.Add}/>
    </section>
  );
};

export default RecordTable;
