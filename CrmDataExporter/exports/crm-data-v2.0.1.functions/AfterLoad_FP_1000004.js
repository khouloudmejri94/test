function AfterLoad_FP_1000004()
{
	//Auteur : Pierre-Louis EGAUD
	//Société : MASAO
	//Date de création : 30/05/2012
	//Description : Dans  l'onglet Général (ajouter une phrase de la CNIL sur le respect des personnes)
		//Dans  l'onglet Général (ajouter une phrase de la CNIL sur le respect des personnes)
	//top.MyApp.ModifyLayout(top.MyApp.fraData_View.ifrView2.fraData.document.getElementById("tblMain"),1,7,10,1,'<SPAN id=CpyMyComment style="font-size:smaller ;" name =comment Cn="8" DT="0"> Veillez à l\'adéquation et au caractère non-excessif des commentaires sur les contacts. </SPAN>',false);
	
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 var oIncomplete = top.MyApp.FindItem("PerExtIsIncomplete");
	 var vIncomplete = top.MyApp.GetItemValue("PerExtIsIncomplete");
	 if (oIncomplete) {
	  if (vIncomplete == '1') {
	      top.MyApp.FindItem("PerExtIsIncomplete", top.MyData_View).parentElement.bgColor = 'red'
	  }
	 }
	}
	
		if (top.MyApp._gfctGetModeChap() != 'Reset') {
	 var oMail = top.MyApp.FindItem("PerCpyEmailAddress");
	 if (oMail) {
	  var vMail = top.MyApp.GetItemValue("PerCpyEmailAddress");
	  if (vMail == '' && vMail == '') {
	   //top.MyApp._gfctSetClassName("PerCpyEmailAddress", "M");
	   //top.MyApp.AppSetting.Per.Catalog.PerCpyEmailAddress.Mn = 1;
	   top.MyApp._gfctSetClassName("PerCpyEmailAddress", "NM");
	  } else if (vMail.toUpperCase() == "N@N.FR") {
	   //top.MyApp._gfctSetClassName("PerCpyDirectFaxNbr", "M");
	   //top.MyApp.AppSetting.Per.Catalog.PerCpyDirectFaxNbr.Mn = 1;
	   top.MyApp._gfctSetClassName("PerCpyDirectFaxNbr", "NM");
	  } else {
	   top.MyApp._gfctSetClassName("PerCpyDirectFaxNbr", "B");
	   top.MyApp.AppSetting.Per.Catalog.PerCpyDirectFaxNbr.Mn = -1;
	   top.MyApp._gfctSetClassName("PerCpyEmailAddress", "B");
	   top.MyApp.AppSetting.Per.Catalog.PerCpyEmailAddress.Mn = -1;
	  }
	  oMail.onchange = function () {
	   var vMail = top.MyApp.GetItemValue("PerCpyEmailAddress");
	   if (vMail == '' && vMail == '') {
	    //top.MyApp._gfctSetClassName("PerCpyEmailAddress", "M");
	    //top.MyApp.AppSetting.Per.Catalog.PerCpyEmailAddress.Mn = 1;
	    top.MyApp._gfctSetClassName("PerCpyEmailAddress", "NM");
	   } else if (vMail.toUpperCase() == "N@N.FR") {
	    //top.MyApp._gfctSetClassName("PerCpyDirectFaxNbr", "M");
	    //top.MyApp.AppSetting.Per.Catalog.PerCpyDirectFaxNbr.Mn = 1;
	    top.MyApp._gfctSetClassName("PerCpyDirectFaxNbr", "NM");
	   } else {
	    top.MyApp._gfctSetClassName("PerCpyDirectFaxNbr", "B");
	    top.MyApp.AppSetting.Per.Catalog.PerCpyDirectFaxNbr.Mn = -1;
	    top.MyApp._gfctSetClassName("PerCpyEmailAddress", "B");
	    top.MyApp.AppSetting.Per.Catalog.PerCpyEmailAddress.Mn = -1;
	   }
	  }
	 }
	}
		//si 'telephone direct' non renseigné alors GSM obligatoire
	if (top.MyApp._gfctGetModeChap() != 'Reset') {
	 var oTel = top.MyApp.FindItem("PerCpyDirectPhNbr");
	 if (oTel) {
	  var vTel = top.MyApp.GetItemValue("PerCpyDirectPhNbr");
	  if (vTel == '') {
	   //top.MyApp._gfctSetClassName("PerCpyMobilePhNbr", "M");
	   //top.MyApp.AppSetting.Per.Catalog.PerCpyMobilePhNbr.Mn = 1;
	   top.MyApp._gfctSetClassName("PerCpyMobilePhNbr", "NM");
	  } else {
	   top.MyApp._gfctSetClassName("PerCpyMobilePhNbr", "B");
	   top.MyApp.AppSetting.Per.Catalog.PerCpyMobilePhNbr.Mn = -1;
	  }
	  oTel.onchange = function () {
	   var vTel = top.MyApp.GetItemValue("PerCpyDirectPhNbr");
	   if (vTel == '') {
	    //top.MyApp._gfctSetClassName("PerCpyMobilePhNbr", "M");
	    //top.MyApp.AppSetting.Per.Catalog.PerCpyMobilePhNbr.Mn = 1;
	    top.MyApp._gfctSetClassName("PerCpyMobilePhNbr", "NM");
	   } else {
	    top.MyApp._gfctSetClassName("PerCpyMobilePhNbr", "B");
	    top.MyApp.AppSetting.Per.Catalog.PerCpyMobilePhNbr.Mn = -1;
	   }
	  }
	 }
	}
		
	
	
	
	if (top.MyApp._gfctGetModeChap() != 'Reset') {
	 var oIncomp= top.MyApp.FindItem("PerExtIsIncomplete");
	 if (oIncomp) {
	  var vIncomp = top.MyApp.GetItemValue("PerExtIsIncomplete");
	  if (vIncomp == 1) {
	
	   top.MyApp._gfctSetClassName("PerExtRaisonIncomplet", "NM");
	  } else {
	   top.MyApp._gfctSetClassName("PerExtRaisonIncomplet", "B");
	   top.MyApp.AppSetting.Per.Catalog.PerExtRaisonIncomplet.Mn = -1;
	  }
	
	
	  oIncomp.onchange = function () {
	   var vIncomp = top.MyApp.GetItemValue("PerExtIsIncomplete");
	   if (vIncomp == 1) {
	    //top.MyApp._gfctSetClassName("PerCpyMobilePhNbr", "M");
	    //top.MyApp.AppSetting.Per.Catalog.PerCpyMobilePhNbr.Mn = 1;
	    top.MyApp._gfctSetClassName("PerExtRaisonIncomplet", "NM");
	   } else {
	    top.MyApp._gfctSetClassName("PerExtRaisonIncomplet", "B");
	    top.MyApp.AppSetting.Per.Catalog.PerExtRaisonIncomplet.Mn = -1;
	   }
	  }
	 }
	}
	
	
	
		return true;
}