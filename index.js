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
    this.root = this.buildTree(_array);
  }

  buildTree(array) {
    /* Takes an array and turns it into a balanced binary tree full of Node 
    objects appropriately placed and returns the level-0 root node. */

    if (array.length === 1) {
      // Returns a node with the data empty nodes
      return new Node(array[0]);
    } else if (array.length === 2) {
      // Returns a node with the data, and a node on the left
      return new Node(array[0], this.buildTree(array.slice(1)));
    } else {
      // Finds the INDEX of the middle element
      const midIndex = Math.floor(array.length / 2);

      // Slices the array
      const leftArray = array.slice(0, midIndex);
      const rightArray = array.slice(midIndex + 1);

      /* Recursively creates new nodes with the data being the middle element, 
      and the nodes being created from the halves of the array */
      const root = new Node(
        array[midIndex],
        this.buildTree(leftArray),
        this.buildTree(rightArray)
      );

      // Returns the generated node
      return root;
    }
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    /* Prints the tree in a structured format. 
    Made by the awesome people from TheOdinProject.com */
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(data) {
    // Searches a empty leaf to insert the data

    let currentNode = this.root;
    let insert = false;

    // While the insertion doesn't happen...
    while (!insert) {
      // If the passed data is lesser than the data on the node...
      if (data < currentNode.data) {
        // ...it verifies if the left leaf is empty
        if (currentNode.left === null) {
          // If it's empty, insert a new node with the passed data and empty nodes
          currentNode.left = new Node(data);
          insert = true;
        } else {
          // If isn't empty, "currentNode" changes to the left node
          currentNode = currentNode.left;
        }
      } else {
        /* If the passed data is greater or equal to the data on the node, 
        do the same as the condition above, but directed to the right node */
        if (currentNode.right === null) {
          currentNode.right = new Node(data);
          insert = true;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }
}

// ################################### Tests ###################################
const sortedArray = mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 0, 872]);
const tree = new Tree(sortedArray);
tree.prettyPrint();
