function()
{
	//PS_Quo_Sht_Derog_Cancel3
	    var vNRID = top.MyApp.GetItemValue("QuoNRID");
	    top.MyApp.CurrentSetting.Catalog["QuoExtStatDerog3"].Ed = 1;
	    top.MyApp.SetItemValue('QuoExtStatDerog3', 'Non approuvé');
	    top.MyApp.CurrentSetting.Catalog["QuoExtStatDerog3"].Ed = 0;
	    top.MyApp.fraMenuBar.Execute("R_Save");
}