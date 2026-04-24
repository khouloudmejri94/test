function AfterLoad_FP_35918575557211()
{
	// HAS : 21/06/2018 FP onglet 
	
	if (top.CurrentSetting.nChapMode != "Reset" && top.MyApp.CurrentSetting.bConsultMode != true) {
	    var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	    var vFunction = top.MyApp.UserSetting.User.Function;
	    var vListProfilsValides = "ADMT;ADMF;LTG";
	    var arrayList = ['QuoExtAppel', 'QuoExtDevRembourseClt', 'QuoExtDevCreditNote', 'QuoExtValCreaditNote', 'QuoExtValDemAvoir', 'QuoExtValRembourseClt', 'QuoExtDateOuvertFrs', 'QuoExtDevDemAvoir', 'QuoExtStatutLtgFrs', 'QuoExtDateClotClt', 'QuoExtCommentCpLtg', 'QuoExtCommentLtg', 'QuoExtDateLtg', 'QuoExtDateClotFrs', 'QuoExtStatutLtgClt', 'QuoExtTypeLtg', 'QuoExtDevValRecup', 'QuoExtQualifLitige', 'QuoExtValRecup', 'QuoExtStatLtg', 'QuoExtReserveLtg','QuoExtValDemAvoir', 'QuoExtValCreaditNote', 'QuoExtValRembourseClt', 'QuoExtSteRembourseClt', 'QuoExtSteRembourseClt2', 'QuoExtSteRembourseClt3', 'QuoExtEchRembourseClt2', 'QuoExtEchRembourseClt3', 'QuoExtEchRembourseClt', 'QuoExtMntRembourseClt', 'QuoExtMntRembourseClt2', 'QuoExtMntRembourseClt3', 'QuoExtDateRecCredNoteClt', 'QuoExtDateVrmtLtgClt', 'QuoExtDateRembourseClt', 'QuoExtTypeRembourseClt','QuoExtMotifRefus'];
	    var arrayListBtn = ['QuoExtDateOuvertFrsBtn', 'QuoExtDateClotCltBtn', 'QuoExtDateLtgBtn', 'QuoExtDateClotFrsBtn','QuoExtMotifRefusBtn'];
	
	    if (vListProfilsValides.indexOf(vProf) != -1) {
	        top.MyApp.FindItem("QuoMcl40410385705348Btn").disabled = false;
	        for (var i = 0; i < arrayList.length; i++) {
	            var objchamp = top.MyApp.FindItem(arrayList[i], top.MyData_View);
	            var objchampBtn = top.MyApp.FindItem(arrayListBtn[i], top.MyData_View);
	            if (objchamp) objchamp.disabled = false
	            if (objchampBtn) objchampBtn.disabled = false
	            top.MyApp.SetItemAttribute(arrayList[i], "className", "", top.MyData_View);
	            top.MyApp.CurrentSetting.Catalog[arrayList[i]].Ed = 1;
	            top.MyApp.SetItem(arrayList[i], "contentEditable", true, top.MyData_View);
	        }
	
	    } else {
	
	        top.MyApp.FindItem("QuoMcl40410385705348Btn").disabled = true;
	        for (var i = 0; i < arrayList.length; i++) {
	            var objchamp = top.MyApp.FindItem(arrayList[i], top.MyData_View);
	            var objchampBtn = top.MyApp.FindItem(arrayListBtn[i], top.MyData_View);
	            if (objchamp) objchamp.disabled = false
	            if (objchampBtn) objchampBtn.disabled = false
	            top.MyApp.SetItemAttribute(arrayList[i], "className", "disable", top.MyData_View);
	            top.MyApp.CurrentSetting.Catalog[arrayList[i]].Ed = -1;
	            top.MyApp.SetItem(arrayList[i], "contentEditable", false, top.MyData_View);
	        }
	
	    }
	}
}