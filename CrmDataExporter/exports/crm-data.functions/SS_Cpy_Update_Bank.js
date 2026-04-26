function _SS_Cpy_Update_Bank(pBenfNrid,pBankSwf,pAccNo,pBenefId,pNameBank)
{
	// HAS - Code revue Q4-2024
	try {
	    var result = "";
	    var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var ProcParam: StoredProcParam[] = new StoredProcParam[5];
	    ProcParam[0] = new StoredProcParam("pBenfNrid", "NUMBER", "IN", 200, pBenfNrid);
	    ProcParam[1] = new StoredProcParam("pBankSwf", "VARCHAR", "IN", 50, pBankSwf);
	    ProcParam[2] = new StoredProcParam("pAccNo", "VARCHAR", "IN", 50, pAccNo);
	    ProcParam[3] = new StoredProcParam("pBenefId", "VARCHAR", "IN", 50, pBenefId);
	    ProcParam[4] = new StoredProcParam("pNameBank", "VARCHAR", "IN", 100, pNameBank);
	    var strResultProc = oQryObj.ExecuteStoredProc("sp_benef_bank_update", ProcParam);
	    result = strResultProc;
	    //return strResultProc;
	} catch (e) {
	    result = e.message;
	    throw (" Error Update Bank Details : " + e.message);
	} finally {
	    //HAS DEB Liberer object SQL
	    try {
	        FreeSelligentObject(oQryObj);
	        oQryObj.Dispose();
	    } catch (e) {
	        Selligent.Library.Monitor.Tracer.Write("################################ _SS_Cpy_Update_Bank : échec libération objet “Selligent” #############################");
	    }
	    //HAS DEB Liberer object SQL
	}
	return result;
}