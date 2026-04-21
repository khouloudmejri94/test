function()
{
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	
	
	
	
	 /* if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "Result", "blnModified") == "true") {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["QUOLOST"]]);
	  return false;
	 }*/
	 var statusOff = top.MyApp.GetItemValue("QuoExtStatOff");
	 if (statusOff.substr(0, 1) == "5") {
	  return false;
	 }
	
	
	
	
	top.MyApp.OpenView("Quo" , "FP" , 1000016 , "ifrView2" , true , "");
	 top.MyApp.OpenDlg("YesNo", [top.MyApp.arrTranslations["QUOLOSTSURE"]]);
	 if (top.MyApp.AppSetting.dlgReturn[0]) {
	
	
	
	
	  top.MyApp.CurrentSetting.Catalog["QuoExtStatOff"].Ed = 1;
	  top.MyApp.SetItemValue("QuoExtStatOff", "3. Perdue");
	
	
	
	
	  PS_Quo_Header_Status();
	
	
	
	
	
	  var vDateCurrent =  top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE , top.MyApp.SYSTEM_DATE);
	  top.MyApp.SetItemValue("QuoExtDatePerdue", vDateCurrent );
	
	  top.MyApp.SetItemValue("QuoExtCompteur", 'EXPIRED!');
	
	  top.MyApp.CurrentSetting.Catalog["QuoExtStatOff"].Ed = 0;
	
	
	
	
	  //Debut HAS : lancer le webservice à travers un checkbox activé
	   ////////////////top.MyApp.SetItemValue("QuoExtAppel", '1');
	  //Fin HAS : lancer le webservice à travers un checkbox activé
	
	
	
	
	  //top.MyApp.fraMenuBar.Execute("R_Save");
	  //top.MyApp.fraMenuBar.Execute("R_Consult");
	
	
	
	
	
	 }
	}
}