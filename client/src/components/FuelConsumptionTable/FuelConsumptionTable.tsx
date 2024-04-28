import { FC, useState, ChangeEvent } from "react";
import styles from "./table.module.css";
import { Button } from "@skbkontur/react-ui";

interface Props {
   onSubmit: (number: number[]) => void;
}

export const FuelConsumptionTable: FC<Props> = ({ onSubmit }) => {
   const [values, setValues] = useState(Array(12).fill(""));

   const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
      const newValues = [...values];
      newValues[index] = event.target.value;
      setValues(newValues);
   };

   const handleSubmit = () => {
        const values = [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27];

      onSubmit(values);
   };

   return (
      <div className={styles.tableWrapper}>
         <table className={styles.table}>
            <thead className={styles.header}>
               <tr className={styles.row}>
                  {[...Array(6).keys()].map((index) => (
                     <th key={index}>dd.0{index + 1}.yy</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               <tr className={styles.row}>
                  {values.map((value, index) => {
                     if (index > 5) return null;

                     return (
                        <td className={styles.cell} key={index}>
                           <input
                              className={styles.input}
                              type="text"
                              value={value}
                              onChange={(e) => handleChange(index, e)}
                           />
                        </td>
                     );
                  })}
               </tr>
            </tbody>
         </table>
         <table className={styles.table}>
            <thead className={styles.header}>
               <tr className={styles.row}>
                  {[...Array(12).keys()].map((index) => {
                     if (index < 6) return null;

                     return <th key={index}>dd.0{index + 1}.yy</th>;
                  })}
               </tr>
            </thead>
            <tbody>
               <tr className={styles.row}>
                  {values.map((value, index) => {
                     if (index < 6) return null;

                     return (
                        <td className={styles.cell} key={index}>
                           <input
                              className={styles.input}
                              type="text"
                              value={value}
                              onChange={(e) => handleChange(index, e)}
                           />
                        </td>
                     );
                  })}
               </tr>
            </tbody>
         </table>
         <Button use="primary" size="medium" onClick={handleSubmit}>Подтвердить</Button>
      </div>
   );
};


