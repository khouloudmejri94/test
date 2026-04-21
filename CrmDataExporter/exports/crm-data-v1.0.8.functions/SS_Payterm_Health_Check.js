function(pNRID)
{
	var mySelect = CreateSelligentObject("Quotation", CurrentSessionID, true);
	        var mySelectionRow2: SelectionRow = new SelectionRow();
	        mySelect.Open(pNRID);
	        mySelectionRow2.Fields["QuoExtPtValidFlag"] = "1";
	         mySelectionRow2.Fields["QuoExtPtValidatedby"] = CurrentUserName;
	         mySelectionRow2.Fields["QuoExtPtValidatedDt"]   = DateTime.Now.ToString("dd/MM/yyyy");
	        mySelect.SetValues(mySelectionRow2);
	        mySelect.Save();
}