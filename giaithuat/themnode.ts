class TreeNode<E> {
    public data: E;
    public left: TreeNode<E> | null;
    public right: TreeNode<E> | null;

    constructor(data: E) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
interface Tree<E> {
    insert(data: E): TreeNode<E>;
    inorder(node: TreeNode<E>): void;
    getSize(): number;
}
class BinaryTree<E> implements Tree<E>{
    root: TreeNode<E> | null;
    totalNode: number;

    constructor() {
        this.root = null;
        this.totalNode = 0;
    }

    public getSize(): number {
        return this.totalNode;
    }

    inorder(node: TreeNode<E>): void {
        if (node) {
            console.log(node.data)
            if (node.left) {
                this.inorder(node.left)
            }
            if (node.right) {
                this.inorder(node.right)
            }
        }
    }
//hàm insert nếu chưa có node root thì insert node đầu tiên
// Nếu có node rồi gán this.root là curentNode: so sánh giá trị thêm vào với current node
    insert(data: E): TreeNode<E> {
        if (!this.root) {
            this.root = new TreeNode<E>(data);
            this.totalNode++;
            return this.root;
        } else {
            let node = new TreeNode<E>(data);
            let currentNode = this.root;

            while (currentNode) {
                /* so sánh giá trị currentNode với data */
                if (data < currentNode.data) {
                    /* Trường hợp node thêm vào < node hiện tại
                    nếu currentNode không có phần tử bên trái thì gán bên trái của
                        currentNode bằng node cần thêm
                        Nếu nút hiện tại không có node bên trái thì thêm vào bên trái
                        Nếu có rồi thì gán nút hiện tại là node bên trái của node hiện tại và đi đến node chưa có node bên trái
                     */
                    if (!currentNode.left) {
                        currentNode.left = node;
                        break;
                    }
                    currentNode = currentNode.left;
                    /*
                    Trường hợp node thêm vào > node hiện tại
                    nếu currentNode không có phần tử bên phải thì gán bên phải của
                    currentNode bằng node cần thêm
                    Nếu nút hiện tại không có node bên phải thì thêm vào bên phải
                    Nếu có rồi thì gán nút hiện tại là node bên phải của node hiện tại và đi đến node chưa có node bên phải
                 */
                } else if (data > currentNode.data) {
                    if (!currentNode.right) {
                        currentNode.right = node;
                        break;
                    }
                    /* gán lại currentNode cho node bên phải */
                    currentNode = currentNode.right;
                }
            }
            this.totalNode++;
            return currentNode;
        }
    }
}
let tree = new BinaryTree<number>();
tree.insert(6);
tree.insert(5);
tree.insert(7);
tree.insert(3);
tree.insert(4);

console.log(`The numbers of nodes ${tree.totalNode}`)
tree.inorder(tree.root)