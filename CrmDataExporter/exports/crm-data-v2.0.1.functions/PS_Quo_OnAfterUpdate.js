function PS_Quo_OnAfterUpdate()
{
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) 
	{
	 _oCurWnd = top.MyData_View; 
	}
	else
	{
	 _oCurWnd = top.MyApp.wizardWindow; 
	}
}