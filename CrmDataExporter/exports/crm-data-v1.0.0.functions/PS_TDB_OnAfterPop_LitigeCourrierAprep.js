function PS_TDB_OnAfterPop_LitigeCourrierAprep()
{
	//Auteur : Pierre-Louis EGAUD
	//Société : MASAO
	//Date de création : 29/11/2013
	//Description : script executé après peuplement de la requête "Litiges avec courriers 'A preparer'"
	          //Pour action "première demande" : Si "Date" (renseignée par le bouton "envoi) non renseigné à J+7 de la date validation déclaration alors mettre la ligne en évidence (en rouge ?)
	          //Pour action "relance" : Si "Date" (renseignée par le bouton "envoi) non renseigné à J+7 de la date du courrier "première demande" alors mettre la ligne en évidence (en rouge ?)
	          //Pour action "mise en demeure" : Si "Date" (renseignée par le bouton "envoi) non renseigné à J+7 de la date du courrier "relance" alors mettre la ligne en évidence (en rouge ?)
	          //Pour action "annulation" : Si "Date" (renseignée par le bouton "création") non renseigné à J+2 de la date validation déclaration alors mettre la ligne en évidence (en rouge ?)
	          //Pour action "clôture" : Si "Date" (renseignée par le bouton "création") non renseigné à J+2 de la date validation déclaration alors mettre la ligne en évidence (en rouge ?)
		/* commenté car non fini
	
	var myTable=g_hndTbl;
	var MyRows = myTable.rows;
	var vNbLines = MyRows.length;
	var MyRowsLength = MyRows.length;
	var MyCols =myTable.document.getElementsByTagName("COL");
	var MyColsLength = MyCols.length;
	var texto='';
	var myColNote = "";
	for(var i=0;i<MyColsLength;i++)
	{
	  if(MyCols[i].id == "tbl_ReqExtDateValidDecla")
	  {
	   //Le chiffre est en fonction de la position du champs dans la requête (ici AcnStartDate est, en visu, en première position)
	   var myColNote = i-7;
	   break;
	  }
	}
	for (var j=2; j<MyRowsLength ; j++)
	{
	  if(MyRows[j].cells[myColNote]!=undefined)
	  {
	    texto = MyRows[j].cells[myColNote].innerText;
	    var date1 = new Date("20"+texto.substring(8,10),(texto.substring(3,5)-1),texto.substring(0,2),texto.substring(9,11),texto.substring(12,14),0,0);
	    var date2 = new Date();
	    var date1Comp = date1.getTime(); // milliseconds
	    var date2Comp = date2.getTime();
	    //si la date validation décla est antérieure à la date du jour, on colorie en rouge
	    if(date1Comp < date2Comp)
	    {
	      MyRows[j].style.backgroundColor="red";  
	      MyRows[j].style.textDecoration = "line-through";
	    }
	  }
	}
	*/
}