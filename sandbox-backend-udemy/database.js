import mysql from 'mysql2';
import Sequelize from 'sequelize'

// https://sequelize.org/master/manual/model-basics.html

export const sequelize = new Sequelize('turmoil', 'root', 'nopass', {
    dialect: 'mysql',
    host: 'localhost',
    dialectOptions: {
        // Your mysql2 options here
    }
});

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'turmoil',
    password: 'nopass'
});