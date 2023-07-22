const express = require("express");
const ServiceModel = require("../Models/Services");
const stylistAuth = require("../Middlewares/stylistaAuth");
const serviceRouter = express.Router();

// Route: Get services with professional details based on search query

serviceRouter.get("/", async (req, res) => {
  try {
    const { q } = req.query;

    const services = await ServiceModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    }).populate("professional");

    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// serviceRouter.use(professionalAuth);

// ----------------add a new service---------------------

serviceRouter.post("/add", stylistAuth, async (req, res) => {
  try {
    console.log(
      "-------------------------------------- here i am--------------------------"
    );
    const { name, description, duration, pricing } = req.body;
    const stylistId = req.stylistID;

    const service = new ServiceModel({
      name,
      description,
      duration,
      pricing,
      stylistId,
    });

    const savedService = await service.save();

    res.status(200).json(savedService);
  } catch (error) {
    console.log("Failed to add a new service", error);
    res.status(500).json({ error: "Failed to add a new service" });
  }
});

// get services for specific stylist----------------------

serviceRouter.get("/my", stylistAuth, async (req, res) => {
  try {
    const services = await ServiceModel.find({ stylistId: req.stylistID });
    res.status(200).json(services);
  } catch (error) {
    console.error(
      "error from  my services of stylist---------------------",
      error
    );
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

module.exports = serviceRouter;
