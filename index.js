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
      // Returns a node with the data, and a node on the right
      return new Node(array[0], null, this.buildTree(array.slice(1)));
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

  findParentNode(data) {
    // Finds and returns the node parent of a node with the given data
    /* Returns null if the data have no parents (the root), or if it doesn't 
    find the data */

    let parent;
    let currNode = this.root; // Current node

    if (data === this.root.data) {
      console.log("No parents: the data is currently on the root of the tree.");
      return null;
    }

    while (parent === undefined) {
      if (currNode === null) {
        console.log("Data not found");
        return null;
      } else if (data < currNode.data) {
        // If the given data is lesser than the data on the parent...
        if (currNode.left !== null && currNode.left.data === data) {
          // If the parent has the left child with the given data
          parent = currNode;
        } else if (currNode.right !== null && currNode.right.data === data) {
          // If the parent has the right child with the given data
          parent = currNode;
        } else {
          /* If the parent of the given data isn't founded, 
          goes to the left node */
          currNode = currNode.left;
        }
      } else {
        // If the given data is greater than the data on the parent...
        /* Does the same as the condition above but in the end, goes to the
        right node if doesn't find the parent with the given data */
        if (currNode.left !== null && currNode.left.data === data) {
          parent = currNode;
        } else if (currNode.right !== null && currNode.right.data === data) {
          parent = currNode;
        } else {
          currNode = currNode.right;
        }
      }
    }

    return parent;
  }

  findNode(data) {
    // Finds and return the node with the given data
    if (this.root.data === data) {
      return this.root;
    } else {
      // Searches for the parent of the given data
      const parent = this.findParentNode(data);

      // Search the nodes on the parent for the given data
      let wantedNode;
      if (data < parent.data) wantedNode = parent.left;
      else wantedNode = parent.right;

      return wantedNode;
    }
  }

  delete(data) {
    // Finds the parent of the node to be deleted
    let parentNode = this.findParentNode(data);

    /* Finds the node to be deleted and saves it in wantedNode.
    Decided to not call findNode, because it will call findParentNode() again */
    let wantedNode;
    if (data === parentNode.data) wantedNode = parentNode;
    else if (data < parentNode.data) wantedNode = parentNode.left;
    else wantedNode = parentNode.right;

    // Verify how much children the wantedNode has
    if (wantedNode.left === null && wantedNode.right === null) {
      // If the wanted node have no leaves
      if (parentNode.left !== null && parentNode.left.data === data) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    } else if (wantedNode.left === null || wantedNode.right === null) {
      // If the wanted node have one leaf
      if (wantedNode.left !== null) {
        parentNode.left = wantedNode.left;
      } else {
        parentNode.right = wantedNode.right;
      }
    } else {
      // If the wanted node have two leaves
      // Finds the "next biggest"
      let currentNode = wantedNode.right;
      let nextBiggest;
      while (nextBiggest === undefined) {
        if (currentNode.left === null) {
          nextBiggest = currentNode;
        } else {
          currentNode = currentNode.left;
        }
      }
      // The node to be deleted receives the data from the next biggest
      wantedNode.data = nextBiggest.data;

      // Recursively calls delete
      // this.delete(nextBiggest.data, wantedNode.right);
    }
  }
}

// ################################### Tests ###################################
const sortedArray = mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 0, 872]);
const tree = new Tree(sortedArray);
tree.prettyPrint();

// tree.delete(872); // No leafs
// tree.delete(67); // One leaf
// tree.delete(23); // Two leafs

console.log("#################################################");
tree.prettyPrint();
