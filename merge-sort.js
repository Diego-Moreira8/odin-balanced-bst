// Sort an array of data
// This implementation of mergeSort removes duplicates!

export default function mergeSort(array) {
  // Verify the input
  if (typeof array !== "object") {
    console.log("The passed parameter must be an array");
    return null;
  }

  if (array.length < 2) {
    // When the array is smaller than 2, it is already sorted, so just return it
    return array;
  } else {
    // Split the array in two halves
    let arrayA = array.slice(0, array.length / 2);
    let arrayB = array.slice((array.length / 2) * 1);

    // Update the variables with the ordered halves (recursively)
    arrayA = mergeSort(arrayA);
    arrayB = mergeSort(arrayB);

    // Clear "array" to reuse it. The ordered array will be stored in it.
    array = [];

    // While there are halves with elements, take the smaller of the first
    // element, remove it, and push it into "array".
    while (arrayA.length > 0 && arrayB.length > 0) {
      if (arrayA[0] < arrayB[0]) {
        // Verify if the element already exists
        if (array[array.length - 1] === arrayA[0]) {
          arrayA.shift();
        } else {
          array.push(arrayA.shift());
        }
      } else {
        // Verify if the element already exists
        if (array[array.length - 1] === arrayA[0]) {
          arrayB.shift();
        } else {
          array.push(arrayB.shift());
        }
      }
    }

    // When one of the halves is empty, store the values of the other in "array"
    let notEmptyArray = arrayA.length > 0 ? arrayA : arrayB;
    while (notEmptyArray.length > 0) {
      if (notEmptyArray[0] === array[array.length - 1]) {
        notEmptyArray.shift();
      } else {
        array.push(notEmptyArray.shift());
      }
    }

    // Return the sorted array with duplicates removed!
    return array;
  }
}
