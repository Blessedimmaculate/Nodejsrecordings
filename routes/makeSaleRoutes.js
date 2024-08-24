const express = require('express');
const router = express.Router();

const MakeSale = require("../models/makeSale");

router.get("saleProduce", (req, res) => {
    res.render("make_sale");
});

router.post("/saleProduce", (req, res) => {
    const newCrop = new MakeSale(req.body)
    newCrop.save()
    res.redirect("/salesList")
});

module.exports = router;