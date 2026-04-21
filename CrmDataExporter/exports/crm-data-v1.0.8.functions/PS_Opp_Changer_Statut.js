function()
{
	
	if( top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML,"Result","blnModified") == "true" )
	{ 
	     top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Il faut enregistrer les modifications de la fiche avant de passer le statut à ‘négocier’ !! \n Merci de contacter votre administrateur."]]);
	     return false;     
	}
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	var vn = vProf.substr(0,3)
	if(vn !='ACH' && vn !='ADM' )
	{
	     top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé de passer le statut à ‘négocier’ !! \n Merci de contacter votre administrateur."]]);
	     return false;
	}
	var nrid = top.MyApp.GetItemValue("OppNRID");
	var strResultat = top.MyApp.ExecuteServerScript(30500465290889, [nrid],'','',true); //SS_Opp_Changer_Statut
	top.MyApp.fraMenuBar.Execute("T_Refresh");
		return true;
}