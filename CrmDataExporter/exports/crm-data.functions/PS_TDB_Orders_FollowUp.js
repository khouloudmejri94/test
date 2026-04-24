function PS_TDB_Orders_FollowUp()
{
	//17/09/2019 Hichem : Coloration du dashbord Orders Follow up
	var myTable = g_hndTbl;
	var MyRows = document.getElementById('tblMain').rows;
	var myLength = MyRows.length;
	var MyCols = myTable.document.getElementsByTagName("COL");
	var MyColsLength = MyCols.length;
	for (var i = 1; i < myLength; i++) {
	        if (MyRows[i].cells[20].innerHTML >= 15 &&  MyRows[i].cells[18].innerHTML == "N" ) {
	            MyRows[i].cells[18].style.backgroundColor = "#F66666";
	        }
	  if (MyRows[i].cells[20].innerHTML >= 10 &&  MyRows[i].cells[16].innerHTML == "N" && (MyRows[i].cells[15].innerHTML == "Obligatoire" || MyRows[i].cells[15].innerHTML == "Mandatory" ) ) {
	            MyRows[i].cells[16].style.backgroundColor = "#F66666";
	        }
	  if (MyRows[i].cells[20].innerHTML >= 0 && MyRows[i].cells[20].innerHTML <= 10  ) 
	  {
	            MyRows[i].cells[20].style.backgroundColor = "#3CB371";
	        }
	  if (MyRows[i].cells[20].innerHTML > 10 && MyRows[i].cells[20].innerHTML <= 30  ) 
	  {
	            MyRows[i].cells[20].style.backgroundColor = "#FFA500";
	        }
	  if (MyRows[i].cells[20].innerHTML > 30  )
	  {
	   MyRows[i].cells[20].style.backgroundColor = "#F66666";
	  }
	}
}