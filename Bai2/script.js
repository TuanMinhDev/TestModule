function nhapMang() {
    let n = prompt('Nhập số lượng phần tử của mảng:'); 
    n = parseInt(n);

    let arr = [];
    
    for (let i = 0; i < n; i++) {
        let num = prompt(`Nhập phần tử thứ ${i + 1}:`);
        arr.push(Number(num));
    }
    
    return arr; 
}

let a=nhapMang();
let b=nhapMang();
let c=[];
let d=[];
for(let i=0;i<a.length;i++){
    for(let j=0;j<b.length;j++){
        if(a[i]==b[j]){
            c.push(a[i]);
        }
    }
}
for (let i = 0; i < a.length; i++) {
    if (!c.includes(a[i])) {
        d.push(a[i]);
    }
}
for (let i = 0; i < b.length; i++) {
    if (!c.includes(b[i])) {
        d.push(b[i]);
    }
}
console.log(d);
