function PS_Cpy_Header_Status()
{
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	    // HAS DEB - champ obligatoire téléphone ou Mobile
	    //var nPhone = top.MyApp.FindItem("CpyPhoneNbr", top.MyData_View);
	    var vPhone = top.MyApp.GetItemValue("CpyPhoneNbr");
	    //var nMobile = top.MyApp.FindItem("CpyExtMobile", top.MyData_View);
	    var vMobile = top.MyApp.GetItemValue("CpyExtMobile");
	    //var oSiret = top.MyApp.FindItem("CpyExtSiret", top.MyData_View);
	    //var vSiret = top.MyApp.GetItemValue("CpyExtSiret");
	    var vPays = top.MyApp.GetItemValue("CpyAddr1Country");
	    if (vMobile != '' && vMobile != null && vMobile != undefined) {
	        //top.MyApp.SetItemAttribute("CpyPhoneNbr", "className", "");
	        //top.MyApp.CurrentSetting.Catalog["CpyPhoneNbr"].Mn = -1;
	        top.MyApp._gfctSetClassName("CpyPhoneNbr", "UM");
	    } else {
	        //top.MyApp.SetItemAttribute("CpyPhoneNbr", "className", "Mandatory");
	        //top.MyApp.CurrentSetting.Catalog["CpyPhoneNbr"].Mn = 1;
	        top.MyApp._gfctSetClassName("CpyPhoneNbr", "NM");
	    }
	    if (vPhone != '' && vPhone != null && vPhone != undefined) {
	        //top.MyApp.SetItemAttribute("CpyExtMobile", "className", "");
	        //top.MyApp.CurrentSetting.Catalog["CpyExtMobile"].Mn = -1;
	        top.MyApp._gfctSetClassName("CpyExtMobile", "UM");
	    } else {
	        //top.MyApp.SetItemAttribute("CpyExtMobile", "className", "Mandatory");
	        //top.MyApp.CurrentSetting.Catalog["CpyExtMobile"].Mn = 1;
	        top.MyApp._gfctSetClassName("CpyExtMobile", "NM");
	    }
	    if (vPays == 'FR- FRANCE') {
	        top.MyApp._gfctSetClassName("CpyAddr1Country", "NM");
	    } else {
	        top.MyApp._gfctSetClassName("CpyAddr1Country", "UM");
	    }
	}
}