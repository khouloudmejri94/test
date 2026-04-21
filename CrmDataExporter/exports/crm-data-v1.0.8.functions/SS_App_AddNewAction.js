function(pAcnStatus,pAcnType,pAcnObject,pAcnOwner,pAcnCpyName,pAcnCpyNRID,pAcnPerName,pAcnPerNRID,pAcnExtListeSalon,pAcnExtNote,pClearance)
{
	//AddNew Action Salon --41611188354440
	//SS_App_AddNewAction("A FAIRE", vRaisResult, vQualifAct, pOwner, pSupplier, pNrid, pContact, vPe0Nrid, pSalon, pStockType, pClearance);
	try {
		var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
		var vGenQualif = "";
		var vRetour = "";
		if (pAcnType == '') {
			pAcnType = "RELANCE";
		}
		if (pAcnObject == '') {
			pAcnObject = "CLASSIQUE";
		}
	
		/**************** Qualif Action ******************/
		if (pAcnExtNote == 'A') {
			vGenQualif = pAcnObject;
		} else if (pAcnExtNote == 'B') {
			vGenQualif = "CLASSIQUE";
		} else if (pAcnExtNote == 'C') {
			vGenQualif = "REFUS DE CONCEPT";
		}
		/**************** Qualif Action ******************/
	
		var vEmail = "";
		var vTel = "";
		var vMobile = "";
	
		var vSQL = "SELECT top 1 pe0.nrid as Pe0Nrid, fonction as PerCpyFunction , e_mail as PerCpyEmailAddress, tel as PerCpyDirectPhNbr, mobile_phone as PerCpyMobilePhNbr from sysadm.pe0 inner join sysadm.sp0 on sp0.pe0_nrid = pe0.nrid where pe0.nrid = '" + pAcnPerNRID + "' ";
		var MyResults = MyQuery.ExecuteSql(vSQL);
		var oXmlRes = InitXml(MyResults);
		var oRows = FindItem("Flds", oXmlRes, true);
		var NbRows = oRows.Count;
		Selligent.Library.Monitor.Tracer.Write("HAS Mail Tel Mobile contact row found = " + NbRows, false);
		//si contact existant alors recupérer son NRID
		if (NbRows == 1) {
			vEmail = GetItemValue("PerCpyEmailAddress", oRows[0]);
			vTel = GetItemValue("PerCpyDirectPhNbr", oRows[0]);
			vMobile = GetItemValue("PerCpyMobilePhNbr", oRows[0]);
		}
	
		var MyAcnObj = CreateSelligentObject("Action", CurrentSessionID, false);
		MyAcnObj.New();
		var mySelectionRow = new SelectionRow();
		mySelectionRow.Fields["AcnOwner"] = pAcnOwner;
		mySelectionRow.Fields["AcnExtAcheteur"] = pAcnOwner;
		mySelectionRow.Fields["AcnNature"] = "ACT-SALON";
		mySelectionRow.Fields["AcnStatus"] = pAcnStatus;
		mySelectionRow.Fields["AcnType"] = pAcnType;
		mySelectionRow.Fields["AcnObject"] = vGenQualif;
		mySelectionRow.Fields["AcnExtQualifFiche"] = pAcnObject;
		mySelectionRow.Fields["AcnSubject"] = pClearance;
	    mySelectionRow.Fields["AcnExtCommentaire"] = pClearance;
		mySelectionRow.Fields["AcnCpyName"] = pAcnCpyName;
		mySelectionRow.Fields["AcnCpyNRID"] = pAcnCpyNRID;
		mySelectionRow.Fields["AcnPerName"] = pAcnPerName;
		mySelectionRow.Fields["AcnPerNRID"] = pAcnPerNRID;
		mySelectionRow.Fields["AcnExtListeSalon"] = pAcnExtListeSalon;
		mySelectionRow.Fields["AcnExtNote"] = pAcnExtNote;
		mySelectionRow.Fields["AcnPriority"] = '';
	
		if (vEmail != '' && vEmail != null && vEmail != undefined) {
			mySelectionRow.Fields["AcnExtMailContact"] = vEmail;
		}
		if (vTel != '' && vTel != null && vTel != undefined) {
			mySelectionRow.Fields["AcnExtTelFixContact"] = vTel;
		}
		if (vMobile != '' && vMobile != null && vMobile != undefined) {
			mySelectionRow.Fields["AcnExtTelContact"] = vMobile;
		}
	
		var date = new Date();
		date.setDate(date.getDate());
		var dayS = date.getDate();
		var monthS = date.getMonth() + 1;
		var yearS = date.getFullYear();
		var dateRs = new DateTime(yearS, monthS, dayS);
		mySelectionRow.Fields["AcnStartDate"] = dateRs;
		mySelectionRow.Fields["AcnExtRelanceAuto"] = 1;
		MyAcnObj.SetAndSave(mySelectionRow);
	
		var myxml = MyAcnObj.GetXml("AllFields");
		var MyXmlDocument = InitXml(myxml);
		var intAcnNRID = GetItemValue("AcnNRID", MyXmlDocument);
		var vAcheteur = GetItemValue("AcnExtAcheteur", MyXmlDocument);
		vRetour = intAcnNRID;
	
		//transférer Action au titulaire de la fiche 
		if (vAcheteur != pAcnOwner) {
			var ObjSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
			var ProcParam: StoredProcParam[] = new StoredProcParam[3];
			ProcParam[0] = new StoredProcParam("pAcnNRID", "NUMBER", "IN", 200, intAcnNRID);
			ProcParam[1] = new StoredProcParam("pTitulaire", "VARCHAR", "IN", 30, pAcnOwner);
			ProcParam[2] = new StoredProcParam("pFunction", "VARCHAR", "IN", 30, "NEG");
			var strResultProc = ObjSQL.ExecuteStoredProc("sp_affect_todo", ProcParam);
		}
	
	} catch (e) {
		vRetour = "KO Erreur SS_Acn_AddNewAction : " + e.message;
	} finally {
		FreeSelligentObject(MyAcnObj);
		MyAcnObj.Dispose();
		return vRetour;
	}
}