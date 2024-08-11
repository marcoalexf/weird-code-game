import { GridGenerator } from "../services/gridGenerator"

describe('Grid Generator Tests', () => {
    it('should generate expected grid', () => {
        const gridGenerator = new GridGenerator();
        const expectedGrid: string[][] = [["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""]];
        const generatedGrid = gridGenerator.generateGrid();

        expect(generatedGrid.printGrid()).toEqual(expectedGrid);
    })
})