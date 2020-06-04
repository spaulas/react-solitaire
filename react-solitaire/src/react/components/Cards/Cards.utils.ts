// then do one for the 4 top goal spaces (the function called will depend on the y axis)
export const getColumnToDrop = ({ x, view }: MouseEvent) => {
  const innerWidth = view?.innerWidth || 1080;

  const columnSizes = innerWidth / 7;
  const columnNumber = Math.ceil((x || 1) / columnSizes);

  return `column${columnNumber || 1}Pile`;
};

export const onDrop = (
  e: MouseEvent,
  isDeck: boolean,
  addDraggingCardsToColumn: (columnDropedTo: string) => void,
  swapColumns: (columnDropedTo: string, nCards: number) => void,
  resetCardDragging: () => void
) => {
  const columnDropedTo = getColumnToDrop(e);
  const finalColumn = document.getElementById(columnDropedTo);
  finalColumn?.setAttribute(
    "style",
    "transition: transform 0.2s; transform: scale(1);"
  );
  // setColumnScaled("");
  if (isDeck) {
    addDraggingCardsToColumn(columnDropedTo);
  } else {
    swapColumns(columnDropedTo, 1);
    // resetCardDragging();
  }
};
