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
		//On met le statut en lecture seule
	top.MyApp.SetItem ("OppStatus", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppStatusBtn", "disabled", true, _oCurWnd);
	//On met le CP en lecture seule
	top.MyApp.SetItem ("OppExtChefproduit", "disabled", true, _oCurWnd);
	
	//On met la note en lecture seule
	top.MyApp.SetItem ("OppExtNoteAff", "disabled", true, _oCurWnd);
	
	
	//Desactivation FIDAM
	top.MyApp.SetItem ("OppExtFidam", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppExtRepFIDAM", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppExtFidamCom", "disabled", true, _oCurWnd);
	
	
	//Desactivation du sans suite
	top.MyApp.SetItem ("OppExtRaisonSS", "disabled", true, _oCurWnd);
	top.MyApp.SetItemAttribute("OppExtRaisonSS", "className", "", _oCurWnd);
	top.MyApp.CurrentSetting.Catalog["OppExtRaisonSS"].Mn=0;
	
	top.MyApp.SetItem ("OppExtRaisonSSCom", "disabled", true, _oCurWnd);
	top.MyApp.SetItemAttribute("OppExtRaisonSSCom", "className", "", _oCurWnd);
	top.MyApp.CurrentSetting.Catalog["OppExtRaisonSSCom"].Mn=0;
	
	
	//Desactivation Non suivi
	top.MyApp.SetItem ("OppExtRaisonNS", "disabled", true, _oCurWnd);
	top.MyApp.SetItemAttribute("OppExtRaisonNS", "className", "", _oCurWnd);      
	top.MyApp.CurrentSetting.Catalog["OppExtRaisonNS"].Mn=-1; 
	
	top.MyApp.SetItem ("OppExtRaisonComNS", "disabled", true, _oCurWnd);
	top.MyApp.SetItemAttribute("OppExtRaisonComNS", "className", "", _oCurWnd);      
	top.MyApp.CurrentSetting.Catalog["OppExtRaisonComNS"].Mn=-1;
}