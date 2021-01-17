import { Observable } from 'rxjs';
console.log("Hello!!!!!!");
// const td = document.querySelector('td');
var observable = Observable.create((observer:any) => {
    observer.next('Hello World!');
    observer.next('Hello Again!');
    observer.complete();
    observer.next('Bye');
})
observable.subscribe(
    (x:any) => logItem(x),
    (error: any) => logItem (`error: ${error}`),
    () => logItem('Completed')
);
function logItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}


// //Global Variables
// var tableNode: HTMLTableElement = <HTMLTableElement> document.getElementById("table");
// var tds = tableNode.getElementsByTagName('td');
// var RowIndex;
// var CurrRow = 11;
// var ColumnIndex;
// var CurrColumn = 27;


// document.getElementById("CreatTable").addEventListener("click", CreateTable);
// //create table
// // CreateTable();
// function CreateTable() {
//     // var tableNode = document.getElementById("table");
//     tableNode.setAttribute("id", "table")
//     for (var x = 0; x < CurrRow; x++) {
//         var trNode = tableNode.insertRow();
//         for (var y = 0; y < CurrColumn; y++) {
//             var tdNode = trNode.insertCell();
//             // tdNode.setAttribute("contenteditable", "true")
//             if (x === 0 && y != 0) {
//                 tdNode.innerHTML = String.fromCharCode((65 + y - 1));
//                 // tdNode.setAttribute("id", "Column"+y);
//                 // tdNode.attachEvent("onclick","Column"+y);
//             }
//             else if (y === 0 && x != 0) {
//                 tdNode.innerHTML = x;
//                 // tdNode.setAttribute("id", "Row"+x);
//                 // tdNode.attachEvent("onclick","Row"+x);
//             }
//             else {
//                 tdNode.innerHTML = "";
//                 tdNode.setAttribute("contenteditable", "true")
//                 tdNode.setAttribute("ondblclick", "caclculate()")
//             }
//         }
//     }
//     document.getElementById("div2").appendChild(tableNode);
// }




// import { Observable } from 'rxjs';
// var observable = Observable.create((observer:any) => {
//     observer.next('Hello World!');
//     observer.next('Hello Again!');
//     observer.complete();
//     observer.next('Bye');
// })
// observable.subscribe(
//     (x:any) => logItem(x),
//     (error: any) => logItem (`error: ${error}`),
//     // () => logItem('Completed')
// );
// function logItem(val:any) {
//     var node = document.createElement("li");
//     var textnode = document.createTextNode(val);
//     node.appendChild(textnode);
//     document.getElementById("output").appendChild(node);
// }