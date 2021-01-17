//Global Variables
var tableNode = document.getElementById("table");
var tds = tableNode.getElementsByTagName('td');
var RowIndex;
var CurrRow = 11;
var ColumnIndex;
var CurrColumn = 27;

document.getElementById("btnAddRow").addEventListener("click", btnAddRow);
document.getElementById("btnDeleteRow").addEventListener("click", btnDeleteRow);
document.getElementById("btnAddColumn").addEventListener("click", btnAddColumn);
document.getElementById("btnDeleteColumn").addEventListener("click", btnDeleteColumn);
document.getElementById("upload").setAttribute("onclick", "ImportCSV()");
document.getElementById("btnSave").setAttribute("onclick", "ExportCSV('Export.csv')");

//create table
CreateTable();
function CreateTable() {
    var tableNode = document.getElementById("table");
    tableNode.setAttribute("id", "table")
    for (var x = 0; x < CurrRow; x++) {
        var trNode = tableNode.insertRow();
        for (var y = 0; y < CurrColumn; y++) {
            var tdNode = trNode.insertCell();
            if (x === 0 && y != 0) {
                //A-Z
                tdNode.innerHTML = String.fromCharCode((65 + y - 1));
            }
            else if (y === 0 && x != 0) {
                tdNode.innerHTML = x;
            }
            else {
                tdNode.innerHTML = "";
                tdNode.setAttribute("contenteditable", "true")
            }
        }
    }
    document.getElementById("div2").appendChild(tableNode);
}



//Selected whole row/column
changeColorWithTbs();
//detection every td in table
function changeColorWithTbs() {
    var tds = tableNode.getElementsByTagName('td');
    for (var i = 0; i < tds.length; i++) {
        tds[i].onmousedown = function () {
            tbonmousedown(this);
        }
    }
}
function tbonmousedown(obj) {
    var tds = tableNode.getElementsByTagName('td');
    //get the rowIndex/ColumnIndex of this clicking cell
    ColumnIndex = obj.cellIndex;
    var tr = obj.parentNode;
    RowIndex = tr.rowIndex;
    console.log("ColumnIndex is: " + ColumnIndex + " RowIndex is: " + RowIndex);

    if (ColumnIndex === 0) {
        for (var o = 0; o < tds.length; o++) {
            tds[o].style.backgroundColor = '';
        }
        var trs = tableNode.getElementsByTagName('tr');
        for (var o = 0; o < trs.length; o++) {
            if (trs[o] == tr) {
                trs[o].style.backgroundColor = '#DFEBF2';
            }
            else {
                trs[o].style.backgroundColor = '';
            }
        }
    }
    if (RowIndex === 0) {
        for (var o = 0; o < tds.length; o++) {
            tds[o].style.backgroundColor = '';
        }
        for (var o = 0; o < tds.length; o++) {
            if (tds[o].cellIndex == ColumnIndex) {
                tds[o].style.backgroundColor = '#DFEBF2';
            }
            else {
                tds[o].style.backgroundColor = '';
            }
        }
    }
}

//rename all the row head
function ChangeRowName() {
    var tds = tableNode.getElementsByTagName('td');
    for (var i = 0; i < tds.length; i++) {
        var tr = tds[i].parentNode;
        if (tds[i].cellIndex === 0) {
            for (var j = 1; j < CurrRow; j++) {
                if (tr.rowIndex === j) {
                    tds[i].innerHTML = j;
                }
            }
        }
    }
}

//rename all the column head
function ChangeColumnName() {
    var tds = tableNode.getElementsByTagName('td');
    for (var i = 0; i < tds.length; i++) {
        var tr = tds[i].parentNode;
        if (tr.rowIndex === 0) {
            for (var j = 1; j < CurrColumn; j++) {
                if (tds[i].cellIndex === j) {
                    tds[i].innerHTML = String.fromCharCode((65 + j - 1));
                }
            }
        }
    }
}

//btnAddRow()
function btnAddRow() {
    var Node = tableNode.insertRow(RowIndex + 1);
    for (var y = 0; y < CurrColumn; y++) {
        Node.insertCell();
        CurrRow++;
        ChangeRowName();
    }
}

//btnDeleteRow()
function btnDeleteRow() {
    if (CurrRow === 2) {
        alert("Just one row left, can't delete row!")
    } else {
        tableNode.deleteRow(RowIndex);
        CurrRow--;
        ChangeRowName();
    }
}

//btnAddColumn()
function btnAddColumn() {
    console.log(CurrColumn);
    if (CurrColumn === 27) {
        alert("Aready have 26 column, can't add coloumn!");
    } else {
        for (var x = 0; x < CurrRow; x++) {
            var Node = tableNode.rows[x];
            Node.insertCell(ColumnIndex + 1);
        }
        CurrColumn++;
        ChangeColumnName();
    }
}

//btnDeleteColumn()
function btnDeleteColumn() {
    if (CurrColumn === 2) {
        alert("Just one Column left, can't delete column!");
    } else {
        for (var x = 0; x < CurrRow; x++) {
            var Node = tableNode.rows[x];
            Node.deleteCell(ColumnIndex);
        }
        CurrColumn--;
        ChangeColumnName();
    }
}

