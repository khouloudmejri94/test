function SS_Res_InsertionResLiee(Personne,vue_equipe,vue_ressource)
{
	
	//var oSql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	//var MyResult = oSql.ExecuteSql("insert into res_liees(personne,vue_equipe,vue_ressource) values ('"+Personne+"','"+vue_equipe+"','"+vue_ressource+"')");
	//delete oSql;
	//return true;
	//18.11.2015 CBA 
	 try{
	   
	     var ObjSQL = CreateSelligentObject("SqlHelper",CurrentSessionID);
	      var ProcParam : StoredProcParam[] = new StoredProcParam[4];
	      
	      
	      ProcParam[0]  = new StoredProcParam("personne", "VARCHAR", "IN", 100, Personne);
	      ProcParam[1]  = new StoredProcParam("vue_equipe", "VARCHAR", "IN", 100, vue_equipe);
	      ProcParam[2]  = new StoredProcParam("vue_ressource", "VARCHAR", "IN", 100, vue_ressource);
	      ProcParam[3]  = new StoredProcParam("reponse", "INT", "OUT", 4, "");
	      var strResultProc = ObjSQL.ExecuteStoredProc("Insert_Res_Liees", ProcParam);
	
	      var oXmlDoc = InitXml(strResultProc);           
	      var reponse = GetItemAttribute("Parameter",oXmlDoc,"Value")
	     return reponse ;
	   }catch(e){
	     throw(e.message);
	   }
}