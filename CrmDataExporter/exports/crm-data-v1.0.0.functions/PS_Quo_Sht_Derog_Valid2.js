function PS_Quo_Sht_Derog_Valid2()
{
	  var vNRID = top.MyApp.GetItemValue("QuoNRID");
	  top.MyApp.CurrentSetting.Catalog["QuoExtStatDerog2"].Ed = 1;
	  top.MyApp.SetItemValue('QuoExtStatDerog2', 'Approuvé');
	  top.MyApp.CurrentSetting.Catalog["QuoExtStatDerog2"].Ed = 0;
	  //top.MyApp.ExecuteServerScript(38749077259756, [vNRID]);
	  top.MyApp.fraMenuBar.Execute("R_Save");
}