# Linked List

This is a project for implementing a Binary Search Tree in JavaScript. A BST is a data structure where each element is a node that contains a reference to two other nodes. The project was proposed by [The Odin Project](https://www.theodinproject.com), as an exercise to solidify the learning of data structures.

## How to use

- Import the Tree class to your code:

```javascript
import Tree from "./bst.js";
```

- Create a tree:

```javascript
new Tree([6, 1, 9]);
// The passed array will be ordered by the included Merge Sort algorithm
```

## Tree methods

```javascript
buildTree(array);
/* Takes an array and turns it into a balanced binary tree full of Node objects
appropriately placed and returns the level-0 root node */

prettyPrint();
/* Prints the tree in a structured format.
Made by the awesome people from TheOdinProject.com */

insert(data);
// Searches a empty leaf to insert the data

findParentNode(data);
/* Finds and returns the node parent of a node with the given data. 
Returns null if the data have no parents (the root), or if it doesn't 
find the data */

findNode(data);
// Finds and return the node with the given data

delete(data);
// Searches the passed data and delete it

levelOrder();
// Return an array with the elements of the tree in a level order

traverse().preorder();
traverse().inorder();
traverse().postorder();
/* Traverse the tree in pre/in/post order, and returns an array with the 
ordered data */

height(data);
/* Accepts a node and returns its height. Height is defined as the number of 
edges in longest path from a given node to a leaf node */

rebalance();
// Updates the root with a balanced tree
```
