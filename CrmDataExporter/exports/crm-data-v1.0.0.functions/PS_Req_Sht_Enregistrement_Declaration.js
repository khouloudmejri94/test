function PS_Req_Sht_Enregistrement_Declaration()
{
	/*
	 ** MLE
	 ** MASAO
	 ** 28/11/2013
	 ** SS_Req_GetMontantDeclaration
	 */
	
	
	
	if(top.MyApp.GetItemValue("ReqStatus") !="Clos")
	{
	    if(top.MyApp.GetItemValue("ReqOppReference") =="")
	    {
	      top.MyApp.OpenDlg("Alert",["Information", "Merci de renseigner le numéro de l'affaire."]);
	      return false;
	    }
	    top.MyApp.SetItemValue("ReqExtStatutSuivi", "A valider");
	    top.MyApp.fraMenuBar.Execute("R_Save");
	    top.MyApp.OpenDlg("Alert",["Information", "Votre déclaration a bien été enregistrée."]);
	}
}