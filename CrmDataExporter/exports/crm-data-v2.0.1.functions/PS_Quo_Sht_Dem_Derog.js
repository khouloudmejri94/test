function PS_Quo_Sht_Dem_Derog()
{
	
	//PS_Quo_Sht_Dem_Derog
	// Detail taquet
	var vTypeDerog = top.MyApp.GetItemValue("QuoExtTypeDerog");
	var vDeviseDerog = top.MyApp.GetItemValue("QuoExtDeviseDepassDerog");
	var vDepass = top.MyApp.GetItemValue("QuoExtValDepassDerog");
	var vMntDerogNego = top.MyApp.GetItemValue("QuoExtMntDerogNego");
	var vMargeTq = top.MyApp.GetItemValue("QuoExtMntDerogMarge");
	var vTotDerog = top.MyApp.GetItemValue("QuoExtTotValDerog").replace(/,/g, ".");
	if (vTypeDerog != '' && vTypeDerog != null && vTypeDerog != undefined) {
	 var vProformaTqt = top.MyApp.GetItemValue("QuoExtValeurProforma");
	 var vDeviseProformaTqt = top.MyApp.GetItemValue("QuoExtDeviseProforma");
	 var vValeurAchatTqt = top.MyApp.GetItemValue("QuoExtValeurAchat1");
	 var vDeviseAchatTqt = top.MyApp.GetItemValue("QuoExtDeviseAchat");
	 var vValMargeNegoTqt = top.MyApp.GetItemValue("QuoExtValMargeNego");
	 var vDeviseMargeTqt = top.MyApp.GetItemValue("QuoExtDeviseMarge");
	 // importer données taquet
	 if (vProformaTqt != '') top.MyApp.SetItemValue("QuoExtMntDerogPi", vProformaTqt);
	 if (vDeviseDerog != '') top.MyApp.SetItemValue("QuoExtDeviseDerogPi", vDeviseDerog);
	 if (vValeurAchatTqt != '') top.MyApp.SetItemValue("QuoExtMntDerogTq", vValeurAchatTqt);
	 if (vDeviseDerog != '') top.MyApp.SetItemValue("QuoExtDeviseDerogTq", vDeviseDerog);
	 if (vValMargeNegoTqt != '') top.MyApp.SetItemValue("QuoExtMntDerogMarge", vValMargeNegoTqt);
	 if (vDeviseDerog != '') top.MyApp.SetItemValue("QuoExtDeviseDerogMarge", vDeviseDerog);
	 var ConvDerogDepass = top.MyApp.GetItemValue("QuoExtValDepassDerog").replace(/,/g, ".");
	 var ConvDerogNego = top.MyApp.GetItemValue("QuoExtMntDerogNego").replace(/,/g, ".");
	 var ConvMarge = top.MyApp.GetItemValue("QuoExtMntDerogMarge").replace(/,/g, ".");
	 var ConvDepass = 0;
	 if (ConvDerogNego != '' && ConvDerogNego != null && ConvDerogNego != undefined) {
	  ConvDepass = ConvDerogNego;
	 } else {
	  ConvDepass = ConvDerogDepass;
	 }
	 if (vTotDerog == '') vTotDerog = '0';
	 vTotDerog = parseFloat(vTotDerog);
	 var MargeDepass = ConvMarge - ConvDepass - vTotDerog;
	 //top.MyApp.OpenDlg("Alert", ["Attention", "La marge aprés dépassement est : "+MargeDepass+"."]);
	 if (MargeDepass < 0) {
	  top.MyApp.SetItemValue("QuoExtFlagDepassDerog", '1');
	 } else {
	  top.MyApp.SetItemValue("QuoExtFlagDepassDerog", '0');
	 }
	 top.MyApp.fraMenuBar.Execute("R_Save");
	}
	
	
	top.MyApp.Custom_DemandeDerogBtn = true;
}