function()
{
	var ObjSql = CreateSelligentObject("SqlHelper", CurrentSessionID);
	try {
		var strReq = "select  am0.fonction, am0.xOutSrc , am0.xExport, am0.xAdminSalon from am0 where titulaire = '" + CurrentUserName + "' ";
		var ResultXML = ObjSql.ExecuteSql(strReq);
		var DocumentXML = InitXml(ResultXML);
		Session["ResFunction"] = GetItemValue("ResFunction", DocumentXML);
		Session["ResExtOutSrc"] = GetItemValue("ResExtOutSrc", DocumentXML);
		Session["ResExcept"] = GetItemValue("ResExtExport", DocumentXML);
		Session["ResAdmSalon"] = GetItemValue("ResExtAdminSalon", DocumentXML);
	} catch (e) {
		//throw e.description;
	}
	
	/*
	try 
	{
	     var strQryItmDescr;
	     var vRes;
	     var objXml;
	     var strItmDescription;
	     var numPrixHt;
	     var MyQuery = ObjSql.ExecuteSql("select s.init, s.nom,s.os_user_sid as SID ,am0.titulaire, am0.team_name from sysadm.set_us1 s join sysadm.am0 on am0.titulaire=s.nom and am0.template is null where s.template is null and s.set_us_profile_init != 'PV'");
	     var MyXmlDoc = InitXml(MyQuery);
	     var vtitulaire;
	     var vteam_name;
	     var MyRows1 = FindItem("Flds", MyXmlDoc, true);
	     for (var i = 0; i <  MyRows1.Count; i++)
	     {
	          vtitulaire= GetItemValue("ResName", MyRows1[i]);
	          vteam_name= GetItemValue("ResTeamName", MyRows1[i]);
	          var vSID = GetItemValue("SID", MyRows1[i]);  
	          var vUserSID = vtitulaire+"_"+vSID;
	          Session[vtitulaire] = vteam_name;
	          Session[vUserSID]   = vSID ;
	     }
	}
	catch(e)
	{
	 //throw e.description;
	}
	*/
		var vQuery, vXMLparam, objXmlDoc, objRows, nbRows, vCode, vLib;
	var vDBName=CurrentDatabase
	vQuery=" select code, libelle from xref0 where filtre='"+vDBName+"'";
	vXMLparam = ObjSql.ExecuteSql(vQuery);
	objXmlDoc = InitXml(vXMLparam);
	objRows = FindItem("Flds", objXmlDoc, true);
	nbRows = objRows.Count;
	for (var i = 0; i <  objRows.Count; i++)
	{
	  vCode = GetItemValue("ExtRefCODE", objRows[i]);
	  vLib = GetItemValue("ExtRefLIBELLE", objRows[i]);
	  Session[vCode]=vLib;
	}
		 try 
	{
	     Session["MySID"] ="";
	     var MyQuery3 = ObjSql.ExecuteSql("select os_user_sid as MySID  from sysadm.set_us1  where template is null and set_us_profile_init != 'PV' and nom=:CtxUserName");
	     var MyXmlDoc3 = InitXml(MyQuery3);
	
	
	
	
	     var MyRows3 = FindItem("Flds", MyXmlDoc3, true);
	   
	     for (var i = 0; i <  MyRows3.Count; i++)
	     {
	                 var vSID = GetItemValue("MySID", MyRows3[i]);  
	                  if(vSID == null) vSID ="";
	                  Session["MySID"]   = vSID ;
	     }
	}
	catch(e)
	{
	 //throw e.description;
	}
	
	
	
	
	// delete ObjSql;
	// libération mémoire objet “Selligent”
	try {
	FreeSelligentObject(ObjSql);
	    ObjSql.Dispose();
	    
	} catch (e) {
	    Selligent.Library.Monitor.Tracer.Write("################################ SS_SRM_StartUp : échec libération objet “Selligent” #############################");
	} 
	
	
	
		Session["MyAcnStatut"]   = false ;
	Session["ACN_CREATE_OPP"] = false; 
		return true;
}