function PS_Opp_Create_Affaire_SAP()
{
	/*if(top.MyApp.UserSetting.User.ProfileInitials=="ADMT" || top.MyApp.UserSetting.User.ProfileInitials=="ADMF" || top.MyApp.UserSetting.User.ProfileInitials=="ADMFT")
	{
	     var ref = top.MyApp.GetItemValue("OppReference");
	     var strResultat = top.MyApp.ExecuteServerScript(30902106629150, [ref],'','',true);
	     alert(strResultat );
	}
	*/
	
	
	
	if(top.MyApp.UserSetting.User.ProfileInitials=="ADMT" || top.MyApp.UserSetting.User.ProfileInitials=="ADMF" || top.MyApp.UserSetting.User.ProfileInitials=="ADMFT")
	{
	     var ref = top.MyApp.GetItemValue("OppReference");
	     var strResultat = top.MyApp.ExecuteServerScript(30902106629150, [ref]);
	     alert(strResultat );
	}
}