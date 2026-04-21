function _gfctUpdateFromSelligent(vTable,vColumns,vValues,vWhere,vLength)
{
	var oSql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	
	try 
	{
	  var storedProcParams : StoredProcParam[] = new StoredProcParam[6];
	  storedProcParams[0]  =  new StoredProcParam("table","varchar","in",100, vTable);
	  storedProcParams[1]  =  new StoredProcParam("columns","varchar","in",4000, vColumns);
	  storedProcParams[2]  =  new StoredProcParam("values","varchar","in",4000, vValues);
	  storedProcParams[3]  =  new StoredProcParam("where","varchar","in",500, vWhere);
	  storedProcParams[4]  =  new StoredProcParam("length","int","in",4, vLength);
	  storedProcParams[5]  =  new StoredProcParam("out","varchar","out",8000, "");
	  var xml = oSql.ExecuteStoredProc("UpdateFromSelligent", storedProcParams); 
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