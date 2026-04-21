function SS_Req_OnNewRecord()
{
	try
	{
	    // RG 2
	    CurrentRecord["ReqCreationDate"]= DateTime.Now.ToString("dd/MM/yyyy");
	    // RG 67
	    CurrentRecord["ReqStatus"]= "Ouvert";
	    // RG 68
	    CurrentRecord["ReqExtStatutSuivi"]= "A faire";
	
	    // RG 12
	    CurrentRecord["ReqExtDateEvt"]= DateTime.Now.ToString("dd/MM/yyyy");
	
	    //#936
	    CurrentRecord["ReqExtFournRisque"]= 0;
	
	}
	catch(e)
	{
	    throw "Error on SS_Req_OnNewRecord " + e;
	}
}