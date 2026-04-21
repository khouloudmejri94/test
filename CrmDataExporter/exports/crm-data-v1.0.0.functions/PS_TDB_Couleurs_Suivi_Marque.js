function PS_TDB_Couleurs_Suivi_Marque()
{
	var myTable = g_hndTbl;
	var MyRows= document.getElementById('tblMain').rows;
	var myLength= MyRows.length;
	var MyCols = myTable.document.getElementsByTagName("COL");
	var MyColsLength = MyCols.length;
	
	  for(var i=2; i<MyRows.length; i++) 
	  { 
	   if(MyRows[i].cells[20].innerHTML > 0) 
	   { 
	    MyRows[i].cells[20].style.backgroundColor= "red"; 
	    
	   } 
	  }
}