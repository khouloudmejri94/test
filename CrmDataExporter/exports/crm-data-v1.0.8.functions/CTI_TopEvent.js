function()
{
	if( top.MyApp.UserSetting.Cti.CurEvent=="ICSWS_AfterDial")
	{
	  //si on est sur action, on stocke le call id
	  if(top.MyApp.AppSetting.CurrentData_View == "Acn")
	  {
	    top.MyApp.AppSetting.Acn.Catalog.AcnExtCallID.Ed = 1;
	    top.MyApp.SetItemValue("AcnExtCallID", top.MyApp.UserSetting.Cti.CurEventVal, top.MyData_View);
	    top.MyApp.AppSetting.Acn.Catalog.AcnExtCallID.Ed = 0;
	    //appel du serveur script de mise à jour du call id de l'action en cours
	    var oParam = [];
	    oParam[0] = top.MyApp.GetItemValue("AcnNRID");
	    oParam[1] = top.MyApp.UserSetting.Cti.CurEventVal;
	    top.MyApp.ExecuteServerScript(29348981268150, oParam);
	  }
	}
	else if( top.MyApp.UserSetting.Cti.CurEvent=="ICSWS_AfterGetCallLog")
	{
	  //ici on récupère un string séparé par des ¤, pour avoir début appel, fin appel, et appel abouti ou non
	  var oTabRetourCti = top.MyApp.UserSetting.Cti.CurEventVal.split("¤");
	  //lancement serveur script de maj d'action
	  oTabRetourCti[0] = top.MyApp.fctFormatDate(oTabRetourCti[0], '[dd].[MM].[yy] [HH]:[mm]:[ss]', top.MyApp.SYSTEM_DATETIME);
	  oTabRetourCti[1] = top.MyApp.fctFormatDate(oTabRetourCti[1], '[dd].[MM].[yy] [HH]:[mm]:[ss]', top.MyApp.SYSTEM_DATETIME);
	  var retour = top.MyApp.ExecuteServerScript(29748981268150, oTabRetourCti);
	}
	return true;
}