function()
{
	// test
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) 
	{
	 _oCurWnd = top.MyData_View; 
	}
	else
	{
	 _oCurWnd = top.MyApp.wizardWindow; 
	}
		PS_Opp_Header_Status();
		var typeHnd = top.MyApp.FindItem("OppExtPrdtsdejaplttses", _oCurWnd);
	if (typeHnd )
	{
	  top.MyApp.fctRemoveEvent(typeHnd, "change",  PS_Opp_Header_Status);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Opp_Header_Status);
	}
		var typeHnd = top.MyApp.FindItem("OppExtCodePaysDepart", _oCurWnd);
	if (typeHnd )
	{
	  top.MyApp.fctRemoveEvent(typeHnd, "change",  PS_Opp_Header_Status);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Opp_Header_Status);
	}
}