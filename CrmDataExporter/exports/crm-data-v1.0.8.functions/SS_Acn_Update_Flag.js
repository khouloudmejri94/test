function(vNRID)
{
	try{
	 var  MyObj = CreateSelligentObject("Action", CurrentSessionID, false);
	 MyObj.Open(vNRID);
	 var mySelectionRow  = new SelectionRow();
	 mySelectionRow.Fields["AcnExtFlagComunik"] = 1;
	 mySelectionRow.Fields["AcnExtFlagAppel"] = 1;
	 mySelectionRow.Fields["AcnExtTypeAppel"] = 'Frs';
	 mySelectionRow.Fields["AcnStartDate"] = DateTime.Now.ToString("dd/MM/yyyy");
	 mySelectionRow.Fields["AcnExtQualification"] = "";
	 MyObj.SetAndSave(mySelectionRow);
	 return "Action Flag updated."
	}
	catch(e){
	 return e.message;
	}
}