function()
{
	var vUserProfile = top.MyApp.UserSetting.User.ProfileInitials;
	if (vUserProfile == "ADMT" || top.MyApp.CustomSetting.BizDev == 1) {
	    var arrParams = []
	    arrParams[0] = top.MyApp
	    arrParams[1] = top.bWizard
	    top.MyApp.OpenDlg('40691093345738',arrParams , top, undefined, undefined, undefined, undefined, function (){});
	} else {
	    top.MyApp.OpenDlg("Alert", ["", "You are not authorised to execute this function !"]);
	}
}