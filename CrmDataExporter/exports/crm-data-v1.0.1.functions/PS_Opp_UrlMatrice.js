function PS_Opp_UrlMatrice()
{
	var oppRef = top.MyApp.GetItemValue("OppReference");
	 
	if((oppRef==""))
	{
	     top.OpenDlg("Alert",[top.MyApp.arrTranslations["Alerte"],top.MyApp.arrTranslations["Vous n'avez pas selectionné d'affaire."]]);
	}
	else
	{
	     top.OpenWeb("https://srv-cognos-app.noz.local/ibmcognos/cgi-bin/cognosisapi.dll?b_action=cognosViewer&ui.action=run&ui.object=%2fcontent%2ffolder%5b%40name%3d%27Rapports_Selligent%27%5d%2freport%5b%40name%3d%27Matrice%20Sel%27%5d&ui.name=Matrice%20Sel&run.outputFormat=PDF&run.prompt=false&p_PRM_AFFAIRE=" + oppRef);
	}
		return true;
}