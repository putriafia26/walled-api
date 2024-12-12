const Joi = require("joi");
const userService = require("../services/users.service");
const pool = require("../db/db");
const {TransactionResponse} = require("../dto/transactions.response");

const transactionSchema = Joi.object({
    date_time: Joi.date().required(),
    user_id: Joi.number().required(),
    from_to: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.number().required()
  });

const createTransaction = async (req, res) => {
    try {
      const { error, value } = transactionSchema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const user = await userService.createTransaction(value);
      // console.log(user);
      res.status(201).json({ data: new TransactionResponse(transaction) });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };

const gettransactionById = async (req, res) => {
    try {
      const { id: user_id } = req.user;
    //   console.log(id, "data");
      const user = await userService.gettransactionById(Number(user_id));
      
      res.status(200).json({ data: new TransactionResponse(transaction) });
    } catch (error) {
        if(error.message === "user not found") {
            return res.status(404).json({error:error.message})
        }
        res.status(error.statusCode || 500).json({ error: error.message });
    }
  };



module.exports = { createTransaction, gettransactionById };