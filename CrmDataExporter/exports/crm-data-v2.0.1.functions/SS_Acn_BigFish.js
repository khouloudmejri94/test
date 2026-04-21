function SS_Acn_BigFish(vNRID,ValBF,CkBF)
{
	// SS_Acn_BigFish
	try {
	    var ObjSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var ProcParam: StoredProcParam[] = new StoredProcParam[3];
	        ProcParam[0] = new StoredProcParam("pAcnNRID", "NUMBER", "IN", 200, vNRID);
	        ProcParam[1] = new StoredProcParam("pValBF", "VARCHAR", "IN", 30, ValBF);
	        ProcParam[2] = new StoredProcParam("pCkBF", "VARCHAR", "IN", 30, CkBF);
	        var strResultProc = ObjSQL.ExecuteStoredProc("AcnBigFish", ProcParam);
	} catch (e) {
	    throw (e.message);
	}
}