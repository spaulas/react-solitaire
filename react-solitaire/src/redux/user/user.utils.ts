import { ExplicitAny } from "../../global";

export const createBarGraph = (
  history: ExplicitAny,
  dataKey: string,
  max: number
) => {
  const data = [];
  let label = {};
  // range of each bar slot
  const slot = Math.ceil(max / 5);

  for (let i = 0; i < max; i += slot) {
    const max = i + slot;
    const result = history.reduce((acc: number, gameInfo: ExplicitAny) => {
      if (gameInfo[dataKey] > i && gameInfo[dataKey] <= max) {
        return acc + 1;
      }
      return acc;
    }, 0);

    // create label
    const barLabel = `]${i}, ${max}]`;

    data.push({
      name: barLabel,
      [dataKey]: result
    });

    label = { ...label, [barLabel]: result };
  }

  return { data, label };
};

export const createWinsRatioGraph = (history: ExplicitAny, nGames: number) => {
  const gamesWon = history.length;
  let data: ExplicitAny = [];

  if (nGames > 0) {
    data = [
      { name: "Wins", value: gamesWon },
      { name: "Losts", value: nGames - gamesWon }
    ];
  }

  return { data };
};

export const createGraphs = (
  history: ExplicitAny,
  maxMoves: number,
  maxTime: number,
  nGames: number
) => {
  const moves = createBarGraph(history, "moves", maxMoves);
  const time = createBarGraph(history, "seconds", maxTime);
  const winsRatio = createWinsRatioGraph(history, nGames);

  return { moves, time, winsRatio };
};
