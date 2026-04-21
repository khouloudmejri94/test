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
		//On passe le Statut à Déposé
	top.MyApp.SetItemValue ("OppStatus", "01. EN CONSTITUTION",_oCurWnd);
	//On met le statut en lecture seule
	top.MyApp.SetItem ("OppStatus", "disabled", true, _oCurWnd);
	top.MyApp.SetItem ("OppStatusBtn", "disabled", true, _oCurWnd);
	//On met l'Acheteur en lecture seule
	top.MyApp.SetItem ("OppExtAcheteur", "disabled", true, _oCurWnd);
	//On met le CP en lecture seule
	top.MyApp.SetItem ("OppExtChefproduit", "disabled", true, _oCurWnd);
	//On rend le champ Demandes marketing éditable
	top.MyApp.SetItem("OppExtInfoMarkt", "disabled", false, _oCurWnd);
	top.MyApp.SetItemAttribute("OppExtInfoMarkt", "className", "", _oCurWnd);
	top.MyApp.CurrentSetting.Catalog.OppExtInfoMarkt.Ed = 1;
	top.MyApp.SetItem("OppExtInfoMarkt", "contentEditable", true, _oCurWnd);
	
	/*[D]Grand Import*/
	var strSQLRes= "select COUNT(*) as nbLigne from sysadm.am0 where titulaire = '"+ top.MyApp.GetItemValue("OppExtAcheteur") +"' and team_name = 'GI'"
	var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	if(arrRes == 1){
	     top.MyApp.SetItem("OppExtInfoMarktListe", "disabled", false, _oCurWnd);
	     top.MyApp.SetItemAttribute("OppExtInfoMarktListe", "className", "Mandatory", _oCurWnd);
	     top.MyApp.SetItem("OppExtInfoMarktListe", "contentEditable", true, _oCurWnd);
	     top.MyApp.CurrentSetting.Catalog.OppExtInfoMarktListe.Ed = 1;
	     top.MyApp.CurrentSetting.Catalog.OppExtInfoMarktListe.Mn = 1;
	  //DEBUT FTC@MASAO - MANTIS 14219 - 19/12/2017
	     top.MyApp.SetItemValue ("OppStatus", "03. Dmd.VALID. MANAG.PROS",_oCurWnd);
	  //FIN FTC@MASAO - MANTIS 14219 - 19/12/2017
	     top.MyApp.SetItemValue ("OppExtInfoMarktListe", "",_oCurWnd);
	     top.MyApp.SetItemValue ("OppExtInfoMarkt", "",_oCurWnd);
	     top.MyApp.SetItemValue ("OppExtCommQu", "",_oCurWnd);
	}else{
	     top.MyApp.SetItem("OppExtInfoMarktListe", "disabled", false, _oCurWnd);
	     top.MyApp.SetItemAttribute("OppExtInfoMarktListe", "className", "", _oCurWnd);
	     top.MyApp.SetItem("OppExtInfoMarktListe", "contentEditable", true, _oCurWnd);
	     top.MyApp.CurrentSetting.Catalog.OppExtInfoMarktListe.Ed = 1;
	     top.MyApp.CurrentSetting.Catalog.OppExtInfoMarktListe.Mn = 0;
	}
	/*[F]*/
}