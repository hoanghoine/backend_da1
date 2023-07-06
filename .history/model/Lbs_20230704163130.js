import { DataTypes, Sequelize } from "sequelize";
import isEmail, {body, validationResult} from "express-validator";
import moment from "moment-timezone";
import dotenv from "dotenv"
dotenv.config()

const sequelize = new Sequelize(process.env.DBNAME,process.env.USERDB,process.env.PASSWORDDB,{
    host: process.env.HOSTDB,
    dialect: 'mysql',
    
      timezone: 'Asia/Bangkok', // Đặt múi giờ ở đây
})
const Lbs = sequelize.define('Lbs', {
    IDL: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    IDUBS: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IDP: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isCancel:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
},
{
    tableName: 'lbs',
    timestamps: false
})
Lbs.associations = (models) =>{ 
    Lbs.belongsTo(models.User, {foreignKey: 'IDU'})
    Lbs.belongsTo(models.Pdl, {foreignKey: 'IDP'})

}

export default Lbs