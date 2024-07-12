// src/desktop/controllers/logsController.js
const LogsDesktop = require('../models/logsDesktop');
const moment = require('moment-timezone');

// Obtener todos los logs
const getLogs = async (req, res) => {
    try {
        const logs = await LogsDesktop.findAll();
        res.json(logs);
    } catch (error) {
        res.status(500).send('Error al obtener los logs');
    }
};

// Agregar un nuevo log
const addLog = async (req, res) => {
    const { codigo_id, registro, empresa_id, cobrador_id, success, detalle } = req.body;
    try {
        const newLog = await LogsDesktop.create({ codigo_id, registro, empresa_id, cobrador_id, success, detalle });
        res.status(201).json(newLog);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el nuevo log');
    }
};

module.exports = {
    getLogs,
    addLog
}