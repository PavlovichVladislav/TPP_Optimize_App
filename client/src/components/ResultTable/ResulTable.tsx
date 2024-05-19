import { FC } from "react";
import styles from "./resultTable.module.css";

interface Props {
   column1: number[];
   column2: number[];
}

const rowNames = [
   'Nопт, МВт',
   'Эопт, МВТ*ч',
   'Цена продажи, руб/МВТ*ч',
   'Доход, руб',
   'Прибыль, руб'
]

const ResultTable: FC<Props> = ({ column1, column2 }) => {
   return (
      <div className={styles.tableWrapper}>
         <table className={styles.table}>
            <thead className={styles.header}>
               <tr className={styles.row}>
                  <th>Норма прибыли</th>
                  <th>0 %</th>
                  <th>25 %</th>
               </tr>
            </thead>
            <tbody>
               {column1.map((item, index) => (
                  <tr key={index} className={styles.row}>
                     <td  className={styles.cell}>{rowNames[index]}</td>
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
