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

  return {
    root: buildTree(sortedArray, 0, sortedArray.length - 1)
  };
}

function buildTree(array, start, end) {
  if (start > end) {
    return null;
  }
  
  let mid = start + Math.floor((end - start) / 2);
  let root = node(array[mid]);
  
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
}

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


const arrOne = [1, 4, 2, 9, 5, 1, 10, 6, 2];
const myBST = tree(arrOne);
prettyPrint(myBST.root);
