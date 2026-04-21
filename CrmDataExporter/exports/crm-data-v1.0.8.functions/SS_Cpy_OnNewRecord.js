function()
{
	 /*************************************************************/
	 // Société                             : MASAO
	 // Nom script                          : SS_Cpy_OnNewRecord
	 // Infos Paramètres                    :  
	 // Auteur                              : CCO                                                  
	 // Chapitre concerné                   : Société
	 // Date de création                    : 29/05/2012
	 // Modifié par                         :                                                   
	 // Date de modification                :  
	 // Commentaires                        : 
	 // Règles de gestion                   : RG.1 Fournisseur
	 /*************************************************************/
	
	
	
	
	
	
	
		try {
	 //Cpy - Valeurs par défaut pour tous profils
	 var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vUser = CurrentUserName;
	 CurrentRecord["CpyExtTypefrs"] = "PROSPECT";
	 CurrentRecord["CpyType"] = "PROSPECT";
	 CurrentRecord["CpyExtEtatPepite"] = "SAS";
	 CurrentRecord["CpyExtValidSas"] = "EN COURS";
	 CurrentRecord["CpyExtDateCreat"] = DateTime.Now.ToString("dd/MM/yyyy");
	
	 // Hich : Si création par extention alors pas de mise a jour créateur
	 if (CurrentUserName != "SRM Web Service"){
	 CurrentRecord["CpyExtCreateur"] = CurrentUserName;
	}
	
	
	 CurrentRecord["CpyExtIsDestock"] = '1';
	 //#936-CBA 11.05.2017
	 CurrentRecord["CpyExtClassFourn"] = "Inconnu";
	 if (Session["ResExtOutSrc"] == "1") {
	  CurrentRecord["CpyExtOutSrc"] = '1';
	 }
	 // HAS DEB 10/04/2023 - ajouter flux prévalidation TL Sourcing avec un flag pour certains users 
	 if (Session["ResFunction"] == "Sourceur") {
	  CurrentRecord["CpyExtSrc"] = CurrentUserName;
	  if (Session["ResExcept"] == '1') {
	   CurrentRecord["CpyExtValidSrc"] = 'Initial';
	  }
	 }
	 // HAS END 10/04/2023 - ajouter flux prévalidation TL Sourcing avec un flag pour certains users
	 //#936
	 // HAS : Ajout de conditions de remplissage des champs par défaut selon la fonction de l'utilisateur connecté
	 if (Session["ResFunction"] == "Acheteur" || Session["ResFunction"] == "Negociateur") {
	  CurrentRecord["CpyOwner"] = CurrentUserName;
	  CurrentRecord["CpyExtAcht"] = CurrentUserName;
	 } else if (Session["ResFunction"] == "Chef Produit") {
	  CurrentRecord["CpyExtCp"] = CurrentUserName;
	  CurrentRecord["CpyOwner"] = CurrentUserName;
	 } else if (Session["ResFunction"] == "Prospecteur") { //|| Session["ResFunction"] == "Sourceur"
	  CurrentRecord["CpyExtProsp"] = CurrentUserName;
	  CurrentRecord["CpyOwner"] = CurrentUserName;
	 } else if (Session["ResFunction"] == "Manager Achat" || Session["ResFunction"] == "Team Leader Negociation") {
	  CurrentRecord["CpyOwner"] = CurrentUserName;
	  CurrentRecord["CpyExtAcht"] = CurrentUserName;
	 } else if (Session["ResFunction"] == "Manager Prospection" || Session["ResFunction"] == "Team Leader Prospection") {
	  CurrentRecord["CpyOwner"] = CurrentUserName;
	  CurrentRecord["CpyExtProsp"] = CurrentUserName;
	 } else if (Session["ResFunction"] == "Administrateur" || Session["ResFunction"] == "Back Office") {
	  // CurrentRecord["CpyExtAcht"]= CurrentUserName ;     
	  CurrentRecord["CpyOwner"] = CurrentUserName;
	  CurrentRecord["CpyExtManagerAchat"] = CurrentUserName;
	  // replir les champs titulaire et negociateur pour les assistantes des acheteurs
	 }  else if (Session["ResFunction"] == "Assistant Achat") {
	  CurrentRecord["CpyOwner"] = CurrentUserName;
	  //CurrentRecord["CpyExtProsp"] = CurrentUserName;
	  CurrentRecord["CpyExtSrc"] = CurrentUserName;
	  var vSQL2 = "select resmng.titulaire as mngach from sysadm.res_liees, sysadm.am0 resmng where res_liees.personne = resmng.titulaire and resmng.fonction = 'Negociateur' and res_liees.vue_ressource = '" + CurrentUserName + "' ";
	  var oRes2 = oQryObj2.ExecuteSql(vSQL2);
	  var oXmlDoc2 = InitXml(oRes2);
	  var oRows2 = FindItem("Flds", oXmlDoc2, true);
	  if (GetItemValue("mngach", oRows2[0]) != "" && GetItemValue("mngach", oRows2[0]) != null) {
	   CurrentRecord["CpyExtAcht"] = GetItemValue("mngach", oRows2[0]);
	  } 
	 }  else if (Session["ResFunction"] == "Assistante Commerciale") {
	  var vSQL2 = "select titulaire as mngach   from sysadm.am0 res_mng where  ( res_mng.fonction like '%Team Leader%') and res_mng.bactive =1 and res_mng.team_name in (select res_user.team_name  from sysadm.am0 res_user where res_user.titulaire ='" + CurrentUserName + "') ";
	  var oRes2 = oQryObj2.ExecuteSql(vSQL2);
	  var oXmlDoc2 = InitXml(oRes2);
	  var oRows2 = FindItem("Flds", oXmlDoc2, true);
	  if (GetItemValue("mngach", oRows2[0]) != "" && GetItemValue("mngach", oRows2[0]) != null) {
	   CurrentRecord["CpyOwner"] = GetItemValue("mngach", oRows2[0]);
	   CurrentRecord["CpyExtAcht"] = GetItemValue("mngach", oRows2[0]);
	  }
	 }
	 var vSQL = "select top 1 pl.product as product, pl.date_start as date_start, pl.date_end as date_end, P_Range as famille, pl.source as source FROM x_planning_src pl where pl.template is null and pl.users = '" + vUser + "' and cast (GETDATE() as date) BETWEEN cast (pl.date_start as date) and cast (pl.date_end as date) ";
	 var oRes = oQryObj2.ExecuteSql(vSQL);
	 var oXmlDoc = InitXml(oRes);
	 var oRows = FindItem("Flds", oXmlDoc, true);
	 if (oRows.Count != 0) {
	  var vProduct = GetItemValue("product", oRows[0]);
	  var vStart = GetItemValue("date_start", oRows[0]);
	  var vEnd = GetItemValue("date_end", oRows[0]);
	  var vFamille = GetItemValue("famille", oRows[0]);
	  var vSource = GetItemValue("source", oRows[0]);
	
	  if (vSource != "" && vSource != null) {
	   CurrentRecord["CpySource"] = vSource;
	  }
	  if (vProduct != "" && vProduct != null) {
	   CurrentRecord["CpyExtSourceSrc"] = vProduct;
	  }
	  if (vStart != "" && vStart != null) {
	   CurrentRecord["CpyExtDateStartSrc"] = vStart;
	  }
	  if (vEnd != "" && vEnd != null) {
	   CurrentRecord["CpyExtDateEndSrc"] = vEnd;
	  }
	  if (vFamille != "" && vFamille != null && vFamille != "ND") {
	   CurrentRecord["CpyExtFamilleProd"] = vFamille;
	  }
	 } //CpyExtSourceSrc
	
	 /**/
	 //delete oQryObj2;
	} catch (e) {
	 throw "Error on SS_Cpy_OnNewRecord " + e;
	} finally { // libération mémoire objet “Selligent”
	 FreeSelligentObject(oQryObj2);
	 oQryObj2.Dispose();
	}
	//return true;
		return true;
}