const { DataTypes } = require("sequelize")

module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    employees_number: {
      type: DataTypes.FLOAT,
    },
  })

  return Company
}
