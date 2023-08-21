module.exports = (app) => {
  const companies = require("../controllers/company.controller.js")
  const CompaniesRouter = require("express").Router()

  // Create a new Company
  CompaniesRouter.post("/addCompany", companies.create)

  // Retrieve all Companies
  CompaniesRouter.get("/getCompanies", companies.findAll)

  // Retrieve a single Company with id
  CompaniesRouter.get("/getCompany/:id", companies.findOne)

  // Update a Company with id
  CompaniesRouter.put("/updateCompany/:id", companies.update)

  // Delete a Company with id
  CompaniesRouter.delete("/deleteCompany/:id", companies.delete)

  app.use("/companies", CompaniesRouter)
}
