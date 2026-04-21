function(QuoNRID)
{
	//START MASAO@FTC - 02/01/2018
	try {
	    var MyObject = CreateSelligentObject("Quotation", CurrentSessionID, true);
	 var mySelectionRow: SelectionRow = new SelectionRow();
	 var p_Date = DateTime.Now;
	 
	 mySelectionRow.Fields["QuoExtDebutNorms"] = p_Date;
	 MyObject.Open(QuoNRID);
	 MyObject.SetAndSave(mySelectionRow);
	
	} catch (e) {
	    throw e.description;
	} finally {
	    MyObject.Dispose();
	 FreeSelligentObject(MyObject);
	}
	//END MASAO@FTC - 02/01/2018
}