//ImportCSV()
function ImportCSV() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                // var table = document.createElement("table");
                var rows = e.target.result.split("\n");
                for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].split(",");
                    if (cells.length > 1) {

                        var tds = tableNode.getElementsByTagName('td');
                        for (var j = 0; j < tds.length; j++) {
                            var tr = tds[j].parentNode;
                            if (tr.rowIndex === i + 1) {
                                for (var k = 1; k < cells.length; k++) {
                                    if (tds[j].cellIndex === k) {
                                        tds[j].innerHTML = cells[k];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}


//export
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
}

function ExportCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}


function getContent(startcell, endcell) {

    var calculatearr = [];
    var arr1 = startcell.split('');
    console.log("arr1 " + arr1);
    var arr2 = endcell.split('');
    console.log("arr2 " + arr2);

    //arr1[0] top column  arr1[1] top row
    //arr2[0] foot column  arr2[1] foot row
    var column1 = arr1[0].charCodeAt() - 64;
    var column2 = arr2[0].charCodeAt() - 64;
    var row1 = parseInt(arr1[1]);
    var row2 = parseInt(arr2[1]);
    console.log(column1 + " " + column2 + " " + row1 + " " + row2);
    for (var i = row1; i <= row2; i++) {
        for (var j = column1; j <= column2; j++) {
            for (var k = 0; k < tds.length; k++) {
                var tr = tds[k].parentNode;
                if (tr.rowIndex === i && tds[k].cellIndex === j) {
                    if (tds[k].innerHTML === "") {
                        calculatearr.push(0);
                    } else {
                        calculatearr.push(tds[k].innerHTML);
                    }
                }
            }
        }
    }
    console.log("calculatearr " + calculatearr);
    return calculatearr;
}

function caclculate() {
    // var tbody = document.getElementById("tbody");
    var result = 0;
    var target = event.target;
    var content = target.innerHTML;
    console.log(content);
    // var regex = /^(=)+(SUM)+(/()+([A-Z])+([0-9])+0-9\s_\\.\-:])+(.csv|.txt)$/;
    //=SUM(A1:A3)
    // var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    // if (regex.test(fileUpload.value.toLowerCase())) {
    var sum = RegExp(/SUM/);
    // var regex = /=SUM(.*)/
    // if (regex.test(content.value)) {

    //SUM formular
    if (content.match(sum)) {
        var content1 = content.replace("(", " ");
        console.log("content1" + content1);
        var content2 = content1.replace(")", "");
        console.log("content2" + content2);
        var content3 = content2.replace("=", "");
        console.log("content3" + content3);
        var content4 = content3.split(" ");
        console.log("content4" + content4);
        var content5 = content4[1].split(":");
        console.log("content5" + content5);
        var data = getContent(content5[0], content5[1]);
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            result += parseInt(data[i]);
        }
        target.innerHTML = result;
        //+-*/ formular
    } else {
        var contentcal = content.split("");
        var operater = [];
        var data1 = [];
        var dataNumber = [];
        var resultstr = "";
        for (var i = 0; i < contentcal.length; i++) {
            if (contentcal[i] === "+" || contentcal[i] === "-" || contentcal[i] === "*" || contentcal[i] === "/" || contentcal[i] === "=") {
                operater.push(contentcal[i]);
            } else {
                data1.push(contentcal[i]);
            }
        }
        console.log("operater " + operater);
        console.log("data1 " + data1);
        console.log(data1.length);
        var num = 0;
        while (num < data1.length) {
            console.log("data1[1] " + data1[1]);
            var rownumber = parseInt(data1[num + 1]);
            console.log("rownumber " + rownumber);
            var colnumber = data1[num].charCodeAt() - 64;
            console.log("colnumber " + colnumber);
            for (var k = 0; k < tds.length; k++) {
                var tr = tds[k].parentNode;
                if (tr.rowIndex === rownumber && tds[k].cellIndex === colnumber) {
                    console.log("tds[k].innerHTML " + tds[k].innerHTML);
                    if (tds[k].innerHTML === "") {
                        dataNumber.push(0);
                    } else {
                        dataNumber.push(parseInt(tds[k].innerHTML));
                    }
                }
            }
            num += 2;
        }

        for (var i = 0; i < dataNumber.length; i++) {
            var temp = operater[i] + dataNumber[i];
            resultstr += temp;
        }
        console.log("resultstr " + resultstr);
        var newresultstr = resultstr.replace("=", "");
        var resultnumber = eval(newresultstr);
        target.innerHTML = resultnumber;
    }

}


// rxjs
//detect and calculate the formular and show it in this cell
const { fromEvent } = rxjs;
var cell = tableNode.getElementsByTagName('td');
for (var i = 0; i < cell.length; i++) {
    var cellRow = cell[i].parentNode;
    if (cellRow.rowIndex !== 0 && cell[i].cellIndex !== 0) {
        const myObservable = fromEvent(cell[i], 'click');
        myObservable.subscribe(() => {
            if (event.target.innerHTML !== '') {
                caclculate();
            }
        });
    }
}





