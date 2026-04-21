function WS_Send_FicheTaquet(pNRID)
{
	//WS_Send_FicheTaquet NEW
	
	try{
	var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var vLogCom = "";
	    var vMessage = "";
	    var vRetour = "";
	
	var vSQL = ""
	+ " SELECT "
	+ "     dc0.vos_ref       AS Zzangnr, "
	+ "     xq.xpost_nb                   AS Zzebelp, "
	+ "     xq.xref_fournisseur           AS Zzlicha, "
	+ "     xq.xcode_IFLS                 AS Matkl, "
	+ "     xq.xdesign_noz                AS Zzdesign, "
	+ "     xq.xdesign_fr                 AS Zzdesignf, "
	+ "     xq.xgloss_fr                  AS Glossairef, "
	+ "     xq.xgloss_noz                 AS Glossaireet, "
	+ "     ''          AS Znote, "
	+ "     ''          AS Zmwskz, "
	+ "     ''          AS Mwskz, "
	+ "     REPLACE(ISNULL(xq.xqte_dispo,0),',','.')      AS Qtedi, "
	+ "     ''          AS Meins, "
	+ "     REPLACE(ISNULL(xq.xprc_douane,0),',','.')        AS Zfrde, "
	+ "     REPLACE(ISNULL(xq.xprix_cp,0),',','.')  AS Zpuma, "
	+ "     REPLACE(ISNULL(xq.xqte_achat,0),',','.')         AS Menge, "
	+ "     REPLACE(ISNULL(xq.xqte_nego,0),',','.')          AS MengeNego, "
	+ "     REPLACE(ISNULL(xq.xmnt_douane,0),',','.')       AS Zfrdo, "
	+ "     REPLACE(ISNULL(xq.xpriach_frs,0),',','.')       AS Zprun "
	+ " FROM sysadm.x_quotes xq "
	+ " INNER JOIN sysadm.dc0 ON dc0.nrid = xq.dc0_nrid "
	+ " WHERE xq.dc0_nrid = '" + pNRID + "' and xq.template is null";
	+ " ORDER BY xq.xpost_nb ";
	
	 var objXmlUtil = MyQryObj.ExecuteSql(vSQL);
	 var xmlDoc = InitXml(objXmlUtil);
	
	 var MyNodes = FindItem("Flds", xmlDoc, true);
	 var MyNodesCount = MyNodes.Count;
	
	
	var strLignes = "";     // ? string vide normale
	
	for (var i = 0; i < MyNodesCount; i++) {
	    strLignes += '<item>';
	
	    var MyNodesLignes = MyNodes[i];
	
	    // Champs texte – remplacement XML correct
	    strLignes += '<Zzangnr>'   + (GetItemValue("Zzangnr",   MyNodesLignes) || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Zzangnr>';
	    strLignes += '<Zzebelp>'   + (GetItemValue("Zzebelp",   MyNodesLignes) || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Zzebelp>';
	    strLignes += '<Zzlicha>'   + (GetItemValue("Zzlicha",   MyNodesLignes) || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Zzlicha>';
	    strLignes += '<Matkl>'     + (GetItemValue("Matkl",     MyNodesLignes) || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Matkl>';
	    strLignes += '<Zzdesign>'  + (GetItemValue("Zzdesign",  MyNodesLignes) || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Zzdesign>';
	    strLignes += '<Zzdesignf>' + (GetItemValue("Zzdesignf", MyNodesLignes) || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Zzdesignf>';
	    strLignes += '<Glossairef>'+ (GetItemValue("Glossairef",MyNodesLignes) || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Glossairef>';
	    strLignes += '<Glossaireet>'+ (GetItemValue("Glossaireet",MyNodesLignes)|| '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Glossaireet>';
	    strLignes += '<Znote>'     + (GetItemValue("Znote",     MyNodesLignes) || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Znote>';
	    strLignes += '<Zmwskz>'    + (GetItemValue("Zmwskz",    MyNodesLignes) || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Zmwskz>';
	    strLignes += '<Mwskz>'     + (GetItemValue("Mwskz",     MyNodesLignes) || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Mwskz>';
	
	    // Champs numériques – forçage 2 décimales
	    var q = (GetItemValue("Qtedi", MyNodesLignes) || "0").toString().replace(",", ".");
	    var numQ = parseFloat(q);
	    strLignes += '<Qtedi>' + (isNaN(numQ) ? "0.00" : numQ.toFixed(2)) + '</Qtedi>';
	
	    strLignes += '<Meins>' + (GetItemValue("Meins", MyNodesLignes) || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Meins>';
	
	    var frde = (GetItemValue("Zfrde", MyNodesLignes) || "0").toString().replace(",", ".");
	    var numFrde = parseFloat(frde);
	    strLignes += '<Zfrde>' + (isNaN(numFrde) ? "0.00" : numFrde) + '</Zfrde>';
	
	    var puma = (GetItemValue("Zpuma", MyNodesLignes) || "0").toString().replace(",", ".");
	    var numPuma = parseFloat(puma);
	    strLignes += '<Zpuma>' + (isNaN(numPuma) ? "0.00" : numPuma.toFixed(2)) + '</Zpuma>';
	
	    var menge = (GetItemValue("Menge", MyNodesLignes) || "0").toString().replace(",", ".");
	    var numMenge = parseFloat(menge);
	    strLignes += '<Menge>' + (isNaN(numMenge) ? "0.00" : numMenge.toFixed(2)) + '</Menge>';
	
	    var mengeNego = (GetItemValue("MengeNego", MyNodesLignes) || "0").toString().replace(",", ".");
	    var numMengeNego = parseFloat(mengeNego);
	    strLignes += '<MengeNego>' + (isNaN(numMengeNego) ? "0.00" : numMengeNego.toFixed(2)) + '</MengeNego>';
	
	    var frdp = (GetItemValue("Zfrdo", MyNodesLignes) || "0").toString().replace(",", ".");
	    var numFrdp = parseFloat(frdp);
	    strLignes += '<Zfrdo>' + (isNaN(numFrdp) ? "0.00" : numFrdp.toFixed(2)) + '</Zfrdo>';
	
	    var prun = (GetItemValue("Zprun", MyNodesLignes) || "0").toString().replace(",", ".");
	    var numPrun = parseFloat(prun);
	    strLignes += '<Zprun>' + (isNaN(numPrun) ? "0.00" : numPrun.toFixed(2)) + '</Zprun>';
	
	    strLignes += '</item>';
	}
	
	 var vSQLTaquet = ""
	+ " SELECT "
	+ "   ISNULL(no_dossier,'')                                   AS Zzaffai, "
	+ "   ISNULL(vos_ref,'')                                      AS Zzangnr, "
	+ "   ISNULL(xPaysMarchandises,'')                            AS Zpyor, "
	+ "   ISNULL(xPaysProvenance,'')                              AS Zpypr, "
	+ "   ISNULL(xIncotermAchat,'')                               AS Inco1, "
	+ "   ISNULL(xCodePaysDep,'')                                 AS Land1, "
	+ "   ISNULL(xPort,'')                                        AS Inco2, "
	
	+ "   REPLACE(ISNULL(xValeurProforma,0),',','.')              AS Zptac, "
	+ "   REPLACE(ISNULL(xValeurVente,0),',','.')                 AS Zvvcp, "
	+ "   REPLACE(ISNULL(xVolumeCBM,0),',','.')                   AS Zvolu, "
	
	+ "   REPLACE(ISNULL(xCoutTrans,0),',','.')                   AS Zfrtr, "
	+ "   REPLACE(ISNULL(xAssurance,0),',','.')                   AS Zfras, "
	+ "   REPLACE(ISNULL(xCoutQualite,0),',','.')                 AS Zfrqa, "
	+ "   REPLACE(ISNULL(xCoutDouane,0),',','.')                  AS Zfrdo, "
	+ "   REPLACE(ISNULL(xCoutTest,0),',','.')                    AS Zfrrt, "
	
	+ "   REPLACE(ISNULL(xDiscount,0),',','.')                    AS Zpaar "
	
	+ " FROM sysadm.dc0 "
	+ " WHERE nrid = '" + pNRID + "' ";
	
	 var objXmlUtil = MyQryObj.ExecuteSql(vSQLTaquet);
	 var xmlDoc = InitXml(objXmlUtil);
	 var MyNodes = FindItem("Flds", xmlDoc, true);
	
	// -------------------------------------------------------------------
	// Construction de strSoapEnv 
	// -------------------------------------------------------------------
	
	var strSoapEnv = "";
	
	strSoapEnv += '<?xml version="1.0" encoding="UTF-8"?>';
	strSoapEnv += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ';
	strSoapEnv += 'xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
	
	strSoapEnv += '<soapenv:Header/>';
	strSoapEnv += '<soapenv:Body>';
	
	strSoapEnv += '<urn:ZCrmTaquetN>';
	
	// =========================
	// LIGNE OFFRE 
	// =========================
	strSoapEnv += '<LigneOffre>';
	//strSoapEnv += '<item>';
	
	strSoapEnv += strLignes;
	
	//strSoapEnv += '</item>';
	strSoapEnv += '</LigneOffre>';
	
	// =========================
	// TAQUET HEADER
	// =========================
	var TaquetNode = MyNodes[0];   
	
	strSoapEnv += '<Taquet>';
	
	strSoapEnv += '<Zzaffai>'   +GetItemValue("Zzaffai", TaquetNode) + '</Zzaffai>';
	strSoapEnv += '<Zzangnr>'   +GetItemValue("Zzangnr", TaquetNode) + '</Zzangnr>';
	strSoapEnv += '<Zpyor>'     +GetItemValue("Zpyor",   TaquetNode).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Zpyor>';
	strSoapEnv += '<Zpypr>'     +GetItemValue("Zpypr",   TaquetNode).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Zpypr>';
	strSoapEnv += '<Inco1>'     +GetItemValue("Inco1",   TaquetNode).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Inco1>';
	strSoapEnv += '<Land1>'     +GetItemValue("Land1",   TaquetNode).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Land1>';
	strSoapEnv += '<Inco2>'     +GetItemValue("Inco2",   TaquetNode).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Inco2>';
	
	strSoapEnv += '<Zptac>'     +GetItemValue("Zptac",   TaquetNode) + '</Zptac>';
	strSoapEnv += '<Zvvcp>'     +GetItemValue("Zvvcp",   TaquetNode) + '</Zvvcp>';
	strSoapEnv += '<Zvolu>'     +GetItemValue("Zvolu",   TaquetNode) + '</Zvolu>';
	
	strSoapEnv += '<Zfrtr>'     + GetItemValue("Zfrtr",   TaquetNode) + '</Zfrtr>';
	strSoapEnv += '<Zfras>'     + GetItemValue("Zfras",   TaquetNode) + '</Zfras>';
	strSoapEnv += '<Zfrqa>'     + GetItemValue("Zfrqa",   TaquetNode) + '</Zfrqa>';
	strSoapEnv += '<Zfrdo>'     + GetItemValue("Zfrdo",   TaquetNode) + '</Zfrdo>';
	strSoapEnv += '<Zfrrt>'     + GetItemValue("Zfrrt",   TaquetNode) + '</Zfrrt>';
	strSoapEnv += '<Zpaar>'     + GetItemValue("Zpaar",   TaquetNode) + '</Zpaar>';
	
	strSoapEnv += '</Taquet>';
	
	
	strSoapEnv += '</urn:ZCrmTaquetN>';
	strSoapEnv += '</soapenv:Body>';
	strSoapEnv += '</soapenv:Envelope>';
	
	Selligent.Library.Monitor.Tracer.Write("----------------- HIIIIIIIIIIIIICH MAJ ZCrmTaquetN  strSoapEnv " + strSoapEnv, false);
	
	 var no_SAP_WS = false;
	 try {
	  var vUrlWebService = Session["SAP_WS"];
	 } catch (e) {
	  no_SAP_WS = true;
	 }
	
	 if (!no_SAP_WS) {
	  var objRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(vUrlWebService));
	  objRequest.Method = "POST";
	  objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	  objRequest.ContentType = "text/xml; charset=utf-8";
	  //var dataASCII = System.Text.Encoding.ASCII.GetBytes(strSoapEnv);
	  var data = System.Text.Encoding.UTF8.GetBytes(strSoapEnv);
	  objRequest.ContentLength = data.Length; // Set the 'ContentLength' property of the WebRequest.
	  var stream = objRequest.GetRequestStream(); // Fournit une vue générique d'une séquence d'octets d'un Request
	  stream.Write(data, 0, data.Length); // injecter les données dans la vue générique
	  stream.Close(); // fermer la vue générique
	  var oResponse = objRequest.GetResponse(); // returns a response to an Internet request
	  var oStream = oResponse.GetResponseStream(); // Fournit une vue générique d'une séquence d'octets d'une Reponse
	  var oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8); // reads characters from a byte stream in a particular encoding
	  var vRetour = oStreamReader.ReadToEnd(); // récupérer toute la réponse
	  Selligent.Library.Monitor.Tracer.Write("----------------- HIIIIIIIIIIIIICH MAJ vRetourSAP " + vRetour, false);
	  oStreamReader.Close();
	
	    //var MyXmlDocument = InitXml(vRetour);
	
	    // aller dans le Body
	    //var BodyNode = FindItem("Body", MyXmlDocument, true);
	
	    // aller dans la réponse SAP
	    //var ResponseNode = FindItem("ZCrmTaquetNResponse", BodyNode, true);
	
	    // récupérer Result
	    //var vResult = GetItemValue("Result", ResponseNode);
	
	    var vResult = vRetour ; 
	
	    Selligent.Library.Monitor.Tracer.Write("SAP RESULT = " + vResult);
	
	 }
	  
	
	} catch (e) {
	    // Error handling and logging
	    vRetour = "KO - ERREUR TAQUET PORTAL : " + (e.message || e.description || "Erreur inconnue").substring(0, 1000);
	    Selligent.Library.Monitor.Tracer.Write("ERREUR SEND Taquet : " + vRetour);
	
	} finally {
	    // Log xlog_ws - always execute regardless of success/failure
	    var safeJson = strSoapEnv.replace(/'/g, "''");
	    var safeResult = vResult.replace(/'/g, "''");
	    var safeDebug = vRetour.replace(/'/g, "''");
	
	    MyQryObj.ExecuteSql("INSERT INTO xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) " +
	        "VALUES ('WS_Send_FicheTaquet', '" + safeJson.substring(0, 500) + "', '" + safeResult.substring(0, 200) + "', '" + safeDebug.substring(0, 1000) + "', GETDATE())");
	
	    // Cleanup resources
	    if (MyQryObj) {
	        MyQryObj.Dispose();
	        FreeSelligentObject(MyQryObj);
	    }
	    return vResult;
	}
}