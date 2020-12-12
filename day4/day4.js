const {
  inputData,
} = require("./day4data");

const {
  convertStringOfMultiplePassportsIntoArrayOfPassportObjects,
  getValidPassports,
  isHexColorCode,
  isNumWithinRange,
  isValidEyeColor,
  isValidHeight,
  isValidIdNumber,
  strIsNumOfGivenLength,
} = require("./day4utils")

const passportFieldKeyMap = {
  byr: {
    desc: "Birth Year",
    validationScript(valueString) {
      return (
        typeof valueString === "string" &&
        strIsNumOfGivenLength(valueString, 4) &&
        isNumWithinRange(Number(valueString), 1920, 2002)
      );
    },
  },
  iyr: {
    desc: "Issue Year",
    validationScript(valueString) {
      return (
        valueString &&
        strIsNumOfGivenLength(valueString, 4) &&
        isNumWithinRange(Number(valueString), 2010, 2020)
      );
    },
  },
  eyr: {
    desc: "Expiration Year",
    validationScript(valueString) {
      return (
        valueString &&
        strIsNumOfGivenLength(valueString, 4) &&
        isNumWithinRange(Number(valueString), 2020, 2030)
      );
    },
  },
  hgt: {
    desc: "Height",
    validationScript(valueString) {
      return valueString && isValidHeight(valueString);
    },
  },
  hcl: {
    desc: "Hair Color",
    validationScript(valueString) {
      return valueString && isHexColorCode(valueString);
    },
  },
  ecl: {
    desc: "Eye Color",
    validationScript(valueString) {
      return valueString && isValidEyeColor(valueString);
    },
  },
  pid: {
    desc: "Passport ID",
    validationScript(valueString) {
      return (
        valueString &&
        strIsNumOfGivenLength(valueString, 9) &&
        isValidIdNumber(valueString)
      );
    },
  },
  // cid: {
  //   desc: "Country ID",
  //   validationScript(valueString) {
  //     return null; // optional
  //   },
  // },
};

var optionalKeys = ["cid"];

var arrayOfPassportsAsObjects = convertStringOfMultiplePassportsIntoArrayOfPassportObjects(
  inputData
);

var requiredFields = Object.keys(passportFieldKeyMap).filter(
  (key) => !optionalKeys.includes(key)
);

var validPassports = getValidPassports(
  arrayOfPassportsAsObjects,
  requiredFields,
  passportFieldKeyMap
);

console.log({ validPassportCount: validPassports.length });
