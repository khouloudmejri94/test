function()
{
	if(top.MyApp.GetItemValue("ReqStatus") !="Clos"   && top.MyApp.GetItemValue("ReqExtDossGereJuri", top.MyData_View) != 1 )
	{
	 if(top.MyApp.GetItemValue("ReqOppReference") =="")
	 {
	      top.MyApp.OpenDlg("Alert",["Information", "Merci de renseigner le numéro de l'affaire."]);
	      return false;
	 }
	
	 if( top.MyApp.GetItemValue("ReqExtDossGereJuri", top.MyData_View) == 1 )
	 {
	   top.MyApp.OpenDlg("Alert",["", "Pas de déclaration. Ce dossier est géré par le juridique!"]);     
	 }
	
	 top.MyApp.fraMenuBar.Execute("R_Save");
	 var vProfil = top.MyApp.UserSetting.User.ProfileInitials;
	 if( vProfil == "CH_PRO" || vProfil == "DIR_MKT"  || vProfil == "ASS_MKT"  || vProfil == "MAN_POLE"  || vProfil == "CH_MAR"  || vProfil == "ADMT" || vProfil == "ADMF" || vProfil == "LTG")
	 {
	  var arrMyArray=[];
	  arrMyArray[0] = "New";
	  arrMyArray[1] = "" ; 
	 
	  var vretour = top.MyApp.OpenDlg ( "30018517272164" , arrMyArray );
	  return true;
	 }
	 else
	 {
	   top.MyApp.OpenDlg("Alert",["", "Vous n’êtes pas autorisé à utiliser cette fonctionnalité !"]);
	 }
	}
}