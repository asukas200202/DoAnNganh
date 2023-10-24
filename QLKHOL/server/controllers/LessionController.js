const Lession = require("../models/Lession.js");

class LessionController {
  index(req, res) {
    
  }

  async detail(req, res) {}

  async create(req, res) {
    try {
      const lessionJson = req.body;
      const lession = new Lession(lessionJson);

      const savedlession = await lession.save();
      res.json({ success: true, data: savedlession });


    } catch (error) {
      console.error("Error creating order", error);
      res.status(500).json({ success: false, error: "An error occurred" });
    }
  }
  async delete(req, res) {}

  async update(req, res) {}

  async search(req, res) {}
}

module.exports = new LessionController();
