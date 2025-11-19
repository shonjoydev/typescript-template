import { add, multiply } from '@/math';

describe('Math functions', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add two negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
    });

    it('should handle decimal numbers', () => {
      expect(add(1.5, 2.5)).toBe(4);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('should multiply two negative numbers', () => {
      expect(multiply(-3, -4)).toBe(12);
    });

    it('should multiply positive and negative numbers', () => {
      expect(multiply(3, -4)).toBe(-12);
    });

    it('should return zero when multiplying by zero', () => {
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(5, 0)).toBe(0);
    });

    it('should handle decimal numbers', () => {
      expect(multiply(2.5, 4)).toBe(10);
    });

    it('should return the same number when multiplying by one', () => {
      expect(multiply(7, 1)).toBe(7);
      expect(multiply(1, 7)).toBe(7);
    });
  });
});
