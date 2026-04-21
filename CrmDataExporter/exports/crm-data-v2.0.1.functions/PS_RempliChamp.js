function PS_RempliChamp(champ)
{
	  /*************************************************************/
	    // Société                             : MASAO
	    // Nom script                          : PS_RempliChamp
	    // Infos Paramètres                    :  
	    // Auteur                              : CCO                                                  
	    // Chapitre concerné                   : Fournisseur
	    // Date de création                    : 30/05/2012
	    // Modifié par                         :                                                   
	    // Date de modification                :  
	    // Commentaires                        : 
	    // Règles de gestion                   : 
	    /*************************************************************/
	
		var _oCurWnd;
	if (!top.MyApp.wizardWindow) 
	{
	 _oCurWnd = top.MyData_View; 
	}
	else
	{
	 _oCurWnd = top.MyApp.wizardWindow; 
	}
		// Appel de la boîte de sélection des Ressources
	// Blocage de l'appel si le champ auquel est attaché le sélecteur est déjà renseigné
	
	
	/*
	var CDP = top.MyApp.GetItemValue("CpyExtCp",top.MyData_View)
	if(!CDP)
	 {
	 top.MyApp.OpenGenDlg(['Res'],'',['Res'],[['ResName','%'],['ResFunction','Acheteur']]);
	 top.MyApp.SetItemValue(champ,top.MyApp.AppSetting.dlgReturn[0]);
	 }
	*/
	if (champ == "AcnExtAffairAR") {
	 top.MyApp.OpenGenDlg(['Opp'], '', ['Opp'], [
	  ['OppReference', '%']
	 ]);
	 if (top.MyApp.AppSetting.dlgReturn[0] != undefined) top.MyApp.SetItemValue(champ, top.MyApp.AppSetting.dlgReturn[20]);
	} else if (champ == "OppExtChefproduit" || champ == "CpyExtCp" || champ == "QuoExtCPAff") {
	 top.MyApp.OpenGenDlg(['Res'], '', ['Res'], [
	  ['ResName', '%'],
	  ['ResFunction', 'Manager Prospection'],
	  ['ResIsActive', 'checked', 'true']
	 ]);
	 if (top.MyApp.AppSetting.dlgReturn[0] != undefined) top.MyApp.SetItemValue(champ, top.MyApp.AppSetting.dlgReturn[14], _oCurWnd);
	} else if (champ == "OppExtAcheteur" || champ == "CpyExtAcht" || champ == "QuoExtAcht") {
	 top.MyApp.OpenGenDlg(['Res'], '', ['Res'], [
	  ['ResName', '%'],
	  ['ResFunction', 'Negociateur'],
	  ['ResIsActive', 'checked', 'true']
	 ]);
	 if (top.MyApp.AppSetting.dlgReturn[0] != undefined) top.MyApp.SetItemValue(champ, top.MyApp.AppSetting.dlgReturn[14], _oCurWnd);
	} else if (champ == "OppExtAssCom" || champ == "QuoExtAssComm") {
	 top.MyApp.OpenGenDlg(['Res'], '', ['Res'], [
	  ['ResName', '%'],
	  ['ResFunction', 'Assistante Commerciale'],
	  ['ResIsActive', 'checked', 'true']
	 ]);
	 if (top.MyApp.AppSetting.dlgReturn[0] != undefined) top.MyApp.SetItemValue(champ, top.MyApp.AppSetting.dlgReturn[14], _oCurWnd);
	} else if (champ == "AcnPerName") {
	 top.MyApp.OpenGenDlg(["Per"], "AcnPerName", ["Acn"], [
	  ["PerCpyCpyName", top.MyApp.GetItemValue("AcnCpyName")],
	  ["PerCpyCpyName", "disabled", "true"],
	  ["PerName", "disabled", "true"]
	 ]);
	} else if (champ == "CpyExtConsigne") {
	 top.MyApp.OpenGenDlg(['Itm'], '', ['Itm'], [
	  ['ItmReference', '%'],
	  ['ItmExtUnivers', '%'],
	  ['ItmExtFam', '%'],
	  ['ItmExtSousFam', '%'],
	  ['ItmExtAcheteur', '%']
	 ]);
	 if (top.MyApp.AppSetting.dlgReturn[0] != undefined) top.MyApp.SetItemValue(champ, top.MyApp.AppSetting.dlgReturn[13], _oCurWnd);
	} 
	 else if (champ == "AcnExtConsigne") {
	 top.MyApp.OpenGenDlg(['Itm'], '', ['Itm'], [
	  ['ItmReference', '%'],
	  ['ItmExtUnivers', '%'],
	  ['ItmExtFam', '%'],
	  ['ItmExtSousFam', '%'],
	  ['ItmExtAcheteur', '%']
	 ]);
	 if (top.MyApp.AppSetting.dlgReturn[0] != undefined) top.MyApp.SetItemValue(champ, top.MyApp.AppSetting.dlgReturn[13], _oCurWnd);
	}else if (champ == "OppExtConsigne") {
	 top.MyApp.OpenGenDlg(['Itm'], '', ['Itm'], [
	  ['ItmReference', '%'],
	  ['ItmExtUnivers', '%'],
	  ['ItmExtFam', '%'],
	  ['ItmExtSousFam', '%'],
	  ['ItmExtAcheteur', '%']
	 ]);
	 if (top.MyApp.AppSetting.dlgReturn[0] != undefined) top.MyApp.SetItemValue(champ, top.MyApp.AppSetting.dlgReturn[13], _oCurWnd);
	}
	else {
	 top.MyApp.OpenGenDlg(['Res'], '', ['Res'], [
	  ['ResName', '%'],
	  ['ResFunction', '']
	 ]);
	 if (top.MyApp.AppSetting.dlgReturn[0] != undefined) top.MyApp.SetItemValue(champ, top.MyApp.AppSetting.dlgReturn[14], _oCurWnd);
	}
	
	
	
	
	top.MyApp._gfctPutButton('CpyExtConsigne', "top.MyApp.PS_RempliChamp('CpyExtConsigne')", '', false, '...');
		return true;
}