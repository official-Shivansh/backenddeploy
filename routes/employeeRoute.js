const express = require("express");
const { EmployeeModel } = require("../models/employeeModel");
const employeeRouter = express.Router()



employeeRouter.get("/", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;
  
      const { department, sortBy, search } = req.query;
  
      let query = {};
  
      if (department) {
        query.department = department;
      }
  
      if (search) {
        query.firstName = search;
      }
  
      const sortOptions = {};
  
      if (sortBy === "1") {
        sortOptions.salary = 1;
      } else if (sortBy === "-1") {
        sortOptions.salary = -1;
      }
  
      const employees = await EmployeeModel.find(query)
        .limit(limit)
        .skip(skip)
        .sort(sortOptions);
  
      res.send(employees);
    } catch (e) {
      res.json({ msg: e });
    }
  });

employeeRouter.post("/employees",async(req,res)=>{
    try{
        let employee = new EmployeeModel(req.body);
        console.log(employee)
        await employee.save();
        res.json({ msg: "Employee has been added" });
    }
    catch(e){
        res.json({ msg: e });
    }
})

employeeRouter.patch("/update/:id", async (req, res) => {
    let payload = req.body;
    let id = req.params.id;
      try {
        await EmployeeModel.findByIdAndUpdate({ _id: id }, payload);
        res.json({ msg: "Employee has been updated" });
      } catch (err) {
        res.json({ msg: err });
      }
  });
  

employeeRouter.delete("/delete/:id", async (req, res) => {
      let id = req.params.id
      try {
        await EmployeeModel.findByIdAndDelete({ _id: id });
        res.json({ msg: "Employee has been deleted" });
      } catch (err) {
        res.json({ msg: err });
      }
  });

module.exports = {employeeRouter}