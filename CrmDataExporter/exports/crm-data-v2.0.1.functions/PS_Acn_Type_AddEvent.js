function PS_Acn_Type_AddEvent()
{
	function updateReplaceField() {
	    var resultat = top.MyApp.GetItemValue("AcnType") || "";
	    var status   = top.MyApp.GetItemValue("AcnStatus") || "";
	    if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	        if (status == "FAIT" && resultat == "LOT DETECTE") {
	            top.MyApp._gfctSetClassName("AcnExtAffairAR", "NM");
	            top.MyApp.SetItemValue("AcnExtReplaceAff", "1");
	        } else {
	            top.MyApp._gfctSetClassName("AcnExtAffairAR", "UM");
	            top.MyApp.SetItemValue("AcnExtReplaceAff", "0");
	        }
	    }
	}
	updateReplaceField();
	var statusField = top.MyApp.FindItem("AcnStatus");
	if (statusField) {
	    statusField.onchange = updateReplaceField;
	}
	var typeField = top.MyApp.FindItem("AcnType");
	if (typeField) {
	    typeField.onchange = updateReplaceField;
	}
	var replaceField = top.MyApp.FindItem("AcnExtReplaceAff");
	if (replaceField) {
	    replaceField.onchange = function() {
	        var replaceValue = top.MyApp.GetItemValue("AcnExtReplaceAff");
	        
	        if (replaceValue == "1" || replaceValue == 1 || replaceValue === true) {
	            top.MyApp._gfctSetClassName("AcnExtAffairAR", "NM");
	        } else {
	            top.MyApp._gfctSetClassName("AcnExtAffairAR", "UM");
	        }
	    };
	}
		return true;
}