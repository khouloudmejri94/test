function()
{
	//SS DV Onbefore update Reponse HUB
	
	if (CurrentRecord["ExtQstnLtReponse"] != "" && CurrentRecord["ExtQstnLtReponse"] != null && CurrentRecord.IsUpdated("ExtQstnLtReponse") == true) {
	 CurrentRecord["ExtQstnLtDateReponse"] = DateTime.Now.ToString("dd/MM/yyyy");
	 CurrentRecord["ExtQstnLtHeureReponse"] = DateTime.Now.ToString("HH:mm:ss");
	 CurrentRecord["ExtQstnLtRepondeur"] = CurrentUserName;
	}
}