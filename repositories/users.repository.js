const pool = require("../db/db");

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users where email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const findUserById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM users where id = $1", [
      id,
    ]);
    // console.log(result, " data data dta")
    return result.rows[0];
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const createUser = async (user) => {
  const { username, email, fullname, password, balance } = user;

  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, fullname, password, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, fullname, password, balance]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Database error occurred while creating the user.");
  }
};

const findTransactionById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM transactions where user_id = $1", [
      id,
    ]);
    // console.log(result, " data data dta")
    return result.rows[0];
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const createTransaction = async (user) => {
  const { date_time, type, from_to, description, amount, user_id } = user;

  try {
    const result = await pool.query(
      "INSERT INTO users (date_time, type, from_to, description, amount, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [date_time, type, from_to, description, amount, user_id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Database error occurred while creating the transaction.");
  }
};

module.exports = { createUser, findUserByEmail, findUserById, findTransactionById, createTransaction };