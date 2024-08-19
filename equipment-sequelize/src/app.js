const config_data = require('./config.json')

// Our api endpoints

const { Sequelize } = require('sequelize');
const express = require('express');

const equipment = require('./equipment.js');
const EquipmentRoutes = require('./routes/equipment.js');

const PORT = config_data.port;
const app = express();
const sequelize = new Sequelize('sqlite::memory');

function appendSequelize(req, res, next) {
    req.sequelize = sequelize;
    next();
}

//This attach sequelize to all req objects that are assigned
app.use(appendSequelize);
app.use(express.json());

// This initialises the ORM tracking and instance for sequelize
// for equipment type
equipment.ORMInit(sequelize)

//We then use EquipmentRoutes which is routes/equipment.js
// and register the routes within app.js
EquipmentRoutes.RegisterRoutes(app);


app.listen(PORT, (req, res) => {
    console.log('Currently listening on port ' + PORT);
})