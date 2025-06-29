import { DataTypes } from "sequelize";
import sequelize from "../DB/db.js";
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    role:{
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false
    },
    },{
        timestamps:true,
        paranoid: true,
        hooks:{
            beforeCreate: (user) =>{
                if(user.name.length <= 2){
                    throw new Error('Name must be greater than 2 characters ')
                }
            }
        }
    }
)


User.addHook('beforeBulkCreate', (user) =>{
    if (user.password.length <=6){
        throw new Error('Password must be longer than 6 characters');
    }
})

export default User;