function(pNRID_DO0,pNRID_AR0,pRef_AR0)
{
	  try
	  {
	  
	      var StrSql =" insert into xproduit_affaire (xItm_NRID ,xItm_Reference,do0_nrid) values ("+pNRID_AR0+" ,'"+pRef_AR0+"' ,"+pNRID_DO0+" )";
	      var oSql =  CreateSelligentObject("SqlHelper", CurrentSessionID);
	      var resXML = oSql.ExecuteSql(StrSql);
	      delete oSql ;
	  }
	  catch(e)
	  {
	       throw "Erreur :  " +e 
	  }
		return true;
}