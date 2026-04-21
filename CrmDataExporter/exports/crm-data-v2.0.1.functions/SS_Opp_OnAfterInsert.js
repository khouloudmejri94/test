function SS_Opp_OnAfterInsert()
{
	var vRef = CurrentRecord["OppReference"] ;
	//var vPath = "\\\\srv-data-cpt01.noz.local\\PROD\\"+vRef;
	SS_Opp_CreateRepertoire(vRef);
	//System.IO.Directory.CreateDirectory(vPath );
}