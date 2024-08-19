
const { DataTypes, Model } = require('sequelize');

class Equipment extends Model { }

async function ORMInit(sequelize) {
    Equipment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            partcode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        }, { sequelize, modelName: 'Equipment' }
    );
    await Equipment.sync();
    return { Equipment } // Not necessary: sequelize.models.<Type>
}

module.exports = { ORMInit }