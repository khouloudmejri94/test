function()
{
	var vNRID = top.MyApp.GetItemValue('CpyNRID');
	var vSiret = top.MyApp.GetItemValue('CpyExtSiret');
	var vPays = top.MyApp.GetItemValue('CpyAddr1Country');
	var arrResult = [];
	var arrVal = [];
	var arrParam = [];
	arrParam[0] = vNRID; //
	arrParam[1] = vSiret; //
	arrParam[2] = vPays;
	var result = top.MyApp.ExecuteServerScript(39388669445142, arrParam);
	//alert(result);
	if (result == 'OK') {
	    top.MyApp.OpenDlg("Alert", ["", "Outsourcing supplier is sccessfully sent"]);
	} else {
	    top.MyApp.OpenDlg("Alert", ["", "Outsourcing supplier NOT sent"]);
	    return false;
	}
}