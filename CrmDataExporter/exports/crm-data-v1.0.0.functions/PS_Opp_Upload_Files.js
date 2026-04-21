function PS_Opp_Upload_Files()
{
	var arrParams = []
	arrParams[0] = top.MyApp
	arrParams[1] = top.bWizard
	 
	top.MyApp.OpenDlg('38241856473834',arrParams , top, undefined, undefined, undefined, undefined, function (){});
}