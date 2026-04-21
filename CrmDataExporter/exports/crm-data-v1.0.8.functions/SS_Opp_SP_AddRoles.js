function(p_Folder,p_OM)
{
	try{
	var sMySession = Session["MySID"] ;
	
	var ret = SS_Opp_SP_AddFolderRoles( p_OM+"/"+p_Folder ,sMySession);
	
	return "1" + ret;
	
	}catch(e){
	    return e.description;
	}
}