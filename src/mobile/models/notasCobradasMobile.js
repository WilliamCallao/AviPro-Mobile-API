const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const NotasCobradasMobile = sequelize.define('NotasCobradasMobile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  empresa_id: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  sucursal_id: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  cuenta: {
    type: DataTypes.CHAR(15),
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  referencia: {
    type: DataTypes.CHAR(9),
    allowNull: true
  },
  pago_a_nota: {
    type: DataTypes.CHAR(15),
    allowNull: false
  },
  monto: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  moneda: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    validate: {
      isIn: [['B', 'U']]
    }
  },
  modo_pago: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    validate: {
      isIn: [['E', 'B', 'D']]
    }
  },
  cta_deposito: {
    type: DataTypes.CHAR(15),
    allowNull: false
  },
  observaciones: {
    type: DataTypes.CHAR(45),
    allowNull: true
  },
  nro_factura: {
    type: DataTypes.DECIMAL(15, 0),
    allowNull: true
  },
  cobrador_id: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  fecha_registro: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'mobile_notas_cobradas',
  timestamps: false
});

module.exports = NotasCobradasMobile;
