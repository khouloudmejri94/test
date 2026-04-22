function SS_Quo_Liaison_AgentExport(nCpyNRID,nExpNrid,vCpyName,vAgExport)
{
	try {
	 var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vSQL = "select max(isnull(nrid,0))+1 as number from lnk0";
	 var oRes = oQryObj.ExecuteSql(vSQL);
	 var oXmlDoc = InitXml(oRes);
	 var oRows = FindItem("Flds", oXmlDoc, true);
	 var nNRID = GetItemValue("number", oRows[0]);
	 delete oQryObj;
	 // Exécution de la procédure stockée pour lier les deux fiches fournisseur marchandise et exportateur
	 var ObjSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var ProcParam: StoredProcParam[] = new StoredProcParam[5];
	 ProcParam[0] = new StoredProcParam("pCpyNRID", "NUMBER", "IN", 200, nCpyNRID);
	 ProcParam[1] = new StoredProcParam("pExpNrid", "NUMBER", "IN", 200, nExpNrid);
	 ProcParam[2] = new StoredProcParam("pCpyName", "VARCHAR", "IN", 50, vCpyName);
	 ProcParam[3] = new StoredProcParam("pAgExport", "VARCHAR", "IN", 50, vAgExport);
	 ProcParam[4] = new StoredProcParam("pNrid", "NUMBER", "IN", 200, nNRID);
	 var strResultProc = ObjSQL.ExecuteStoredProc("Liaison_Fiche_Export", ProcParam);
	} catch (e) {
	 throw (e.message);
	}
}