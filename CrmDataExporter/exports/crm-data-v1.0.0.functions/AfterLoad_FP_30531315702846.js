function AfterLoad_FP_30531315702846()
{
	if(top.MyApp.UserSetting.User.ProfileInitials!="LTG" && top.MyApp.UserSetting.User.ProfileInitials!="ADMF"  && top.MyApp.UserSetting.User.ProfileInitials!="ADMFT" && top.MyApp.UserSetting.User.ProfileInitials!="ADMT")
	{
	        top.MyApp.FindItem("Sht30968919533648").disabled = true;
	}
}