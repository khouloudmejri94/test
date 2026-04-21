function(pNRID,pTrack,pClient)
{
	
	//SS_Opp_Insert_Sample_Affair
	
	
	
	
	var myAffair = CreateSelligentObject("Opportunity", CurrentSessionID, true);
	var myselectionrow: SelectionRow = new SelectionRow();
	
	
	
	
	if (pTrack != "") {
	  
	  myselectionrow.Fields["OppExtNumTrack"] = pTrack;
	  myselectionrow.Fields["OppExtClient"] = pClient;
	  myselectionrow.Fields["OppExtDteEnvoi"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	  myselectionrow.Fields["OppExtValidEcht"] = "Envoyé";
	}
	
	
	
	
	myAffair.Open(pNRID);
	myAffair.SetAndSave(myselectionrow);
	
	
	
	
	//SS_Opp_Insert_Sample_Affair
}