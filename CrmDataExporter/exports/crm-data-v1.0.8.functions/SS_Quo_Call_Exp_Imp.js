function(pAffair,pOffer,pRequest)
{
	var ObjQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	var mySelectionRow: SelectionRow = new SelectionRow();
	var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL1 = "select nrid as Qnrid from sysadm.dc0 where vos_ref = '" + pOffer + "' and no_dossier ='" + pAffair + "'";
	var oRes1 = oQryObj1.ExecuteSql(vSQL1);
	var oXmlDoc1 = InitXml(oRes1);
	var oRows1 = FindItem("Flds", oXmlDoc1, true);
	var vNrid = GetItemValue("Qnrid", oRows1[0]);
	//HAS DEB Liberer object SQL
	try {
	 FreeSelligentObject(oQryObj1);
	 oQryObj1.Dispose();
	} catch (e) {
	 Selligent.Library.Monitor.Tracer.Write("################################ SS_Quo_DV_Echantillon_BeforeInst : échec libération objet “Selligent” #############################");
	}
	//HAS DEB Liberer object SQL
	if (pRequest == "I") {
	 mySelectionRow.Fields["QuoExtImpTq"] = "1";
	 mySelectionRow.Fields["QuoExtSentPI"] = "0";
	}
	ObjQuotation.OpenSetAndSave(vNrid, mySelectionRow);
	
	
	
	// SS SEND WS IMP EXP
	try {
	 var oResponse: System.Net.HttpWebResponse;
	 var objRequest: System.Net.HttpWebRequest;
	 var oStream: System.IO.Stream; // Fournit une vue générique d'une séquence d'octets 
	 var oStreamReader: System.IO.StreamReader; //Implements a TextReader that reads characters from a byte strea
	
	 var strSoapEnv = new System.Text.StringBuilder();
	 var MyResult = "";
	
	 strSoapEnv.Append('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">');
	 strSoapEnv.Append('<soapenv:Header/>');
	 strSoapEnv.Append('<soapenv:Body>');
	 strSoapEnv.Append('<urn:ZCrmExportImport>');
	 strSoapEnv.Append('<Affaire>').Append(pAffair).Append('</Affaire>');
	 strSoapEnv.Append('<Offre>').Append(pOffer).Append('</Offre>');
	 strSoapEnv.Append('<Operation>').Append(pRequest).Append('</Operation>');
	 strSoapEnv.Append('</urn:ZCrmExportImport>');
	 strSoapEnv.Append('</soapenv:Body>');
	 strSoapEnv.Append('</soapenv:Envelope>');
	
	 var no_SAP_WS = false;
	 try {
	  var vUrlWebService = Session["SAP_WS"];
	 } catch (e) {
	  no_SAP_WS = true;
	 }
	 //return (strSoapEnv);
	 if (!no_SAP_WS) {
	  objRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(vUrlWebService));
	  objRequest.Method = "POST";
	  objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	  objRequest.ContentType = "text/xml; charset=utf-8";
	  var data = System.Text.Encoding.ASCII.GetBytes(strSoapEnv);
	  objRequest.ContentLength = data.Length; // Set the 'ContentLength' property of the WebRequest.
	  var stream = objRequest.GetRequestStream(); // Fournit une vue générique d'une séquence d'octets d'un Request
	  stream.Write(data, 0, data.Length); // injecter les données dans la vue générique
	  stream.Close(); // fermer la vue générique
	  oResponse = objRequest.GetResponse(); // returns a response to an Internet request
	  oStream = oResponse.GetResponseStream(); // Fournit une vue générique d'une séquence d'octets d'une Reponse
	  oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8); // reads characters from a byte stream in a particular encoding
	  var result = oStreamReader.ReadToEnd(); // récupérer toute la réponse
	
	  var objXml = new XmlDocument();
	  objXml.LoadXml(result);
	  Selligent.Library.Monitor.Tracer.Write(result);
	  MyResult = objXml.SelectSingleNode("//Result").InnerText;
	 }
	} catch (e) {
	 return e.description;
	} finally {
	 var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vMethode = "WS_Quo_Call_Exp_Imp";
	 var vXmlRequest = strSoapEnv.ToString().replace(/'/g, "''").replace(";", "&amp;");
	 MyResult = MyResult.ToString().replace(/'/g, "''").replace(";", "&amp;");
	 MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "' , '', '' , getdate())");
	 return MyResult;
	}
}