const PromiseModel = require('../../models/Promise');

describe('Promise Data Model', () => {
  const defaultPromiser = 'user_123';
  const defaultScope = ['*'];
  const defaultDomain = 'health';
  const defaultObjective = 'run 5 miles';
  const defaultTimeline = 30;
  const defaultCriteria = ['GPS tracked'];

  describe('Stake Validation (PP-004)', () => {

    it('should create a financial stake from a legacy numeric input', () => {
      const legacyInput = 500;
      const promise = new PromiseModel(
        defaultPromiser, defaultScope, defaultDomain, defaultObjective, defaultTimeline, defaultCriteria, 
        legacyInput // Passing the legacy number
      );

      expect(promise.stake.type).toBe('financial');
      expect(promise.stake.amount).toBe(500);
    });

    it('should successfully create a valid financial stake object', () => {
      const financialInput = { type: 'financial', amount: 100 };
      const promise = new PromiseModel(
        defaultPromiser, defaultScope, defaultDomain, defaultObjective, defaultTimeline, defaultCriteria, 
        financialInput
      );

      expect(promise.stake).toEqual({ type: 'financial', amount: 100 })
    });

    it('should successfully create a valid reputational stake object with null amount', () => {
      const reputationalInput = { type: 'reputational', amount: null };
      const promise = new PromiseModel(
        defaultPromiser, defaultScope, defaultDomain, defaultObjective, defaultTimeline, defaultCriteria, 
        reputationalInput
      );

      expect(promise.stake).toEqual({ type: 'reputational', amount: null })
    });

    it('should throw an error if an invalid stake type is provided', () => {
      const invalidInput = { type: 'social', amount: 50 };
      
      const instantiatePromise = () => {
        new PromiseModel(
          defaultPromiser, defaultScope, defaultDomain, defaultObjective, defaultTimeline, defaultCriteria, 
          invalidInput
        );
      };

     expect(instantiatePromise).toThrow("Invalid stake type");
    });

    it('should throw an error if a financial stake amount is negative or missing', () => {
      const negativeFinancialInput = { type: 'financial', amount: -10 };
      
      const instantiatePromise = () => {
        new PromiseModel(
          defaultPromiser, defaultScope, defaultDomain, defaultObjective, defaultTimeline, defaultCriteria, 
          negativeFinancialInput
        );
      };

      expect(instantiatePromise).toThrow("Invalid stake amount, number must be positive");
    });

  });
});