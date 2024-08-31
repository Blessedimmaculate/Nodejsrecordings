const express = require("express");
const router = express.Router();

router.get("/agent_page", async (req, res) => {
         res.render("salesAgent");
      });






module.exports = router;