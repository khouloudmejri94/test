function PS_Opp_FillWizard_DeposerDossier()
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
	top.MyApp.SetItemValue ("OppStatus", "05. DEPOSE",_oCurWnd);
	// DEBUT MASAO@FNA - 15/12/2017 - Mantis #14184 - [Affaire] - RG7 : Statut = 05-DEPOSE
	top.MyApp.Custom_DeposerDossBtn = true;
	// FIN MASAO@FNA - 15/12/2017 - Mantis #14184
	
	//On met le statut en lecture seule
	top.MyApp.SetItem ("OppStatus", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppStatusBtn", "disabled", true, _oCurWnd);
	
	//On rend le champ Note éditable
	top.MyApp.SetItem("OppExtNoteAff", "disabled", false, _oCurWnd);
	top.MyApp.SetItemAttribute("OppExtNoteAff", "className", "Mandatory", _oCurWnd);
	top.MyApp.CurrentSetting.Catalog["OppExtNoteAff"].Mn=1;
	top.MyApp.CurrentSetting.Catalog.OppExtNoteAff.Ed = 1;
	top.MyApp.SetItem("OppExtNoteAff", "contentEditable", false, _oCurWnd);
	
	top.MyApp.SetItem ("OppExtRaisonSS", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppExtRaisonSSCom", "disabled", true, _oCurWnd);
	
	top.MyApp.SetItemAttribute("OppExtRaisonSS", "className", "", _oCurWnd);
	top.MyApp.CurrentSetting.Catalog["OppExtRaisonSS"].Mn=0;
	top.MyApp.CurrentSetting.Catalog.OppExtRaisonSS.Ed = 0;
	
	
	//MH TEST 
	top.MyApp.CurrentSetting.Catalog.OppExtChefproduit.Ed = 1;
	top.MyApp.SetItem("OppExtChefproduit", "contentEditable", false, _oCurWnd);
}