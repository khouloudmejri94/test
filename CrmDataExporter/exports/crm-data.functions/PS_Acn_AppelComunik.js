function PS_Acn_AppelComunik(vArgTel)
{
	//PS_Acn_AppelComunik  
	//debugger;
	//alert("Welcome to PS_Acn_AppelComunik");
	//[D]Communik
	try {
	 var vUserName = top.MyApp.UserSetting.User.Name;
	 var vItemPrefixPer = top.MyApp.GetItemValue("AcnExtIndContact");
	 var vItemTelPer = top.MyApp.GetItemValue("AcnExtTelContact");
	 var vItemPrefixCpy = top.MyApp.GetItemValue("AcnExtIndicatif");
	 var vItemTelCpy = top.MyApp.GetItemValue("AcnExtTelephone");
	 var vItemTelPerFix = top.MyApp.GetItemValue("AcnExtTelFixContact");
	 var vQualifdef = encodeURIComponent("Appel Non Qualifié");
	 //var vQualifdef = 1;
	 var vFrnNo = top.MyApp.GetItemValue("AcnCpyNRID");
	 var vIdSession = "select xPseudo from sysadm.am0 where titulaire = '" + vUserName + "'";
	 var vSession = top.MyApp._gfctExtReq(vIdSession);
	 //alert(vSession);
	 //  alert(vArgTel);
	 var vGlobPrefix = top.MyApp.GetItemValue("AcnExtCallID");
	 if (vGlobPrefix == null || vGlobPrefix == undefined) {
	  vGlobPrefix = '';
	 }
	 if (vArgTel == "Per") {
	  var vItemPrefix = vGlobPrefix + vItemPrefixPer;
	  var vItemTel = vItemTelPer;
	  top.MyApp.SetItemValue("AcnExtTypeAppel", 'Per');
	 } else if (vArgTel == "Cpy") {
	  var vItemPrefix = vGlobPrefix + vItemPrefixCpy;
	  var vItemTel = vItemTelCpy;
	  top.MyApp.SetItemValue("AcnExtTypeAppel", 'Cpy');
	 } else if (vArgTel == "Fix") {
	  var vItemPrefix = vGlobPrefix;
	  var vItemTel = vItemTelPerFix;
	  top.MyApp.SetItemValue("AcnExtTypeAppel", 'Fix');
	 }
	 //alert("helloCPY");
	 var url = null;
	 url = top.MyApp.CustomSetting.tabGlobalVar["CAL_WS"];
	 //https://ozeol.comunikcrm.info/vvciwa/api/webagent/call/ozeol_preprod/Agent9/0021656105889/1/
	 // HASV9 url = 'https://ozeolpreprod.comunikcrm.info/vvci/api/webagent/call/ozeolpreprod/'; //DEV
	 //url = 'https://ozeol.comunikcrm.info/vvci/api/webagent/call/ozeol/'; // PROD
	 url += vSession + "/";
	 url += vItemPrefix;
	 url += vItemTel;
	 url = url + "/" + vQualifdef + "/" + new Date().getTime();
	 // alert(url);
	 // appel WS 
	 var resultat = top.MyApp.ExecuteServerScript(38638253316548, [url]);
	   console
	 alert("Resultat BRUT appel: \n" + resultat);
	   console.log("Resultat BRUT appel: \n"+ resultat);
	
	   // Extraire la partie JSON // Le 's' permet de capturer sur plusieurs lignes
	   var jsonMatch = resultat.match(/{.*}/s); 
	
	   // Récupération et affichage du JSON
	   if (jsonMatch) {
	      var jsonTexte = jsonMatch[0];
	      console.log(jsonTexte);
	   } else {
	      console.log("Aucun JSON trouvé dans le texte.");
	   }
	
	
	 ///////var myData = eval("(" + jsonTexte + ")");
	 ///////alert(myData.message + " via Comunik");
	   
	   try {
	    // Conversion du texte en objet JSON
	    var jsonObj = JSON.parse(jsonTexte);
	    
	    // Extraction de la valeur de "message"
	    var message = jsonObj.message;
	    console.log("Message:", message);
	    alert(message + " via Comunik");
	   } catch (error) {
	      console.error("Erreur lors du parsing du JSON :", error);
	   }
	      
	
	
	 top.MyApp.SetItemValue("AcnExtFlagComunik", 1);
	 top.MyApp.SetItemValue("AcnExtFlagAppel", 1);
	 top.MyApp.CurrentSetting.Catalog["AcnExtQualification"].Ed = 1;
	 top.MyApp.SetItemValue("AcnExtQualification", "");
	 top.MyApp.CurrentSetting.Catalog["AcnExtQualification"].Ed = 0;
	 top.MyApp.fraMenuBar.Execute("R_Save");
	} catch (e) {
	 alert("PS_Acn_AppelComunik - Contact - Communik : " + e.message);
	}
	//[F]Communik
		var arrParams = []
	arrParams[0] = top.MyApp
	arrParams[1] = top.bWizard
	top.MyApp.OpenDlg('37501287699620',arrParams , top, undefined, undefined, undefined, undefined, function (){});
}