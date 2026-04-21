function(pNRID,pStatus)
{
	var ObjQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	var mySelectionRow: SelectionRow = new SelectionRow();
	mySelectionRow.Fields["QuoExtStatOff"] = pStatus;
	if (pStatus == "9. A Négocier") {
	 mySelectionRow.Fields["QuoExtSentPI"] = "0";
	 mySelectionRow.Fields["QuoExtImpTq"] = "0";
	}
	
	if (pStatus == "3. Perdue") {
	 mySelectionRow.Fields["QuoExtDatePerdue"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	ObjQuotation.OpenSetAndSave(pNRID, mySelectionRow);
		return true;
}