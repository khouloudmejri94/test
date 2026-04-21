function SS_Acn_AppelComunik(pURL)
{
	System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
	var password = "f0f9fec79042e18cdca60ad6909f456d784770d7";
	var oReq: System.Net.HttpWebRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(pURL));
	///////oReq.Timeout = 60000;
	oReq.Method = "GET";
	
	
	
	//oReq.Headers.Add("Authorization", "Basic " + password);
	//oReq.Headers.Add("Authorization", "Bearer " + password);
	//oReq.Headers["Authorization"] = $"Token {password}";
	oReq.Headers["x-api-key"] = password;
	
	
	oReq.ContentType = "application/json";
	var oResponse : System.Net.HttpWebResponse = oReq.GetResponse();
	var result = "";
	
	
	if (oResponse.StatusCode == 200)
	{
	 var oStream : System.IO.Stream;
	 var oStreamReader : System.IO.StreamReader;
	 try
	 {
	  oStream = oResponse.GetResponseStream();
	  oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8);
	  var result = oStreamReader.ReadToEnd();
	  
	  return result ;
	
	 // var Doc =  arrJson.Item['message'] ;
	
	// {"code":1,"message":"Appel lanc\u00e9 vers 0033612058338 \/ num\u00e9ro de poste : 614"}
	  Selligent.Library.Monitor.Tracer.Write(result);
	 }
	 finally
	 {
	  oResponse.Close();
	  oStreamReader.Close();
	 }
	}
	else
	{
	 Selligent.Library.Monitor.Tracer.Write("GetResponse " + oResponse.StatusCode);
	 result = 'Erreur' ;
	}
	
	
	return result ;
}