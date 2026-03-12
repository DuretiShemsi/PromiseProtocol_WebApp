class Promise {
  constructor(
    promiserId,
    promiseeScope,
    domain,
    objective,
    timeline,
    successCriteria,
    stake,
  ) {
    this.id = this.generateId();
    this.promiserId = promiserId;
    this.promiseeScope = promiseeScope;
    this.domain = domain;
    this.objective = objective;
    this.timeline = timeline; // days
    this.successCriteria = successCriteria; // array of criteria
    this.stake = this.validateAndFormatStake(stake);
    this.createdAt = new Date();
    this.status = "pending";
  }

  generateId() {
    return `prm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Validates and formats the incoming stake payload.
   * @param {number|object} input - The raw stake data
   * @returns {object} { type: 'financial' | 'reputational', amount: number | null }
   * @throws {Error} If the stake type is invalid or data is malformed
   */
  validateAndFormatStake(input) {
    //Backwards compatible to old CLI logic using an integer as stake
    if (typeof input === 'number')
        return { type: 'financial', amount: input }

    if (input.type !== 'financial' && input.type !== 'reputational')
        { throw new Error("Invalid stake type")}

    if (input.type === 'financial' && (typeof input.amount !== 'number' || input.amount <= 0))
        { throw new Error("Invalid stake amount, number must be positive")}

    return { type: input.type, amount: input.amount }
  }
}

module.exports = Promise;
