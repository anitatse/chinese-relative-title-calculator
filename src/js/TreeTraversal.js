
let siblingsArray = ["oldersister", "olderbrother", "youngersister", "youngerbrother"];
let parentArray = ["mom", "dad"];
let spouseArray = ["husband", "wife"];
let childrenArray = ["son", "daughter"];
let femaleArray = ["oldersister", "youngersister", "mom", "wife", "daughter"];

//removes redundant arguments from the path
export function removeRedundantArguments(argArray) {

  argArray = filterEmpties(argArray);

  // a bad fix for now, reduce until your can't reduce farther
  while (argArray.toString() !== doReduceArgumentLogic(argArray).toString()) {
    argArray = removeRedundantArguments(argArray)
  }
  return argArray;
}

function doReduceArgumentLogic(argArray) {

  for (let i=0; i < argArray.length-1; i++) {

    let args = doRemoveRedundantArguments(argArray[i], argArray[i+1])
    argArray[i] = args[0]
    argArray[i+1] = args[1]

    args = doSimplifyPaths(argArray[i], argArray[i+1])
    argArray[i] = args[0]
    argArray[i+1] = args[1]
  }

  argArray = filterEmpties(argArray);

  return argArray;
}

function doRemoveRedundantArguments(firstArg, secondArg) {

  // ex. sibling's parents == your parents
  let siblingParentsCondition = siblingsArray.includes(firstArg) && parentArray.includes(secondArg);
  // ex. spouse's kids == your kids
  let spouseKidsCondition = spouseArray.includes(firstArg) && childrenArray.includes(secondArg);
  // ex. spouse's spouse == you
  let spouseSpouseCondition = spouseArray.includes(firstArg) && spouseArray.includes(secondArg);

  // ex. your older sibling's older sister == your older sister
  let siblingSiblingCondition = siblingsArray.includes(firstArg) && siblingsArray.includes(secondArg)
        // array indices 0+ 1 are older siblings, 2 + 3 are younger siblings (see siblingsArray above)
     && ( ((siblingsArray.indexOf(firstArg) === 0 || 1 ) && (siblingsArray.indexOf(secondArg) === 0 || 1))  ||
        ((siblingsArray.indexOf(firstArg) === 2 || 3 ) && ( siblingsArray.indexOf(secondArg) === 2 || 3)) );

  if (siblingParentsCondition || spouseKidsCondition || siblingSiblingCondition) {
     firstArg = "";
  }

  // spouse's spouse = you
  if (spouseSpouseCondition) {
    firstArg = "";
    secondArg = "";
  }

  return [firstArg, secondArg];
}

// filter out any ""'s that were made
function filterEmpties(argArray) {
  return argArray.filter( (arg) => {
    return arg !== "";
  });
}

function doSimplifyPaths(firstArg, secondArg) {
  // simplify child path
  if (childrenArray.includes(firstArg) && siblingsArray.includes(secondArg)) {
      // if child's older or younger sister -> it is their daughter
      if (siblingsArray.indexOf(secondArg) === 0 || siblingsArray.indexOf(secondArg) === 2 ) {
          firstArg = "daughter";
          secondArg = "";
      }
      // if child's older or younger brother -> it is their son
      if (siblingsArray.indexOf(secondArg) === 1 || siblingsArray.indexOf(secondArg) === 3 ) {
          firstArg = "son";
          secondArg = "";
      }
  }

  // your kid's mom = wife  (this is an assumption)
  if (childrenArray.includes(firstArg) && parentArray.includes(secondArg)) {
    if (femaleArray.includes(secondArg)) {
      firstArg = "wife";
    } else {
      firstArg = "husband";
    }
    secondArg = "";
  }

  //simplify parent child path (mom's kid == dad's kid) dataset only has children under dad
  if (parentArray.includes(firstArg) && childrenArray.includes(secondArg)) {
      firstArg = "dad";
  }

  // simplify parent path
  if (parentArray.includes(firstArg) && spouseArray.includes(secondArg)) {
      // if parent's husband -> it is your dad
      if (secondArg === "husband" ) {
          firstArg = "dad";
          secondArg = "";
      }
      if (secondArg === "wife" ) {
          firstArg = "mom";
          secondArg = "";
      }
  }

  return [firstArg, secondArg];
}

function calculateLevel(argArray) {
  let counter = 0;
  for (let i=0; i < argArray.length; i++) {
    // ignore same level args
    if (!siblingsArray.includes(argArray[i]) && !spouseArray.includes(argArray[i])) {
        if (parentArray.includes(argArray[i])) {
          counter++;
        } else if (childrenArray.includes(argArray[i])){
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

      if (!result.hasOwnProperty(argArray[i])) {
        result = "";
        break;
      }
      result = result[argArray[i]];
  }

  return result;
}
