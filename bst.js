import mergeSort from "./merge-sort.js";

class Node {
  constructor(_data, _left = null, _right = null) {
    this.data = _data;
    this.left = _left;
    this.right = _right;
  }
}

export default class Tree {
  constructor(_array) {
    this.array = _array;
    this.root = this.buildTree(mergeSort(_array));
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

      // Error (the message is coming from findParentNode method)
      if (parent === null) return null;

      // Search the nodes on the parent for the given data
      return data < parent.data ? parent.left : parent.right;
    }
  }

  delete(data) {
    // Searches the passed data and delete it
    let parentNode;
    let wantedNode;

    // Finds the parent of the node to be deleted
    if (data === this.root.data) {
      wantedNode = this.root;
    } else {
      parentNode = this.findParentNode(data);

      // Error (the message is coming from findParentNode method)
      if (parentNode === null) return;

      /* Finds the node to be deleted and saves it in wantedNode. Decided to not
      call findNode, because it will call the findParentNode method again */
      if (data < parentNode.data) wantedNode = parentNode.left;
      else wantedNode = parentNode.right;
    }

    // Verify how much children the wantedNode has
    if (wantedNode.left === null && wantedNode.right === null) {
      // If the wanted node have no leaves
      if (parentNode.left !== null && parentNode.left.data === data) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    } else if (wantedNode.left === null || wantedNode.right === null) {
      // If the wanted node have one leaf, verify where that one leaf will go to

      if (data < parentNode.data) {
        // If the wanted node it's on the left side of its parent
        if (wantedNode.left !== null) {
          parentNode.left = wantedNode.left;
        } else {
          parentNode.left = wantedNode.right;
        }
      } else {
        // If the wanted node it's on the right side of its parent
        if (wantedNode.left !== null) {
          parentNode.right = wantedNode.left;
        } else {
          parentNode.right = wantedNode.right;
        }
      }
    } else {
      // If the wanted node have two leaves
      // Finds the "next biggest"
      let currentNode = wantedNode.right;
      let nextBiggest;
      while (nextBiggest === undefined) {
        if (currentNode.left === null) {
          nextBiggest = currentNode.data;
        } else {
          currentNode = currentNode.left;
        }
      }
      // Recursively calls delete
      this.delete(nextBiggest);
      // The node to be deleted receives the data from the next biggest
      wantedNode.data = nextBiggest;
    }
  }

  levelOrder() {
    // Return an array with the elements of the tree in a level order
    let queue = [this.root];
    let removed;
    let result = [];

    while (queue.length > 0) {
      removed = queue.shift();
      if (removed.left !== null) queue.push(removed.left);
      if (removed.right !== null) queue.push(removed.right);
      result.push(removed.data);
    }

    return result;
  }

  traverse() {
    /* Traverse the tree in pre/in/post order, and returns an array with the 
    ordered data. How to use: traverse().preorder() */
    let stack = [];

    const preorder = (root = this.root) => {
      if (root === null) {
        return;
      } else {
        preorder(root.left);
        stack.push(root.data);
        preorder(root.right);
        return stack;
      }
    };

    const inorder = (root = this.root) => {
      if (root === null) {
        return;
      } else {
        stack.push(root.data);
        inorder(root.left);
        inorder(root.right);
        return stack;
      }
    };

    const postorder = (root = this.root) => {
      if (root === null) {
        return;
      } else {
        postorder(root.left);
        postorder(root.right);
        stack.push(root.data);
        return stack;
      }
    };

    return { preorder, inorder, postorder };
  }

  height(data) {
    /* Accepts a node and returns its height. Height is defined as the number of
    edges in longest path from a given node to a leaf node. */
    if (data === this.root.data) return 1;

    let currNode = this.root; // Current node
    let height = 1;

    while (currNode.data !== data) {
      if (data < currNode.data) {
        currNode = currNode.left;
        height++;
      } else {
        currNode = currNode.right;
        height++;
      }

      if (currNode === null) {
        console.log("Data not found");
        return null;
      }
    }

    return height;
  }

  rebalance() {
    // Updates the root with a balanced tree
    this.root = this.buildTree(this.traverse().preorder());
  }
}
