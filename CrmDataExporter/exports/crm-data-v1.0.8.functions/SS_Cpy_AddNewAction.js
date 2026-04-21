function()
{
	try {
	 var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vSQL = "select nrid, societe, xAcht, xprosp from sysadm.so0 where nrid = :nSocNRID";
	 var oRes = oQryObj.ExecuteSql(vSQL);
	 var oXmlDoc = InitXml(oRes);
	 var oRows = FindItem("Flds", oXmlDoc, true);
	 if (oRows.Count > 0) {
	  var vCpyNrid = GetItemValue("CpyNRID", oRows[0]);
	  var vSoc = GetItemValue("CpyName", oRows[0]);
	  var vProsp = GetItemValue("CpyExtProsp", oRows[0]);
	  var vAcht = GetItemValue("CpyExtAcht", oRows[0]);
	 }
	 var MyAcnObj = CreateSelligentObject("Action", CurrentSessionID, false);
	 MyAcnObj.New();
	 var mySelectionRow = new SelectionRow();
	 mySelectionRow.Fields["AcnStatus"] = "A FAIRE";
	 mySelectionRow.Fields["AcnNature"] = "TEL";
	 mySelectionRow.Fields["AcnType"] = "RELANCE";
	 mySelectionRow.Fields["AcnObject"] = "CLASSIQUE";
	 mySelectionRow.Fields["AcnSubject"] = "";
	 mySelectionRow.Fields["AcnCpyName"] = vSoc;
	 mySelectionRow.Fields["AcnCpyNRID"] = vCpyNrid;
	 mySelectionRow.Fields["AcnPerName"] = "";
	 mySelectionRow.Fields["AcnPerNRID"] = "";
	 mySelectionRow.Fields["AcnPriority"] = "";
	 mySelectionRow.Fields["AcnExtCreateur"] = CurrentUserName;
	
	 if (Session["ResFunction"] == "Prospecteur" || Session["ResFunction"] == "Manager Prospection" || Session["ResFunction"] == "Team Leader Prospection" || Session["ResFunction"] == "Sourceur") {
	  mySelectionRow.Fields["AcnOwner"] = CurrentUserName;
	  mySelectionRow.Fields["AcnExtProsp"] = CurrentUserName;
	  mySelectionRow.Fields["AcnExtAcheteur"] = "";
	 } else if (Session["ResFunction"] == "Acheteur" || Session["ResFunction"] == "Negociateur" || Session["ResFunction"] == "Manager Achat" || Session["ResFunction"] == "Team Leader Negociation") {
	  mySelectionRow.Fields["AcnOwner"] = CurrentUserName;
	  mySelectionRow.Fields["AcnExtAcheteur"] = CurrentUserName;
	  mySelectionRow.Fields["AcnExtProsp"] = "";
	 } //else if (Session["ResFunction"] == "Administrateur") {
	  else{
	  mySelectionRow.Fields["AcnOwner"] = CurrentUserName;
	  mySelectionRow.Fields["AcnExtAcheteur"] = CurrentUserName;
	mySelectionRow.Fields["AcnExtProsp"] = "";
	 }
	 //mySelectionRow.Fields["AcnExtAcheteur"] = vAcht;
	 mySelectionRow.Fields["AcnExtEquipeAch"] = "";
	 mySelectionRow.Fields["AcnExtRelanceAuto"] = 1;
	 //  HAS: envoi du prospecteur si fiche créée par un prospecteur
	 //mySelectionRow.Fields["AcnExtProsp"] = vProsp;
	 mySelectionRow.Fields["AcnStartDate"] = DateTime.Now.ToString("dd/MM/yyyy");
	 // action pecial comunik
	 mySelectionRow.Fields["AcnExtFlagComunik"] = '1';
	 mySelectionRow.Fields["AcnExtFlagAppel"] = '1';
	
	 /* if (vAcht != '' && vAcht != null) {
	   mySelectionRow.Fields["AcnOwner"] = vAcht;
	  } else if (vProsp != '' && vProsp != null) {
	   mySelectionRow.Fields["AcnOwner"] = vProsp;
	  } else {
	   mySelectionRow.Fields["AcnOwner"] = CurrentUserName;
	   mySelectionRow.Fields["AcnExtAcheteur"] = CurrentUserName;
	  }*/
	 //mySelectionRow.Fields["AcnExtCreateur"] = mySelectionRow.Fields["AcnOwner"];
	 MyAcnObj.SetAndSave(mySelectionRow);
	 var myxml = MyAcnObj.GetXml("AllFields");
	 var MyXmlDocument = InitXml(myxml);
	 var intAcnNRID = GetItemValue("AcnNRID", MyXmlDocument);
	 delete MyAcnObj;
	 //CurrentRecord["AcnAcnSubject"] = "";
	 //CurrentRecord["AcnAcnNRID"] = intAcnNRID;
	 delete oQryObj;
	} catch (e) {
	 delete MyAcnObj;
	 throw " Erreur NEW ACTION COMUNIK INSERT : " + e.message;
	}
}