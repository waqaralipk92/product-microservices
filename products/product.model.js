const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        color: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: true, default: 'https://designshack.net/wp-content/uploads/placehold.jpg'}
    };
    let options = {};

    return sequelize.define('Product', attributes, options);
}