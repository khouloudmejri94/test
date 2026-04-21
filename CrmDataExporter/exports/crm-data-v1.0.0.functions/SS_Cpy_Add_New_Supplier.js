function SS_Cpy_Add_New_Supplier(pSoc,pFair,pTeleph,pMob,pMail,pFamilleProduit,pActivity,pRem,pAddr,pWebsite,pSource,pSpecifySource,pProductNature)
{
	// Add New Supplier -- 41342064176660
	// SS_Cpy_Add_New_Supplier
	// HAS DEB 2024-12-15 : Add New Supplier
	// Param : pSoc,pFair,pTeleph,pMob,pMail,pFamilleProduit,pActivity,pRem,pAddr,pWebsite
	
	var vResult = "";
	try {
		/*if (pOwner == '' || pOwner == null) {
		        pOwner = 'Missing Owner'
		}*/
		/*if (pFair == '' || pFair == null) {
		 pFair = 'Missing data'
		}*/
		if (pTeleph == '' || pTeleph == null) {
			pTeleph = '00000000'
		}
		if (pMail == '' || pMail == null) {
			pMail = 'Missing@ozeol.com'
		}
		if (pAddr == '' || pAddr == null) {
			pAddr = 'Missing Data'
		}
		if (pRem == '' || pRem == null) {
			pRem = 'Missing Data'
		}
		if (pMob == '' || pMob == null) {
			pMob = '00000000'
		}
		if (pSoc == '' || pSoc == null) {
			pSoc = 'Missing Supplier name'
		}
		if (pFamilleProduit == '' || pFamilleProduit == null) {
			pFamilleProduit = 'Missing Data'
		}
		if (pActivity == '' || pActivity == null) {
			pActivity = 'Missing Data'
		}
		if (pAddr == '' || pAddr == null) {
			pAddr = 'Missing Data'
		}
		if (pWebsite == '' || pWebsite == null) {
			pWebsite = 'missing.com'
		}
		if (pSource == '' || pSource == null) {
			pSource = 'Tradshows';
		}
		if (pSpecifySource == '' || pSpecifySource == null) {
			pSpecifySource = 'Tradeshow';
		}
		if (pProductNature == '' || pProductNature == null) {
			pProductNature = pFamilleProduit;
		}
	
		var MyCpyObj = CreateSelligentObject("Company", CurrentSessionID, false);
		MyCpyObj.New();
		var mySelectionRow = new SelectionRow();
		//Header
		mySelectionRow.Fields["CpyName"] = pSoc;
		mySelectionRow.Fields["CpyExtSalon"] = pFair;
		mySelectionRow.Fields["CpyPhoneNbr"] = pTeleph;
		mySelectionRow.Fields["CpyExtMobile"] = pMob;
		mySelectionRow.Fields["CpyEmailAddress"] = pMail;
		//General
		mySelectionRow.Fields["CpySource"] = pSource;
		mySelectionRow.Fields["CpyExtDetailsource"] = pSpecifySource;
		mySelectionRow.Fields["CpyExtFamilleProd"] = pFamilleProduit;
		mySelectionRow.Fields["CpyAddr1Department"] = pProductNature;
		mySelectionRow.Fields["CpyWebAddress"] = pWebsite;
		mySelectionRow.Fields["CpyExtTypeActiv"] = pActivity;
		mySelectionRow.Fields["CpyExtComFrs"] = pRem;
		//Address
		mySelectionRow.Fields["CpyAddr1StrName"] = pAddr;
		mySelectionRow.Fields["CpyAddr1Postcode"] = "000";
		mySelectionRow.Fields["CpyAddr1City"] = " ";
		mySelectionRow.Fields["CpyAddr1Country"] = "Undefined";
		//mySelectionRow.Fields["CpyExtProsp"] = vTit;
		mySelectionRow.Fields["CpyExtTypefrs"] = "PROSPECT";
		mySelectionRow.Fields["CpyType"] = "PROSPECT";
		mySelectionRow.Fields["CpyExtEtatPepite"] = "SAS";
		mySelectionRow.Fields["CpyExtValidSas"] = "EN COURS";
		mySelectionRow.Fields["CpyExtDateCreat"] = DateTime.Now.ToString("dd/MM/yyyy");
		mySelectionRow.Fields["CpyExtCreateur"] = CurrentUserName;
		mySelectionRow.Fields["CpyExtIsDestock"] = '1';
		mySelectionRow.Fields["CpyExtClassFourn"] = "Inconnu";
		mySelectionRow.Fields["CpyExtFlagAffect"] = '1';
	  mySelectionRow.Fields["CpyExtConsigne"] = "SANS CONSIGNE";
		//mySelectionRow.Fields["CpyExtProsp"] = CurrentUserName;
		//mySelectionRow.Fields["CpyOwner"] = "BO FAIR TEAM";
	
		MyCpyObj.SetAndSave(mySelectionRow);
		//MyAcnObj.Set(mySelectionRow);
		var myxml = MyCpyObj.GetXml("AllFields");
		var MyXmlDocument = InitXml(myxml);
		var intCpyNRID = GetItemValue("CpyNRID", MyXmlDocument);
		vResult = intCpyNRID;
	} catch (e) {
		vResult = "KO Unable to create supplier ! : " + e.message;
	} finally {
		FreeSelligentObject(MyCpyObj);
		MyCpyObj.Dispose();
		return vResult;
	}
	// HAS DEB 2024-12-11 : Add New Supplier
}