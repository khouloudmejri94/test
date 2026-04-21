function()
{
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 /*if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "Result", "blnModified") == "true") 
	 {
	   top.MyApp.OpenDlg("Alert", ["Attention", "It is necessary to save the modifications of the offer before passing the status to 'negotiated'."]);
	   return false;
	 }*/
	 var vListProfilsValides = "ADMT;ADMF;ADMFT;ACH_TER;ASS_ACH;MAN_HA_TER,ASS_CO;MAN_HA_ASS";
	 var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	 var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	 if (vListProfilsValides.indexOf(vProf) == -1 &&  vProfNeg.indexOf(vProf) == -1 && vProf != 'ADMT' && vProf != 'QUA' && vProf != 'MNG_ACH_OPR' ) {
	  //top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé de passer le statut à ‘négocier’ !! \n Merci de contacter votre administrateur."]]);
	  top.MyApp.OpenDlg("Alert", ["Attention", "Your are not allowed to move to status NEGOCIATED.\n Request cancelled."])
	  return false;
	 }
	 var statusOff = top.MyApp.GetItemValue("QuoExtStatOff");
	 if (statusOff.substr(0, 1) == "5") {
	  return false;
	 }
	 //HAS DEB - 02/10/2019 : Ajouter un controle sur les commande avec au moin un article phytosanitaire
	 var Sql1 = "select (select top 1 xPPE1 from sysadm.so0 inner join sysadm.dc0 on dc0.so0_nrid = so0.nrid inner join sysadm.xdc2 on xdc2.DC0_NRID = dc0.nrid   " +
	  "where DC0_NRID ='" + top.MyApp.GetItemValue('QuoNRID') + "' ) " +
	  " , (select count(nrid) as phyto from sysadm.xdc2 where TEMPLATE is null and DC0_NRID = '" + top.MyApp.GetItemValue('QuoNRID') + "' and xPhyto_Sanitaire is not null  and xPhyto_Sanitaire != '0')   ";
	 var arrRes1 = top.MyApp._gfctExtReq(Sql1);
	 var vPasseportFrs = arrRes1[0][0];
	 var vPasseport = arrRes1[0][1];
	 //top.MyApp.OpenDlg("Alert", ["Attention", "Le passeport du fournisseur est:" + vPasseportFrs + "."]);
	 //top.MyApp.OpenDlg("Alert", ["Attention", "Voici le nombre des articles phyto:  " + vPasseport + "."]);
	 if (vPasseport > 0) {
	  if (vPasseportFrs == '' || vPasseportFrs == null || vPasseportFrs == undefined) {
	   top.MyApp.OpenDlg("Alert", ["Attention", "Your order contains PPE products.\n The PPE code is missing on the supplier details.\n Order request cancelled."]);
	   return false;
	  }
	 }
	 //DEBUT FTC@MASAO - Dico Offre - 02/01/2018   
	 top.MyApp.OpenDlg("YesNo", [top.MyApp.arrTranslations["Voulez-vous passer au statut « 2. Négocié » ?"]])
	 if (top.MyApp.AppSetting.dlgReturn[0]) {
	  var nrid = top.MyApp.GetItemValue("QuoNRID");
	  var strResultat = top.MyApp.ExecuteServerScript(30360107382948, [nrid, "2. Négocié"]); //SS_Quo_Set_Statut_Negocie
	  if (strResultat == true || strResultat == "True") {
	   //END FTC@MASAO - Dico Offre - 02/01/2018
	   /*try 
	   {
	     var vNumOffre = top.MyApp.GetItemValue("QuoCustReference");
	     var vStatusOffre = "02. Négocié";
	     var myXmlRequest = "";
	     myXmlRequest = myXmlRequest + "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>"
	     myXmlRequest = myXmlRequest + "<soapenv:Header/>"
	     myXmlRequest = myXmlRequest + "<soapenv:Body>"
	     myXmlRequest = myXmlRequest + "<urn:ZCrmEnOffre>"
	     myXmlRequest = myXmlRequest + "<Zzangnr>" + vNumOffre + "</Zzangnr>"
	     myXmlRequest = myXmlRequest + "<Zzstatutcrm>" + vStatusOffre + "</Zzstatutcrm>"
	     myXmlRequest = myXmlRequest + "</urn:ZCrmEnOffre>"
	     myXmlRequest = myXmlRequest + "</soapenv:Body>"
	     myXmlRequest = myXmlRequest + "</soapenv:Envelope>"
	     //NLO le 03/08/2017 : Mantis 12832
	     var no_SAP_WS = false;
	     try 
	     {
	       var vUrlWebService = top.MyApp.CustomSetting.tabGlobalVar["SAP_WS"];
	     } 
	     catch (e) 
	     {
	       no_SAP_WS = true;
	     }
	     if (!no_SAP_WS) 
	     {
	       //Ouverture de l'activeX Microsoft
	       var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	       //Ouverture
	       xmlHttp.open("POST", vUrlWebService, false);
	       xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	       xmlHttp.send(myXmlRequest);
	       strRetour = xmlHttp.responseXML.xml;
	       if (xmlHttp.responseXML.selectNodes("//Result")) 
	       {
	         if (xmlHttp.responseXML.selectNodes("//Result")[0]) 
	         {
	           var strMessage = xmlHttp.responseXML.selectNodes("//Result")[0].text;
	           if (strMessage.substring(0, 1) == "I") 
	           {
	             top.MyApp.OpenDlg("Alert", ["Attention", strMessage.substring(1, strMessage.length)]);
	           } 
	           else 
	           {
	             top.MyApp.OpenDlg("Alert", ["Attention", strMessage.substring(1, strMessage.length)]);
	           }
	         }
	       } else top.MyApp.OpenDlg("Alert", ["Attention", "Une erreur est survenue lors de la mise à jour de l’offre dans SAP !!"]);
	       var vMethode = "ZCrmEnOffre";
	       var vXmlRequest = vNumOffre + " / " + vStatusOffre;
	       var vRetour = strRetour;
	       var vLogCom = "";
	       var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', '" + vLogCom.replace(/'/g, "''") + "', getdate()) ";
	       var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vReqInsertLog], '', '', true);
	     }
	   } 
	   catch (e) 
	   {
	     top.MyApp.OpenDlg("Alert", ["Attention", "Error -- " + e.description]);
	   }
	   */
	   top.MyApp.fraMenuBar.Execute("T_Refresh");
	   //Debut HAS : lancer le webservice à travers un checkbox activé
	   //top.MyApp.SetItemValue("QuoExtAppel", '1');
	   //Fin HAS : lancer le webservice à travers un checkbox activé
	
	   // Debut HAS : ajouter un enregistrement automatique suite passage en Negoccie coté serveur
	   top.MyApp.fraMenuBar.Execute("R_Save");
	   top.MyApp.fraMenuBar.Execute("R_Consult");
	   // Debut HAS : ajouter un enregistrement automatique suite passage en Negoccie coté serveur
	
	  }
	 } else {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé de passer le statut à '2. Négocié' !! \n Merci de contacter votre administrateur."]]);
	  return false;
	 }
	}
		return true;
}