function()
{
	//OSa : AfterLoad Bilan Logistique
	// AfterLoad_FP_30241861350087
	// NRID : 42371044655242
	if (top.CurrentSetting.nChapMode != "Reset" && top.MyApp.CurrentSetting.bConsultMode != true) {
	 var vStatFair = top.MyApp.GetItemValue("OSaExtStatut");
	 var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	 var vFunction = top.MyApp.UserSetting.User.Function;
	 var vUserName = top.MyApp.UserSetting.User.Name;
	 var vListProfilsValides = "ADMT;ADMF;ADMFT";
	
	 var arrayList = ['OSaExtHotelLog', 'OSaExtHotelPquoi', 'OSaExtPropo', 'OSaExtTrajet', 'OSaExtVoiture', 'OSaExtSuggAmelioration'];
	 var arrayListBtn = ['OSaExtHotelLogBtn', 'OSaExtTrajetBtn', 'OSaExtVoitureBtn'];
	
	 var vQuery = "select top 1 NOM as NomPilote from sysadm.xsalon_ressources where Principale = 1 AND COSA0_NRID = :OSaNRID ";
	 var arrRes = top.MyApp._gfctExtReq(vQuery);
	 var vNomPilote = arrRes[0][0];
	
	 if (vProf != "ADMT") {
	        if (vNomPilote != '' && vNomPilote != null && vNomPilote != undefined && vNomPilote == vUserName) {
	            //top.MyApp.FindItem("OSaMcl30381112589738Btn").disabled = false;
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
	            //top.MyApp.FindItem("OSaMcl30381112589738Btn").disabled = true;
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
	    } else {
	        //top.MyApp.FindItem("OSaMcl30381112589738Btn").disabled = false;
	        for (var i = 0; i < arrayList.length; i++) {
	            var objchamp = top.MyApp.FindItem(arrayList[i], top.MyData_View);
	            var objchampBtn = top.MyApp.FindItem(arrayListBtn[i], top.MyData_View);
	            if (objchamp) objchamp.disabled = false
	            if (objchampBtn) objchampBtn.disabled = false
	            top.MyApp.SetItemAttribute(arrayList[i], "className", "", top.MyData_View);
	            top.MyApp.CurrentSetting.Catalog[arrayList[i]].Ed = 1;
	            top.MyApp.SetItem(arrayList[i], "contentEditable", true, top.MyData_View);
	        }
	    }
	}
}