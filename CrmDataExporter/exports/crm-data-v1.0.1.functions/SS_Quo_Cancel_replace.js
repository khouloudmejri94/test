function SS_Quo_Cancel_replace(pNRID,pSelectedReference)
{
	var mySelect = CreateSelligentObject("Quotation", CurrentSessionID, true);
	 
	        var mySelectionRow2: SelectionRow = new SelectionRow();
	        mySelect.Open(pNRID);
	 
	        mySelectionRow2.Fields["QuoExtRefAR"] = pSelectedReference;
	        mySelect.SetValues(mySelectionRow2);
	        mySelect.Save();
}