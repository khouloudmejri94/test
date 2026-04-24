function PS_TDB_Couleurs_Suivi_Norms()
{
	var myTable = g_hndTbl;
	var MyRows= document.getElementById('tblMain').rows;
	var myLength= MyRows.length;
	var MyCols = myTable.document.getElementsByTagName("COL");
	var MyColsLength = MyCols.length;
	
	  for(var i=2; i<MyRows.length; i++) 
	  { 
	   if(MyRows[i].cells[18].innerHTML > 40) 
	   { 
	    MyRows[i].cells[18].style.backgroundColor= "Red"; 
	    
	   } 
	  }
}