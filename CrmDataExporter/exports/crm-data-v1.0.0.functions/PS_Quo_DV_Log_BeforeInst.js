function PS_Quo_DV_Log_BeforeInst()
{
	var vCBM = top.MyApp.GetItemValue("ExtLgstqVolumeCBM");
	if (vCBM == "" || vCBM == null || vCBM == undefined){
	 
	top.MyApp.OpenDlg("Alert", "Volume CBM missing" );
	return false;
	}
}