import { getRandomCharacater } from "../utils/randomCharacterGenerator";
import { generateUniqueCoordinates } from "../utils/uniqueCoordinates";

export class Grid {
    private _grid: string[][];

    constructor(grid: string[][]) {
        this._grid = grid;
    }

    applyBias(bias: string) {
        const biasCount = Math.floor(10 * 10 * 0.2); // 20% of the grid
        const biasTrimmed =  bias.trim().toLowerCase();

        const randomCoordinates = generateUniqueCoordinates(biasCount);

        randomCoordinates.forEach(coordinate => {
            this._grid[coordinate[0]][coordinate[1]] = biasTrimmed;
        });
    }

    printGrid(): string[][] {
        return this._grid;
    }

    initializeGrid() {
        const gridSize = 10;
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                this._grid[row][col] = getRandomCharacater();
            }
        }
    }
}