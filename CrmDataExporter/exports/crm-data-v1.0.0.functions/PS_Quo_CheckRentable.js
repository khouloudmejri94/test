function PS_Quo_CheckRentable()
{
	// PS QUO CHECK RENTABILITE
	try {
	 debugger;
	 var myXmlRequest = "";
	 var strRetour = "";
	 var vUrlWebService = top.MyApp.CustomSetting.tabGlobalVar["SAP_WS"];
	 var vTypeDerog = top.MyApp.GetItemValue("QuoExtTypeDerog");
	 var vMntDerog = top.MyApp.GetItemValue("QuoExtValDepassDerog");
	 var vMntDerogNego = top.MyApp.GetItemValue("QuoExtMntDerogNego");
	 var vAffaire = top.MyApp.GetItemValue("QuoOppReference");
	 var vOffre = top.MyApp.GetItemValue("QuoCustReference");
	 var vDevise = top.MyApp.GetItemValue("QuoExtDeviseDepassDerog");
	 var vNature = 'DM';
	
	
	 if (vMntDerogNego != '' && vMntDerogNego != null && vMntDerogNego != undefined) {
	  vMntDerog = vMntDerogNego;
	 }
	   
	 switch (vTypeDerog) {
	  case 'Controle qualité':
	   vTypeDerog = 'CQ'
	   break;
	  case 'Emballage et stickers':
	   vTypeDerog = 'ES'
	   break;
	  case 'Rapport de test':
	   vTypeDerog = 'RT'
	   break;
	  case 'Transport':
	   vTypeDerog = 'TR'
	   break;
	  default:
	   vTypeDerog = ''
	 }
	   
	 var myXmlRequest = " <soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>" +
	  "     <soapenv:Header/>" +
	  "     <soapenv:Body>" +
	  "     <urn:ZCrmDemRent>" +
	  "     <ExtraCost>" + vMntDerog + "</ExtraCost>" +
	  "     <ZtypeDem>" + vTypeDerog + "</ZtypeDem>" +
	  "     <ZtypeVal>" + vNature + "</ZtypeVal>" +
	  "     <Zzaffai>" + vAffaire + "</Zzaffai>" +
	  "     <Zzangnr>" + vOffre + "</Zzangnr>" +
	  "     </urn:ZCrmDemRent>" +
	  "     </soapenv:Body>" +
	  "  </soapenv:Envelope>";
	   
	 var arrParam = [];
	 arrParam[0] = vUrlWebService;
	 arrParam[1] = myXmlRequest;
	 var result = top.MyApp.ExecuteServerScript(38691377548568, arrParam);
	   
	 //var result = '0';
	 //alert(result);
	   
	 // traiter la string result
	 if (result.substring(0, 1) == "0") {
	  top.MyApp.OpenDlg("Alert", ["Attention", "La commande est rentable"]);
	  top.MyApp.SetItemValue("QuoExtMntDerogAnego", result);
	  top.MyApp.fraMenuBar.Execute("R_Save");
	 } else {
	  top.MyApp.OpenDlg("Alert", ["Attention", "La commande n’est pas rentable merci de renégocier. \n Le montant à négocier est : " + result + " " + vDevise + "."]);
	  top.MyApp.SetItemValue("QuoExtMntDerogAnego", result);
	  top.MyApp.fraMenuBar.Execute("R_Save");
	 }
	 top.MyApp.OpenDlg("Alert", ["Attention", strMessage.substring(1, result.length)]);
	   
	 var vMethode = "ZCrmDemRent";
	 var vXmlRequest = myXmlRequest;
	 var vRetour = strRetour;
	 var vLogCom = "";
	 vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest.replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '" + vLogCom.replace(/'/g, "''") + "', getdate()) ";
	 var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vReqInsertLog]);
	   
	   } catch (e) {
	 //alert("Catch (PS_Quo_CheckRentable) : " + e.description + " -- " + e.message + " ");
	 var vMethode = "ZCrmDemRent";
	 var vXmlRequest = myXmlRequest;
	 var vRetour = e.message;
	 var vLogCom = "";
	 vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest.replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '" + vLogCom.replace(/'/g, "''") + "', getdate()) ";
	 var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vReqInsertLog]);
	 //return false;
	   }
}