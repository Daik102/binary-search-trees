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

      let curr = root.right;

      while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }

      const succ = curr;
      root.value = succ.value;
      root.right = deleteItem(root.right, succ.value);
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

    
  };

  const preOrderForEach = (root) => {
    if (!root) {
      throw new Error("Callback is required.");
    }

    const result = [];
    const stack = [root];
    
    while (stack.length > 0) {
      const node = stack.pop();
      result.push(node.value);

      if (node.right !== null) {
        stack.push(node.right);
      }
      
      if (node.left !== null) {
        stack.push(node.left);
      }
    }

    return result;
  };

  const postOrderForEach = (root) => {
    if (!root) {
      throw new Error("Callback is required.");
    }


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

  };
}


const arrOne = [1, 4, 2, 9, 5, 1, 10, 6, 2];
const bst = tree(arrOne);

bst.insert(bst.root, 3);
bst.insert(bst.root, 8);
bst.insert(bst.root, 7);
bst.insert(bst.root, 11);
bst.deleteItem(bst.root, 7);
bst.deleteItem(bst.root, 10);
const findOne = bst.find(bst.root, 6);
const levelOrderOne = bst.levelOrderForEach(bst.root);
//const inOrderOne = bst.inOrderForEach(bst.root);
const preOrderOne = bst.preOrderForEach(bst.root);
//const postOrderForEach = bst.postOrderForEach(bst.root);
console.log(preOrderOne);

bst.prettyPrint(bst.root);
