function()
{
	var vPays = top.MyApp.GetItemValue("CpyAddr1Country");
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	    if (vPays == 'FR- FRANCE') {
	        top.MyApp._gfctSetClassName("CpyExtSiret", "NM");
	    } else {
	        top.MyApp._gfctSetClassName("CpyExtSiret", "UM");
	    }
	}
}