function(pNrid,pMobile,pFonction,pEmail,pPhone)
{
	//Update Contact : SS_App_UpdateContact
	// HAS DEB 2024-12-24 : Update Contact
	//Param : pNrid, pMobile, pFonction, pEmail, pPhone
	//
	var vResult = "";
	try {
	 var MyPerObj = CreateSelligentObject("Person", CurrentSessionID, true);
	 MyPerObj.Open(pNrid);
	 var mySelectionRow = new SelectionRow();
	 mySelectionRow.Fields["PerCpyMobilePhNbr"] = pMobile;
	 mySelectionRow.Fields["PerCpyEmailAddress"] = pEmail;
	 mySelectionRow.Fields["PerCpyFunction"] = pFonction;
	    mySelectionRow.Fields["PerCpyDirectPhNbr"] = pPhone;
	 MyPerObj.SetAndSave(mySelectionRow);
	 //MyAcnObj.Set(mySelectionRow);
	 var myxml = MyPerObj.GetXml("AllFields");
	 var MyXmlDocument = InitXml(myxml);
	 var intPerNRID = GetItemValue("PerNRID", MyXmlDocument);
	 vResult = intPerNRID;
	} catch (e) {
	 vResult = "KO Erreur SS_App_UpdateContact : " + e.message;
	} finally {
	 FreeSelligentObject(MyPerObj);
	 MyPerObj.Dispose();
	 return vResult;
	}
	// HAS DEB 2024-12-11 : Add New Contact
}