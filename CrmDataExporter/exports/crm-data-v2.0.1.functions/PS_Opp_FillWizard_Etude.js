function PS_Opp_FillWizard_Etude()
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
		//Sélecteur sur  Acheteur
	top.MyApp._gfctPutButton('OppExtChefproduit', "top.MyApp.PS_RempliChamp('OppExtChefproduit')", '', true, '...');
	//Sélecteur sur CP
	top.MyApp._gfctPutButton('OppExtAcheteur', "top.MyApp.PS_RempliChamp('OppExtAcheteur')", '', true, '...');
	//On passe le Statut à Déposé
	//DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	//top.MyApp.SetItemValue ("OppStatus", "07. SUIVI D'UNE OFFRE",_oCurWnd);
	top.MyApp.SetItemValue ("OppStatus", "07. DEMANDE D'UNE OFFRE",_oCurWnd);
	//FIN FTC@MASAO - MANTIS 14219 - 
	//On met le statut en lecture seule
	top.MyApp.SetItem ("OppStatus", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppStatusBtn", "disabled", true, _oCurWnd);
	//DEBUT FTC@MASAO - MANTIS 14207 - 15/12/2017
	//On rend le champ Note éditable et obligatoire
	/*
	top.MyApp.SetItem("OppExtNoteAff", "disabled", false, _oCurWnd);
	top.MyApp.SetItemAttribute("OppExtNoteAff", "className", "Mandatory", _oCurWnd);
	top.MyApp.CurrentSetting.Catalog["OppExtNoteAff"].Mn=1;
	top.MyApp.CurrentSetting.Catalog.OppExtNoteAff.Ed = 1;
	top.MyApp.SetItem("OppExtNoteAff", "contentEditable", false, _oCurWnd);
	*/
	//FIN FTC@MASAO - MANTIS 14207 - 
	//Disable Sans suite
	top.MyApp.SetItem ("OppExtRaisonSS", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppExtRaisonSSCom", "disabled", true, _oCurWnd);
	top.MyApp.SetItemAttribute("OppExtRaisonSS", "className", "", _oCurWnd);
	top.MyApp.CurrentSetting.Catalog["OppExtRaisonSS"].Mn=0;
	top.MyApp.CurrentSetting.Catalog.OppExtRaisonSS.Ed = 0;
}