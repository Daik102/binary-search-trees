#!/usr/bin/env node

function node(value) {
  return {
    value,
    left: null,
    right: null
  };
}

function tree(array) {
  const nonDuplicatedArray = array.filter((item, i) => array.indexOf(item) === i);
  const sortedArray = nonDuplicatedArray.sort((a, b) => a - b);

  const buildTree = (array, start, end) => {
    if (start > end) {
      return null;
    }
    
    let mid = start + Math.floor((end - start) / 2);
    let root = node(array[mid]);
    
    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
  };

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }

    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);

    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  const insert = (root, value) => {
    if (root === null) {
      return node(value);
    }

    if (value < root.value) {
      root.left = insert(root.left, value);
    } else {
      root.right = insert(root.right, value);
    }

    return root;
  };

  const deleteItem = (root, value) => {
    if (root === null) {
      return root;
    }

    if (root.value > value) {
      root.left = deleteItem(root.left, value);
    } else if (root.value < value) {
      root.right = deleteItem(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      let current = root.right;

      while (current !== null && current.left !== null) {
        current = current.left;
      }

      const successor = current;
      root.value = successor.value;
      root.right = deleteItem(root.right, successor.value);
    }

    return root;
  };

  const find = (root, value) => {
    if (root === null) {
      return root;
    }

    let current = root;

    while (current !== null) {
      if (value === current.value) {
        return current;
      } else if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      }
    }
  };

  const levelOrderForEach = (root) => {
    if (!root) {
      throw new Error("Callback is required.");
    }

    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevelNodes = [];

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        currentLevelNodes.push(node.value);

        if (node.left) {
          queue.push(node.left);
        }

        if (node.right) {
          queue.push(node.right);
        }
      }
      
      result.push(currentLevelNodes);
    }

    return result;
  };

  const inOrderForEach = (root) => {
    if (!root) {
      throw new Error("Callback is required.");
    }

    const result = [];

    function traverse(node) {
      if (node === null) {
        return;
      }

      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    }

    traverse(root);
    return result;
  };

  const preOrderForEach = (root) => {
    if (!root) {
      throw new Error("Callback is required.");
    }

    const result = [];

    function traverse(node) {
      if (node === null) {
        return;
      }

      result.push(node.value);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(root);
    return result;
  };

  const postOrderForEach = (root) => {
    if (!root) {
      throw new Error("Callback is required.");
    }

    const result = [];

    function traverse(node) {
      if (node === null) {
        return;
      }

      traverse(node.left);
      traverse(node.right);
      result.push(node.value);
    }

    traverse(root);
    return result;
  };

  const getHeight = (node) => {
    if (node === null) {
      return null;
    }

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
  };

  const height = (root, value) => {
    if (root === null) {
      return null;
    }

    if (root.value === value) {
      const result = getHeight(root);
      return result - 1;
    }
    
    const leftResult = height(root.left, value);

    if (leftResult !== null) {
      return leftResult; // Found in left subtree
    }

    const rightResult = height(root.right, value);
    
    return rightResult; // Return result from right subtree (or -1 if not found)
  };

  const depth = (root, value) => {
    if (root === null) {
      return -1;
    }

    function search(node, currentDepth) {
      if (node.value === value) {
        return currentDepth;
      }

      let leftDepth = -1;
      let rightDepth = -1;
      
      if (node.left !== null) {
        leftDepth = search(node.left, currentDepth + 1);
      }

      if (node.right !== null) {
        rightDepth = search(node.right, currentDepth + 1);
      }

      if (leftDepth !== -1) {
        return leftDepth;
      }
      if (rightDepth !== -1) {
        return rightDepth;
      }

      return -1;
    }

    let result = search(root, 0);

    if (result === -1) {
      return null;
    } else {
      return result;
    }
  };

  const isBalanced = (root) => {
    if (root === null) {
      return true;
    }
    
    const leftHeight = getHeight(root.left);
    const rightHeight = getHeight(root.right);
    
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return isBalanced(root.left) && isBalanced(root.right);
  };

  const rebalance = (root) => {
    const array = inOrderForEach(root);
    return buildTree(array, 0, array.length - 1);
  };

  return {
    root: buildTree(sortedArray, 0, sortedArray.length - 1),
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrderForEach,
    inOrderForEach,
    preOrderForEach,
    postOrderForEach,
    height,
    depth,
    isBalanced,
    rebalance
  };
}

function createArray(quantity) {
  const array = [];

  while (array.length < quantity) {
    const randomNum = Math.floor(Math.random() * 99) + 1; // Create from 1 to 99 random number
    let same;

    for (const item of array) {
      if (item === randomNum) {
        same = true;
        break;
      }
    }

    if (!same) {
      array.push(randomNum);
    }
  }

  return array;
}

const arrOne = createArray(12);
const bst = tree(arrOne);

bst.insert(bst.root, 110);
bst.insert(bst.root, 120);
bst.insert(bst.root, 130);
// bst.deleteItem(bst.root, 130);

const findOne = bst.find(bst.root, 110);
const levelOrderOne = bst.levelOrderForEach(bst.root);
const inOrderOne = bst.inOrderForEach(bst.root);
const preOrderOne = bst.preOrderForEach(bst.root);
const postOrderOne = bst.postOrderForEach(bst.root);
const heightOne = bst.height(bst.root, 120);
const depthOne = bst.depth(bst.root, 130);

const balancedOne = bst.isBalanced(bst.root);
const rebalanceOne = bst.rebalance(bst.root);
const balancedTwo = bst.isBalanced(rebalanceOne);
const levelOrderTwo = bst.levelOrderForEach(rebalanceOne);
const inOrderTwo = bst.inOrderForEach(rebalanceOne);
const preOrderTwo = bst.preOrderForEach(rebalanceOne);
const postOrderTwo = bst.postOrderForEach(rebalanceOne);
// console.log(heightOne);
// console.log(depthOne);
// console.log(levelOrderOne);
// console.log(inOrderOne);
// console.log(preOrderOne);
// console.log(postOrderForEach);
console.log(balancedOne);
console.log(balancedTwo);

console.log(levelOrderTwo);
console.log(inOrderTwo);
console.log(preOrderTwo);
console.log(postOrderTwo);

bst.prettyPrint(rebalanceOne);
