function PS_Res_genererDomaines()
{
	//date de création : 29/03/2011
	//créateur : PLE
	//société : MASAO
	//date de modification : 
	//modifiée par : 
	//description : appel le serveur script SS_Res_genererDomaines
		if(top.MyApp.UserSetting.User.ProfileInitials == 'ADMT' || top.MyApp.UserSetting.User.ProfileInitials == 'ADMF')
	{
	  var vResName = top.MyApp.GetItemValue("ResName");
	  //var vRes = top.MyApp.ExecuteServerScript(29718170653452, [vResName],'','',true);
	  var vRes = top.MyApp.ExecuteServerScript("29718170653452", [vResName]); //SS_Res_GenererDomaine
	
	  if(vRes == 'True') top.MyApp.OpenDlg("Alert", ["", "The security domain was correctly loaded"]);  
	}
	else
	{
	  top.MyApp.OpenDlg("Alert", ["", "Vous n'avez pas accès à cette fonctionnalité"]);
	}
		return true;
}