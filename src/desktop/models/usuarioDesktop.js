// usuaruiDesktop 
const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const UsuarioDesktop = sequelize.define('UsuarioDesktop', {
    usuario_id: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.CHAR(70),
        allowNull: false
    },
    password: {
        type: DataTypes.CHAR(20),
        allowNull: false
    }
    }, {
    tableName: 'desktop_usuarios',
    timestamps: false
});

module.exports = UsuarioDesktop;