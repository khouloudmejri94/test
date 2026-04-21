function()
{
	// POPUP de relance mail fournisseur
	/*
	var strStatut = top.MyApp.GetItemValue("AcnStatus");
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset' && top.MyApp.CurrentSetting.bConsultMode != true && strStatut == 'A FAIRE' ) {
	top.MyApp.OpenDlg("37041782666916");
	}
	*/
	
	
	
	var arrParams = []
	arrParams[0] = top.MyApp
	arrParams[1] = top.bWizard
	 
	top.MyApp.OpenDlg('37041782666916',arrParams , top, undefined, undefined, undefined, undefined, function (){});
	
	
	//avant :  top.MyApp.OpenDlg("37041782666916");
}