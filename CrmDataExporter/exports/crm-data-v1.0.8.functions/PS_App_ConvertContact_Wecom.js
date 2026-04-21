function()
{
	//PS_App_ConvertContact_Wecom
	//NRID : 42431976586836
	//company ID : ww896437b18de955ea
	// HAS DEB : 22/09/2025 : Call wecom API
	/********************************************************/
	
	/* var vUserID = top.MyApp.GetItemValue("PerNRID"); */
	var vUserID = top.MyApp.GetItemValue("ResExtPseudo");
	
	//alert("HAS - Calling first API");
	//var jsonData = top.MyApp.ExecuteServerScript(41038094411050, [vEmail]);
	var jsonToken = top.MyApp.ExecuteServerScript(42431976406658);
	//alert("HAS - Wecom Json data result :"+jsonData);
	//top.MyApp.SetItemValue("CpyExtComFrs", jsonData);
	
	// Convertir la chaîne JSON en un objet JavaScript
	var data = JSON.parse(jsonToken);
	
	// Extraire la valeur de "access_token"
	var vResToken = data.access_token;
	// Extraire la valeur de "expires_in"
	var vResExpire = data.expires_in;
	
	//alert("HAS - Token result :"+vResToken+ " and expires in "+vResExpire+" seconds.");
	console.log("Param1:", vResToken);
	console.log("Param2:", vResExpire);
	
	if (data.errcode === 0) {
		alert("HAS - Token correctly received and will expire in "+vResExpire+" seconds.");
		var jsonCreatContact = top.MyApp.ExecuteServerScript(42331976586836, [vResToken,vUserID]);
		var dataCT = JSON.parse(jsonCreatContact);
		//alert("HAS - Wecom convert Contact Json :"+jsonCreatContact);
		alert("HAS - Wecom convert Contact API:"+ dataCT.errmsg+ " and OpenID:"+ dataCT.openid);
	} else {
		alert("Erreur API AddContact:", dataCT.errmsg, "Code:", dataCT.errcode);
	}
	// HAS END : 03/04/2025 : 22/09/2025 : Call wecom API
}