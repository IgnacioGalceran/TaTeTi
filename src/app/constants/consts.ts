import { WinningType } from "../types/WinningType";

export const winningCombinations: WinningType = {
  filas: {
    uno: ["0,0", "0,1", "0,2"],
    dos: ["1,0", "1,1", "1,2"],
    tres: ["2,0", "2,1", "2,2"],
  },
  columnas: {
    uno: ["0,0", "1,0", "2,0"],
    dos: ["0,1", "1,1", "2,1"],
    tres: ["0,2", "1,2", "2,2"],
  },
  diagonales: {
    uno: ["0,0", "1,1", "2,2"],
    dos: ["0,2", "1,1", "2,0"],
  },
};
