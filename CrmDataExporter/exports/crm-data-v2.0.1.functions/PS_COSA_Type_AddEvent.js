function PS_COSA_Type_AddEvent()
{
	//try {
	var vType = top.MyApp.GetItemValue("OSaExtType")
	var vStatut = top.MyApp.GetItemValue("OSaExtStatut")
	
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 if (vType == "Salon") {
	
	  top.MyApp._gfctSetClassName("OSaExtPays", "NM");
	
	  top.MyApp.SetItem("OSaExtStatut", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtStatut", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaExtCodeEdit", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtCodeEdit", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaExtSalonAch", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtSalonAch", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaExtDateCreat", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtDateCreat", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaPhase", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaPhase", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaNumSalon", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaNumSalon", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("Sht32211064558656", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("Sht32211064558656", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("Sht32668369491360", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("Sht32668369491360", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("Sht32741464468656", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("Sht32741464468656", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("Sht32809969571360", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("Sht32809969571360", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("Sht32888669581360", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("Sht32888669581360", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("Sht32880369481360", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("Sht32880369481360", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("Sht41821789600342", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("Sht41821789600342", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("Sht42838354200272", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("Sht42838354200272", "parentElement.previousSibling.style.visibility", "hidden");
	
	  //------------------Affiche Onglets------------------
	  var arrShow = [];
	  var arrShowVD = [];
	
	  //General
	  arrShow["Tab_30040453647340"] = [];
	
	  //VD Edition
	  arrShowVD["Tab_30808217652444"] = [];
	
	  //Onglets
	  top.MyApp.fctShowTabs(arrShow, "OSa", "Group_30189753357354");
	  //Vue dyna
	  top.MyApp.fctShowTabs(arrShowVD, "OSa", "Group_30360161247281");
	
	  //------------------Masque Onglets------------------
	  var arrHide = [];
	  var arrHideVD = [];
	
	  //Info Géné
	  arrHide["Tab_30451712198946"] = [];
	  //Préco
	  arrHide["Tab_30881448444650"] = [];
	  //Ressources
	  arrHide["Tab_30981748434650"] = [];
	  //Logisitque
	  arrHide["Tab_30151004690044"] = [];
	  //Bilan commercial
	  arrHide["Tab_30779165225291"] = [];
	  //Bilan ressource
	  arrHide["Tab_30117909722748"] = [];
	  //Bilan logistique
	  arrHide["Tab_30241861350087"] = [];
	
	  //VD Salon Exposants
	  arrHideVD["Tab_30561461545740"] = [];
	  //VD Ressources
	  arrHideVD["Tab_30358017212340"] = [];
	  //VD Suivi des fiches
	  arrHideVD["Tab_30250117192344"] = [];
	
	
	  //Onglets
	  top.MyApp.fctHideTabs(arrHide, "OSa", "Group_30189753357354");
	  //Vue dyna
	  top.MyApp.fctHideTabs(arrHideVD, "OSa", "Group_30360161247281");
	} else {
	
	  top.MyApp._gfctSetClassName("OSaExtPays", "UM");
	
	
	  top.MyApp.SetItem("OSaExtStatut", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtStatut", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaExtCodeEdit", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtCodeEdit", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaExtSalonAch", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtSalonAch", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaExtDateCreat", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtDateCreat", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaPhase", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaPhase", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaNumSalon", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaNumSalon", "parentElement.previousSibling.style.visibility", "");  
	
	  top.MyApp.SetItem("Sht32211064558656", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("Sht32211064558656", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("Sht32668369491360", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("Sht32668369491360", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("Sht32741464468656", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("Sht32741464468656", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("Sht32809969571360", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("Sht32809969571360", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("Sht32888669581360", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("Sht32888669581360", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("Sht32880369481360", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("Sht32880369481360", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("Sht41821789600342", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("Sht41821789600342", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("Sht42838354200272", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("Sht42838354200272", "parentElement.previousSibling.style.visibility", "");
	        
	        
	
	  //------------------Affiche Onglets------------------
	  var arrShow = [];
	  var arrShowVD = [];
	
	  //Info Géné
	  arrShow["Tab_30451712198946"] = [];
	  //Préco
	  arrShow["Tab_30881448444650"] = [];
	  //Ressources
	  arrShow["Tab_30981748434650"] = [];
	  //Logisitque
	  arrShow["Tab_30151004690044"] = [];
	  //Bilan commercial
	  arrShow["Tab_30779165225291"] = [];
	  //Bilan ressource
	  arrShow["Tab_30117909722748"] = [];
	  //Bilan logistique
	  arrShow["Tab_30241861350087"] = [];
	
	  //VD Salon Exposants
	  arrShowVD["Tab_30561461545740"] = [];
	  //VD Ressources
	  arrShowVD["Tab_30358017212340"] = [];
	  //VD Suivi des fiches
	  arrShowVD["Tab_30250117192344"] = [];
	
	  //Onglets
	  top.MyApp.fctShowTabs(arrShow, "OSa", "Group_30189753357354");
	  //Vue dyna
	  top.MyApp.fctShowTabs(arrShowVD, "OSa", "Group_30360161247281");
	
	  //------------------Masque Onglets------------------
	  var arrHide = [];
	  var arrHideVD = [];
	
	  //General
	  arrHide["Tab_30040453647340"] = [];
	
	  //VD Edition
	  arrHideVD["Tab_30808217652444"] = [];
	
	  //Onglets
	  top.MyApp.fctHideTabs(arrHide, "OSa", "Group_30189753357354");
	  //Vue dyna
	  top.MyApp.fctHideTabs(arrHideVD, "OSa", "Group_30360161247281");
	 }
	
	 if (vType == "Tournée FRS") {
	  top.MyApp.SetItem("OSaExtAdresse", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtAdresse", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaExtSiteWeb", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtSiteWeb", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaExtNbExpoIg", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtNbExpoIg", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaExtPotentiel", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtPotentiel", "parentElement.previousSibling.style.visibility", "hidden");
	
	 } else {
	  top.MyApp.SetItem("OSaExtAdresse", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtAdresse", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaExtSiteWeb", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtSiteWeb", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaExtNbExpoIg", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtNbExpoIg", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaExtPotentiel", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtPotentiel", "parentElement.previousSibling.style.visibility", "");
	 }
	
	 if (vType == "Visite Client") {
	  top.MyApp.SetItem("OSaExtCpPilote", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtCpPilote", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaExtNbCp", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtNbCp", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaExtNbAm", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtNbAm", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaExtNbCm", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtNbCm", "parentElement.previousSibling.style.visibility", "hidden");
	
	  top.MyApp.SetItem("OSaExtNbTotMkt", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaExtNbTotMkt", "parentElement.previousSibling.style.visibility", "hidden");
	
	        top.MyApp.SetItem("OSaSemaine", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaSemaine", "parentElement.previousSibling.style.visibility", "");
	
	 } else {
	  top.MyApp.SetItem("OSaExtCpPilote", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtCpPilote", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaExtNbCp", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtNbCp", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaExtNbAm", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtNbAm", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaExtNbCm", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtNbCm", "parentElement.previousSibling.style.visibility", "");
	
	  top.MyApp.SetItem("OSaExtNbTotMkt", "parentElement.style.visibility", "");
	  top.MyApp.SetItem("OSaExtNbTotMkt", "parentElement.previousSibling.style.visibility", "");
	
	        top.MyApp.SetItem("OSaSemaine", "parentElement.style.visibility", "hidden");
	  top.MyApp.SetItem("OSaSemaine", "parentElement.previousSibling.style.visibility", "hidden");
	 }
	} else {
	 top.MyApp.SetItem("OSaExtStatut", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("OSaExtStatut", "parentElement.previousSibling.style.visibility", "");
	
	 top.MyApp.SetItem("OSaExtCodeEdit", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("OSaExtCodeEdit", "parentElement.previousSibling.style.visibility", "");
	
	 top.MyApp.SetItem("OSaExtSalonAch", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("OSaExtSalonAch", "parentElement.previousSibling.style.visibility", "");
	
	 top.MyApp.SetItem("OSaExtDateCreat", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("OSaExtDateCreat", "parentElement.previousSibling.style.visibility", "");
	
	 top.MyApp.SetItem("Sht32211064558656", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("Sht32211064558656", "parentElement.previousSibling.style.visibility", "");
	
	 top.MyApp.SetItem("Sht32668369491360", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("Sht32668369491360", "parentElement.previousSibling.style.visibility", "");
	
	 top.MyApp.SetItem("Sht32741464468656", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("Sht32741464468656", "parentElement.previousSibling.style.visibility", "");
	
	 top.MyApp.SetItem("Sht32809969571360", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("Sht32809969571360", "parentElement.previousSibling.style.visibility", "");
	
	 top.MyApp.SetItem("Sht32888669581360", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("Sht32888669581360", "parentElement.previousSibling.style.visibility", "");
	
	 top.MyApp.SetItem("Sht32880369481360", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("Sht32880369481360", "parentElement.previousSibling.style.visibility", "");
	
	 top.MyApp.SetItem("Sht41821789600342", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("Sht41821789600342", "parentElement.previousSibling.style.visibility", "");
	
	 top.MyApp.SetItem("Sht42838354200272", "parentElement.style.visibility", "");
	 top.MyApp.SetItem("Sht42838354200272", "parentElement.previousSibling.style.visibility", "");
	 //-----------------Affiche Onglets------------------
	 var arrShow = [];
	 var arrShowVD = [];
	
	 //Info Géné
	 arrShow["Tab_30451712198946"] = [];
	 //Préco
	 arrShow["Tab_30881448444650"] = [];
	 //Ressources
	 arrShow["Tab_30981748434650"] = [];
	 //Logisitque
	 arrShow["Tab_30151004690044"] = [];
	 //Bilan commercial
	 arrShow["Tab_30779165225291"] = [];
	 //Bilan ressource
	 arrShow["Tab_30117909722748"] = [];
	 //Bilan logistique
	 arrShow["Tab_30241861350087"] = [];
	 //General
	 arrShow["Tab_30040453647340"] = [];
	
	 //VD Edition
	 arrShowVD["Tab_30808217652444"] = [];
	 //VD Salon Exposants
	 arrShowVD["Tab_30561461545740"] = [];
	 //VD Ressources
	 arrShowVD["Tab_30358017212340"] = [];
	 //VD Suivi des fiches
	 arrShowVD["Tab_30250117192344"] = [];
	
	 //Onglets
	 top.MyApp.fctShowTabs(arrShow, "OSa", "Group_30189753357354");
	 //Vue dyna
	 top.MyApp.fctShowTabs(arrShowVD, "OSa", "Group_30360161247281");
	}
	
	//} catch (e) {
	// alert(e.description)
	//}
	
		try{
	
	//
	
	
	var v_Type = top.MyApp.GetItemValue("OSaExtType"); 
	
	
	
	
	if ( (v_Type == "Edition" || v_Type == "Tournée FRS" || v_Type == "Visite Client"  ) && top.MyApp.CurrentSetting.nChapMode != "Reset")
	{
	    top.MyApp.SetItemAttribute("OSaExtDateDeb", "className", "Mandatory");      
	    top.MyApp.CurrentSetting.Catalog["OSaExtDateDeb"].Mn=1;
	    top.MyApp.SetItemAttribute("OSaExtDateFin", "className", "Mandatory");      
	    top.MyApp.CurrentSetting.Catalog["OSaExtDateFin"].Mn=1;
	    top.MyApp.SetItemAttribute("OSaExtPays2", "className", "Mandatory");      
	    top.MyApp.CurrentSetting.Catalog["OSaExtPays2"].Mn=1;
	    //top.MyApp.SetItemAttribute("OSaExtVille", "className", "Mandatory");      
	    //top.MyApp.CurrentSetting.Catalog["OSaExtVille"].Mn=1;
	  
	}
	else 
	{
	    top.MyApp.SetItemAttribute("OSaExtDateDeb", "className", "");      
	    top.MyApp.CurrentSetting.Catalog["OSaExtDateDeb"].Mn=-1;
	    top.MyApp.SetItemAttribute("OSaExtDateFin", "className", "");      
	    top.MyApp.CurrentSetting.Catalog["OSaExtDateFin"].Mn=-1;
	    top.MyApp.SetItemAttribute("OSaExtPays2", "className", "");      
	    top.MyApp.CurrentSetting.Catalog["OSaExtPays2"].Mn=-1;
	    top.MyApp.SetItemAttribute("OSaExtVille", "className", "");      
	    top.MyApp.CurrentSetting.Catalog["OSaExtVille"].Mn=-1;
	   
	}
	
	
	
	
	
	}catch(e){
	     alert(e.message);
	}
	
	
	
	
		try{
	
	//
	
	
	var v_Type = top.MyApp.GetItemValue("OSaExtType"); 
	
	
	
	
	if ( (v_Type == "Edition" || v_Type == "Tournée FRS" || v_Type == "Visite Client"  )  && top.MyApp.CurrentSetting.nChapMode != "Reset")
	{
	     top.MyApp.SetItemAttribute("OSaExtSalon", "readOnly", "true");      
	}
	else 
	{
	     top.MyApp.SetItemAttribute("OSaExtSalon", "readOnly", "");      
	}
	
	
	
	
	
	}catch(e){
	     alert(e.message);
	}
	
		
	try
	{
	
	
	 var vType = top.MyApp.GetItemValue("OSaExtType")
	 var vStatut = top.MyApp.GetItemValue("OSaExtStatut")
	
	 if(top.MyApp.CurrentSetting.nChapMode !="Reset")  
	 {
	 //Régles de gestion des boutons
	 
	    if( vStatut == "En création"  ) 
	 { 
	    top.MyApp.SetItem("Sht32809969571360","parentElement.style.visibility","hidden");
	    top.MyApp.SetItem("Sht32809969571360","parentElement.previousSibling.style.visibility","hidden");  
	 }
	 else
	  { 
	    top.MyApp.SetItem("Sht32809969571360","parentElement.style.visibility","");
	    top.MyApp.SetItem("Sht32809969571360","parentElement.previousSibling.style.visibility","");  
	  }  
	
	
	
	 }
	 else
	 {
	    top.MyApp.SetItem("Sht32809969571360","parentElement.style.visibility","");
	    top.MyApp.SetItem("Sht32809969571360","parentElement.previousSibling.style.visibility","");   
	 }
	
	 
	}
	catch(e)
	{
	     alert(e.description)
	}
	
	
		return true;
}