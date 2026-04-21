function SS_Req_GetEmailCommande(vCpyNRID)
{
	/////17.09.2015CBA
	try
	{
	 var MySql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	 
	  var res = MySql.ExecuteSql("SELECT t1.e_mail FROM sysadm.so0 t1 WHERE t1.nrid = '"+vCpyNRID+"'" );
	  
	  //var xml = InitXml(res);
	   
	  return res;
	 
	}
	catch (e)
	{
	    ThrowMessage("Erreur","Erreur lors de la récuperation de l'adresse de facturation.");
	    throw  "Error in SS_Req_GetAdrFacturation " + e;
	}
	finally
	{
	    delete MySql;
	}
	/////17.09.2015CBA
}