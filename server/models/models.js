const sequelize = require('../db')

const { DataTypes } = require('sequelize')

// Котёл
const Boiler = sequelize.define('boiler', {
    ['station_number']: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    mark: {type: DataTypes.STRING},
    ['heat_performance']: {type: DataTypes.INTEGER},
    ['starts_number']: {type: DataTypes.INTEGER}
})

// Хоп котла 
const BoilerCRFG = sequelize.define('boiler_crfg', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ['boiler_mark']: {type: DataTypes.STRING},
    ['b_values']: {type: DataTypes.ARRAY(DataTypes.FLOAT)},
    ['Q_values']: {type: DataTypes.ARRAY(DataTypes.FLOAT)}
})

// Турбина
const Turbine = sequelize.define('turbine', {
    ['station_number']: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    mark: {type: DataTypes.STRING},
    ['electricity_power']: {type: DataTypes.INTEGER},
    ['thermal_power']: {type: DataTypes.INTEGER},
    ['power_generation']: {type: DataTypes.INTEGER}
})

// Годовой план станции
const TppYearTask = sequelize.define('tpp_year_task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    mark: {type: DataTypes.STRING},
    station: {type: DataTypes.STRING},
    year: {type: DataTypes.INTEGER},
    output_power: {type: DataTypes.ARRAY(DataTypes.INTEGER)},
    hear_performance: {type: DataTypes.ARRAY(DataTypes.INTEGER)}
})

Boiler.hasMany(BoilerCRFG)
BoilerCRFG.belongsTo(Boiler)

module.exports = {
    Boiler,
    BoilerCRFG,
    Turbine,
    TppYearTask
}