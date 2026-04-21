function(pToken,pExtUserID)
{
	//SS_App_ExternalContact_Get_Wecom
	// NRID : 42931485187154
	// Params : pToken;pExtUserID
	System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
	System.Net.ServicePointManager.DefaultConnectionLimit = 100;
	
	var url = "https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get?access_token=" + pToken + "&external_userid=" + pExtUserID;
	
	var oReq: System.Net.HttpWebRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(url));
	oReq.Timeout = 60000;
	oReq.Method = "GET";
	
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
	  //Selligent.Library.Monitor.Tracer.Write('HAS WECOM RESPONSE' + result, false);
	  return result;
	  // var Doc =  arrJson.Item['message'] ;
	  //Selligent.Library.Monitor.Tracer.Write(result);
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