function PS_Opp_FillWizard_Fidam()
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
		//On met le statut en lecture seule
	top.MyApp.SetItem ("OppStatus", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppStatusBtn", "disabled", true, _oCurWnd);
	//On met le CP en lecture seule
	top.MyApp.SetItem ("OppExtChefproduit", "disabled", true, _oCurWnd);
	
	//On met la note en lecture seule
	top.MyApp.SetItem ("OppExtNoteAff", "disabled", true, _oCurWnd);
	
	//On met la note en lecture seule
	top.MyApp.SetItem ("OppExtFactureProforma", "disabled", true, _oCurWnd);
	//On met la note en lecture seule
	top.MyApp.SetItem ("OppExtDerogPerm", "disabled", true, _oCurWnd);
	top.MyApp.SetItemAttribute("OppExtRaisonSS", "className", "", _oCurWnd);
	top.MyApp.CurrentSetting.Catalog["OppExtRaisonSS"].Mn=0;
	top.MyApp.CurrentSetting.Catalog.OppExtRaisonSS.Ed = 0;
}