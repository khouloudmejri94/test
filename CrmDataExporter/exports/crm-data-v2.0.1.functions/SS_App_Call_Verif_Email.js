function __SS_App_Call_Verif_Email(pemail)
{
	System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
	System.Net.ServicePointManager.DefaultConnectionLimit = 100;
	//var pemail = "hassen.bouzouita@ozeol.com";
	//demo key : 06b41811b7966d5f0ee527de259fff474977bedd
	//Pro key : a7fce37c1211f60f71a99ca5c03978247804a60b
	
	var apiKey = "a7fce37c1211f60f71a99ca5c03978247804a60b";
	var url = "https://api.hunter.io/v2/email-verifier?email=" + pemail + "&api_key=" + apiKey;
	var oReq: System.Net.HttpWebRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(url));
	///////oReq.Timeout = 60000;
	oReq.Method = "GET";
	
	//oReq.Headers.Add("Authorization", "Basic " + password);
	//oReq.Headers.Add("Authorization", "Bearer " + password);
	//oReq.Headers["Authorization"] = $"Token {password}";
	oReq.Headers["x-api-key"] = apiKey;
	
	oReq.ContentType = "application/json";
	var oResponse: System.Net.HttpWebResponse = oReq.GetResponse();
	var result = "";
	
	if (oResponse.StatusCode == 200) {
	 var oStream: System.IO.Stream;
	 var oStreamReader: System.IO.StreamReader;
	 try {
	  oStream = oResponse.GetResponseStream();
	  oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8);
	  var result = oStreamReader.ReadToEnd();
	  return result;
	  // var Doc =  arrJson.Item['message'] ;
	  //Selligent.Library.Monitor.Tracer.Write(result);
	  Selligent.Library.Monitor.Tracer.Write('HAS HUNTER RESULT' + result, false);
	 } finally {
	    if (oStreamReader != null) {
	        oStreamReader.Close();
	        oStreamReader.Dispose();
	    }
	    if (oStream != null) {
	        oStream.Close();
	        oStream.Dispose();
	    }
	    if (oResponse != null) {
	        oResponse.Close();
	        oResponse.Dispose();
	    }
	 }
	} else {
	 Selligent.Library.Monitor.Tracer.Write("GetResponse " + oResponse.StatusCode);
	 result = 'Erreur';
	}
	
	return result;
}