import { FC } from "react";
import styles from "./resultTable.module.css";

interface Props {
   column1: number[];
   column2: number[];
}

const ResultTable: FC<Props> = ({ column1, column2 }) => {
   return (
      <div className={styles.tableWrapper}>
         <table className={styles.table}>
            <thead className={styles.header}>
               <tr className={styles.row}>
                  <th></th>
                  <th>Column 2</th>
                  <th>Column 3</th>
               </tr>
            </thead>
            <tbody>
               {column1.map((item, index) => (
                  <tr key={index} className={styles.row}>
                     <td  className={styles.cell}>{index + 1}</td>
                     <td className={styles.cell}>{item}</td>
                     <td className={styles.cell}>{column2[index]}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default ResultTable;
