function(pnAcnNRID,pvAcnExtCallID)
{
	//Auteur : Pierre-Louis EGAUD
	//Société : MASAO
	//Date de création : 11/09/2012
	//Description : 
		var oAcn = CreateSelligentObject("Action", CurrentSessionID, false);
	var oRow = new SelectionRow();
	oRow.Fields["AcnExtCallID"] = pvAcnExtCallID;
	oAcn.OpenSetAndSave(pnAcnNRID, oRow);
	delete oAcn;
}