var selected1 = null
function onFormSubmit(){
  if(validate()){
    var formData= readForm();
    if(selected1== null)
      insertNewRecord(formData);
    else
      updateRecord(formData);
    resetForm();
  }
}
function readForm(){
    var formData={};
    formData["studentId"]= document.getElementById("studentId").value;
    formData["name"]= document.getElementById("name").value;
    formData["stream"]= document.getElementById("stream").value;
    formData["marks"]= document.getElementById("marks").value;
    return formData;
}
function insertNewRecord(data){
    var table= document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow =table.insertRow(table.length);
    //Creating a new Cell
      cell1= newRow.insertCell(0);
      cell1.innerHTML =data.studentId;
      cell2= newRow.insertCell(1);
      cell2.innerHTML =data.name;
      cell3= newRow.insertCell(2);
      cell3.innerHTML =data.stream;
      cell4= newRow.insertCell(3);
      cell4.innerHTML =data.marks;
      cell5=newRow.insertCell(4);
      cell5.innerHTML='<button  name="edit1" onClick="onEdit(this)">Edit</button> &nbsp; <button name="delete1" onClick="onDelete(this)">Delete</button>';    
}

function resetForm(){
    document.getElementById("studentId").value="";
    document.getElementById("name").value="";
    document.getElementById("stream").value="";
    document.getElementById("marks").value="";
    selected1=null;
}

function onEdit(value1){
  selected1=value1.parentElement.parentElement;
  document.getElementById("studentId").value= selected1.cells[0].innerHTML;
  document.getElementById("name").value= selected1.cells[1].innerHTML;
  document.getElementById("stream").value= selected1.cells[2].innerHTML;
  document.getElementById("marks").value= selected1.cells[3].innerHTML;
}
function updateRecord(formData)
{
    selected1.cells[0].innerHTML=formData.studentId;
    selected1.cells[1].innerHTML=formData.name;
    selected1.cells[2].innerHTML=formData.stream;
    selected1.cells[3].innerHTML=formData.marks;
}
function onDelete(value1){
    if(confirm("Are you sure you want to delete the record?")){
    row= value1.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    resetForm();
    }
}
 function searchFunByid(){
    var filter= document.getElementById("myInput").value.toUpperCase();
    var filter1= document.getElementById("myInput1").value.toUpperCase();
    var filter2= document.getElementById("myInput2").value.toUpperCase();
    var filter3= document.getElementById("myInput3").value.toUpperCase();
    
    var searchTable= document.getElementById("employeeList");
    var tr= searchTable.getElementsByTagName('tr');
  // console.log(tr);
    for(var i=1;i<tr.length;i++){
      var td= tr[i].getElementsByTagName('td');
      // console.log(td);
      // console.log(td[0],filter);
      
      if(td){
        // let textvalue= td.textContent||td.innerHTML;
        if(filter=="" && filter1=="" && filter2=="" && filter3=="")
           tr[i].style.display="";
        else{
        if((filter!="" && td[0].innerHTML.toUpperCase().indexOf(filter)>-1)||
          (filter1!="" && td[1].innerHTML.toUpperCase().indexOf(filter1)>-1)||
          (filter2!="" && td[2].innerHTML.toUpperCase().indexOf(filter2)>-1)||
         (filter3!="" && td[3].innerHTML.toUpperCase().indexOf(filter3)>-1))
          {
          tr[i].style.display ="";
        }else{
          tr[i].style.display = "none";
        }
       }
      }
    }
 }
 function resetSearch() {
  document.getElementById("myInput").value="";
  document.getElementById("myInput1").value="";
  document.getElementById("myInput2").value="";
  document.getElementById("myInput3").value="";

  searchFunByid();
}


var th=document.getElementsByTagName('th');
console.log(th);
for(let c=0;c<th.length;c++){
  th[c].addEventListener('click',item(c))
}

function item(c){
  return function(){
    console.log(c);
    sortTable(c);
  }
}
function sortTable(c) {
  var table, rows, switching, i, x, y, shouldSwitch;
  // console.log(c);
  table = document.getElementById("employeeList");
   
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    
    //  console.log(table.rows);
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[c];
      y = rows[i + 1].getElementsByTagName("TD")[c];
      // console.log(x);
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
function validate(){
  ischeck= true;
  if(document.getElementById("studentId").value == ""){
    ischeck=false;
    document.getElementById("fullNameValidationError").classList.remove("hide");
  }else{
    ischeck=true;
    if(!document.getElementById("fullNameValidationError").classList.contains("hide"))
      document.getElementById("fullNameValidationError").classList.add("hide");
  }
  return ischeck;
}

