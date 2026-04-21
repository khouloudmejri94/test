function(pvRequete)
{
	var objQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var xmlResult = "";
	 
	try
	{
	    
	    
	
	         try { objQuery.ExecuteSql(pvRequete); } catch(e) { xmlResult = xmlResult + "<ERROR Val=\"" + e.message + "\"></ERROR>"; }
	       
	    
	}
	catch(e)
	{
	   delete objQuery;
	   delete(objQuery);
	   xmlResult = "<ERROR Val=\"" + e.message + "\"></ERROR>";
	}
	finally
	{
	   delete objQuery;
	   delete(objQuery);
	}
	return xmlResult;
		return true;
}