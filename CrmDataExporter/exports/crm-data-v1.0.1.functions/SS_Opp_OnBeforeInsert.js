function SS_Opp_OnBeforeInsert()
{
	var vRefOpp =CurrentRecord["OppReference"];
	//CurrentRecord["OppExtGed"] = "O:\\COMMUN 2\\DEVMasaotest\\" +vRefOpp ; 
	//CurrentRecord["OppExtGed"] = "X:\\" +vRefOpp ; 
	CurrentRecord["OppExtGed"]   = "\\\\srv-data-cpt01.noz.local\\" + CurrentDatabase +"\\"+vRefOpp ; 
	
	
	CurrentRecord["OppExtCountPush"] = 0;
}