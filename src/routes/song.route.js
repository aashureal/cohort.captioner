const express = require("express");
const router = express.Router();

router.post("/songs", (req, res) => {
  res.json(req.body);
});
router.post("/songs/:id", (req, res) => {
  res.json(req.body);
});
router.post("/songs/:id/update", (req, res) => {
  res.json(req.body);
});
router.post("/songs/:id/delete", (req, res) => {
  res.json(req.body);
});

module.exports = router;
