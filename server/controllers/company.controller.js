const db = require("../models")

const Company = db.tutorials
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  const company = ({ title, description, employees_number } = req.body)
  Company.create(company).then((data) => {
    res.send(data).catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      })
    })
  })
}

exports.findAll = (req, res) => {
  Company.findAll().then((data) => {
    res.send(data).catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      })
    })
  })
}

exports.findOne = (req, res) => {
  const { id } = req.params
  Company.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      })
    })
}

exports.update = (req, res) => {
  const { id } = req.params

  Company.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Company was updated successfully.",
        })
      } else {
        res.send({
          message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Company with id=" + id,
      })
    })
}

exports.delete = (req, res) => {
  const { id } = req.params

  Company.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Company was deleted successfully.",
        })
      } else {
        res.send({
          message: `Cannot deleted Company with id=${id}. Maybe Company was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Company with id=" + id,
      })
    })
}
