function(nExpNrid,vUser,nOffer)
{
	try {
	    /*var result = "";
	    var myCompany = CreateSelligentObject("Company", CurrentSessionID, true);
	    var mySelectionRow : SelectionRow = new SelectionRow();
	    myCompany.Open(nExpNrid);
	    if (mySelectionRow.Fields["CpyExtDateDemValExport"] == ""  || mySelectionRow.Fields["CpyExtDateDemValExport"] == null){
	        result = "New";
	        mySelectionRow.Fields["CpyExtUserDemValExport"] = vUser;
	        mySelectionRow.Fields["CpyExtModif"] = vUser;
	        mySelectionRow.Fields["CpyExtDateDemValExport"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	        mySelectionRow.Fields["CpyExtDateModif"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	        if (mySelectionRow.Fields["CpyExtIsExporter"] == ""  || mySelectionRow.Fields["CpyExtIsExporter"] == null) {
	            mySelectionRow.Fields["CpyExtIsExporter"] = '1';
	        }
	        myCompany.OpenSetAndSave(parseInt(nExpNrid), mySelectionRow);
	        //myCompany.Open(nExpNrid);
	        //myCompany.SetAndSave(mySelectionRow);
	    } else {
	        result = "Old";
	    }
	    return result;*/
	 var ObjSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var ProcParam: StoredProcParam[] = new StoredProcParam[3];
	 ProcParam[0] = new StoredProcParam("pCpyNRID", "NUMBER", "IN", 200, nExpNrid);
	 ProcParam[1] = new StoredProcParam("pUser", "VARCHAR", "IN", 30, vUser);
	 ProcParam[2] = new StoredProcParam("pOffer", "NUMBER", "IN", 200, nOffer);
	 var strResultProc = ObjSQL.ExecuteStoredProc("ws_agent_export", ProcParam); 
	} catch (e) {
	 throw (e.message);
	}
}