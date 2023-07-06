import { DataTypes, Sequelize } from "sequelize";
import isEmail, {body, validationResult} from "express-validator";
import moment from "moment-timezone";

const sequelize = new Sequelize(process.env.DBNAME,process.env.USERDB,process.env.PASSWORDDB,{
    host: process.env.HOSTDB,
    dialect: 'mysql',
    
    timezone: 'Asia/Bangkok',
})

const User = sequelize.define('User', {
    IDU: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    ho_ten: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ntns: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    gioi_tinh: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sdt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    so_BHYT: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dia_chi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false

    },
    IDCK: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    username: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg:  'Email is incorrect format',
            },
        },

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false

    },
    refreshToken: {
        type: DataTypes.STRING,
    },
    work_room: {
        type: DataTypes.STRING
    }

},

{
    tableName: 'user',
    timestamps: false
});
User.associations = (models) => {
    User.hasMany(models.Pdl,{ foreignKey: 'IDU'})
    User.hasMany(models.Ck, {foreignKey: 'IDU'})
    User.hasMany(models.Lbs,{foreignKey: 'IDU'})
    User.belongsTo(models.Ck, {foreignKey: 'IDCK'})

}


export default User