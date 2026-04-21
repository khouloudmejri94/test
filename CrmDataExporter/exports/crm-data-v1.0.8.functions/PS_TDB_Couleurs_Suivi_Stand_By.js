function()
{
	var myTable = g_hndTbl;
	var MyRows = document.getElementById('tblMain').rows;
	var myLength = MyRows.length;
	var MyCols = myTable.document.getElementsByTagName("COL");
	var MyColsLength = MyCols.length;
	for (var i = 2; i < MyRows.length; i++) {
	  if (MyRows[i].cells[17].innerHTML > 40) {
	    MyRows[i].cells[17].style.backgroundColor = "red";
	  }
	  if (MyRows[i].cells[18].innerHTML == "valide" || MyRows[i].cells[16].innerHTML == "Validé tot" || MyRows[i].cells[16].innerHTML == "Validé partiel") {
	    MyRows[i].cells[18].style.color = "green";
	  }
	}
}