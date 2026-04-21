function(pUrl,pData)
{
	//Appel webservice check rentabilité V2
	var oReq: System.Net.HttpWebRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(pUrl));
	var oStream: System.IO.Stream;
	var oStreamReader: System.IO.StreamReader;
	oReq.Timeout = 60000;
	oReq.Method = "POST";
	oReq.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	oReq.ContentType = "text/xml; charset=utf-8";
	var data = System.Text.Encoding.ASCII.GetBytes(pData);
	oReq.ContentLength = data.Length;
	var stream = oReq.GetRequestStream();
	stream.Write(data, 0, data.Length);
	stream.Close();
	var oResponse: System.Net.HttpWebResponse = oReq.GetResponse();
	if (oResponse.StatusCode == 200) {
	 try {
	  oStream = oResponse.GetResponseStream();
	  oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8);
	  var result = oStreamReader.ReadToEnd();
	  /* exemple de resultat 
	  <soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/"><soap-env:Header/><soap-env:Body><n0:ZCrmDa11ClientResponse xmlns:n0="urn:sap-com:document:sap:soap:functions:mc-style">
	  <Result>E The affair is not sent. Please Add the crv.</Result></n0:ZCrmDa11ClientResponse>
	  </soap-env:Body></soap-env:Envelope>
	  */
	  var objXml = new XmlDocument();
	  objXml.LoadXml(result);
	  Selligent.Library.Monitor.Tracer.Write(result);
	  return objXml.SelectSingleNode("//Result").InnerText;
	 } finally {
	  oResponse.Close();
	  oStreamReader.Close();
	 }
	} else {
	 try {
	  Selligent.Library.Monitor.Tracer.Write("GetResponse " + oResponse.StatusCode);
	  oStream = oResponse.GetResponseStream();
	  oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8);
	  var result = oStreamReader.ReadToEnd();
	  Selligent.Library.Monitor.Tracer.Write("result " + result);
	 } finally {
	  oResponse.Close();
	  oStreamReader.Close();
	 }
	 result = 'Erreur';
	}
	return result;
}