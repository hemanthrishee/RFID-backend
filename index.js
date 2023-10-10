const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");

const app = express()

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"]
}));
async function connect() {
  await mongoose.connect("mongodb+srv://ironmarkivcr:Hrvn_123@cluster0.rqrugiz.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
}
connect();

const patientSchema = new mongoose.Schema({
    patientID: String,
    patientName: String,
    dateOfBirth: Date,
    gender: String,
    contactInformation: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
      phoneNumber: String,
      email: String,
    },
    medicalHistory: {
      allergies: [String],
      chronicConditions: [String],
      surgicalHistory: [String],
      familyMedicalHistory: [String],
    },
    medications: [
      {
        name: String,
        dosage: String,
        frequency: String,
      },
    ],
    immunizations: [
      {
        vaccine: String,
        date: Date,
      },
    ],
    labResults: [
      {
        test: String,
        result: String,
        referenceRange: String,
        date: Date,
      },
    ],
    procedures: [String],
    encounters: [
      {
        date: Date,
        notes: String,
      },
    ],
    insuranceInformation: {
      insuranceProvider: String,
      policyNumber: String,
    },
    billingInformation: [
      {
        invoiceNumber: String,
        serviceDate: Date,
        totalAmount: String,
        paymentStatus: String,
      },
    ],
  });

const Patient = mongoose.model('Patient', patientSchema);
app.get("/:patient", (req, res)=> {
    async function execute() {
        const pat = req.params.patient;
        const p = await Patient.findOne({patientID: pat});
        if (p)
        {
            res.json(p);
        }
        else
        {
            res.json({});
        }
    }
    execute();
});

app.listen(5000, ()=> {
    console.log("Server has started on port 5000");
});