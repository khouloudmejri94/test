function AfterLoad_FP_30981910170144()
{
	if(top.MyApp.UserSetting.User.ProfileInitials!="LTG" && top.MyApp.UserSetting.User.ProfileInitials!="ADMF" && top.MyApp.UserSetting.User.ProfileInitials!="ADMT" && top.MyApp.UserSetting.User.ProfileInitials!="CH_PRO" &&  top.MyApp.UserSetting.User.ProfileInitials!="DIR_MKT" && top.MyApp.UserSetting.User.ProfileInitials!="ASS_MKT" && top.MyApp.UserSetting.User.ProfileInitials!="MAN_POLE" && top.MyApp.UserSetting.User.ProfileInitials!="CH_MAR")
	{
	          //13.10.2015 CBA - #476
	        //top.MyApp.FindItem("Sht30620615313552").disabled = true;
	        top.MyApp.FindItem("Sht30291315653550").disabled = true;
	        top.MyApp.FindItem("Sht30561517293142").disabled = true;
	}
	
	     if(top.MyApp.CurrentSetting.nChapMode != "Open")
	     {
	          top.MyApp.FindItem("Sht30620615313552").disabled = true;
	     }else
	     {
	          top.MyApp.FindItem("Sht30620615313552").disabled = false;
	     }
	
	
	
	
	/*[D]Blocage Montant*/
	if(top.MyApp.CurrentSetting.nChapMode == "Open")
	{
	     if(top.MyApp.UserSetting.User.ProfileInitials!="LTG" && top.MyApp.UserSetting.User.ProfileInitials!="ADMF" && top.MyApp.UserSetting.User.ProfileInitials!="ADMT")
	          {
	                 top.MyApp.SetItem("ReqExtMtLitige", "disabled", true, top.MyData_View);
	                 top.MyApp.SetItem("ReqExtMtLitige", "contentEditable", false, top.MyData_View);
	          }
	}
	/*[F]*/
}