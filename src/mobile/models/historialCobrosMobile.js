const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const HistorialCobros = sequelize.define('HistorialCobros', {
    empresa_id: {
        type: DataTypes.CHAR(3),
        allowNull: false,
    },
    cobrador_id: {
        type: DataTypes.CHAR(2),
        allowNull: false,
    },
    cuenta: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    nombre_cliente: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    monto: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    accion: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    pago_a_nota: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    id_notaCobrada: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'mobile_historial_cobros'
});

module.exports = HistorialCobros;
