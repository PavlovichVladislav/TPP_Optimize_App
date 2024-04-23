import { useEffect, useState } from 'react';
import styles from './optimalEquipment.module.css';
import OptimizeApi from '../../Api/OptimizeApi';
import { EquipmentCard } from '../EquipmentCard/EquipmentCard';

export interface Boiler {
    station_number: number;
    mark: string;
    heat_performance: number;
    starts_number: number;
}

export const OptimalEquipment = () => {
    const [boilers, setBoilers] = useState<Boiler[]>([]);
    const optimizeApi = new OptimizeApi();

    const getEquipment = async () => {
        const boilers = await optimizeApi.getEquipment();
        setBoilers(boilers);
    }

    useEffect(() => {
        getEquipment();
    }, [])

    return (
        <section className={styles.optimalEquipment}>
            <h2>Оптимальный состав оборудования</h2>
            {boilers.map(boiler => <EquipmentCard boiler={boiler} />)}
        </section>
    );
};
