function SS_App_CloseAction(pAcnNrid)
{
	//Close Action
	//SS_App_CloseAction --41971088354440
	
	try {
	   var vRetour = "";
	   var MyAcnObj = CreateSelligentObject("Action", CurrentSessionID, false);
	   var row = new SelectionRow();
	   
	   row.Fields["AcnStatus"] = 'FERME';
	   row.Fields["AcnStartDate"] = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");
	   row.Fields["AcnExtModificateur"] = 'CLOSED';
	   MyAcnObj.OpenSetAndSave(pAcnNrid, row);
	
	   var myxml = MyAcnObj.GetXml("AllFields");
		var MyXmlDocument = InitXml(myxml);
		var intAcnNRID = GetItemValue("AcnNRID", MyXmlDocument);
		vRetour = intAcnNRID;
	} catch (e) {
		vRetour = "KO Erreur SS_Acn_AddNewAction : " + e.message;
	} finally {
	   FreeSelligentObject(MyAcnObj);
		MyAcnObj.Dispose();
	   return vRetour;
	}
}