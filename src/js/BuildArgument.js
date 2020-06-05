


export function appendSToResults(state) {

  let toPrintedResult;
  let toResult;

  if (state.argStringToPrint !== "") {
       toPrintedResult = state.argStringToPrint + "'s ";
       toResult = state.argString + "'s ";
  } else {
       toPrintedResult = state.argStringToPrint
       toResult = state.argString;
  }

  return {toPrintedResult, toResult};

}

export function addButtonArgument(button, toPrintedResult) {

  switch (button) {
    case "oldersister":
      toPrintedResult = toPrintedResult + "older sister"
      break;
    case "youngersister":
      toPrintedResult = toPrintedResult + "younger sister"
      break;
    case "olderbrother":
      toPrintedResult = toPrintedResult + "older brother"
      break;
    case "youngerbrother":
      toPrintedResult = toPrintedResult + "younger brother"
      break;
    default:
      toPrintedResult = toPrintedResult + button
  }

  return toPrintedResult;
}
