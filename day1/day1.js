// https://adventofcode.com/2020/day/1
const { puzzleInput } = require("./day1data");
var sampleData = [1721, 979, 366, 299, 675, 1456];
function partOne() {
  for (const currentValue of puzzleInput) {
    const amountShortOf2020 = 2020 - currentValue;
    const theMissingAmountIsInTheArray = puzzleInput.includes(
      amountShortOf2020
    );

    if (theMissingAmountIsInTheArray) {
      console.log({
        theTwoEntries: [currentValue, amountShortOf2020],
        whatYouGetIfYouMultiplyThem: currentValue * amountShortOf2020,
      });
      break;
    }
  }
}

// partOne();

function partTwo(data) {
  var theThreeNumbersWereFound = false;

  for (firstNumber of data) {
    if (theThreeNumbersWereFound) {
      break;
    }
    for (secondNumber of data) {
      if (theThreeNumbersWereFound) {
        break;
      }

      const thirdNumber = 2020 - (firstNumber + secondNumber);
      if (data.includes(thirdNumber)) {
        theThreeNumbersWereFound = true;

        console.log({
          firstNumber,
          secondNumber,
          thirdNumber,
          product: firstNumber * secondNumber * thirdNumber,
        });
      }
    }
  }
}

// partTwo(sampleData); FOR TESTING
partTwo(puzzleInput);
