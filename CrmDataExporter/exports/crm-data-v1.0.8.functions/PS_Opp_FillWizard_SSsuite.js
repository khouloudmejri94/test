function()
{
	  var _oCurWnd;
	if (!top.MyApp.wizardWindow) 
	{
	 _oCurWnd = top.MyData_View; 
	}
	else
	{
	 _oCurWnd = top.MyApp.wizardWindow; 
	}
		try{
	//On passe le Statut à Sans suite
	//DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	//top.MyApp.SetItemValue ("OppStatus", "06. SANS SUITE",_oCurWnd);
	top.MyApp.SetItemValue ("OppStatus", "08. SANS SUITE",_oCurWnd);
	//FIN FTC@MASAO - MANTIS 14219 -
	//On passe la note à refusée
	top.MyApp.SetItem("OppExtNoteAff", "disabled", false, _oCurWnd);
	top.MyApp.SetItemAttribute("OppExtNoteAff", "className", "Mandatory", _oCurWnd);
	top.MyApp.CurrentSetting.Catalog.OppExtNoteAff.Ed = 1;
	top.MyApp.SetItem("OppExtNoteAff", "contentEditable", true, _oCurWnd);
	top.MyApp.SetItemValue ("OppExtNoteAff", "00. Refusé,sans intérêt",_oCurWnd);
	//Champs en lecture seule
	top.MyApp.SetItem ("OppStatus", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppStatusBtn", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppExtChefproduit", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppExtNoteAff", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppExtFactureProforma", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppExtDerogPerm", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppExtFidam", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppExtRepFIDAM", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppExtFidamCom", "disabled", true, _oCurWnd);
	
	top.MyApp.SetItemAttribute("OppExtRaisonSS", "className", "Mandatory", _oCurWnd);
	top.MyApp.CurrentSetting.Catalog["OppExtRaisonSS"].Mn=1;
	top.MyApp.CurrentSetting.Catalog.OppExtRaisonSS.Ed = 1;
	}catch(e){
	     alert(e.message);
	}
}