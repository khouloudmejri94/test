function(pNrid,pNsiret,pPays)
{
	var oResponse: System.Net.HttpWebResponse ;
	
	
	
	var objRequest: System.Net.HttpWebRequest;
	
	
	
	var oStream: System.IO.Stream; // Fournit une vue générique d'une séquence d'octets 
	
	
	
	var oStreamReader: System.IO.StreamReader; //Implements a TextReader that reads characters from a byte stream 
	
	
	
	var objSQL =CreateSelligentObject("SqlHelper", CurrentSessionID);
	
	
	
	//var vPays = CurrentRecord["CpyAddr1Country"];
	
	
	
	//var vSiret = CurrentRecord["CpyExtSiret"];
	
	
	
	var no_SAP_WS = false;
	
	
	
	try {
	
	
	
	    var vUrlWebService = Session["SAP_WS"];
	
	
	
	} catch (e) {
	
	
	
	    no_SAP_WS = true;
	
	
	
	}
	
	
	
	var strSoapEnv = new System.Text.StringBuilder();
	
	
	
	var vXmlRequest1 = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>";
	
	
	
	strSoapEnv.Append(vXmlRequest1)
	
	
	
	strSoapEnv.Append('<soapenv:Header/>');
	
	
	
	strSoapEnv.Append('<soapenv:Body>');
	
	
	
	strSoapEnv.Append('<urn:ZCrmFrnExcl>');
	
	
	
	strSoapEnv.Append('<IvNrid>').Append(pNrid).Append('</IvNrid>');
	
	strSoapEnv.Append('<IvNsiren>').Append(pNsiret.substring(0,9)).Append('</IvNsiren>');
	
	strSoapEnv.Append('<IvNsiret>').Append(pNsiret.substring(0,14)).Append('</IvNsiret>');
	
	strSoapEnv.Append('<IvPays>').Append(pPays.substring(0,2)).Append('</IvPays>');
	
	
	
	strSoapEnv.Append('</urn:ZCrmFrnExcl>');
	
	
	
	strSoapEnv.Append('</soapenv:Body>');
	
	
	
	strSoapEnv.Append('</soapenv:Envelope>');
	
	
	
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
	
	
	
	    var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCrmFrnExcl', '" + strSoapEnv.ToString().replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '', getdate()) ";
	
	
	
	    var vResReq = objSQL.ExecuteSql(vReqInsertLog);
	
	
	
	    //Selligent.Library.Monitor.Tracer.Write("HAAAAAAAAAAAAAAAAAAAAAS Envoi ZCrmFrnFr V9", false);
	
	
	
	    //Selligent.Library.Monitor.Tracer.Write(result, false);
	
	
	
	    oStreamReader.Close();
	
	
	
	    //return result ;
	
	
	
	    objSQL.Dispose();
	
	
	
	    FreeSelligentObject(objSQL);
	
	
	
	}
	
	
	
	//return result;
	
	
	
	var objXml = new XmlDocument();
	
	
	
	objXml.LoadXml(result);
	
	
	
	return objXml.SelectSingleNode("//Result").InnerText;
	
	
	
	//var vToken = objXml.SelectSingleNode("//return").InnerText;
	
	
	
	//Selligent.Library.Monitor.Tracer.Write(result);
	
	
	
	//return result;
}