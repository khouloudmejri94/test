function PS_OSa_UrlMatrice1()
{
	var OsaCode = top.MyApp.GetItemValue("OsaExtCodeEdit");
	OsaCode = encodeURIComponent(OsaCode);
	 
	if((OsaCode==""))
	{
	     top.OpenDlg("Alert",["Alerte","Vous n'avez pas selectionné d'édition."]);
	}
	else
	{
	 top.OpenWeb("https://srv-cognos-app.noz.local/ibmcognos/cgi-bin/cognosisapi.dll?b_action=cognosViewer&ui.action=run&ui.object=%2fcontent%2ffolder%5b%40name%3d%27Rapports_Selligent%27%5d%2ffolder%5b%40name%3d%27Vue%20CRM%27%5d%2freport%5b%40name%3d%27Edition%20Preco%27%5d&ui.name=Edition%20Preco&run.outputFormat=PDF&run.prompt=false&p_PRM_EDIT=" + OsaCode);
	}
	 
		return ;
}