/**
  ~~ FIELD VALIDATION RULES ~~
  * cid (Country ID)      - ignored, missing or not.
  * ecl (Eye Color)       - exactly one of: amb blu brn gry grn hzl oth.
  * hcl (Hair Color)      - a # followed by exactly six characters 0-9 or a-f.
  * pid (Passport ID)     - a nine-digit number, including leading zeroes.
  * byr (Birth Year)      - four digits; at least 1920 and at most 2002.
  * iyr (Issue Year)      - four digits; at least 2010 and at most 2020.
  * eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  * hgt (Height)          - a number followed by either cm or in:
  *** If cm, the number must be at least 150 and at most 193.
  ***If in, the number must be at least 59 and at most 76.
*/

function regexMatchFound(regexMatchObject) {
  return regexMatchObject !== null;
}

function isHexColorCode(valueString) {
  var isSixCharsBegginingWithPoundSymbol = regexMatchFound(
    valueString.match(/^#[0-9a-f]{6}$/)
  );
  return isSixCharsBegginingWithPoundSymbol;
}

function isValidEyeColor(valueString) {
  var validEyeColorValues = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  var isOneOfTheseStrings = validEyeColorValues.includes(valueString);
  return isOneOfTheseStrings;
}

function isValidIdNumber(number) {
  const hasNineDigits = regexMatchFound(number.match(/^[\d]{9}$/));
  return hasNineDigits;
}

function strIsNumOfGivenLength(stringContainingNumbers, length) {
  /**
   ### This regex confirms that the "stringContainingNumbers" parameter:
     - has a value that:
        1. starts with a number
        2. ends with a number
        3. only contains numbers (we don't allow any characters that are not numbers)
     - The "length" param is the exact amount of numbers that must be in the "stringContainingNumbers" param
  */
  const regexStr = `^\\d${length ? "{" + length + "}" : ""}$`;
  const stringContainsNumOfRequiredFormat = regexMatchFound(
    stringContainingNumbers.match(regexStr)
  );
  return stringContainsNumOfRequiredFormat;
}

function isNumWithinRange(number, lowerLimit, upperLimit) {
  return number <= upperLimit && number >= lowerLimit;
}

function isValidHeight(valueString) {
  const isNumEndingWithCmOrIn = regexMatchFound(
    valueString.match(/\d+(cm|in)$/)
  );
  const numberWithoutUnits = Number(valueString.replace(/\D/g, ""));
  const isWithinRequiredRange = valueString.includes("cm")
    ? isNumWithinRange(numberWithoutUnits, 150, 193)
    : isNumWithinRange(numberWithoutUnits, 59, 76);
  return isNumEndingWithCmOrIn && isWithinRequiredRange;
}

function convertPassportFieldTuplesIntoAnObject(passportFieldsAsTuples) {
  const passportsAsAnObject = Object.fromEntries(passportFieldsAsTuples);
  return passportsAsAnObject;
}

function createPassportObjectFromPassportDataString(passport) {
  const passportFieldsAsTuples /* sort of */ = passport
    .split(/[ \n]/)
    .map((item) => item.split(":"));
  return convertPassportFieldTuplesIntoAnObject(passportFieldsAsTuples);
}

function convertStringOfMultiplePassportsIntoArrayOfPassportObjects(inputData) {
  var arrayOfRawData = inputData.split(/\n\n/g);
  var arrayOfPassportsAsObjects = arrayOfRawData.map(
    createPassportObjectFromPassportDataString
  );
  return arrayOfPassportsAsObjects;
}

function getPassportValidationData(
  passportAsObject,
  requiredKeys,
  passportFieldKeyMap
) {
  return requiredKeys.reduce(
    (acc, requiredKey) => {
      const passportFieldData = passportAsObject[requiredKey];
      const fieldUtils = passportFieldKeyMap[requiredKey];
      const { validationScript, desc } = fieldUtils;
      let isValid = false;

      if (
        typeof validationScript === "function" &&
        typeof passportFieldData === "string"
      ) {
        isValid = validationScript(passportFieldData);
        const accKey = !isValid ? "invalidKeys" : "validKeys";
        acc[accKey].push(desc);
      }

      return acc;
    },
    {
      invalidKeys: [],
      validKeys: [],
    }
  );
}

function isValidPassport(passportObj, requiredKeys, passportFieldKeyMap) {
  var validationData = getPassportValidationData(
    passportObj,
    requiredKeys,
    passportFieldKeyMap
  );
  var isValid = validationData.validKeys.length === requiredKeys.length;
  return isValid;
}

function getValidPassports(
  arrayOfPassportObjects,
  requiredKeys,
  passportFieldKeyMap
) {
  return arrayOfPassportObjects.filter((passportObj) => {
    return isValidPassport(passportObj, requiredKeys, passportFieldKeyMap);
  });
}

module.exports = {
  convertPassportFieldTuplesIntoAnObject,
  convertStringOfMultiplePassportsIntoArrayOfPassportObjects,
  createPassportObjectFromPassportDataString,
  getPassportValidationData,
  getValidPassports,
  isHexColorCode,
  isNumWithinRange,
  isValidEyeColor,
  isValidHeight,
  isValidPassport,
  isValidIdNumber,
  regexMatchFound,
  strIsNumOfGivenLength,
};