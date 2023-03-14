import mergeSort from "./merge-sort.js";

class Node {
  constructor(_data, _left = null, _right = null) {
    this.data = _data;
    this.left = _left;
    this.right = _right;
  }
}

class Tree {
  constructor(_array) {
    this.array = _array;
  }

  buildTree() {
    console.log(this.array);
  }
}

// ################################### Tests ###################################
const sortedArray = mergeSort([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);
const tree = new Tree(sortedArray);
