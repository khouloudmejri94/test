function(p_AffNum,p_OffNum)
{
	try{
	     var vSID = Session["MySID"];
	     var vDossier = p_AffNum+"/"+p_OffNum;
	     var retourWS = ""; //SS_Opp_SP_AddFolderRoles(vDossier,vSID); 
	     return vDossier + " -- " + retourWS;
	
	}catch(e){
	     return "Catch : " + e.message;
	}
}