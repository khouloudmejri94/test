function PS_Req_Sht_Decla_PDF()
{
	var nNRID = top.MyApp.GetItemValue('ReqNRID');
	var nRef  = top.MyApp.GetItemValue('ReqExtRefInterne');
	top.MyApp.ExecuteServerScript(30501512450858,[nRef, nNRID ]);
	top.MyApp.OpenDlg("Alert",["Message","la DL 21 est bien généré."]);
}