function()
{
	debugger; 
	var nMyNRID = g_eventSrcElement.parentElement.NRID;
	if(nMyNRID == undefined || nMyNRID == "") return true;
	
	var exposant = g_eventSrcElement.parentElement.cells[1].innerHTML 
	
	top.MyApp.OpenGenDlg(['Cpy'],'',['Cpy'],[['CpyName', exposant ]]);
	if(top.MyApp.AppSetting.dlgReturn[0] == undefined)
	{
	       return false;
	}
	else
	{
	     var so0Nrid = top.MyApp.AppSetting.dlgReturn[3];
	     if (so0Nrid)
	     {
	          var strQry      = "update SYSADM.xsalon_exposants set so0_nrid = '"+so0Nrid+"' where nrid = '"+nMyNRID+"'"; 
	          var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [strQry],'','',true);
	          top.MyApp.OpenView("OSa" , "DV" , 30561461545740 , "ifrView3" , true , "");
	     }
	}
}