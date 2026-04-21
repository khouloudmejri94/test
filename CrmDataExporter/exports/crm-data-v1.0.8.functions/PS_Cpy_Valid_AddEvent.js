function()
{
	//PS_Cpy_Valid_AddEvent

	//HAS DEB 17/05/2020 : gestion des champs oblogatoires pour la validation sourcing

	try {

	    var oApprSrc = top.MyApp.FindItem("CpyExtValidSrc", top.MyData_View);

	    var vApprSrc = top.MyApp.GetItemValue("CpyExtValidSrc");

	

	    if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {

	        if (oApprSrc) {

	            if (vApprSrc == "Approuvé" || vApprSrc == "Incomplet" || vApprSrc == "Non approuvé") {

	                //alert("CpyExtCommVlSrc mnadatory");

	                top.MyApp._gfctSetClassName("CpyExtCommVlSrc", "NM");

	            } else {

	                top.MyApp._gfctSetClassName("CpyExtCommVlSrc", "UM");

	            }

	        }

	    }

	} catch (e) {

	    alert(e.message);

	}

	//HAS DEB 17/05/2020 : gestion des champs oblogatoires pour la validation sourcing

	

	

	//HAS DEB 15/09/2020 : gestion des champs oblogatoires pour la mise en INCOMPLETE

	try {

	    var oValidation = top.MyApp.FindItem("CpyExtValidSas", top.MyData_View);

	    var vValidation = top.MyApp.GetItemValue("CpyExtValidSas");

	

	    if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {

	        if (oValidation) {

	            if (vValidation == "INCOMPLETE") {

	                top.MyApp._gfctSetClassName("CpyExtRaisonincomplet", "NM");

	            } else {

	                top.MyApp._gfctSetClassName("CpyExtRaisonincomplet", "UM");

	            }

	        }

	    }

	} catch (e) {

	    alert(e.message);

	}

	//HAS END 17/05/2020 : gestion des champs oblogatoires pour la validation sourcing
}