const config_data = require('../config.json');
const fs = require('node:fs')
async function newEquipment(req, res) {
    const reqBody = req.body;

    const sequelize = req.sequelize;
   /* const equip = await sequelize.models.Equipment.create(
        reqBody, 
        { fields: ['name', 'partcode']}
    ); */

    let date = new Date();

    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + '-' + mm + '-' + yyyy;
    ///let createStream;
    const bulkequip = await sequelize.models.Equipment.bulkCreate([{ name: 'Printer', partcode: 'HP', date: date }, { name: 'Laptop', partcode: 'Acer', date: date }, { name: 'Mouse', partcode: 'Logitech', date: date }]);
    /*createStream = fs.createWriteStream(config_data.logdirectory + '/log_' + day + month + year + hours + minutes + secs + '.txt');
    createStream.write(date + " - Import all equipment");
    createStream.end();*/
    let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    fs.appendFile(config_data.logdirectory + '/log_' + date + '.txt', clientIp + " - " + date + " - Import all equipment\n", function (err) {
        if (err) throw err;
      });
    res.send(bulkequip);
}


async function getEquipment(req, res) {
    const id = parseInt(req.params.id);
    let date = new Date();

    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + '-' + mm + '-' + yyyy;
    if(id == undefined) {
        res.sendStatus(301);
        res.send({ errormsg: 'Invalid Id' });
    }

    const sequelize = req.sequelize;
    const equip = await sequelize.models.Equipment.findByPk(id);

    res.send(equip);
    let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    fs.appendFile(config_data.logdirectory + '/log_' + date + '.txt', clientIp + " - " + date + " - Display Equipment for id: " + id + "\n", function (err) {
        if (err) throw err;
    });
}

async function deleteEquipment(req, res) {
    const id = parseInt(req.params.id);
    let date = new Date();

    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + '-' + mm + '-' + yyyy;
    if(id == undefined) {
        res.sendStatus(301);
        res.send({ errormsg: 'Invalid Id' });
        console.log("Invalid id: " + id);
        let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        fs.appendFile(config_data.logdirectory + '/log_' + date + '.txt', clientIp + " - " + date + " - Invalid id:" + id + "\n", function (err) {
            if (err) throw err;
        });
    } else {
        const sequelize = req.sequelize;
        const equip = await sequelize.models.Equipment.findByPk(id);

        const count = equip.destroy({
            where: {
            id: id,
            },
        });
        console.log("deleted row(s): " + count);

        res.send(equip);
        let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        fs.appendFile(config_data.logdirectory + '/log_' + date + '.txt', clientIp + " - " + date + " - Delete Equipment for id:" + id + "\n", function (err) {
            if (err) throw err;
        });
    }
}

async function updateEquipment(req, res) {
    const id = parseInt(req.params.id);
    let date = new Date();

    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + '-' + mm + '-' + yyyy;
    if(id == undefined) {
        res.sendStatus(301);
        res.send({ errormsg: 'Invalid Id' });
        console.log("Invalid id: " + id);
        let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        fs.appendFile(config_data.logdirectory + '/log_' + date + '.txt', clientIp + " - " + date + " - Invalid id:" + id + "\n", function (err) {
            if (err) throw err;
        });
    } else {
        const sequelize = req.sequelize;
        const equip = await sequelize.models.Equipment.findByPk(id);
        const date = new Date();
        equip.set({
            date: date,
        });
        console.log("Updated row for id: " + id);

        res.send(equip);
        let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        fs.appendFile(config_data.logdirectory + '/log_' + date + '.txt', clientIp + " - " + date + " - Update Equipment for id:" + id + "\n", function (err) {
            if (err) throw err;
        });
    }
}

async function getAllEquipment(req, res) {
    console.log("Hit get all equipment");
    let date = new Date();

    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + '-' + mm + '-' + yyyy;
    const sequelize = req.sequelize;
    const allEquip = await sequelize.models.Equipment.findAll();
    let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    fs.appendFile(config_data.logdirectory + '/log_' + date + '.txt', clientIp + " - " + date + " - Display all equipment" + "\n", function (err) {
        if (err) throw err;
    });
    res.send(allEquip);
}

function RegisterRoutes(app) {
    app.get('/equipment', getAllEquipment);
    app.get('/equipment/:id', getEquipment);
    app.post('/equipment', newEquipment);
    app.delete('/deleteequipment/:id', deleteEquipment);
    app.patch('/updateequipment/:id', updateEquipment);
}

module.exports = { RegisterRoutes }