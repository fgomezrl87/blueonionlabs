import { Sequelize } from 'sequelize';

const db = new Sequelize('postgres', 'postgres', 'BluePassword123*', {
    host: 'localhost',
    dialect: 'postgres'
});

export default db; 