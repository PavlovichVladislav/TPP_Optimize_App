import { FC } from "react";

interface Props {
    firstRow: number[]
    secondRow: number[]
}

export const Table: FC<Props> = ({ firstRow, secondRow }) => {
    return (
        <table>
        <thead>
            <tr>
            <th>b</th>
            {firstRow.map((item, index) => (
                <th key={index}>{item}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            <tr>
            <th>Q</th>
            {secondRow.map((item, index) => (
                <td key={index}>{item}</td>
            ))}
            </tr>
        </tbody>
        </table>
    );
};
  