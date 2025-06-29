import { Sequelize } from "sequelize";

const DB_NAME = 'Assi8';
const DB_USER = 'root';
const DB_PASSWORD = '';
const DB_HOST = 'localhost';
const DB_DIALECT = 'mysql';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connection has been establish successfully');
    } catch (error) {
        console.error('Unable to connect to the database: ', error.message);
    }
}

testConnection()

export default sequelize;