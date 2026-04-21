function()
{
	SS_Quo_MAJ_Date_Statut();
	CurrentRecord["QuoExtDerogation"] = 'NON'
	var objSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	//DEBUT FTC@MASAO MANTIS 14297 - RG 1.11 - 04/01/2018
	if (CurrentRecord.IsUpdated("QuoOppReference") && CurrentRecord["QuoCpyNRID"] != '') {
	    var vSQL = "SELECT cd FROM sysadm.so0 WHERE nrid = '" + CurrentRecord["QuoCpyNRID"] + "' and template is null";
	    var MyResults = objSQL.ExecuteSql(vSQL);
	    var MyXmlDocument = InitXml(MyResults);
	    var MyRows = FindItem("Flds", MyXmlDocument, true);
	    if (MyRows.Count > 0) {
	        CurrentRecord["QuoExtNumFour"] = GetItemValue("CpyCode", MyRows[0]);
	    }
	}
	CurrentRecord["QuoExtSalon"] = null;
	if (CurrentRecord["QuoOppReference"] != '') {
	    var vQuery = "SELECT xAcheteur, xAssCom, sujet, xsalon, xfamille FROM sysadm.do0 WHERE ref = '" + CurrentRecord["QuoOppReference"] + "' and template is null";
	    MyResults = objSQL.ExecuteSql(vQuery);
	    MyXmlDocument = InitXml(MyResults);
	    MyRows = FindItem("Flds", MyXmlDocument, true);
	    if (MyRows.Count > 0) {
	        var vAcheteur = GetItemValue("OppExtAcheteur", MyRows[0]);
	        var vACO = GetItemValue("OppExtAssCom", MyRows[0]);
	        var vDescDuLot = GetItemValue("OppComment", MyRows[0]);
	        var vSalon = GetItemValue("OppExtSalon", MyRows[0]);
	        var vFamille = GetItemValue("OppExtFamille", MyRows[0]);
	        if (vAcheteur != '' && vAcheteur != null) {
	            if (CurrentRecord["QuoExtRefAr"] == '' || CurrentRecord["QuoExtRefAr"] == null || CurrentRecord["QuoExtRefAr"] == undefined) {
	                CurrentRecord["QuoExtAcht"] = vAcheteur;
	            } else {
	                var objSQL1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	                var vQuery1 = "SELECT top 1 xAcht  FROM sysadm.dc0 where vos_ref = '" + CurrentRecord["QuoExtRefAr"] + "' and xclient = '" + CurrentRecord["QuoExtClient"] + "'  and template is null";
	                var MyResults1 = objSQL1.ExecuteSql(vQuery1);
	                var MyXmlDocument1 = InitXml(MyResults1);
	                var MyRows1 = FindItem("Flds", MyXmlDocument1, true);
	                var vAchAR = MyRows1[0]
	                if (MyRows1.Count > 0 && vAchAR != '' && vAchAR != null && vAchAR != undefined) {
	                    var vAchtAR = GetItemValue("QuoExtAcht", MyRows1[0]);
	                    //throw "Acheteur sur offre AR  " + vAchtAR;
	                    CurrentRecord["QuoExtAcht"] = vAchtAR;
	                } else {
	                    CurrentRecord["QuoExtAcht"] = vAcheteur;
	                }
	            }
	        }
	        if (vACO != '' || vACO != null) CurrentRecord["QuoExtAssComm"] = vACO;
	        // HAS : Importer le descritif lot de l'affaire
	        if (vDescDuLot != '' || vDescDuLot != null) CurrentRecord["QuoExtDesLot"] = vDescDuLot;
	        // HAS : Importer le salon de l'affaire
	        if (vSalon != '' || vSalon != null) {
	            CurrentRecord["QuoExtSalon"] = vSalon;
	        } else {
	            CurrentRecord["QuoExtSalon"] = null;
	        }
	        // HAS : Importer la famille de produit de l'affaire
	        if (vFamille != '' || vFamille != null) CurrentRecord["QuoExtFamille"] = vFamille;
	    }
	}
	delete objSQL;
	delete objSQL1;
	//END FTC@MASAO MANTIS 14297
	// HAS : Initialiser le Manager Achat à partir du nom de l'acheteur
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	if (CurrentRecord["QuoExtAcht"] != "" && CurrentRecord["QuoExtAcht"] != null) {
	 var vSQL2 = "select titulaire as mngach   from sysadm.am0 res_mng where Template is null and bactive =1 and (res_mng.fonction like '%Manager%' or res_mng.fonction like '%Team Leader%') and res_mng.team_name in (select res_user.team_name  from sysadm.am0 res_user where res_user.titulaire ='" + CurrentRecord["QuoExtAcht"] + "' and Template is null) ";
	 var oRes2 = oQryObj2.ExecuteSql(vSQL2);
	 var oXmlDoc2 = InitXml(oRes2);
	 var oRows2 = FindItem("Flds", oXmlDoc2, true);
	 if (GetItemValue("mngach", oRows2[0]) != "" && GetItemValue("mngach", oRows2[0]) != null && GetItemValue("mngach", oRows2[0]) != undefined) {
	  CurrentRecord["QuoExtManager"] = GetItemValue("mngach", oRows2[0]);
	 } else return true;
	 delete oQryObj2;
	}
	// HAS: Initialiser l'équipe du de l'acheteur 
	var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL = "select (select team_name from sysadm.am0 where titulaire ='" + CurrentRecord["QuoExtAcht"] + "' and Template is null) as TeamAcht  ";
	var oRes = oQryObj.ExecuteSql(vSQL);
	var oXmlDoc = InitXml(oRes);
	var oRows = FindItem("Flds", oXmlDoc, true);
	CurrentRecord["QuoExtTeam"] = GetItemValue("TeamAcht", oRows[0]);
	delete oQryObj;
	
	//SIR: xRapTest Not Mandatoy when ..
	//var vListFamille  = "Animalerie;Chaussants et chaussettes;Chaussures;Collants;Confection enfants;Confection femmes;Lingerie;Lot mixé confection (USA);Maroquinerie" ;
	
	//if(vListFamille.indexOf(vFamille) != -1) 
	// HAS : RT --> Not Mandatory si famille de produit appartient à cette clause
	/*var vFamille = CurrentRecord["QuoExtfamille"];
	if (vFamille == "Animalerie" || vFamille == "Chaussants et chaussettes" || vFamille == "Chaussures" || vFamille == "Collants" || vFamille == "Confection enfants" || vFamille == "Confection femmes" || vFamille == "Confection Hommes" || vFamille == "Lingerie" || vFamille == "Lot mixé confection (USA)" || vFamille == "Maroquinerie") {
	 CurrentRecord["QuoExtRapTest"] = "Non Obligatoire";
	 CurrentRecord["QuoExtPriseEnChargeNorms"] = "SYS AUTO";
	 CurrentRecord["QuoExtDateDebVal"] = DateTime.Now.ToString("dd/MM/yyyy");
	 CurrentRecord["QuoExtValidationNormes"] = 'Sans Normes';
	}*/
	
	// HAS : Deb 28/10/2018 : insérer la valeur Lost si une offre arrive en Lost
	var vStatut = CurrentRecord["QuoExtStatoff"];
	if (vStatut == '3. Perdue') {
	 CurrentRecord["QuoExtraisonoffre"] = "Lost";
	}
	// HAS : Fin 28/10/2018 : insérer la valeur Lost si une offre arrive en Lost
}