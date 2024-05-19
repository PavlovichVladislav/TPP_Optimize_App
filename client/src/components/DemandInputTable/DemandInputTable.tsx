import React, { FC, useState } from "react";
import styles from "./DemandTable.module.css";
import { Button } from "@skbkontur/react-ui";

interface Props {
   size: number;
   onSubmit: (demand: number[], price: number[]) => void;
}

export const DemandInputTable: FC<Props> = ({ size, onSubmit }) => {
   const [tableData, setTableData] = useState(
      Array.from({ length: size }, () => ({ column1: "", column2: "" }))
   );

   const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      rowIndex: number,
      columnName: string
   ) => {
      const { value } = event.target;

      setTableData((prevTableData) => {
         const newData = [...prevTableData];
         newData[rowIndex] = { ...newData[rowIndex], [columnName]: value };
         return newData;
      });
   };

   const handleSubmit = () => {
      const pg: number[] = [];
      const price: number[] = [];

      tableData.forEach((row) => {
        pg.push(+row.column1);
        price.push(+row.column2);
      });

      onSubmit(pg, price);
   };

   return (
      <div className={styles.tableWrapper}>
         <table className={styles.table}>
            <thead className={styles.header}>
               <tr className={styles.row}>
                  <th>Объём <br/> электроэнергии</th>
                  <th>Стоимость</th>
               </tr>
            </thead>
            <tbody>
               {tableData.map((row, index) => (
                  <tr key={index} className={styles.row}>
                     <td className={styles.cell}>
                        <input
                           className={styles.input}
                           type="text"
                           value={row.column1}
                           onChange={(e) => handleInputChange(e, index, "column1")}
                        />
                     </td>
                     <td className={styles.cell}>
                        <input
                           className={styles.input}
                           type="text"
                           value={row.column2}
                           onChange={(e) => handleInputChange(e, index, "column2")}
                        />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <Button use="primary" size="medium" onClick={handleSubmit}>
            Подтвердить
         </Button>
      </div>
   );
};
