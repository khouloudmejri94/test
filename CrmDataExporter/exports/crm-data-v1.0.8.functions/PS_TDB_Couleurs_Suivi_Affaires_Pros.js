function()
{
	var myTable = g_hndTbl;
	var MyRows= document.getElementById('tblMain').rows;
	var myLength= MyRows.length;
	var MyCols = myTable.document.getElementsByTagName("COL");
	var MyColsLength = MyCols.length;
	
	  for(var i=2; i<MyRows.length; i++) 
	  { 
	   if(MyRows[i].cells[8].innerHTML > 1) 
	   { 
	    MyRows[i].cells[8].style.color= "red"; 
	   } else if (MyRows[i].cells[8].innerHTML <= 1)
	   {
	    MyRows[i].cells[8].style.color= "green"; 
	   }
	   
	   
	   if(MyRows[i].cells[10].innerHTML > 2) 
	   { 
	    MyRows[i].cells[10].style.color= "red"; 
	   } else if (MyRows[i].cells[10].innerHTML <=  2  )
	   {
	    MyRows[i].cells[10].style.color= "green"; 
	   }
	  }
}