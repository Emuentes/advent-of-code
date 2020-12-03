const { inputData } = require("./day2-data");
const solutionInfo = inputData.reduce(
  (acc, passcodeData) => {
    /*
    // RegEx-based solution... had a bug where it kept processedData was null several times... I moved on to a different approach.
    var parserExpression = /(?<lowerLimit>\d)-(?<upperLimit>\d)\s(?<targetCharacter>.):\s(?<inputString>[a-zA-Z]+)/g;
    var processedData = parserExpression.exec(passcodeData);
    var { inputString, lowerLimit, targetCharacter, upperLimit } = (
    processedData || { groups: {} }
    ).groups;

    console.log({
        processedData,
        passcodeData,
        inputString,
        lowerLimit,
        targetCharacter,
        upperLimit,
    });
    */
    var totalPassCodeCount = inputData.length;
    var [rules, passcode] = passcodeData.split(": ");
    var [lowerLimit, upperLimit, targetCharacter] = rules.split(/\W/);
    var regex = new RegExp(`${targetCharacter}+`, "g");
    var proccssedPassCode = passcode.match(regex);
    var numberOfInstancesOfTargetCharacter = (proccssedPassCode || []).join("")
      .length;
    var passcodeIsValid =
      numberOfInstancesOfTargetCharacter >= lowerLimit &&
      numberOfInstancesOfTargetCharacter <= upperLimit;
    var posCheckArray = [passcode[lowerLimit - 1], passcode[upperLimit - 1]];
    var passcodeCharPosIsValid =
      posCheckArray.includes(targetCharacter) &&
      posCheckArray.filter((char) => char === targetCharacter).length === 1;

    /*
    // FOR DEBUGGING

    var logData = {
      totalPassCodeCount,
      posCheckArray,
      passcodeCharPosIsValid,
      passcodeData,
      passcodeIsValid,
      regex,
      proccssedPassCode,
      rules,
      passcode,
      lowerLimit,
      upperLimit,
      targetCharacter,
      numberOfInstancesOfTargetCharacter,
    };

    console.log(logData);
    */

    /**
     * Challenge Part 1
     * Check each password to see if:
     * - it contains between the min & max number of instances of the given character (target char)
     * NOTE:
     * - target char differs for each password
     * - min value and max value differs for each password
     * 
     * Count how many passwords meet the criteria
    */
    if (passcodeIsValid) {
      acc.charVolumeValidCount++;
    }

    /**
     * Challenge Part 2
     * WHOOPS: turns out lowerLimit and upperLimit variables
     * were actually indexes (one-based, not zero-based)
     * of the character position in the string!
     * 
     * NOTE:
     * We must find the target char at ONE of those two indexes. No More, No Less.
     * 
     * Therefore, the password is INVALID if:
     * - both indexes point to an instance of the target character
     * - neither index points to an instance of the target character
    */
    if (passcodeCharPosIsValid) {
      acc.charPosValidCount++;
    }

    return acc;
  },
  {
    charVolumeValidCount: 0,
    charPosValidCount: 0,
  }
);
console.log({
  solutionInfo
});