import { Grid } from "../models/grid";
import { GridGenerator } from "../services/gridGenerator";

describe('Grid Tests', () => {
    it('should correctly apply a bias to the grid', () => {
        const grid: Grid = new GridGenerator().generateGrid();
        const bias = 'a';
        grid.applyBias(bias);
        const numberOfAsInGrid = grid.printGrid().reduce((acc, row) => {
            const rowCount = row.reduce((rowAcc, cell) => {
                return cell === bias ? rowAcc + 1 : rowAcc;
              }, 0);

              return acc + rowCount;
        }, 0);

        // since 20% of 10 is 2, it should have 2 a's and randomCharacter can result in more a's..
        expect(numberOfAsInGrid).toBeGreaterThanOrEqual(20);
    })
});