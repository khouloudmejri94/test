function SS_Opp_SP_AddFolderRoles(p_Folder,p_SID)
{
	/*var MySession = CreateSelligentObject("Session");
	    var wsi = CreateSelligentObject("WebServiceInvocator");
	    try {
	
	        MySession.Init(CurrentSessionID);
	        var URL = MySession.GetBindValue("UdvSP_SRV");
	
	        wsi.Authenticate("Sp_admin", "Ozeol2014", "najnah");
	
	        //var strURL = "https://srv-sp:8444/_vti_bin/CRM.asmx?WSDL";
	        var strURL = URL + "/_vti_bin/CRM.asmx?WSDL";
	
	        var result = wsi.Invoke(strURL, "CRM", "AddFolder", "CRM", "", p_Folder);
	        return result;
	    } catch (e) {
	        return "Erreur SP_AddFolderRoles: " + e.description;
	    } finally {
	        FreeSelligentObject(MySession);
	        MySession.Dispose();
	        FreeSelligentObject(wsi);
	        wsi.Dispose();
	    }*/
	
	
	try {
	  var MySession = CreateSelligentObject("Session");
	  var wsi = CreateSelligentObject("WebServiceInvocator");
	
		MySession.Init(CurrentSessionID);
		var URL = MySession.GetBindValue("UdvSP_SRV");
	
		wsi.Authenticate("Sp_admin", "Ozeol2014", "najnah");
	
		//var strURL = "https://srv-sp:8444/_vti_bin/CRM.asmx?WSDL";
		var strURL = URL + "/_vti_bin/CRM.asmx?WSDL";
	
		var result = wsi.Invoke(strURL, "CRM", "AddFolder", "CRM", "", p_Folder);
		return result;
	} catch (e) {
		return "Erreur SP_AddFolderRoles: " + e.description;
	} finally {
		FreeSelligentObject(MySession);
		MySession.Dispose();
		FreeSelligentObject(wsi);
	  delete(wsi)
		//wsi.Dispose();
	}
}