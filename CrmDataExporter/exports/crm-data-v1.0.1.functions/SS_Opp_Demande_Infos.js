function SS_Opp_Demande_Infos(pNRID,pStatus,pNote)
{
	 
	 var myCompany=CreateSelligentObject("Opportunity",CurrentSessionID,true);
	 var myselectionrow : SelectionRow = new SelectionRow();
	
	 myselectionrow.Fields["OppStatus"]=  pStatus
	 if (pNote != "") {
	   myselectionrow.Fields["OppExtNoteAff"]=  pNote;
	 }
	
	
	 myCompany.Open(pNRID);
	 myCompany.SetAndSave(myselectionrow);
	 
		return true;
}