function()
{
	var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	    // HAS DEB : Achat 2020 : champs non obligatoires pour le SRC 
	    var nComFrs = top.MyApp.FindItem("CpyExtComFrs", top.MyData_View);
	    if (vProfiluser != 'SRC' && vProfiluser != 'MNG_SRC' && vProfiluser != 'LEAD_SRC' && vProfiluser != 'LEAD_PROS') {
	        if (nComFrs) {
	            //top.MyApp.SetItemAttribute("CpyExtComFrs", "className", "Mandatory");
	            //top.MyApp.CurrentSetting.Catalog["CpyExtComFrs"].Mn = 1;
	            top.MyApp._gfctSetClassName("CpyExtComFrs", "NM");
	        }
	    } else {
	        if (nComFrs) {
	            top.MyApp.SetItemAttribute("CpyExtComFrs", "className", "");
	            top.MyApp.CurrentSetting.Catalog["CpyExtComFrs"].Mn = -1;
	            top.MyApp._gfctSetClassName("CpyExtComFrs", "UM");
	        }
	    }
	    // HAS DEB  activer le champ Numero TVA pour le BackOffice
	    /* if ((vProfiluser == 'ADMFT') || (vProfiluser == 'ADMT') || (vProfiluser == 'ADMF')) {
	        if (top.MyApp.FindItem("CpyVatNbr", top.MyData_View)) top.MyApp.FindItem("CpyVatNbr", top.MyData_View).disabled = false;
	        //  top.MyApp.FindItem("CpyExtValidSas", top.MyData_View).disabled = false;
	    } else {
	        if (top.MyApp.FindItem("CpyVatNbr", top.MyData_View)) top.MyApp.FindItem("CpyVatNbr", top.MyData_View).disabled = true;
	        //   top.MyApp.FindItem("CpyExtValidSas", top.MyData_View).disabled = true;
	    } */
	}
	// HAS DEB - champ obligatoire téléphone ou Mobile
	
	
	
	/*
	if ((vProfiluser == 'ADMF') || (vProfiluser == 'ADMT')) {
	    if (top.MyApp.FindItem("CpyExtValidAdm", top.MyData_View)) top.MyApp.FindItem("CpyExtValidAdm", top.MyData_View).disabled = false;
	//  top.MyApp.FindItem("CpyExtValidSas", top.MyData_View).disabled = false;
	    } else {
	          
	 
	    if (top.MyApp.FindItem("CpyExtValidAdm", top.MyData_View)) top.MyApp.FindItem("CpyExtValidAdm", top.MyData_View).disabled = true;
	//   top.MyApp.FindItem("CpyExtValidSas", top.MyData_View).disabled = true;
	   }
	 
	
	
	  if ((vProfiluser == 'ADMF' || vProfiluser == 'ADMT') || (vProfiluser == 'MAN_HA_TER') || (vProfiluser == 'MAN_HA_ASS')) {
	   if (top.MyApp.FindItem("CpyExtValidationManager", top.MyData_View))   top.MyApp.FindItem("CpyExtValidationManager", top.MyData_View).disabled = false;
	 
	     } else {
	     if (top.MyApp.FindItem("CpyExtValidationManager", top.MyData_View))    top.MyApp.FindItem("CpyExtValidationManager", top.MyData_View).disabled = true;
	    }
	*/
	
	
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	    var oUSC = top.MyApp.FindItem("CpyExtUSC", top.MyData_View);
	    if (oUSC) {
	        if ((vProfiluser != 'ADMFT') && (vProfiluser != 'ADMT') && (vProfiluser != 'ADMF')) {
	            top.MyApp.CurrentSetting.Catalog.CpyExtUSC.Ed = -1;
	        } else {
	            top.MyApp.CurrentSetting.Catalog.CpyExtUSC.Ed = 1;
	        }
	    }
	
	
	    //HAS DEB : 25/12/2020 : champ obligatoires/non obligatoire pour agent export
	    PS_Cpy_General_AddEvent();
	    var typeHnd = top.MyApp.FindItem("CpyExtIsExporter", top.MyData_View);
	    if (typeHnd) {
	        top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Cpy_General_AddEvent);
	        top.MyApp.fctAddEvent(typeHnd, "change", PS_Cpy_General_AddEvent);
	    }
	
	
	
	    var typeHnd = top.MyApp.FindItem("CpyExtIsDestock", top.MyData_View);
	    if (typeHnd) {
	        top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Cpy_General_AddEvent);
	        top.MyApp.fctAddEvent(typeHnd, "change", PS_Cpy_General_AddEvent);
	    }
	
	
	    //HAS DEB : 25/12/2020 : champ obligatoires/non obligatoire pour agent export
	    PS_Cpy_Addr_AddEvent();
	    var typeHnd = top.MyApp.FindItem("CpyAddr1Country", top.MyData_View);
	    if (typeHnd) {
	        top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Cpy_Addr_AddEvent);
	        top.MyApp.fctAddEvent(typeHnd, "change", PS_Cpy_Addr_AddEvent);
	    }
	}
	
	
	// gestion des SIRET
	
	
	/*var MySiret = top.MyApp.$("#CpyExtSiret", top.MyApp.fraData_View.ifrView2.fraData.document.childNodes);
	var focus = 0, blur = 0;
	//alert('My siret value is ' +MySiret);
	MySiret
	    .focus(function() {
	        focus += 1 ;
	        //$("#focus-count").text("focusout fired: " + focus + "x");
	        alert("focusout fired: " + focus + "x");
	    })
	    .blur(function() {
	        blur += 1;
	        //$("#blur-count").text("blur fired: " + blur + "x");
	        alert("focusout fired: " + focus + "x");
	    });
	
	
	*/
		// HAS DEB - 04/08/2023 - Figer les champs initialisés par le planning
	try {
	    var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	    var vStartPln = top.MyApp.GetItemValue("CpyExtDateStartSrc");
	    var vPrdPln = top.MyApp.GetItemValue("CpyExtSourceSrc");
	    if (vProf == 'SRC' && vStartPln != '' && vStartPln != null && vPrdPln != '' && vPrdPln != null ) {
	        // vSource - figer le champ source si rempli
	        var vSource = top.MyApp.GetItemValue("CpySource");
	        if (vSource != null && vSource != '' && vSource != undefined) {
	            top.MyApp.FindItem("CpySource").disabled = true;
	            top.MyApp.CurrentSetting.Catalog.CpySource.Ed = 0;
	            top.MyApp.SetItem("CpySource", "contentEditable", false, top.MyData_View);
	        } else {
	            top.MyApp.FindItem("CpySource").disabled = false;
	            top.MyApp.CurrentSetting.Catalog.CpySource.Ed = 1;
	            top.MyApp.SetItem("CpySource", "contentEditable", true, top.MyData_View);
	        }
	
	        // vSource - figer le champ source si rempli
	        var famille = top.MyApp.GetItemValue("CpyExtFamilleProd");
	        if (famille != null && famille != '' && famille != undefined) {
	            top.MyApp.FindItem("CpyExtFamilleProd").disabled = true;
	            top.MyApp.CurrentSetting.Catalog.CpyExtFamilleProd.Ed = 0;
	            top.MyApp.SetItem("CpyExtFamilleProd", "contentEditable", false, top.MyData_View);
	        } else {
	            top.MyApp.FindItem("CpyExtFamilleProd").disabled = false;
	            top.MyApp.CurrentSetting.Catalog.CpyExtFamilleProd.Ed = 1;
	            top.MyApp.SetItem("CpyExtFamilleProd", "contentEditable", true, top.MyData_View);
	        }
	    }
	} catch (e) {
	    alert("AfterLoad Header - Test Champs Planning : " + e.message);
	}
	// HAS DEB - 04/08/2023 - Figer les champs initialisés par le planning
}