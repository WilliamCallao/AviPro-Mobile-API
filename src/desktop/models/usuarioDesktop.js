// usuarioDesktop 
const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const UsuarioDesktop = sequelize.define('UsuarioDesktop', {
    usuario_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.CHAR(70),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'desktop_usuarios',
    timestamps: false
});

module.exports = UsuarioDesktop;
