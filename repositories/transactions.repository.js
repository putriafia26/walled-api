const pool = require("../db/db");

const findTransactionByUserId = async (user_id) => {
  try {
    const result = await pool.query("SELECT * FROM transactions where user_id = $1", [
      user_id,
    ]);
    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const findTransactionById = async (user_id) => {
  try {
    const result = await pool.query("SELECT * FROM transactions where user_id = $1", [
      user_id,
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

module.exports = { findUserByEmail, findTransactionById, createTransaction };