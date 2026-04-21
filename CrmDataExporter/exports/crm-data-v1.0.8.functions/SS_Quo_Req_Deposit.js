//[Start - 40912181486148 - START]
function(pAffair,pOffer,pDateDemDep,pDetailsDemDep)
{
//[Start - 40912181486148 - END]
//[Code - 40902181486148 - START]
	// SS_Quo_Req_Deposit  - server déposit
	var oResponse: System.Net.HttpWebResponse ;
	var objRequest: System.Net.HttpWebRequest;
	var oStream: System.IO.Stream; // Fournit une vue générique d'une séquence d'octets 
	var oStreamReader: System.IO.StreamReader; //Implements a TextReader that reads characters from a byte stream 
	var objSQL =CreateSelligentObject("SqlHelper", CurrentSessionID);
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
	strSoapEnv.Append('<urn:ZCrmDemDep>');
	strSoapEnv.Append('<Affaire>').Append(pAffair).Append('</Affaire>');
	strSoapEnv.Append('<Offre>').Append(pOffer).Append('</Offre>');
	strSoapEnv.Append('<Zdade>').Append(pDateDemDep).Append('</Zdade>');
	strSoapEnv.Append('<Zdede>').Append('X').Append('</Zdede>');
	strSoapEnv.Append('<Zdtdp>').Append(pDetailsDemDep).Append('</Zdtdp>');
	strSoapEnv.Append('<Zdatedispsc>').Append('').Append('</Zdatedispsc>');
	strSoapEnv.Append('</urn:ZCrmDemDep>');
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
	    var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCrmDemDep', '" + strSoapEnv.ToString().replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '', getdate()) ";
	    var vResReq = objSQL.ExecuteSql(vReqInsertLog);
	    oStreamReader.Close();
	    //return result ;
	    objSQL.Dispose();
	    FreeSelligentObject(objSQL);
	}
	
	var objXml = new XmlDocument();
	objXml.LoadXml(result);
	return objXml.SelectSingleNode("//Result").InnerText;
	
	
	//[Code - 40902181486148 - END]
}