function SS_update_Screen(pFunction,pObjNRID,pValue)
{
	//SS_update_Screen()
	/*try {
	 var ObjSQL = CreateSelligentObject("SqlHelper",CurrentSessionID);
	 var ProcParam : StoredProcParam[] = new StoredProcParam[3];
	 if (pFunction == "UpdateFair") {
	  // Exécution de la procédure stockée pour .........
	  ProcParam[0]  = new StoredProcParam("pFunction", "VARCHAR", "IN", 100, pFunction);
	  ProcParam[1]  = new StoredProcParam("pNRID", "NUMBER", "IN", 200, pObjNRID);
	  ProcParam[2]  = new StoredProcParam("pString", "VARCHAR", "IN", 100, pValue);
	  var strResultProc = ObjSQL.ExecuteStoredProc("sp_update_screen", ProcParam);
	 } else if (pFunction == "Cancel_ExportAge") {
	  // Exécution de la procédure stockée pour .........
	  ProcParam[0]  = new StoredProcParam("pFunction", "VARCHAR", "IN", 100, pFunction);
	  ProcParam[1]  = new StoredProcParam("pNRID", "NUMBER", "IN", 200, pObjNRID);
	  ProcParam[2]  = new StoredProcParam("pString", "VARCHAR", "IN", 100, pValue);
	  var strResultProc = ObjSQL.ExecuteStoredProc("sp_update_screen", ProcParam);
	 } else if (pFunction == "Cancel_DepReq") {
	  // Exécution de la procédure stockée pour .........
	  ProcParam[0]  = new StoredProcParam("pFunction", "VARCHAR", "IN", 100, pFunction);
	  ProcParam[1]  = new StoredProcParam("pNRID", "NUMBER", "IN", 200, pObjNRID);
	  ProcParam[2]  = new StoredProcParam("pString", "VARCHAR", "IN", 100, pValue);
	  var strResultProc = ObjSQL.ExecuteStoredProc("sp_update_screen", ProcParam);
	 } else if (pFunction == "ChangeGiOffer") {
	  // Exécution de la procédure stockée pour .........
	  ProcParam[0]  = new StoredProcParam("pFunction", "VARCHAR", "IN", 100, pFunction);
	  ProcParam[1]  = new StoredProcParam("pNRID", "NUMBER", "IN", 200, pObjNRID);
	  ProcParam[2]  = new StoredProcParam("pString", "VARCHAR", "IN", 100, pValue);
	  var strResultProc = ObjSQL.ExecuteStoredProc("sp_update_screen", ProcParam);
	 }
	 return strResultProc;
	} catch(e) {
	 throw ("sp_update_screen issue : "+e);
	} finally {
	  delete ObjSQL;
	}*/
	try {
	 var ObjSQL = CreateSelligentObject("SqlHelper",CurrentSessionID);
	 var ProcParam : StoredProcParam[] = new StoredProcParam[3];
	 // Exécution de la procédure stockée pour .........
	 ProcParam[0]  = new StoredProcParam("pFunction", "VARCHAR", "IN", 100, pFunction);
	 ProcParam[1]  = new StoredProcParam("pNRID", "NUMBER", "IN", 200, pObjNRID);
	 ProcParam[2]  = new StoredProcParam("pString", "VARCHAR", "IN", 100, pValue);
	 var strResultProc = ObjSQL.ExecuteStoredProc("sp_update_screen", ProcParam);
	 
	 return strResultProc;
	} catch(e) {
	 throw ("sp_update_screen issue : "+e);
	} finally {
	  delete ObjSQL;
	}
}