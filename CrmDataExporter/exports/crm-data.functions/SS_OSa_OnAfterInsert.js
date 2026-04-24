function SS_OSa_OnAfterInsert()
{
	var vRefSalon    = CurrentRecord["OSaExtSalon"] ;
	var vRefEdition  = CurrentRecord["OSaExtCodeEdit"] ;
	
	var vDossier ="";
	if(CurrentRecord["OSaExtType"] =="Edition")
	{
	     vDossier = vRefSalon+"/"+ vRefEdition ;
	}
	else
	{
	     vDossier = vRefSalon ;
	}
	var vSID = Session["MySID"] ;
	SS_Opp_SP_AddFolderRoles("Salons/"+vDossier,vSID );
}