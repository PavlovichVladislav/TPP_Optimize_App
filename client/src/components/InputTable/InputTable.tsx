import { FC, useState, ChangeEvent } from "react";
import styles from "./table.module.css";
import { Button } from "@skbkontur/react-ui";

interface Props {
   onSubmit: (number: number[]) => void;
   size?: number;
   value?: number[];
}

export const InputTable: FC<Props> = ({ onSubmit, size = 12, value }) => {
   const [values, setValues] = useState(value || new Array(size).fill(""));

   const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
      const newValues = [...values];
      newValues[index] = +event.target.value;
      setValues(newValues);
   };

   const handleSubmit = () => {
      const values = new Array(size).fill(27);

      onSubmit(values);
   };

   return (
      <div className={styles.tableWrapper}>
         <table className={styles.table}>
            <thead className={styles.header}>
               <tr className={styles.row}>
                  {[...Array(size / 2).keys()].map((index) => (
                     <th key={index}>dd.0{index + 1}.yy</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               <tr className={styles.row}>
                  {values.map((value, index) => {
                     if (index > size / 2 - 1) return null;

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
                  {[...Array(size).keys()].map((index) => {
                     if (index < size / 2) return null;

                     return <th key={index}>dd.0{index + 1}.yy</th>;
                  })}
               </tr>
            </thead>
            <tbody>
               <tr className={styles.row}>
                  {values.map((value, index) => {
                     if (index < size / 2) return null;

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
         <div className={styles.btnWrapper}>
            <Button className={styles.btn} use="primary" size="medium" onClick={handleSubmit}>
               Подтвердить
            </Button>
         </div>
      </div>
   );
};
