import { DataTypes, Sequelize } from "sequelize";
import isEmail, {body, validationResult} from "express-validator";
import dotenv from "dotenv"
dotenv.config()
const sequelize = new Sequelize(process.env.DBNAME,process.env.USERDB,process.env.PASSWORDDB,{
    host: process.env.HOSTDB ,
    dialect: 'mysql',
    
    timezone: 'Asia/Bangkok',
})

const Ck = sequelize.define('Ck', {
    IDCK: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg:  'Email is incorrect format',
            },
        },
    }
},
{
    tableName: 'ck',
    timestamps: false
})
Ck.associations = (models) => {
    User.hasMany(models.User,{ foreignKey: 'IDCK'})
    
}


export default Ck