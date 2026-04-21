function PS_All_Acces_Concurrent(Chapter)
{
	//Chapter='Quo'
	top.MyApp.AppSetting.Update = true;
	var CurrentChapterNRID = Chapter + 'NRID'
	var strSQL = "select SUBSTRING(rmod,4,3)  from [" + Chapter + "] where nrid= " + top.MyApp.GetItemValue(CurrentChapterNRID);
	var DMOD_in_base = top.MyApp._gfctExtReq(strSQL);
	var CurrentChapterDMOD = Chapter + 'RMOD'
	var DMOD_in_screen1 = top.MyApp.GetItemValue(CurrentChapterDMOD);
	var DMOD_in_screen = DMOD_in_screen1.substr(3, 3);
	if (top.MyApp.AppSetting.CurrentData_View == 'Quo' && DMOD_in_base == '$WS' && DMOD_in_base != DMOD_in_screen) {
	 var nResult = "1";
	 alert(nResult);
	} else {
	 var nResult = "0";
	 alert(nResult);
	}
	var arrParam = [];
	arrParam[0] = top.MyApp;
	arrParam[1] = nResult;
	if (nResult == "1") {
	    top.MyApp.asyncOpenDlg("38379093410756", arrParam, top, undefined, undefined, undefined, undefined, function() {
	  //top.MyApp.OpenDlg("Alert", ["Attention", "Update impossible!! \n Another user has made changes at this object.. Please refresh"]);
	        return top.MyApp.AppSetting.dlgReturn;
	    });
	}
	// important permet de stopper l'insert si on répond non au WDS
	return top.MyApp.AppSetting.dlgReturn;
	return true;
		return ;
}