import { Grid } from "../models/grid";

export class GridGenerator {
    generateGrid(): Grid {
        const grid: Grid = new Grid(Array.from({ length: 10 }, () =>
            Array(10).fill('')
        ));

        return grid;
    }
}