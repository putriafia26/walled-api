class TransactionResponse {
    constructor(transaction) {
        this.date_time = transaction.date_time;
        this.user_id = transaction.user_id;
        this.from_to = transaction.from_to;
        this.description = transaction.description;
        this.amount = transaction.amount;
    }
}

module.exports = { TransactionResponse }