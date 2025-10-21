#!/usr/bin/env node

function node(data) {
  return {
    data,
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

    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  const insert = (root, key) => {
    if (root === null) {
      return node(key);
    }

    if (key < root.data) {
      root.left = insert(root.left, key);
    } else {
      root.right = insert(root.right, key);
    }

    return root;
  };

  const deleteItem = (root, key) => {
    if (root === null) {
      return root;
    }

    if (root.data > key) {
      root.left = deleteItem(root.left, key);
    } else if (root.data < key) {
      root.right = deleteItem(root.right, key);
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
      root.data = succ.data;
      root.right = deleteItem(root.right, succ.data);
    }

    return root;
  };

  return {
    root: buildTree(sortedArray, 0, sortedArray.length - 1),
    prettyPrint,
    insert,
    deleteItem,

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

bst.prettyPrint(bst.root);
