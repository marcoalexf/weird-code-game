import isBiasValid from "../validators/biasValidator";

describe('Bias validator tests', () => {
    it('should return false', () => {
        const wrongBias = 'asdasd';
        const result = isBiasValid(wrongBias);
        expect(result).toBe(false);
    });

    it('should return true when bias is empty string', () => {
        const bias = '';
        const result = isBiasValid(bias);
        expect(result).toBe(true);
    });

    it('should return true when bias is whitespace string', () => {
        const bias = ' ';
        const result = isBiasValid(bias);
        expect(result).toBe(true);
    });
})