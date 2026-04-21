function SS_Opp_DV_Question_AfterUpdate()
{
	var vRef = CurrentRecord["ExtQstnLtNoQuestion"];
	//Appel au ws
	var vRetourWS = AppelWebService_HubServer(vRef, "Reponse");
	return vRetourWS;
}