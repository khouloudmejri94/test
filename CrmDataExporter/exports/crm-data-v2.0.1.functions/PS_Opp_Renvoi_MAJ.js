function PS_Opp_Renvoi_MAJ()
{
	try{
	
	     var p_date;
	
	     var StrResultat = top.MyApp.ExecuteServerScript(35381150494703);
	     
	     alert(StrResultat);
	
	/*     top.MyApp.OpenDlg("UserPrompt",[top.MyApp.arrTranslations["Renvoyer les affaires à partir du (yyyy-mm-dd hh:mm:ss) :"],""]);
	     if(top.MyApp.AppSetting.dlgReturn[0]){
	          p_date = top.MyApp.AppSetting.dlgReturn[0];
	     }else{
	          p_date = "9999-12-31 00:00:00";
	     }
	     
	     top.MyApp.ExecuteServerScript(31269861612750,[p_date]);
	*/
	}catch(e){
	 alert("PS "+e.message);
	}
}