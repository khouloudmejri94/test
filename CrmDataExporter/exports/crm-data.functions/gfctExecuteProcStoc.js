function _gfctExecuteProcStoc(p_ProcStoc)
{
	var oSql = CreateSelligentObject("SqlHelper",CurrentSessionID) 
	try 
	{
	  var storedProcParams : StoredProcParam[] = new StoredProcParam[0];
	  var xml = oSql.ExecuteStoredProc(p_ProcStoc, storedProcParams); 
	  return xml;
	} 
	catch (e) 
	{ 
	  throw "erreur dans le script Exec ProcStoc: " + e.description;
	}
	finally
	{
	  delete oSql;
	}
}