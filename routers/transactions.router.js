const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactions.controller");
const authenticateToken = require("../middlewares/auth.middleware");

// router.get("/users", (req, res) => {
//  res.send('ok')
// });

// router.post("/auth/register", userController.createUser);
// router.post("/auth/login", userController.login);
router.get("/transaction", authenticateToken, transactionController.gettransactionById);

module.exports = router;