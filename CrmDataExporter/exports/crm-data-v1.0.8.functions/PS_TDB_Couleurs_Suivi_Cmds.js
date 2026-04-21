function()
{
	var myTable = g_hndTbl;
	var MyRows= document.getElementById('tblMain').rows;
	var myLength= MyRows.length;
	var MyCols = myTable.document.getElementsByTagName("COL");
	var MyColsLength = MyCols.length;
	
	  for(var i=2; i<MyRows.length; i++) 
	  { 
	   if(MyRows[i].cells[16].innerHTML > 20) 
	   { 
	    MyRows[i].cells[16].style.backgroundColor= "red"; 
	    
	   } 
	  }
}