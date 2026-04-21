function(vReqNrid,vType)
{
	
	/*
	 ** MLE
	 ** MASAO
	 ** 22/11/2013
	 ** SS_Req_GetMontantDeclaration
	 */
	try {
	    var MySql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	    var res = MySql.ExecuteSql("select  (SUM(CASE resolution_comptable1 WHEN '"+ vType +"' then  montant else 0 end  ) + SUM( CASE resolution_comptable2 WHEN '"+ vType +"' then  montant1 else 0 end  )) as montant_declaration from SYSADM.xdeclaration  where cal0_nrid = " + vReqNrid + " and (resolution_comptable1 = '" + vType + "' or resolution_comptable2 = '" + vType + "') ");
	    return res;
	}
	catch (e)
	{
	    //ThrowMessage("Erreur","Erreur lors de la récuperation du montant de facturation.");
	    throw  "Error in SS_Req_GetMontantDeclaration " + e;
	}
	finally
	{
	    delete MySql;
	}
}