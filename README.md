# Simple_Google_Sheet

# Problem statement
Implememnt a spreadsheet application like Google sheets.

# Function
For create table:  
Using javascript to implement dynamic table via insertRow and insertCell function.  

For add/delete column/row:  
Using onmousedown function to moniter which cell is selected, then acquiring its RowIndex and ColoumnIndex.   
Then using for loop to traversal all the td element add/delete celled or rows.   
When you click the row/column head, it will choose the whole row/column. Then you can delete this whole row/column. When you click add, it will add the row/column after it.  

For import:  
Using FileReader to read the CSV file and use for loop to traversal the cell to show the content about the file.  

For export:  
Traversaling the table to get the content and transfer them into CSV standard, then I use window.URL.createObjectURL to download the CSV file.  

For rxjs:  
Using rxjs to detect the click on the cell when the cell is not empty(having formula), then it will run the calculate() function to calculate the formula, at last it will show in this cell. 

# Technologies
Javascript, RxJS, and CSS

# Steps to run
open the index.html file.  