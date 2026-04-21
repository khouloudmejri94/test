function()
{
	top.MyApp.UserSetting.AsyncMapping = {
	
	 "Acn_OnBeforeUpdate": {
	  "frame": "top.MyApp.fraData_View",
	  "functions": ["PS_Acn_OnBeforeUpdate"]
	 },
	 "Per_OnBeforeInsert": {
	  "frame": "top.MyApp.fraData_View",
	  "functions": ["PS_Per_OnBeforeInsert"]
	 },
	 "Quo_OnBeforeUpdate": {
	  "frame": "top.MyApp.fraData_View",
	  "functions": ["PS_Quo_OnBeforeUpdate"]
	 },
	 "Opp_OnBeforeUpdate": {
	  "frame": "top.MyApp.fraData_View",
	  "functions": ["PS_Opp_OnBeforeUpdate"]
	 },
	 "Itm_OnBeforeUpdate": {
	  "frame": "top.MyApp.fraData_View",
	  "functions": ["PS_Itm_OnBeforeInsertUpdate"]
	 },
	 "Itm_OnBeforeInsert": {
	  "frame": "top.MyApp.fraData_View",
	  "functions": ["PS_Itm_OnBeforeInsertUpdate"]
	 },
	 "Cpy_OnAfterUpdate": {
	  "frame": "top.MyApp.fraData_View",
	  "functions": ["PS_Cpy_OnAfterUpdate"]
	 },
	 "Cpy_OnBeforeInsert": {
	  "frame": "top.MyApp.fraData_View",
	  "functions": ["PS_Cpy_OnBeforeInsert"]
	 }
	
	};
	
	
	
	if (!top.MyApp.CustomSetting) {
	 top.MyApp.CustomSetting = []
	}
	var vDBName = top.MyApp.AppSetting.DBName
	var vQuery = "select code, libelle from xref0 where filtre='" + vDBName + "'";
	var objXmlDoc = top.MyApp.fctGetQryResult(vQuery, "true", 0, -1)
	var nbRows = top.MyApp.GetItemAttributeFromXML(objXmlDoc, "Result", "FullCount")
	var tabGlobalVar = []
	for (var j = 0; j < nbRows; j++) {
	 vCode = top.MyApp.GetItemAttributeFromXML(objXmlDoc, "ExtRefCODE", "Val", "../id", j + 1)
	 vLib = top.MyApp.GetItemAttributeFromXML(objXmlDoc, "ExtRefLIBELLE", "Val", "../id", j + 1)
	 tabGlobalVar[vCode] = vLib
	}
	top.MyApp.CustomSetting.tabGlobalVar = tabGlobalVar
	top.MyApp.CustomSetting.OppIsUpdatedStatus = false;
	top.MyApp.CustomSetting.QuoIsUpdatedStatus = false;
	top.MyApp.CustomSetting.CpyIsUpdatedStatus = false;
	top.MyApp.CustomSetting.CtiAcnNrid = "";
	top.MyApp.CustomSetting.BackButton = 0;
	top.MyApp.CustomSetting.ListArray = "";
	//USER ET CODE SAP
	var strSQLRes = "select xuser_sap, xcode_sap, replace(replace(team_name,' ',''),'é','e') , xvalidaffair, xValidMdpAch, xValidAffPros, xOutSrc, xBizDev, xAdminSalon, plz.Zone , am0.xplateau  , am0.xzone from sysadm.am0 left join sysadm.x_param_Plateau_zone plz on am0.xPlateau = plz.Plateau and plz.Bureau = am0.xBureau where titulaire = '" + top.MyApp.UserSetting.User.Name + "' ";
	var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	top.MyApp.CustomSetting.UserSAP = arrRes[0][0];
	top.MyApp.CustomSetting.CodeSAP = arrRes[0][1];
	top.MyApp.CustomSetting.Equipe = arrRes[0][2];
	top.MyApp.CustomSetting.ValidAffair = arrRes[0][3];
	top.MyApp.CustomSetting.ValidMdpAch = arrRes[0][4];
	top.MyApp.CustomSetting.ValidAffPros = arrRes[0][5];
	top.MyApp.CustomSetting.OutSrc = arrRes[0][6];
	top.MyApp.CustomSetting.BizDev = arrRes[0][7];
	top.MyApp.CustomSetting.AdSalon = arrRes[0][8];
	top.MyApp.CustomSetting.ZoneGI = arrRes[0][9];
	top.MyApp.CustomSetting.Plateau = arrRes[0][10];
	top.MyApp.CustomSetting.AdmFonction = arrRes[0][11];
	//Récup. Ressources liées
	var strSQLRes = "select vue_equipe from sysadm.res_liees where vue_equipe != '' and personne = '" + top.MyApp.UserSetting.User.Name + "' "
	var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	top.MyApp.CustomSetting.VueEquipe = arrRes;
	var strSQLRes = "select vue_ressource from sysadm.res_liees where vue_ressource != '' and personne = '" + top.MyApp.UserSetting.User.Name + "' "
	var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	top.MyApp.CustomSetting.VueRessource = arrRes;
	//E-mail Litige
	top.MyApp.CustomSetting.EmailAddress = "";
	//top.MyApp.OpenDlg("35059658706405","Attention","",false,"","");
	// HAS début - Début 26/10/2018 : gestion des exports
	var vUser = top.MyApp.UserSetting.User.Name;
	var vProfil = top.MyApp.UserSetting.User.ProfileInitials;
	var vQuery = "select xExport, xExportAcn, xExportPer, xExportOpp, xExportQuo , team_name from sysadm.am0 where titulaire ='" + top.MyApp.UserSetting.User.Name + "' ";
	var arrRes = top.MyApp._gfctExtReq(vQuery);
	var vExportCpy = arrRes[0][0];
	var vExportAcn = arrRes[0][1];
	var vExportPer = arrRes[0][2];
	var vExportOpp = arrRes[0][3];
	var vExportQuo = arrRes[0][4];
	top.MyApp.CustomSetting.TestOzSimulator = vExportQuo;
	var vTeam = arrRes[0][5];
	//top.MyApp.OpenDlg("Alert", ["Attention", "VALEUR OPTION EXPORT : "+vExport+"."]);
	// FMTN : pour CDG
	/*
	top.MyApp.UserSetting['HSecurity']['Cpy'].Print = 1;
	top.MyApp.UserSetting['HSecurity']['Cpy'].Export = 1;
	top.MyApp.UserSetting['HSecurity']['Acn'].Print = 1;
	top.MyApp.UserSetting['HSecurity']['Acn'].Export = 1;
	top.MyApp.UserSetting['HSecurity']['Opp'].Print = 1;
	top.MyApp.UserSetting['HSecurity']['Opp'].Export = 1;
	top.MyApp.UserSetting['HSecurity']['Quo'].Print = 1;
	top.MyApp.UserSetting['HSecurity']['Quo'].Export = 1;
	}
	*/
	// Disable SignalR
	//top.MyApp.AppSetting.RealTimeCom.Enabled = false;
	/*
	if (vProfil != 'ADMT' && vProfil != 'ADMF' && vProfil != 'FMTN') {
	if (vExportCpy != 1) {
	top.MyApp.UserSetting['HSecurity']['Cpy'].Print = 0;
	top.MyApp.UserSetting['HSecurity']['Cpy'].Export = 0;
	}
	if (vExportAcn != 1) {
	top.MyApp.UserSetting['HSecurity']['Acn'].Print = 0;
	top.MyApp.UserSetting['HSecurity']['Acn'].Export = 0;
	}
	if (vExportAcn != 1) {
	top.MyApp.UserSetting['HSecurity']['Per'].Print = 0;
	top.MyApp.UserSetting['HSecurity']['Per'].Export = 0;
	}
	if (vExportPer != 1) {
	top.MyApp.UserSetting['HSecurity']['Opp'].Print = 0;
	top.MyApp.UserSetting['HSecurity']['Opp'].Export = 0;
	}
	if (vExportQuo != 1) {
	top.MyApp.UserSetting['HSecurity']['Quo'].Print = 0;
	top.MyApp.UserSetting['HSecurity']['Quo'].Export = 0;
	}
	} else return true;
	*/
	// HAS Fin - Début 26/10/2018 : gestion des exports
	//top.MyApp.AppSetting.MaxExportRecords = 5;
	if (vProfil == 'ADMT' || vProfil == 'FMTN' || vProfil == 'ADMF' || vUser == 'Julian DURAN' || vUser == 'Imen Letaief' || vUser == 'Hamdi BEN MABROUK' || vUser == 'Erik Steven Lopez Ayala') {
	 top.MyApp.AppSetting.MaxExportRecords = 5000;
	} else if (vUser == 'Claire Legentil' || vUser == 'Hamdi DAHMENE' || vUser == 'Hanene CHELLY' || vUser == 'Wissem Sassi' || vUser == 'Sondes Salmi' || vUser == 'Purabi Mistry' || vUser == 'Mohamed Lotfi ABDELKEFI' || vUser == 'Khalifa DEROUICHE' || vUser == 'Sana MRADDA' || vUser == 'Mehdi ben Kahla' || vUser == 'Ali MAHJOUB') {
	 top.MyApp.AppSetting.MaxExportRecords = 2000;
	} else {
	 top.MyApp.AppSetting.MaxExportRecords = 150;
	 top.MyApp.fctStatSelector = new Function('g_tblMain', 'top.MyApp.OpenDlg("Alert", ["Statistiques","Statistics not allowed."]);return false;');
	}
	
	
	//top.MyApp.$("#imgLogo",top.MyApp.fraMenuBar.document).html(top.MyApp.UserSetting.User.Name + "/" + vTeam).css("color", "orange").css("padding-left", "50px").show();
	/*
	// Set new logo image
	top.MyApp.$("#imgLogo", top.MyApp.fraMenuBar.document).css("background-image", "url(selligent-marketing-cloud2.png)");
	
	// Update text with Welcome message and apply inline styles
	top.MyApp.$("#imgLogo", top.MyApp.fraMenuBar.document).html("Welcome : " + top.MyApp.UserSetting.User.Name )
	    .css({
	        "color": "orange",
	        "font-size": "16px",
	        "border-radius": "5px",
	        "display": "inline-block",
	        "margin-left": "20px"
	    })
	    .show();
	*/
	
		/*[D]Test Suede*/
	/*Gestion table des relances
	Modif :
	-RLM 19.05.2016 ajout filtre sur TEL pour attribution auto, le reste passe dans le TDB
	-RLM 19.05.2016 ajout variable de Groupe pour remplacer execution de requete
	*/
	try{
	  var strSQLRes= "select COUNT(*) as nbLigne from sysadm.res_liees t1, sysadm.am0 t2 where t1.vue_ressource = '"+top.MyApp.UserSetting.User.Name +"' and t1.personne = t2.titulaire and t2.xcategorie = 'Groupe'"
	  var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	  top.MyApp.CustomSetting.Groupe = arrRes;
	
	
	  if(top.MyApp.CustomSetting.Groupe >= 1){
	   var strSQLRes= "select COUNT(*) as nbLignes from sysadm.tgr0 where titulaire = '"+top.MyApp.UserSetting.User.Name +"' and groupe <> '' and etat <> 'FAIT' and type = 'TEL'"
	   var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	   if(arrRes == 0){
	      var strSQLRes= "select top 1 t0.nrid from sysadm.tgr0 t0, sysadm.res_liees t1, sysadm.am0 t2 where t1.vue_ressource = '"+top.MyApp.UserSetting.User.Name +"' and t1.personne = t2.titulaire and t2.xcategorie = 'Groupe' and t0.groupe = t2.titulaire and t0.titulaire = '' and t0.etat <> 'FAIT' and type = 'TEL' order by t0.date_deb asc"
	      var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	    
	      var arrResult=[];
	      var arrParam=[];
	      arrParam[0] = "update sysadm.tgr0 set titulaire = '"+top.MyApp.UserSetting.User.Name +"' where tgr0.nrid = "+arrRes+"";
	      
	      //appel du script _gsfctExecuteSql
	      arrResult[0] = top.MyApp.ExecuteServerScript("30231053360342", arrParam);
	   }
	  }
	}catch(e){
	     alert(e.message);
	}
	/*[F]*/
		//Recuperation adresse Share point
	var strSQLRes= "select libelle from sysadm.xref0 where CODE = 'SHAREPOINT_SRV' and Filtre = '" + top.MyApp.UserSetting.User.Database  + "'";
	var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	top.MyApp.CustomSetting.tabGlobalVar["SHAREPOINT_SRV"]=arrRes[0][0];
	
	var ret = top.MyApp.ExecuteServerScript(34738078695813,['UdvSP_SRV',arrRes[0][0]],false);
		return true;
}