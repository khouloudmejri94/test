function SS_Req_OnAfterUpdate()
{
	
	var vRef = CurrentRecord["ReqExtRefInterne"];
	if(CurrentRecord["ReqStatus"] == "Clos")
	{
	    WS_SP_MiseAJourStatut("Litiges/" + vRef, "Cloture");
	}
}