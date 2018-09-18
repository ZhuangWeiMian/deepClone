// 深克隆
const clone = parent => {
    const parents = [];
    const children = [];

    const _clone = parent => {
        if (parent === null) return null;
        if (typeof parent !== 'object') return parent;

        let child, proto;
        // 用typeName。因为像RegExp，Date这些类型无法通过普通的类型判断得到
        let typeName = Object.prototype.toString.call(parent).slice(8, -1);
        if (typeName === 'Array') {
            child = [];
        } else if (typeName === 'RegExp') {
            child = new RegExp(parent.source, parent.flags);
            if (parent.lastIndex) child.lastIndex = parent.lastIndex;
        } else if (typeName === 'Date') {
            child = new Date(parent.getTime());
        } else {
            proto = Object.getPrototypeOf(parent);
            child = Object.create(proto);
        }
        // 处理循环引用
        const index = parents.indexOf(parent);
        if (index !== -1) {
            return children[index]
        }
        parents.push(parent);
        children.push(child);
        for (let i in parent) {
            child[i] = _clone(parent[i]);
        }
        return child;
    }
    return _clone(parent);
}
let a = 222;
let b = clone(a);
console.log(b)
let c = function() {
    return(333)
}
let d = clone(c);
console.log(d());

let time = new Date();
let time2 = clone(time);
console.log(time2);

let obj = {a: 1, b: 3};
let obj2 = clone(obj)
console.log(obj2)

let arr = [2,22,33,[22, 22]]
let arr2 = clone(arr)
console.log(arr2)
