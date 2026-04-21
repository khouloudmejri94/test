function SS_Req_CheckComtableOrPhysiqueDeclaration(vReqNrid,bComptable)
{
	/*
	 ** MLE
	 ** MASAO
	 ** 28/11/2013
	 ** SS_Req_GetMontantDeclaration
	 */
	try{
	    var MySql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	    var vReq = "";
	    if(bComptable)
	    {
	        vReq = "SELECT * from SYSADM.xdeclaration WHERE cal0_nrid = " + vReqNrid +
	        "AND ((resolution_comptable1 != '' AND resolution_comptable1 IS NOT NULL)" +
	        " OR  (resolution_comptable2 != '' AND resolution_comptable2 IS NOT NULL))";
	    }
	    else
	    {
	        vReq = "SELECT * from SYSADM.xdeclaration WHERE cal0_nrid = " + vReqNrid +
	        "AND ((resolution_physique1 != '' AND resolution_physique1 IS NOT NULL)" +
	        " OR  (resolution_physique2 != '' AND resolution_physique2 IS NOT NULL))";
	    }
	    var res = MySql.ExecuteSql(vReq);
	    var xml = InitXml(res);
	    var objLine = FindItem( "Flds",xml, true);
	    if(objLine.Count == 0)
	        return false;
	    else
	        return true;
	}
	catch (e)
	{
	    ThrowMessage("Erreur","Erreur lors de la récuperation des Résolutions de déclaration.");
	    throw  "Error in SS_Req_CheckComtableOrPhysiqueDeclaration " + e;
	}
	finally
	{
	    delete MySql;
	}
}