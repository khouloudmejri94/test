function SS_Acn_Update_PROPO_RDV(vNRID)
{
	try
	{
	     var myAction = CreateSelligentObject("Action",CurrentSessionID,true);
	     myAction.Open(vNRID);
	     var mySelectionRow : SelectionRow = new SelectionRow(); 
	     mySelectionRow.Fields["AcnStatus"]="FAIT";
	     myAction.SetValues(mySelectionRow);
	     myAction.Save();
	     
	}catch(e)
	{
	     throw " Erreur SS_Acn_Update_PROPO_RDV : " + e.message; 
	}
}