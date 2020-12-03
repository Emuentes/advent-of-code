const { day3data, day3SampleExampleTestData } = require("./day3data");
const testGridRowsAsAnArray = day3SampleExampleTestData.split(/\n/);
const gridRowsAsAnArray = day3data.split(/\n/);

function getTreeImpactCountOfRoute({
  arr,
  debugMode,
  down,
  right,
}){
  let treeCount = 0;
  const result = {};
  let targetRowIndex = down;
  for (let i=1; i<arr.length; i++) {
    const rowContent = arr[targetRowIndex] || '';
    const columnIndex = (i * right) % rowContent.length;
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
        right: columnIndex,
        down: targetRowIndex,
        gridTileContent,
        treeFound,
        rowContent,
      };

      console.log(runData);
    }

    targetRowIndex=targetRowIndex+down;
  }

  return treeCount;
}

const useTestData = false;
const debugMode = false;
const part1config = {
  arr: useTestData ? testGridRowsAsAnArray : gridRowsAsAnArray,
  down: 1,
  right: 3,
  debugMode
};

const part1_treeCount = getTreeImpactCountOfRoute(part1config);

const part2_coordinates = [[1],[3],[5],[7],[1,2]];
const part2_treeCounts = part2_coordinates.reduce((acc, coordinate)=>{
  const [
    right,
    down = 1, // defaults to 1 since that's the majority case
  ] = coordinate;
  console.log({
    right,
    down,
  })
  acc.push(getTreeImpactCountOfRoute({
    ...part1config,
    down,
    right,
  }));
  return acc;
}, []);
const part2Product = part2_treeCounts.reduce((curr, next) => curr * next);

console.log({
  part1_treeCount,
  part2_treeCounts,
  part2Product,
});