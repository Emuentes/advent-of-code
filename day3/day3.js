const { day3data, day3SampleExampleTestData } = require("./day3data");
const testGridRowsAsAnArray = day3SampleExampleTestData.split(/\n/);
const gridRowsAsAnArray = day3data.split(/\n/);

function getTreeImpactCountOfRoute({
  arr,
  debugMode,
  zeroBasedStartingSlope,
  moveRightThisManyCols,
}){
  let treeCount = 0;
  const result = {};
  for (let i=zeroBasedStartingSlope; i<arr.length; i++) {
    const targetRowIndex = i;
    const rowContent = arr[targetRowIndex];
    const columnIndex = (targetRowIndex * moveRightThisManyCols) % rowContent.length;
    if (!rowContent) {
      break;
    }

    const gridTileContent = rowContent[columnIndex];
    const treeFound = gridTileContent === "#";

    if (treeFound) {
      treeCount++;
    }

    // FOR DEBUGING
    if (debugMode) {
      const runData = {
        symbol: treeFound ? 'X' : 'O',
        rowIndex: targetRowIndex,
        columnIndex,
        gridTileContent,
        treeFound,
        rowContent,
      };

      console.log(runData);
    }
  }

  return treeCount;
}

const useTestData = false;
const debugMode = false;
const part1config = {
  arr: useTestData ? testGridRowsAsAnArray : gridRowsAsAnArray,
  zeroBasedStartingSlope: 1,
  moveRightThisManyCols: 3,
  debugMode
};

const part1_treeCount = getTreeImpactCountOfRoute(part1config);

const part2_coordinates = [[1],[3],[5],[7],[1,2]];
const part2_treeCounts = part2_coordinates.reduce((acc, coordinate)=>{
  const [moveRightThisManyCols, zeroBasedStartingSlope = 1] = coordinate;
  console.log({
    right: moveRightThisManyCols,
    down: zeroBasedStartingSlope,
  })
  acc.push(getTreeImpactCountOfRoute({
    ...part1config,
    zeroBasedStartingSlope,
    moveRightThisManyCols,
  }));
  return acc;
}, []);
const part2Product = part2_treeCounts.reduce((curr, next) => curr * next);

console.log({
  part1_treeCount,
  part2_treeCounts,
  part2Product,
});