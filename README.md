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
//

prettyPrint((node = this.root), (prefix = ""), (isLeft = true));
//

insert(data);
//

findParentNode(data);
//

findNode(data);
//

delete data;
//

levelOrder();
//

traverse();
//

height(data);
//

rebalance();
//
```
