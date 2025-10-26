#!/usr/bin/env node

import { tree } from "./binary-search-trees.js";

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
