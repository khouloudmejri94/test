function(pCpyNrid,pReqFct,pReqName,pCpyLnkNRID)
{
	//SS_Cpy_ReaffectComp
	//41101577556342
	//Param : pCpyNrid, pReqFct, pReqName, pCpyLnkNRID
	try {
	    // si nouveau fournisseur et non pas suite MERGE alors on fait le transfert de la fiche
	    if (pCpyLnkNRID == '0') {
	        //var intNridCpy = CurrentRecord['pCpyNrid']
	        var ObjSupplier = CreateSelligentObject("Company", CurrentSessionID, true);
	        var mySelectionRow = new SelectionRow();
	        ObjSupplier.Open(pCpyNrid);
	        var strDetailsource = ObjSupplier.GetValue("CpyExtDetailsource");
	        var strFamilleProd = ObjSupplier.GetValue("CpyExtFamilleProd");
	        if (strDetailsource == "" || strDetailsource == null){
	        mySelectionRow.Fields["CpyExtDetailsource"] = ".";
	        }
	        if (strFamilleProd == "" || strFamilleProd == null){
	        mySelectionRow.Fields["CpyExtFamilleProd"] = ".";
	        }
	        if (pReqFct === 'Negociateur') {
	            mySelectionRow.Fields["CpyExtAcht"] = pReqName;
	            mySelectionRow.Fields["CpyExtProsp"] = '';
	            mySelectionRow.Fields["CpyExtManagerProspection"] = '';
	        } else if (pReqFct === 'Prospecteur') {
	            mySelectionRow.Fields["CpyExtProsp"] = pReqName;
	            mySelectionRow.Fields["CpyExtAcht"] = '';
	            mySelectionRow.Fields["CpyExtManagerAchat"] = '';
	        }
	
	        mySelectionRow.Fields["CpyOwner"] = pReqName;
	        mySelectionRow.Fields["CpyExtDdeTransfertCP"] = '';
	        mySelectionRow.Fields["CpyExtValideurdetransfert"] = CurrentUserName;
	        mySelectionRow.Fields["CpyExtDatedetransfert"] = DateTime.Now.ToString("dd/MM/yyyy");
	        mySelectionRow.Fields["CpyExtVldtndtrnsfrt"] = '';
	        mySelectionRow.Fields["CpyExtPourach"] = '';
	        mySelectionRow.Fields["CpyExtPourcp"] = '';
	
	        //ObjSupplier.Open(pCpyNrid);
	        ObjSupplier.SetAndSave(mySelectionRow);
	    }
	
	    var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var vSQL = "select top 1 hi0.nrid as hi0nrid from hi0 where status = 'A FAIRE' and hi0.template is null and so0_nrid = '" + pCpyNrid + "' ORDER BY DMOD DESC ";
	    var oRes = oQryObj.ExecuteSql(vSQL);
	    var oXmlDoc = InitXml(oRes);
	    var oRows = FindItem("Flds", oXmlDoc, true);
	
	    var vUserFunction = "";
	    if (oRows.Count === 1) {
	        if (pReqFct === 'Negociateur') {
	            vUserFunction = "NEG";
	        } else if (pReqFct === 'Prospecteur') {
	            vUserFunction = "PROS";
	        }
	        var NridAct = GetItemValue("hi0nrid", oRows[0]);
	        var ProcParam = new StoredProcParam[3];
	        ProcParam[0] = new StoredProcParam("pAcnNRID", "NUMBER", "IN", 200, NridAct);
	        ProcParam[1] = new StoredProcParam("pTitulaire", "VARCHAR", "IN", 30, pReqName);
	        ProcParam[2] = new StoredProcParam("pFunction", "VARCHAR", "IN", 30, vUserFunction);
	        
	        var strResultProc = oQryObj.ExecuteStoredProc("sp_affect_todo", ProcParam);
	    }
	
	    return ("S ok working");
	} catch (e) {
	    return "Error reassigning suppiler: " + e.message;
	}
}