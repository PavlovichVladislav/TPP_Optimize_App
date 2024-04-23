import { FC } from "react";
import { Boiler } from "../OptimalEquipment/OptimalEquipment";
import { BoilerIcon } from "./BoilerIcon";
import styles from './boilerCard.module.css';

interface Props {
    boiler: Boiler
}

export const EquipmentCard: FC<Props> = ({boiler}) => {
    const { station_number, heat_performance, mark, starts_number } = boiler;

    return (
        <div className={styles.cardWrapper}>
            <BoilerIcon/>
            <div>
                <div className={styles.cardHeader}>
                    <h3>Котёл. Станционный номер:{station_number}</h3>
                    <button>Добавить</button>
                </div>
                <div>Марка котла: {mark}</div>
                <div>Номинальная макисмальная производительность: {heat_performance} т/ч</div>
                <div>Число запусков с начала эксплуатации {starts_number}</div>
            </div>

        </div>
    );
};
