function SS_Sp_CloseAction(intAcnNRID)
{
	// SP Close Acion
	try {
	   var vRetour = "";
	   var ObjSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	   var ProcParam: StoredProcParam[] = new StoredProcParam[1];
	   ProcParam[0] = new StoredProcParam("pAcnNRID", "NUMBER", "IN", 200, intAcnNRID);
	   var strResultProc = ObjSQL.ExecuteStoredProc("sp_close_todo", ProcParam);
	   vRetour = strResultProc;
	} catch (e) {
	 vRetour = "KO Erreur SS_Sp_CloseAction : " + e.message;
	} finally {
	   FreeSelligentObject(ObjSQL);
	 ObjSQL.Dispose();
	   return vRetour;
	}
}