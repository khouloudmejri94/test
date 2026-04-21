function AfterLoad_FP_34701378279211()
{
	//DEBUT MASAO@FTC - 02/01/2018 
	if (top.CurrentSetting.nChapMode != "Reset" && top.MyApp.CurrentSetting.bConsultMode != true) {
		var flagCpyType;
		var myItem = top.MyApp.FindItem("QuoExtRapTest");
		var vProf = top.MyApp.UserSetting.User.ProfileInitials;
		var vFonction = top.MyApp.UserSetting.User.Function;
		var vRapTest = top.MyApp.GetItemValue("QuoExtRapTest");
		var vMode = top.MyApp.CustomSetting.AdmFonction;
	
		var vListProfilQua = "ADMT;QUA";
		var vListProfilsValides = "ADMT;ADMF;NOR";
		var arrayListNormes = ['QuoExtRapTest', 'QuoExtDateRecNS', 'QuoExtDateLabos', 'QuoExtDateDebVal', 'QuoExtDebutNorms', 'QuoExtDatederogation', 'QuoExtDateValidAuto', 'QuoExtDerogation', 'QuoExtValidationNormes', 'QuoExtStatutRT', 'QuoExtDateEnvoiMKT', 'QuoExtDateValidRT', 'QuoExtDateValidMKT', 'QuoExtLabRT', 'QuoExtCommNorms', 'QuoExtNorDoc', 'QuoExtNombreRT', 'QuoExtNombreTest', 'QuoExtVerifLabos', 'QuoExtDebutNorms', 'QuoExtValidationConformite', 'QuoExtValidConformite', 'QuoExtCommPack', 'QuoExtNomEmball', 'QuoExtNomMarque', 'QuoExtDepMarque', 'QuoExtStatutAuto', 'QuoExtDateEnAuto', 'QuoExtDateValidAuto', 'QuoExtDateRecInspec', 'QuoExtDateDebAut', 'QuoExtLabPaiement', 'QuoExtLabDateRec', 'QuoExtLabDateEnvoi', 'QuoExtLabDevise', 'QuoExtLabDevis', 'QuoExtStatutCA', 'QuoExtDateRecCA', 'QuoExtDateDispoCA', 'QuoExtDateValidCA', 'QuoExtTrtPar'];
		var arrayListBtn = ['QuoExtDateEnvoiMKTBtn', 'QuoExtDateValidRTBtn', 'QuoExtDateDebValBtn', 'QuoExtDebutNormsBtn', 'QuoExtDateValidAutoBtn', 'QuoExtDatederogationBtn', 'QuoExtDateLabosBtn', 'QuoExtDateRecNSBtn', 'QuoExtDateValidMKTBtn', 'QuoExtDateEnAutoBtn', 'QuoExtDateRecInspecBtn', 'QuoExtDateDebAutBtn', 'QuoExtLabDateRecBtn', 'QuoExtLabDateEnvoiBtn', 'QuoExtDateRecCABtn', 'QuoExtDateDispoCABtn', 'QuoExtDateValidCABtn'];
	
		var arrayListPack = ['QuoExtStatutPack', 'QuoExtDateRecPack', 'QuoExtDateDebPack', 'QuoExtNomStick', 'QuoExtDateEnMKT', 'QuoExtDateValidMKTNormes', 'QuoExtNomNotices', 'QuoExtNomPack'];
		var arrayListBtnPack = ['QuoExtStatutPackBtn', 'QuoExtDateDebPackBtn', 'QuoExtDateRecPackBtn', 'QuoExtDateValidMKTBtn', 'QuoExtDateEnMKTBtn', 'QuoExtDateValidMKTNormesBtn'];
	
		// Packaging
		if (vProf == 'NOR' || vProf == 'QUA' || vProf == 'ADMT' || vFonction == 'Manager support') {
			if (((vProf == 'NOR' && vMode == 'hybrid') || vProf == 'QUA' || vProf == 'ADMT' || vFonction == 'Manager support') && vRapTest == 'Non Obligatoire') {
				for (var i = 0; i < arrayListPack.length; i++) {
					var objchampPack = top.MyApp.FindItem(arrayListPack[i], top.MyData_View);
					var objchampPackBtn = top.MyApp.FindItem(arrayListBtnPack[i], top.MyData_View);
					if (objchampPack) objchampPack.disabled = false;
					if (objchampPackBtn) objchampPackBtn.disabled = false;
	
					top.MyApp.SetItemAttribute(arrayListPack[i], "className", "", top.MyData_View);
					top.MyApp.CurrentSetting.Catalog[arrayListPack[i]].Ed = 1;
					top.MyApp.SetItem(arrayListPack[i], "contentEditable", true, top.MyData_View);
				}
			} else if ((vProf == 'NOR' || vProf == 'ADMT' || vFonction == 'Manager support') && vRapTest == 'Obligatoire') {
				for (var i = 0; i < arrayListPack.length; i++) {
					var objchampPack = top.MyApp.FindItem(arrayListPack[i], top.MyData_View);
					var objchampPackBtn = top.MyApp.FindItem(arrayListBtnPack[i], top.MyData_View);
					if (objchampPack) objchampPack.disabled = false;
					if (objchampPackBtn) objchampPackBtn.disabled = false;
	
					top.MyApp.SetItemAttribute(arrayListPack[i], "className", "", top.MyData_View);
					top.MyApp.CurrentSetting.Catalog[arrayListPack[i]].Ed = 1;
					top.MyApp.SetItem(arrayListPack[i], "contentEditable", true, top.MyData_View);
				}
			} else {
				for (var i = 0; i < arrayListPack.length; i++) {
					var objchampPack = top.MyApp.FindItem(arrayListPack[i], top.MyData_View);
					var objchampPackBtn = top.MyApp.FindItem(arrayListBtnPack[i], top.MyData_View);
					if (objchampPack) objchampPack.disabled = true;
					if (objchampPackBtn) objchampPackBtn.disabled = true;
	
					top.MyApp.SetItemAttribute(arrayListPack[i], "className", "disable", top.MyData_View);
					top.MyApp.CurrentSetting.Catalog[arrayListPack[i]].Ed = -1;
					top.MyApp.SetItem(arrayListPack[i], "contentEditable", false, top.MyData_View);
				}
			}
	
	
			// Normes apart packaging
			if (vListProfilsValides.indexOf(vProf) != -1 || vFonction == 'Manager support') {
				for (var i = 0; i < arrayListNormes.length; i++) {
					var objchamp = top.MyApp.FindItem(arrayListNormes[i], top.MyData_View);
					var objchampBtn = top.MyApp.FindItem(arrayListBtn[i], top.MyData_View);
					if (objchamp) objchamp.disabled = false;
					if (objchampBtn) objchampBtn.disabled = false;
	
					top.MyApp.SetItemAttribute(arrayListNormes[i], "className", "", top.MyData_View);
					top.MyApp.CurrentSetting.Catalog[arrayListNormes[i]].Ed = 1;
					top.MyApp.SetItem(arrayListNormes[i], "contentEditable", true, top.MyData_View);
				}
			} else {
				for (var i = 0; i < arrayListNormes.length; i++) {
					var objchamp = top.MyApp.FindItem(arrayListNormes[i], top.MyData_View);
					var objchampBtn = top.MyApp.FindItem(arrayListBtn[i], top.MyData_View);
					if (objchamp) objchamp.disabled = true;
					if (objchampBtn) objchampBtn.disabled = true;
	
					top.MyApp.SetItemAttribute(arrayListNormes[i], "className", "disable", top.MyData_View);
					top.MyApp.CurrentSetting.Catalog[arrayListNormes[i]].Ed = -1;
					top.MyApp.SetItem(arrayListNormes[i], "contentEditable", false, top.MyData_View);
				}
			}
	
			if (myItem) {
				myItem.onchange = function() {
					top.MyApp.Custom_flagCpyType = true;
				}
			}
	
			// HAS DEB - 14/04/2020 : si RT mis à jour alors mettre à jour Statut RT et Statut Packaging
			PS_Quo_Header_Status();
			var typeHnd = top.MyApp.FindItem("QuoExtRapTest", top.MyData_View);
			if (typeHnd) {
				top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Quo_Header_Status);
				top.MyApp.fctAddEvent(typeHnd, "change", PS_Quo_Header_Status);
			}
		}
		//END MASAO@FTC - 02/01/2018
		if (top.CurrentSetting.nChapMode == "Open" && top.MyApp.CurrentSetting.bConsultMode != true) {
			var vProcStart = top.MyApp.GetItemValue("QuoExtDebutNorms");
			var vRtStart = top.MyApp.GetItemValue("QuoExtDateDebVal");
			var vRecRap = top.MyApp.GetItemValue("QuoExtDateRecNS");
			var vSendMkt = top.MyApp.GetItemValue("QuoExtDateEnvoiMKT");
			//var vLabDate = top.MyApp.GetItemValue("QuoExtDateLabos");
			var vMktValidDate = top.MyApp.GetItemValue("QuoExtDateValidMKT");
			var vPackRec = top.MyApp.GetItemValue("QuoExtDateRecPack");
			var vPackStart = top.MyApp.GetItemValue("QuoExtDateDebPack");
			var vPackSendMkt = top.MyApp.GetItemValue("QuoExtDateEnMKT");
			var vPackMktValid = top.MyApp.GetItemValue("QuoExtDateValidMKTNormes");
			var vAutSend = top.MyApp.GetItemValue("QuoExtDateEnAuto");
			var vAutValid = top.MyApp.GetItemValue("QuoExtDateValidAuto");
			var vRecInspec = top.MyApp.GetItemValue("QuoExtDateRecInspec");
			var vConfStart = top.MyApp.GetItemValue("QuoExtDateDebAut");
			var vConfValid = top.MyApp.GetItemValue("QuoExtDateConformite");
			var vLabDateRec = top.MyApp.GetItemValue("QuoExtLabDateRec");
			var vLabDateEnvoi = top.MyApp.GetItemValue("QuoExtLabDateEnvoi");
			var vLabPaiement = top.MyApp.GetItemValue("QuoExtLabPaiement");
			var vLabDevise = top.MyApp.GetItemValue("QuoExtLabDevise");
			var vLabDevis = top.MyApp.GetItemValue("QuoExtLabDevis");
			var vStatutCA = top.MyApp.GetItemValue("QuoExtStatutCA");
			var vDateRecCA = top.MyApp.GetItemValue("QuoExtDateRecCA");
			var vDateDispoCA = top.MyApp.GetItemValue("QuoExtDateDispoCA");
			var vDateValidCA = top.MyApp.GetItemValue("QuoExtDateValidCA");
	
			// vProcStart - norms starting process :Début traitement norms
			if (vProcStart != null && vProcStart != '' && vProcStart != undefined) {
				top.MyApp.FindItem("QuoExtDebutNorms").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDebutNorms.Ed = 0;
				top.MyApp.SetItem("QuoExtDebutNorms", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDebutNorms").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDebutNorms.Ed = 1;
				top.MyApp.SetItem("QuoExtDebutNorms", "contentEditable", true, top.MyData_View);
			}
	
			// vRtStart - Valorisation start : Date début valorisation 
			if (vRtStart != null && vRtStart != '' && vRtStart != undefined) {
				top.MyApp.FindItem("QuoExtDateDebVal").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateDebVal.Ed = 0;
				top.MyApp.SetItem("QuoExtDateDebVal", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateDebVal").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateDebVal.Ed = 1;
				top.MyApp.SetItem("QuoExtDateDebVal", "contentEditable", true, top.MyData_View);
			}
	
			// vRecRap - Report reception date : Date Réception dossier 
			if (vRecRap != null && vRecRap != '' && vRecRap != undefined) {
				top.MyApp.FindItem("QuoExtDateRecNS").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateRecNS.Ed = 0;
				top.MyApp.SetItem("QuoExtDateRecNS", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateRecNS").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateRecNS.Ed = 1;
				top.MyApp.SetItem("QuoExtDateRecNS", "contentEditable", true, top.MyData_View);
			}
	
			// vSendMkt - Sending to MKT date : Date de l'envoi MKT 
			if (vSendMkt != null && vSendMkt != '' && vSendMkt != undefined) {
				top.MyApp.FindItem("QuoExtDateEnvoiMKT").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateEnvoiMKT.Ed = 0;
				top.MyApp.SetItem("QuoExtDateEnvoiMKT", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateEnvoiMKT").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateEnvoiMKT.Ed = 1;
				top.MyApp.SetItem("QuoExtDateEnvoiMKT", "contentEditable", true, top.MyData_View);
			}
	
			// vMktValidDate - MKT validation date : Date validation MKT :
			if (vMktValidDate != null && vMktValidDate != '' && vMktValidDate != undefined) {
				top.MyApp.FindItem("QuoExtDateValidMKT").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateValidMKT.Ed = 0;
				top.MyApp.SetItem("QuoExtDateValidMKT", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateValidMKT").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateValidMKT.Ed = 1;
				top.MyApp.SetItem("QuoExtDateValidMKT", "contentEditable", true, top.MyData_View);
			}
	
			// vPackRec - Pack Rec. Date : Date Réception Pack :
			if (vPackRec != null && vPackRec != '' && vPackRec != undefined) {
				top.MyApp.FindItem("QuoExtDateRecPack").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateRecPack.Ed = 0;
				top.MyApp.SetItem("QuoExtDateRecPack", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateRecPack").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateRecPack.Ed = 1;
				top.MyApp.SetItem("QuoExtDateRecPack", "contentEditable", true, top.MyData_View);
			}
	
			// vPackStart - Start date : Date début traitement :
			if (vPackStart != null && vPackStart != '' && vPackStart != undefined) {
				top.MyApp.FindItem("QuoExtDateDebPack").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateDebPack.Ed = 0;
				top.MyApp.SetItem("QuoExtDateDebPack", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateDebPack").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateDebPack.Ed = 1;
				top.MyApp.SetItem("QuoExtDateDebPack", "contentEditable", true, top.MyData_View);
			}
	
			// vPackSendMkt - Sending to MKT date : Date envoi MKT :
			if (vPackSendMkt != null && vPackSendMkt != '' && vPackSendMkt != undefined) {
				top.MyApp.FindItem("QuoExtDateEnMKT").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateEnMKT.Ed = 0;
				top.MyApp.SetItem("QuoExtDateEnMKT", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateEnMKT").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateEnMKT.Ed = 1;
				top.MyApp.SetItem("QuoExtDateEnMKT", "contentEditable", true, top.MyData_View);
			}
	
			// vPackMktValid - MKT validation date : Date validation MKT :
			if (vPackMktValid != null && vPackMktValid != '' && vPackMktValid != undefined) {
				top.MyApp.FindItem("QuoExtDateValidMKTNormes").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateValidMKTNormes.Ed = 0;
				top.MyApp.SetItem("QuoExtDateValidMKTNormes", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateValidMKTNormes").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateValidMKTNormes.Ed = 1;
				top.MyApp.SetItem("QuoExtDateValidMKTNormes", "contentEditable", true, top.MyData_View);
			}
	
			// vAutSend - Authorization sending date : Date d'envoi autorisation 
			if (vAutSend != null && vAutSend != '' && vAutSend != undefined) {
				top.MyApp.FindItem("QuoExtDateEnAuto").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateEnAuto.Ed = 0;
				top.MyApp.SetItem("QuoExtDateEnAuto", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateEnAuto").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateEnAuto.Ed = 1;
				top.MyApp.SetItem("QuoExtDateEnAuto", "contentEditable", true, top.MyData_View);
			}
	
			// vAutValid - Authorization validation date : Date validation autorisation 
			if (vAutValid != null && vAutValid != '' && vAutValid != undefined) {
				top.MyApp.FindItem("QuoExtDateValidAuto").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateValidAuto.Ed = 0;
				top.MyApp.SetItem("QuoExtDateValidAuto", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateValidAuto").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateValidAuto.Ed = 1;
				top.MyApp.SetItem("QuoExtDateValidAuto", "contentEditable", true, top.MyData_View);
			}
	
			// vRecInspec - Inspect. recept. date : Date Réception Inspection 
			if (vRecInspec != null && vRecInspec != '' && vRecInspec != undefined) {
				top.MyApp.FindItem("QuoExtDateRecInspec").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateRecInspec.Ed = 0;
				top.MyApp.SetItem("QuoExtDateRecInspec", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateRecInspec").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateRecInspec.Ed = 1;
				top.MyApp.SetItem("QuoExtDateRecInspec", "contentEditable", true, top.MyData_View);
			}
	
			// vConfStart - Conform. start date : Date Début Autorisation 
			if (vConfStart != null && vConfStart != '' && vConfStart != undefined) {
				top.MyApp.FindItem("QuoExtDateDebAut").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateDebAut.Ed = 0;
				top.MyApp.SetItem("QuoExtDateDebAut", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateDebAut").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateDebAut.Ed = 1;
				top.MyApp.SetItem("QuoExtDateDebAut", "contentEditable", true, top.MyData_View);
			}
	
			// vLabDateRec - Date reception echantillon
			if (vLabDateRec != null && vLabDateRec != '' && vLabDateRec != undefined) {
				top.MyApp.FindItem("QuoExtLabDateRec").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtLabDateRec.Ed = 0;
				top.MyApp.SetItem("QuoExtLabDateRec", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtLabDateRec").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtLabDateRec.Ed = 1;
				top.MyApp.SetItem("QuoExtLabDateRec", "contentEditable", true, top.MyData_View);
			}
	
			// vLabDateEnvoi - Date envoi echantillon
			if (vLabDateEnvoi != null && vLabDateEnvoi != '' && vLabDateEnvoi != undefined) {
				top.MyApp.FindItem("QuoExtLabDateEnvoi").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtLabDateEnvoi.Ed = 0;
				top.MyApp.SetItem("QuoExtLabDateEnvoi", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtLabDateEnvoi").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtLabDateEnvoi.Ed = 1;
				top.MyApp.SetItem("QuoExtLabDateEnvoi", "contentEditable", true, top.MyData_View);
			}
	
			// vDateRecCA - Date reception Contrat arrangement
			if (vDateRecCA != null && vDateRecCA != '' && vDateRecCA != undefined) {
				top.MyApp.FindItem("QuoExtDateRecCA").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateRecCA.Ed = 0;
				top.MyApp.SetItem("QuoExtDateRecCA", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateRecCA").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateRecCA.Ed = 1;
				top.MyApp.SetItem("QuoExtDateRecCA", "contentEditable", true, top.MyData_View);
			}
	
			// vDateDispoCA - Date mise a dispo Contrat arrangement
			if (vDateDispoCA != null && vDateDispoCA != '' && vDateDispoCA != undefined) {
				top.MyApp.FindItem("QuoExtDateDispoCA").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateDispoCA.Ed = 0;
				top.MyApp.SetItem("QuoExtDateDispoCA", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateDispoCA").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateDispoCA.Ed = 1;
				top.MyApp.SetItem("QuoExtDateDispoCA", "contentEditable", true, top.MyData_View);
			}
	
			// vDateValidCA - Date validation Contrat arrangement
			if (vDateValidCA != null && vDateValidCA != '' && vDateValidCA != undefined) {
				top.MyApp.FindItem("QuoExtDateValidCA").disabled = true;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateValidCA.Ed = 0;
				top.MyApp.SetItem("QuoExtDateValidCA", "contentEditable", false, top.MyData_View);
			} else {
				top.MyApp.FindItem("QuoExtDateValidCA").disabled = false;
				top.MyApp.CurrentSetting.Catalog.QuoExtDateValidCA.Ed = 1;
				top.MyApp.SetItem("QuoExtDateValidCA", "contentEditable", true, top.MyData_View);
			}
		}
	}
}