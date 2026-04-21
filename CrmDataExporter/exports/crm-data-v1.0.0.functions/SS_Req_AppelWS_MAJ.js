function SS_Req_AppelWS_MAJ()
{
	try
	{
	var oContact = CreateSelligentObject("Person",CurrentSessionID,true);
	var oSql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	var vReqOppReference = CurrentRecord["ReqOppReference"];
	/**************************CONSTRUCTION DU XML A ENVOYER à SAP ********************************/
	var vXmlRequest = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>";
	vXmlRequest += "<soapenv:Header/>";
	vXmlRequest += "<soapenv:Body>";
	vXmlRequest += "<urn:ZCrmLitigeCreation>";
	vXmlRequest += "<Zzaffai>" + vReqOppReference + "</Zzaffai>";
	vXmlRequest += "</urn:ZCrmLitigeCreation>";
	vXmlRequest += "</soapenv:Body>";
	vXmlRequest += "</soapenv:Envelope>";
	/**************************ENVOIE DU XML à SAP (APPEL WEB SERVICES) ***************************/
	//NLO le 03/08/2017 : Mantis 12832
	 var no_SAP_WS=false;
	 try 
	  {
	  var vUrlWebService = Session["SAP_WS"];
	  }
	  catch(e)
	  {
	  no_SAP_WS = true;
	  }
	  //var vUrlWebService = top.MyApp.CustomSetting.tabGlobalVar["SAP_WS"];
	  if (!no_SAP_WS)
	  {   
	  //Ouverture de l'activeX Microsoft
	  var xmlHttp = new ActiveXObject ("Microsoft.XMLHTTP");
	  //Appel web services
	  xmlHttp.open("POST",vUrlWebService, false);
	  xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	  xmlHttp.send(vXmlRequest);
	  var vLogCom = "Appel WS réussi : script SS_Req_AppelWS_MAJ";
	  try
	  {
	    /************************* Récupération du XML de retour **************************************/
	    var oRetourXml = InitXml(xmlHttp.responseXML.xml);
	    //Remplir le champ MailValide (récupéré du XML de SAP)
	    var oMailValide = FindItem("MailValide", oRetourXml);
	    if(oMailValide != undefined) CurrentRecord["ReqExtEmail"] = oMailValide.InnerXml;
	   
	    //Remplir le champ Centrale (récupéré du XML de SAP)
	    var oCentrale = FindItem("CentraleAchat", oRetourXml);
	    if(oCentrale != undefined) CurrentRecord["ReqExtCentrale"] = oCentrale.InnerXml;
	   
	    //Remplir le champ Commande (récupéré du XML de SAP)
	    var oCommande = FindItem("Commande", oRetourXml);
	    if(oCommande != undefined) CurrentRecord["ReqExtNumcommande"] = oCommande.InnerXml;
	    //Remplir le champ CP Commande (récupéré du XML de SAP)
	    //var oCpCommande = FindItem("NomCp", oRetourXml);
	    //if(oCpCommande != undefined) CurrentRecord["ReqExtCpCommande"] = oCpCommande.InnerXml;
	    
	    /****************** Création des contacts  (récupéré du XML de SAP) **************************/
	    var oContacts = FindItems("Contacts/item", oRetourXml);
	    var vNom = "";
	    var vPrenom = "";
	    var vFonctionSAP = "";
	    var vMail = "";
	    var vTel = "";
	    var vReqExtMailLiti = "";
	    var vReqExtMailcompta = "";
	    for(var i = 0; i < oContacts.Count; i++)
	    {
	   vNom = FindItem("NameLast", oContacts[i]).InnerXml;
	   vPrenom = FindItem("NameFirst", oContacts[i]).InnerXml;
	   vFonctionSAP = FindItem("Pafkt", oContacts[i]).InnerXml;
	   vMail = FindItem("SmtpAddr", oContacts[i]).InnerXml;
	   vTel = FindItem("Telf1", oContacts[i]).InnerXml;
	   //Création des contacts, si la fonction est "Contact litiges" (LG) ou "comptabilité" (CO), et si le contact n'existe pas déjà
	   if(vFonctionSAP == 'LG' || vFonctionSAP == 'CO')
	   {
	     var nCpyNRID = CurrentRecord["ReqCpyNRID"];
	     var vCpyName = CurrentRecord["ReqCpyName"];
	     var vFonctionSel = "";
	     switch(vFonctionSAP)
	     {
	    case 'LG':
	      vFonctionSel = 'Litige';
	      vReqExtMailLiti += vMail + ";";
	    break;
	    case 'CO':
	      vFonctionSel = 'Comptabilité';
	      vReqExtMailcompta += vMail + ";";
	    break;
	    default:
	      vFonctionSel ='';
	     }
	     var oSelectionRow = new SelectionRow();
	     oSelectionRow.Fields["PerName"] = vNom;
	     oSelectionRow.Fields["PerFirstName"] = vPrenom;
	     oSelectionRow.Fields["PerCpyEmailAddress"] = vMail;
	     oSelectionRow.Fields["PerCpyDirectPhNbr"] = vTel;
	     oSelectionRow.Fields["PerCpyCpyNRID"] = nCpyNRID;
	     oSelectionRow.Fields["PerCpyCpyName"] = vCpyName;
	     oSelectionRow.Fields["PerCpyFunction"] = vFonctionSel;
	     var oResContact = oSql.ExecuteSql("select sp0.nrid from sp0 sp0 join pe0 pe0 on pe0.nrid = sp0.pe0_nrid and sp0.so0_nrid = '" + nCpyNRID + "' and pe0.personne = '" + vNom + "' and pe0.prenom = '" + vPrenom + "' and sp0.fonction = '" + vFonctionSel + "'");
	  ThrowMessage("Erreur","dsfg");
	     var oResContactXml = InitXml(oResContact);
	     var oLignes = FindItem("Flds", oResContactXml, true);
	     //si le contact n'existe pas, on le créé, sinon on le met à jour
	     if(oLignes.Count == 0)
	     {
	    oContact.NewSetAndSave(0, oSelectionRow);
	     }
	     else
	     {
	    oContact.OpenSetAndSave(GetItemValue("PerCpyNRID", oLignes[0]), oSelectionRow);
	     }
	   }
	    }
	    //remplir les mail litige et mail compta
	    CurrentRecord["ReqExtMailLiti"] = vReqExtMailLiti.substring(0, vReqExtMailLiti.length-1);
	    CurrentRecord["ReqExtMailcompta"] = vReqExtMailcompta.substring(0, vReqExtMailcompta.length-1);
	  }
	  catch(e)
	  {
	    vLogCom = "Echec appel WS : script SS_Req_AppelWS_MAJ" + e.description;
	    //throw "Erreur dans le server script 'SS_Req_AppelWS_MAJ : " + e.description;
	  }
	  finally
	  {
	    delete oContact;
	    /************************************************* LOG *************************************************/
	    try
	    {
	   var vMethode = "ZCrmLitigeCreation";
	   var vXmlRequest = vXmlRequest.replace(/'/g, "''");
	   var vRetour = xmlHttp.responseXML.xml.replace(/'/g, "''");
	   oSql.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour + "', '" + vLogCom + "', getdate())");
	    }
	    catch(e)
	    {
	   Selligent.Library.Monitor.Tracer.Write("Erreur dans le server script 'SS_Req_AppelWS_MAJ : " + e.description, false);
	    }
	    delete oSql;
	  }
	 }
	}
	catch(e)
	{
	     Selligent.Library.Monitor.Tracer.Write("Erreur dans le server script 'SS_Req_AppelWS_MAJ : " + e.description, false);
	}
		return true;
}