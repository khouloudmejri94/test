function PS_Cpy_Export_Status()
{
	var vValidExport = top.MyApp.GetItemValue("CpyExtValidExporter");
	
	if (vValidExport != "" && vValidExport != null && vValidExport != undefined) {
	    if (vValidExport == "Non approuvé") {
	        top.MyApp._gfctSetClassName("CpyExtMotifRefExp", "NM");
	    } else {
	        top.MyApp._gfctSetClassName("CpyExtMotifRefExp", "UM");
	    }
	    top.MyApp._gfctSetClassName("CpyExtFraisAnnexeText", "NM");
	} else {
	    top.MyApp._gfctSetClassName("CpyExtFraisAnnexeText", "UM");
	}
}