function SS_App_Call_Wecom()
{
	//SS WECOM
	//NRID  : 42431976406658
	System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
	System.Net.ServicePointManager.DefaultConnectionLimit = 100;
	//var pemail = "hassen.bouzouita@ozeol.com";
	//demo key : 06b41811b7966d5f0ee527de259fff474977bedd
	//Pro key : a7fce37c1211f60f71a99ca5c03978247804a60b
	
	var corpId = "ww1328fb894530d716";       // trouvé dans l'admin WeCom
	var corpSecret = "UVXjr98UHTN6D_zetT0cSWtWN9JQbEFzoFWiAcyGYKU"; // trouvé dans la config de ton app WeCom
	
	
	var url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=" + corpId + "&corpsecret=" + corpSecret+"&debug=1";
	
	var oReq: System.Net.HttpWebRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(url));
	oReq.Timeout = 60000;
	oReq.Method = "GET";
	
	//oReq.Headers.Add("Authorization", "Basic " + password);
	//oReq.Headers.Add("Authorization", "Bearer " + password);
	//oReq.Headers["Authorization"] = $"Token {password}";
	
	//verif if exists the same
	///////Req.Headers["x-api-key"] = apiKey;
	
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
			Selligent.Library.Monitor.Tracer.Write('HAS WECOM RESPONSE' + result, false);
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