function PS_Appel_plusieurs_fenetres_pour_chrome()
{
	
	
	
	top.MyApp.OpenDlg('Alert',["appel1","Appel1"], top, undefined, undefined, undefined, undefined, function ()
	       {
	            top.MyApp.OpenDlg('Alert',["appel2","Appel2"], top, undefined, undefined, undefined, undefined, function (){ 
	
	
	
	    });
	
	       });
	
	
	//top.MyApp.asyncOpenDlg('Alert',["appel2","Appel2"]);
	//top.MyApp.asyncOpenDlg('Alert',["appel3","Appel3"]);
}