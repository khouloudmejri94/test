function PS_Quo_Sht_Derog_Cancel1()
{
	//PS_Quo_Sht_Derog_Cancel1
	    var vNRID = top.MyApp.GetItemValue("QuoNRID");
	    top.MyApp.CurrentSetting.Catalog["QuoExtStatDerog1"].Ed = 1;
	    top.MyApp.SetItemValue('QuoExtStatDerog1', 'ReqN+1');
	    top.MyApp.CurrentSetting.Catalog["QuoExtStatDerog1"].Ed = 0;
	    top.MyApp.fraMenuBar.Execute("R_Save");
}