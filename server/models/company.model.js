const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Company = sequelize.define("companies", {
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
