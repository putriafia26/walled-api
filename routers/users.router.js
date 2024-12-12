const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");
const authenticateToken = require("../middlewares/auth.middleware");

// router.get("/users", (req, res) => {
//  res.send('ok')
// });

router.post("/auth/register", userController.createUser);
router.post("/auth/login", userController.login);
router.get("/profile", authenticateToken, userController.getUserById);

module.exports = router;