function SS_Cpy_Reaffect_Supplier_ActToDo(pCpyNrid,pReqFunction,pReqName,pOldOwner)
{
	try {
	 var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var ProcParam: StoredProcParam[] = new StoredProcParam[4];
	 ProcParam[0] = new StoredProcParam("nrid", "NUMBER", "IN", 15, pCpyNrid);
	 ProcParam[1] = new StoredProcParam("fonction", "VARCHAR", "IN", 100, pReqFunction);
	 ProcParam[2] = new StoredProcParam("Nouvtit", "VARCHAR", "IN", 100, pReqName );
	 ProcParam[3] = new StoredProcParam("Anctit", "VARCHAR", "IN", 100, pOldOwner);
	 var strResultProc = oQryObj.ExecuteStoredProc("REAFFECT_TRANSFER", ProcParam);
	 return ("S ok working");
	} catch (e) {
	 return "Error reassigning suppiler: " + e.message;
	}
}