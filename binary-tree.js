/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }
  
  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  
  

  minDepth() {
    if (!this.root) return 0
    
    function helper(node){
      if(node.left === null && node.right == null) return 1;
      if(node.left === null) return helper(node.right) +1;
      if(node.right === null) return helper(node.left) +1;
      return(
        Math.min(helper(node.left), helper(node.right))+1
      );
      
    }
    return helper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0
    
    function helper(node){
      if(node.left === null && node.right == null) return 1;
      if(node.left === null) return helper(node.right) +1;
      if(node.right === null) return helper(node.left) +1;
      return(
        Math.max(helper(node.left), helper(node.right))+1
      );
      
    }
    return helper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0
    let sum_ =-9999
    function helper(node){
      if(!node) return 0;

      const leftSum = helper(node.left);
      const rightSum = helper(node.right);

      sum_ = Math.max(sum_, leftSum + rightSum + node.val);
      return Math.max(leftSum, rightSum) + node.val;
      
    }
    helper(this.root);
    return sum_;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if(!this.root) return null;
    
    let nextValue = null;
    function inOrderTraversal(node){
      if(!node) return;

      inOrderTraversal(node.left);

      if(node.val > lowerBound){
        if(nextValue === null || node.val < nextValue){
          nextValue = node.val;
        }
      }
      inOrderTraversal(node.right);
    }
    inOrderTraversal(this.root);

    return nextValue;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */
  // BFS
  areCousins(node1, node2) {
    if(!this.root || !node1 || !node2) return false;

    function helper(nodeToFind, curr_Node, level =0, data={level:0, parent:null}){
      if(data.parent)return data;
      if(curr_Node.left === nodeToFind || curr_Node.right === nodeToFind){
        data.level = level +1;
        data.parent = curr_Node;
      }
      if(curr_Node.left) {helper(nodeToFind, curr_Node.left, level+1, data)}
      if(curr_Node.right) {helper(nodeToFind, curr_Node.right, level+1, data)}
      return data;
    } 

    let node1_info = helper(node1, this.root);
    let node2_info = helper(node2, this.root);

    let same_level = node1_info && node2_info && (node1_info.level === node2_info.level)
    let diff_parent = node1_info && node2_info && (node1_info.parent !== node2_info.parent)

    return same_level && diff_parent;

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */
  // BFS
  static serialize(tree) {
    if (!tree) return '';
    let result = []

    function traverse(node){
      if(node){
        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
      }
      else{
        result.push('null');
      }
    }
    traverse(tree.root);
    return result.join(',');
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if(!stringTree) return null;

    let values= stringTree.split(',');
    function buildTree(){
      if(values.length){
        const currVal = values.shift();

        if(currVal ==='null') return null;

        let currentNode = new BinaryTreeNode(+currVal);
        currentNode.left = buildTree();
        currentNode.right = buildTree();
        return currentNode;
      }
    }
    const root = buildTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode = this.root) {
    if(!currentNode) return null;
    if(currentNode === node1 || currentNode === node2) return currentNode;
    
    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);

    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    if(left && right) return currentNode;

    if(left || right) return left ||right;

    if(!left && !right) return null;
  }
  
}

module.exports = { BinaryTree, BinaryTreeNode };
