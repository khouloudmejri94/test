function(pCpyNrid,pFirstName,pLastName,pMobile,pSupplier,pFonction,pEmail,pPhone)
{
	//Add New Contact : SS_App_AddNewContact
	// HAS DEB 2024-12-11 : Add New Contact
	//35549055567609;TestFirstName;TestLastName;000112233;TEST YASMINE 7;ADMINN;Email@ozeol.com
	//
	var vResult = "";
	try {
		if (pFonction == '') {
			pFonction = "Sales Manager";
		}
		var MyPerObj = CreateSelligentObject("Person", CurrentSessionID, false);
		MyPerObj.New();
		var mySelectionRow = new SelectionRow();
		mySelectionRow.Fields["PerCpyCpyName"] = pSupplier;
		mySelectionRow.Fields["PerCpyCpyNRID"] = pCpyNrid;
		mySelectionRow.Fields["PerCpyInDate"] = DateTime.Now.ToString("dd/MM/yyyy");
	
		mySelectionRow.Fields["PerFirstName"] = pFirstName;
		mySelectionRow.Fields["PerName"] = pLastName;
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
		vResult = "KO Erreur SS_App_AddNewContact : " + e.message;
	} finally {
		FreeSelligentObject(MyPerObj);
		MyPerObj.Dispose();
		return vResult;
	}
	// HAS DEB 2024-12-11 : Add New Contact
}