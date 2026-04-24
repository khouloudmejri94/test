function SS_Cpy_OnBeforeInsert()
{
	//Auteur : Pierre-Louis EGAUD
	//Société : MASAO
	//Date de création : 11/09/2012
	//Description : before insert server de l'objet métier Cpy (Fournisseur)
		//SS_Cpy_OnBeforeInsert => Extention
	
	// Hich : Si Owner = 'web service' alors owner = Créateur 
	try {
	    
	
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	
	if (CurrentUserName == "SRM Web Service") {
	
	    CurrentRecord["CpyOwner"]= CurrentRecord["CpyExtCreateur"];
	
	    var vUser = CurrentRecord["CpyOwner"];
	    //Selligent.Library.Monitor.Tracer.Write("HICHEEEEEEEEEEEEMMMM " + vUser, false);
	    var vSQL3 = "select Fonction as vFonction  from sysadm.am0 res_user where res_user.titulaire ='" + vUser + "' ";
	    var oRes3 = oQryObj2.ExecuteSql(vSQL3);
	    var oXmlDoc3 = InitXml(oRes3);
	    var oRows3 = FindItem("Flds", oXmlDoc3, true);
	    var vFonction = GetItemValue("vFonction", oRows3[0]);
	    //Selligent.Library.Monitor.Tracer.Write("HICHEEEEEEEEEEEEMMMM " + vFonction, false);
	
	     if (vFonction == "Acheteur" || vFonction == "Negociateur") {
	        CurrentRecord["CpyOwner"] = vUser;
	        CurrentRecord["CpyExtAcht"] = vUser;
	        } else if (vFonction == "Sourceur") { 
	        CurrentRecord["CpyExtSrc"] = vUser;
	        CurrentRecord["CpyOwner"] = vUser;
	        } else if (vFonction == "Prospecteur") { 
	        CurrentRecord["CpyExtProsp"] = vUser;
	        CurrentRecord["CpyOwner"] = vUser;
	        } else if (vFonction == "Manager Achat" || vFonction == "Team Leader Negociation") {
	        CurrentRecord["CpyOwner"] = vUser;
	        CurrentRecord["CpyExtAcht"] = vUser;
	        CurrentRecord["CpyExtManagerAchat"] = vUser;        
	        } else if (vFonction == "Manager Prospection" || vFonction == "Team Leader Prospection") {
	        CurrentRecord["CpyOwner"] = vUser;
	        CurrentRecord["CpyExtProsp"] = vUser;
	        } else if (vFonction == "Administrateur" || vFonction == "Back Office") {
	        CurrentRecord["CpyExtAcht"]= vUser ;     
	        CurrentRecord["CpyOwner"] = vUser;
	        CurrentRecord["CpyExtManagerAchat"] = vUser;
	        } 
	
	               if (vFonction != "Sourceur"){
	                  CurrentRecord["CpyExtFlagAffect"] = 1 ;
	               }
	
	}
	} catch (e) {
	 throw "Error on SS_Cpy_OnNewRecord " + e;
	} finally { // libération mémoire objet “Selligent”
	
	    oQryObj2.Dispose();
	    FreeSelligentObject(oQryObj2);
	
	}
	
		//si le numéro de téléphone saisie contient deux zéros en premier caractère, on les supprime
	if (CurrentRecord.IsUpdated("CpyPhoneNbr")) {
	    var vPhoneNbr = CurrentRecord["CpyPhoneNbr"];
	    if (vPhoneNbr.substring(0, 2) == "00") CurrentRecord["CpyPhoneNbr"] = vPhoneNbr.substring(2);
	}
	
	// HAS : Contrôle sur existance des acteurs : acheteur, prospecteurs et managers équivalents *** mise à jour du titulaire
	
	if (CurrentRecord["CpyExtSrc"] != "" && CurrentRecord["CpyExtSrc"] != null) {
	    CurrentRecord["CpyOwner"] = CurrentRecord["CpyExtSrc"];
	} else if (CurrentRecord["CpyExtAcht"] != "" && CurrentRecord["CpyExtAcht"] != null) {
	    CurrentRecord["CpyOwner"] = CurrentRecord["CpyExtAcht"];
	} else if (CurrentRecord["CpyExtProsp"] != "" && CurrentRecord["CpyExtProsp"] != null) {
	    CurrentRecord["CpyOwner"] = CurrentRecord["CpyExtProsp"];
	} else if (CurrentRecord["CpyExtManagerAchat"] != "" && CurrentRecord["CpyExtManagerAchat"] != null) {
	    CurrentRecord["CpyOwner"] = CurrentRecord["CpyExtManagerAchat"];
	} else if (CurrentRecord["CpyExtManagerProspection"] != "" && CurrentRecord["CpyExtManagerProspection"] != null) {
	    CurrentRecord["CpyOwner"] = CurrentRecord["CpyExtManagerProspection"];
	} /*else {
	    CurrentRecord["CpyOwner"] = CurrentUserName;
	    CurrentRecord["CpyExtAcht"] = CurrentUserName;
	}*/
		// HAS DEB 13/04/2023 - si fiche proposee par SRC alors verouiller pendant 72 heures 
	if (CurrentRecord["CpyExtPropAffectSrc"] != "" && CurrentRecord["CpyExtPropAffectSrc"] != null) {
	 CurrentRecord["CpyExtSrcLock"] = '1';
	 CurrentRecord["CpyExtDatePropAffect"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS DEB 13/04/2023 - si fiche proposee par SRC alors verouiller pendant 72 heures
	try {
	 var vToday = DateTime.Now.ToString("dd/MM/yyyy");
	 var vPRange = CurrentRecord["CpyExtFamilleProd"];
	 var vCountry = CurrentRecord["CpyAddr1Country"];
	 var isOkPr, isOkCn;
	 var vControl = 0;
	 //var isOkPr = 0;
	 //var isOkCn = 0;
	
	 var MySql = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var strSQL = "SELECT pl.date_start as dStart, pl.date_end dEnd, p_range as pRange, country as country ";
	 strSQL += " from sysadm.x_mng_src pl where ";
	 strSQL += " pl.users = '" + CurrentUserName + "' ";
	 strSQL += " and cast(getdate() as date) BETWEEN pl.date_start and pl.date_end ";
	
	 var res = MySql.ExecuteSql(strSQL);
	
	 var MyXmlDoc = InitXml(res);
	 var MyRows = FindItem("Flds", MyXmlDoc, true);
	 for (var i = 0; i < MyRows.Count; i++) {
	  var pStart = GetItemValue("dStart", MyRows[i]);
	  var pEnd = GetItemValue("dEnd", MyRows[i]);
	  var pPRange = GetItemValue("pRange", MyRows[i]);
	  var pCountry = GetItemValue("country", MyRows[i]);
	
	  if (pPRange != 'ND') {
	   if (pPRange == vPRange) {
	    isOkPr = 1;
	   } else {
	    isOkPr = 0;
	   }
	  } else {
	   isOkPr = 2;
	  }
	
	  if (pCountry != 'ND') {
	   if (pCountry == vCountry) {
	    isOkCn = 1;
	   } else {
	    isOkCn = 0;
	   }
	  } else {
	   isOkCn = 2;
	  }
	
	  if (vToday >= pStart || vToday <= pEnd) {
	   if ((isOkPr == 1 || isOkPr == 2) && (isOkCn == 1 || isOkCn == 2)) {
	    vControl += 1;
	   }
	  }
	 }
	 if (vControl > 0) {
	  CurrentRecord["CpyExtValidSrc"] = 'Initial';
	 }
	} catch (e) {
	 throw "HAS - Error on SS_Cpy_OnBeforeInsert Src Initial : " + e;
	} finally {
	    FreeSelligentObject(MySql);
	    MySql.Dispose();
	}
	//delete MySql;
	
		 var CpyProsp = CurrentRecord["CpyExtProsp"];
	 var CpyDateProsp = CurrentRecord["CpyExtDateProsp"];
	 //var ACH=CurrentRecord["CpyOwner"];
	 
	 if (CpyProsp != '' && CpyProsp != undefined && (CpyDateProsp == '' || CpyDateProsp == undefined)){
	      CurrentRecord["CpyExtDateProsp"]= DateTime.Now.ToString("dd/MM/yyyy");
	 }
	 
	 
	 // HAS: insérer le stecteur du fournisseur à partir du secteur du crétaeur
	 
	 var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	            var vSQL = "select (select team_name from sysadm.am0 where titulaire ='"+CurrentRecord["CpyExtCreateur"]+"') as SecteurComp  ";
	            var oRes = oQryObj.ExecuteSql(vSQL); 
	            var oXmlDoc = InitXml(oRes);   
	            var oRows = FindItem("Flds", oXmlDoc, true); 
	   
	             CurrentRecord["CpyExtSecteur"] =  GetItemValue("SecteurComp", oRows[0]); 
	 
	 //delete oQryObj; 
	 //return true; 
	// libération mémoire objet “Selligent”
	try {
	     FreeSelligentObject(oQryObj);
	oQryObj.Dispose();
	} catch (e) {
	     Selligent.Library.Monitor.Tracer.Write("################################ SS_Cpy_OnBeforeInsert : échec libération objet “Selligent” #############################");
	}
	 
	
	
	 /*
	 var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	            var vSQL = "select res_mng.titulaire  as mngach from sysadm.am0 res_mng inner join sysadm.am0 res_user on res_user.team_name=res_mng.team_name and res_user.titulaire like '%Nouha%' where res_mng.fonction like '%Manager%' ";
	  
	           var oRes = oQryObj.ExecuteSql(vSQL); 
	           var oXmlDoc = InitXml(oRes);   
	           var oRows = FindItem("Flds", oXmlDoc, true); 
	  
	           CurrentRecord["CpyExtManagerAchat"] = GetItemValue("mngach", oRows[0]); 
	 delete oQryObj; 
	 return true;  
	  
	  var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	            var vSQL1 = "select res_mng.titulaire as mngpros from sysadm.am0 res_mng where  res_mng.fonction like '%Manager%' and res_mng.team_name in (select res_user.team_name  from sysadm.am0 res_user where res_user.titulaire='"+ACH+"')";
	  
	           var oRes1 = oQryObj1.ExecuteSql(vSQL1); 
	           var oXmlDoc1 = InitXml(oRes1);   
	           var oRows1 = FindItem("Flds", oXmlDoc1, true); 
	        
	           CurrentRecord["CpyExtManagerProspection"] =  GetItemValue("mngpros", oRows1[0]); 
	      delete oQryObj; 
	      return true; 
	 
	  
	  */
}