function PS_SelectionRessource(team)
{
	try{
	var _oCurWnd; 
	if (!top.MyApp.wizardWindow)  
	{ 
	 _oCurWnd = top.MyData_View;  
	} 
	else 
	 { 
	 _oCurWnd = top.MyApp.wizardWindow;  
	 }
	top.MyApp.OpenGenDlg(['Res'],'',['Res'],[['ResName','%'],['ResTeamName',team],['ResTeamName','disabled','true']]);
	if(top.MyApp.AppSetting.dlgReturn[0] !=  undefined ) top.MyApp.SetItemValue(champ,top.MyApp.AppSetting.dlgReturn[0], _oCurWnd);
	} 
	catch(e)
	{
	     alert("Ps_SelectRessource - " + e.message);
	}
	 
		return true;
}