function(vNRID)
{
	try {
	  var MyObj = CreateSelligentObject("Quotation", CurrentSessionID, false);
	  MyObj.Open(vNRID);
	  var mySelectionRow = new SelectionRow();
	  mySelectionRow.Fields["QuoExtAppelDerog"] = 1;
	  MyObj.SetAndSave(mySelectionRow);
	  return "Derog Flag updated."
	 } catch (e) {
	  return e.message;
	 }
}