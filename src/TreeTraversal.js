
var siblingsArray = ["oldersister", "olderbrother", "youngersister", "youngerbrother"];
var parentArray = ["mom", "dad"];
var spouseArray = ["husband", "wife"];
var childrenArray = ["son", "daughter"];

//removes redundant arguments from the path
export function removeRedundantArguments(arg_array) {

  for (var i=0; i < arg_array.length-1; i++) {
    // ex. sibling's parents == your parents
    var siblingParentsCondition = siblingsArray.includes(arg_array[i]) && parentArray.includes(arg_array[i+1]);
    // ex. spouse's kids == your kids
    var spouseKidsCondition = spouseArray.includes(arg_array[i]) && childrenArray.includes(arg_array[i+1]);
    // ex. spouse's spouse == you
    var spouseSpouseCondition = spouseArray.includes(arg_array[i]) && spouseArray.includes(arg_array[i + 1])
       && spouseArray.indexOf(arg_array[i]) !== spouseArray.indexOf(arg_array[i+1]);

    // ex. your older sibling's older sister == your older sister
    var siblingSiblingCondition = siblingsArray.includes(arg_array[i]) && siblingsArray.includes(arg_array[i + 1])
    // array indices 0+ 1 are older siblings, 2 + 3 are younger siblings (see siblingsArray above)
       && ( ((siblingsArray.indexOf(arg_array[i]) === 0 || 1 ) && (siblingsArray.indexOf(arg_array[i+1]) === 0 || 1))  ||
          ((siblingsArray.indexOf(arg_array[i]) === 2 || 3 ) && ( siblingsArray.indexOf(arg_array[i+1]) === 2 || 3)) );

    if (siblingParentsCondition || spouseKidsCondition || spouseSpouseCondition || siblingSiblingCondition) {
       arg_array[i] = "";
    }

    // simplify child path
    if (childrenArray.includes(arg_array[i]) && siblingsArray.includes(arg_array[i+1])) {
        // if child's older or younger sister -> it is their daughter
        if (siblingsArray.indexOf(arg_array[i+1]) === 0 || siblingsArray.indexOf(arg_array[i+1]) === 2 ) {
            arg_array[i] = "daughter";
            arg_array[i+1] = "";
        }
        if (siblingsArray.indexOf(arg_array[i+1]) === 1 || siblingsArray.indexOf(arg_array[i+1]) === 3 ) {
            arg_array[i] = "son";
            arg_array[i+1] = "";
        }
    }

    // simplify parent path
    if (parentArray.includes(arg_array[i]) && spouseArray.includes(arg_array[i+1])) {
        // if child's older or younger sister -> it is their daughter
        if (arg_array[i+1] === "husband" ) {
            arg_array[i] = "dad";
            arg_array[i+1] = "";
        }
        if (arg_array[i+1] === "wife" ) {
            arg_array[i] = "mom";
            arg_array[i+1] = "";
        }
    }

    //simplify parent child path (mom's kid == dad's kid) dataset only has children under dad
    if (parentArray.includes(arg_array[i]) && childrenArray.includes(arg_array[i+1])) {
        arg_array[i] = "dad";
    }

  }

  return arg_array;
}

export function traverseTree(result, arg_array) {

  // traverse tree to right place
  for (var i=0; i < arg_array.length; i++) {
    // ignore "" args
    if (arg_array[i] !== "") {
      if (!result.hasOwnProperty(arg_array[i])) {
        result = "";
        break;
      }
      result = result[arg_array[i]];
    }
  }

  return result;
}
