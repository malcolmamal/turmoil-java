import Sequelize from 'sequelize'
import {sequelize} from "../database.js";

// https://sequelize.org/master/manual/model-basics.html
// DataTypes 

export const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
