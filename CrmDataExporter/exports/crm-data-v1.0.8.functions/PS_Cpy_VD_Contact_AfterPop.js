function()
{
	   var myTable=top.MyApp.MyData_View.ifrView3.fraData.document.getElementById('tblMain');  //g_hndTbl;
	   var MyRows = myTable.rows;
	   var vNbLines = MyRows.length;
	   var MyRowsLength = MyRows.length;
	   var MyCols =myTable.document.getElementsByTagName("COL");
	   var MyColsLength = MyCols.length;
	   var texto='';
	   var myColNote = "";
	
	   if(myColNote != undefined)
	   {
	     for (var j=2; j<MyRowsLength ; j++)
	     {
	          texto=MyRows[j].cells[4].innerText;
	          if(texto != "")
	          {
	               MyRows[j].cells[4].innerHTML = "<a href='mailto:"+texto+"' >" + texto + "</a>";     
	          }
	          var strIsActif =MyRows[j].cells[8].innerText; 
	          if(strIsActif == "INACTIF") 
	          {
	               MyRows[j].style.backgroundColor='red';    
	               MyRows[j].style.textDecoration = "line-through";
	          }
	     }
	   }
}