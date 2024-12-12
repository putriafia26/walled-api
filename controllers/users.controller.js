const Joi = require("joi");
const userService = require("../services/users.service");
const pool = require("../db/db");
const {UserResponse} = require("../dto/users.response");

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required(),
  balance: Joi.number().required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const createUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await userService.createUser(value);
    // console.log(user);
    res.status(201).json({ data: new UserResponse(user) });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const login = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body); 
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        const token = await userService.login(value);
        res.status(200).json({ data: {token: token} });
    } catch (error) {
        if (error.message === "404") {
            return res.status(404).json({message: "user doesn't exist"})
        }
        if (error.message === "401") {
            return res.status(404).json({message: "email or password not valid"})
        }
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
      const { id } = req.user;
    //   console.log(id, "data");
      const user = await userService.getUserById(Number(id));
      
      res.status(200).json({ data: new UserResponse(user) });
    } catch (error) {
        if(error.message === "user not found") {
            return res.status(404).json({error:error.message})
        }
        res.status(error.statusCode || 500).json({ error: error.message });
    }
  };

  const getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    })
  };


module.exports = { createUser, getUserById, getUsers, login };