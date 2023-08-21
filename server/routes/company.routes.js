module.exports = (app) => {
  const companies = require("../controllers/company.controller.js")

  const router = require("express").Router()

  // Create a new Company
  router.post("/addCompany", companies.create)

  // Retrieve all Companies
  router.get("/getCompanies", companies.findAll)

  // Retrieve a single Company with id
  router.get("/getCompany/:id", companies.findOne)

  // Update a Company with id
  router.put("/updateCompany/:id", companies.update)

  // Delete a Company with id
  router.delete("/deleteCompany/:id", companies.delete)
}
