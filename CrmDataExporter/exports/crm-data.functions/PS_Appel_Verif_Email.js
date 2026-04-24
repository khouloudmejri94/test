function PS_Appel_Verif_Email()
{
	// HAS DEB : 03/04/2025 : Test email quality with Hunter API
	
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
	    //return false;
	}
	top.MyApp.fraMenuBar.Execute("R_Save");
	
	// HAS END : 03/04/2025 : Test email quality with Hunter API
}