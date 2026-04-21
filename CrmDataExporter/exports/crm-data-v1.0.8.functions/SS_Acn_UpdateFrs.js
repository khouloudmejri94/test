function(vNRID)
{
	try {
	    var MyObj = CreateSelligentObject("Company", CurrentSessionID, false);
	    MyObj.Open(vNRID);
	    var mySelectionRow = new SelectionRow();
	    mySelectionRow.Fields["CpyExtAppelBF"] = 1;
	    //mySelectionRow.Fields["CpyExtTitBF"] = vOwner;
	    MyObj.SetAndSave(mySelectionRow);
	    //return "Derog Flag updated."
	} catch (e) {
	    return e.message;
	}
}