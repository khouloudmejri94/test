function(vNRID,vProf)
{
	   // 19.10.2015 CBA == UPDATE function for Remontée Fich
	   try{
	   
	     var ObjSQL = CreateSelligentObject("SqlHelper",CurrentSessionID);
	      var ProcParam : StoredProcParam[] = new StoredProcParam[2];
	      
	      
	      ProcParam[0]  = new StoredProcParam("pCpyNRID", "NUMBER", "IN", 200, vNRID);
	      ProcParam[1]  = new StoredProcParam("xModif", "VARCHAR", "IN", 30, vProf);
	      var strResultProc = ObjSQL.ExecuteStoredProc("ws_remontee_fiche", ProcParam);
	
	   }catch(e){
	     throw(e.message);
	   }
}