function()
{
	try{
	    var MySql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	     var res = MySql.ExecuteSql(
	        "SELECT sal.xpays, sal.xnb_expo " +
	        "FROM sysadm.cosa0 as sal " +
	        "WHERE sal.xsalon = " + vOsaSal);
	    var xml = InitXml(res);
	//return myResult;
	    return xml;
	}
	catch (e)
	{
	    ThrowMessage("Erreur","Erreur lors de la récuperation des infos.");
	    throw  "Error in SS_OSa_GetAllInfo " + e;
	}
	finally
	{
	    delete MySql;
	}
}