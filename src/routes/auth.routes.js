const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json(req.body);
});

router.post("/login", (req, res) => {
  res.json(req.body);
});
router.get("/logout", (req, res) => {
  res.json(req.body);
});

module.exports = router;
