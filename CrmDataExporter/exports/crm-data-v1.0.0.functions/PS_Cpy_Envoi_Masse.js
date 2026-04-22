function PS_Cpy_Envoi_Masse()
{
	if(top.MyApp.UserSetting.User.ProfileInitials=="ADMT" || top.MyApp.UserSetting.User.ProfileInitials=="ADMF" || top.MyApp.UserSetting.User.ProfileInitials=="ADMFT")
	{
	     var strResultat = top.MyApp.ExecuteServerScript(31821504134052, '','','',true); //SS_Cpy_EnvoiMasse
	     alert(strResultat);
	}
	else
	{
	     alert(top.MyApp.arrTranslations["Vous devez disposer de droits d'administration pour utiliser cette fonctionalité."]);
	}
}