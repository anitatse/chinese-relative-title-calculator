
let siblingsArray = ["oldersister", "olderbrother", "youngersister", "youngerbrother"];
let parentArray = ["mom", "dad"];
let spouseArray = ["husband", "wife"];
let childrenArray = ["son", "daughter"];
let femaleArray = ["oldersister", "youngersister", "mom", "wife", "daughter"];

//removes redundant arguments from the path
export function removeRedundantArguments(argArray) {

  // a bad fix for now, reduce until your can't reduce farther
  while (argArray.toString() !== doReduceArgumentLogic(argArray).toString()) {
    argArray = removeRedundantArguments(argArray)
    // filter out any ""'s that were made
    argArray = argArray.filter( (arg) => {
      return arg !== "";
    });
  }
  return argArray;
}

function doReduceArgumentLogic(argArray) {

  for (let i=0; i < argArray.length-1; i++) {
    // ex. sibling's parents == your parents
    let siblingParentsCondition = siblingsArray.includes(argArray[i]) && parentArray.includes(argArray[i+1]);
    // ex. spouse's kids == your kids
    let spouseKidsCondition = spouseArray.includes(argArray[i]) && childrenArray.includes(argArray[i+1]);
    // ex. spouse's spouse == you
    let spouseSpouseCondition = spouseArray.includes(argArray[i]) && spouseArray.includes(argArray[i + 1]);

    // ex. your older sibling's older sister == your older sister
    let siblingSiblingCondition = siblingsArray.includes(argArray[i]) && siblingsArray.includes(argArray[i + 1])
          // array indices 0+ 1 are older siblings, 2 + 3 are younger siblings (see siblingsArray above)
       && ( ((siblingsArray.indexOf(argArray[i]) === 0 || 1 ) && (siblingsArray.indexOf(argArray[i+1]) === 0 || 1))  ||
          ((siblingsArray.indexOf(argArray[i]) === 2 || 3 ) && ( siblingsArray.indexOf(argArray[i+1]) === 2 || 3)) );

    if (siblingParentsCondition || spouseKidsCondition || siblingSiblingCondition) {
       argArray[i] = "";
    }

    // spouse's spouse = you
    if (spouseSpouseCondition) {
      argArray[i] = "";
      argArray[i+1] = "";
    }

    // simplify child path
    if (childrenArray.includes(argArray[i]) && siblingsArray.includes(argArray[i+1])) {
        // if child's older or younger sister -> it is their daughter
        if (siblingsArray.indexOf(argArray[i+1]) === 0 || siblingsArray.indexOf(argArray[i+1]) === 2 ) {
            argArray[i] = "daughter";
            argArray[i+1] = "";
        }
        // if child's older or younger brother -> it is their son
        if (siblingsArray.indexOf(argArray[i+1]) === 1 || siblingsArray.indexOf(argArray[i+1]) === 3 ) {
            argArray[i] = "son";
            argArray[i+1] = "";
        }
    }

    // your kid's mom = wife  (this is an assumption)
    if (childrenArray.includes(argArray[i]) && parentArray.includes(argArray[i+1])) {
      if (femaleArray.includes(argArray[i+1])) {
        argArray[i] = "wife";
      } else {
        argArray[i] = "husband";
      }
      argArray[i+1] = "";
    }

    //simplify parent child path (mom's kid == dad's kid) dataset only has children under dad
    if (parentArray.includes(argArray[i]) && childrenArray.includes(argArray[i+1])) {
        argArray[i] = "dad";
    }

    // simplify parent path
    if (parentArray.includes(argArray[i]) && spouseArray.includes(argArray[i+1])) {
        // if child's older or younger sister -> it is their daughter
        if (argArray[i+1] === "husband" ) {
            argArray[i] = "dad";
            argArray[i+1] = "";
        }
        if (argArray[i+1] === "wife" ) {
            argArray[i] = "mom";
            argArray[i+1] = "";
        }
    }
  }
  return argArray;
}

function calculateLevel(argArray) {
  let counter = 0;
  for (let i=0; i < argArray.length; i++) {
    // ignore "" + same level args
    if (argArray[i] !== "" && !siblingsArray.includes(argArray[i]) && !spouseArray.includes(argArray[i])) {
        if (parentArray.includes(argArray[i])) {
          counter++;
        } else if(childrenArray.includes(argArray[i])){
          counter--;
        }
    }
  }
  return counter;
}

function calculateGender(argArray) {
  let gender;
  // check gender of last argument
  if (femaleArray.includes(argArray[argArray.length-1])) {
    gender = "female";
  } else {
    gender = "male";
  }
  return gender;
}

export function getGeneralTerm(data, language, argArray) {
  let level = calculateLevel(argArray);
  let gender = calculateGender(argArray);
  let result = "";

  if (level < 0 && gender === "female") {
      // Younger
      result = data.generalterms.youngersister[language];
  }
  else if (level < 0 && gender === "male") {
      // Younger
      result = data.generalterms.youngerbrother[language];
  }
  else if (level === 0 && gender === "female") {
      // sister
      result = data.generalterms.sister[language];
  }
  else if (level === 0 && gender === "male") {
      // brother
      result = data.generalterms.brother[language];
  }
  else if (level === 1 && gender === "female") {
      // auntie
      result = data.generalterms.aunt[language];
  }
  else if (level === 1 && gender === "male") {
      // uncle
      result = data.generalterms.uncle[language];
  }
  else if (level >= 2 && gender === "female") {
      // grand aunt
      result = data.generalterms.grandaunt[language];
  }
  else {
      // grand uncle
      result = data.generalterms.granduncle[language];
  }

  return result;
}


export function traverseTree(result, argArray) {

  // traverse tree to right place
  for (let i=0; i < argArray.length; i++) {
    // ignore "" args
    if (argArray[i] !== "") {
      if (!result.hasOwnProperty(argArray[i])) {
        result = "";
        break;
      }
      result = result[argArray[i]];
    }
  }

  return result;
}
