function SS_Acn_OnBeforeUpdate_Sal()
{
	if (CurrentRecord["AcnExtRela"] != null || CurrentRecord["AcnExtRela"] != '')
	
	{
	     if(nCpyNRID != null && nCpyNRID != '')
	     {
	   
	          SS_Acn_AddNewAction();
	     }
	}
}