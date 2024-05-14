import { FC } from "react";
import styles from "./table.module.css";

interface Props {
   title: string;
   firstRow: number[];
   secondRow: number[];
}

export const Table: FC<Props> = ({ title, firstRow, secondRow }) => {
   return (
      <div className={styles.tableWrapper}>
        <h3>{title}</h3>
         <table className={styles.table}>
            <thead className={styles.header}>
               <tr className={styles.row}>
                  <th className={styles.th}>b</th>
                  {firstRow.map((item, index) => (
                     <th className={styles.cell} key={index}>
                        {item}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               <tr className={styles.row}>
                  <th className={styles.th}>Q</th>
                  {secondRow.map((item, index) => (
                     <td className={styles.cell} key={index}>
                        {item}
                     </td>
                  ))}
               </tr>
            </tbody>
         </table>
      </div>
   );
};
