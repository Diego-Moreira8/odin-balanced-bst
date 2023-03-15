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
    this.root;
  }

  buildTree(array) {
    // For the first call
    if (array === undefined) {
      array = this.array;
    }

    // >>> Maybe a condition for length===2
    if (array.length === 1) {
      return new Node("DATA");
    }

    // Finds the INDEX of the middle element
    const midIndex = Math.floor(array.length / 2);

    // Slices the array
    const leftArray = array.slice(0, midIndex);
    const rightArray = array.slice(midIndex + 1);

    // Recursively creates new nodes
    const root = new Node(
      "DATA",
      this.buildTree(leftArray),
      this.buildTree(rightArray)
    );

    // Returns the generated node
    return root;
  }
}

// ################################### Tests ###################################
const sortedArray = mergeSort([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);
const tree = new Tree(sortedArray);
tree.buildTree();
