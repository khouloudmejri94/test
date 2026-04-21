function()
{
	//Auteur : Pierre-Louis EGAUD
	//Société : Masao
	//Date de création : 30/05/2012
	//Description : si 'telephone direct' renseigné (et GSM non renseigné) alors proposer recopie sur 'GSM'
	
	
	
	var vIsNoWechat = top.MyApp.GetItemValue("PerExtNoWechat");
	var vWechatNbr = top.MyApp.GetItemValue("PerExtWeChat");
	
	//HAS DEB : 12/07/2025 - ADD control to check if  wechat is inserted, otherwise he shoud confirm that No Wechat available
	var vCpyCountry = top.MyApp.GetItemAttributeFromXML(top.MyApp.AppSetting["Cpy"].Record_XML,"CpyAddr1Country","Val");
	if (vCpyCountry.substr(0,2) == "CN") {
	    if ((vWechatNbr == '' || vWechatNbr == null || vWechatNbr == undefined) && vIsNoWechat != '1') {
	            top.MyApp.OpenDlg("Alert",["","Please complete the wechat field or check the box No WeChat !"]);
	            return false;
	    }
	}
	//HAS END : 12/07/2025 - ADD control ti check if  wechat is inserted, otherwise he shoud confirm that No Wechat available
	
	
		// HAS DEB : 03/04/2025 : Test email quality with Hunter API
	var vPlateau = top.MyApp.CustomSetting.Plateau;
	var vListPlateauValid = "Tunisie;ECOMMERCE;SPS;Inde";
	
	
	if (vListPlateauValid.indexOf(vPlateau) != -1) {
	    if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "PerCpyEmailAddress", "blnModified")) {
	        var vEmail = top.MyApp.GetItemValue("PerCpyEmailAddress");
	        //alert("HAS - Email addr to be tested :"+vEmail);
	        var jsonData = top.MyApp.ExecuteServerScript(41038094411050, [vEmail]);
	        //alert("HAS - resultat appel WS HUNTER :"+jsonData);
	        //top.MyApp.SetItemValue("CpyExtComFrs", jsonData);
	        // Convertir la chaîne JSON en un objet JavaScript
	        var data = JSON.parse(jsonData);
	        
	        // Extraire la valeur de "status"
	        var vStatus = data.data.status;
	top.MyApp.CurrentSetting.Catalog.PerExtVerifEmail.Ed = 1;
	top.MyApp.SetItemValue("PerExtVerifEmail", vStatus);
	top.MyApp.CurrentSetting.Catalog.PerExtVerifEmail.Ed = -1;
	        alert("Check Email address result : "+vStatus);
	        //console.log("Status:", vStatus);
	        if (vStatus != 'valid' && vStatus != 'accept_all' ) {
	            alert("Email address incorrect, please check and update!");
	            return false;
	        }
	    }
	}
	// HAS END : 03/04/2025 : Test email quality with Hunter API
	
		vDateCreationContact = top.MyApp.GetItemValue("PerCpyInDate");
	if (vDateCreationContact == '' || vDateCreationContact == undefined) {
	 top.MyApp.SetItemValue("PerCpyInDate", top.MyApp.GetItemValue("PerExtDateCreation"));
	}
	//si 'telephone direct' renseigné (et GSM non renseigné) alors proposer recopie sur 'GSM'
	var vTel = top.MyApp.GetItemValue("PerCpyDirectPhNbr");
	var vGSM = top.MyApp.GetItemValue("PerCpyMobilePhNbr");
	var vWeChat = top.MyApp.GetItemValue("PerExtWeChat");
	// SC Edit
	//var telPre = top.MyApp.GetItemValue("PerCpyIntPrefix");
	var re = /^\d+$/;
	
	if (vTel) {
	 if (!vTel.match(re)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez le numéro de telephone, s'il vous plait."]]);
	  return false;
	 } else {
	  //return true;
	 }
	}
	
	if (vTel != '' && vGSM == '') {
	 top.MyApp.OpenDlg("Alert", ["Confirmation", top.MyApp.arrTranslations["Voulez-vous copier le téléphone direct dans le GSM ?"], "YesNo"]);
	 var bRes = top.MyApp.AppSetting.dlgReturn[0];
	 if (bRes) top.MyApp.SetItemValue("PerCpyMobilePhNbr", vTel);
	}
	if (vGSM) {
	 if (!vGSM.match(re)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez le GSM, s'il vous plait."]]);
	  return false;
	 } else {
	  //return true;
	 }
	}
	
	//******* Verif WeChat ******/
	if (vWeChat) {
	
	 if (!vWeChat.match(re)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez le WeChat, s'il vous plait."]]);
	  return false;
	 } 
	
	 // if chinese format with prefix 0086 (15 digits)
	 if (vWeChat.length == 15 && vWeChat.indexOf("0086") == 0) {
	  vWeChat = vWeChat.substring(4); // remove 0086
	  top.MyApp.SetItemValue("PerExtWeChat", vWeChat);
	 }
	
	 // final validation : must be 11 digits
	 if (!/^\d{11}$/.test(vWeChat)) {
	  top.MyApp.OpenDlg("Alert", [
	   "Attention",
	   top.MyApp.arrTranslations["Le WeChat doit contenir 11 chiffres (numéro chinois valide)."]
	   //WeChat must contain 11 digits (valid Chinese number).
	  ]);
	  return false;
	 }
	
	}
	
	
		return true;
}