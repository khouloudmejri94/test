function(pToken,pUserID)
{
	//SS_App_ConvertContact_Wecom
	//NRID  : 42331976586836
	//Params: pToken;pUserID
	/********************************************************/
	
	System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
	System.Net.ServicePointManager.DefaultConnectionLimit = 100;
	var vRetour = "";
	var corpId = "ww1328fb894530d716";       // trouvé dans l'admin WeCom
	var url = "https://qyapi.weixin.qq.com/cgi-bin/user/convert_to_openid?access_token=" + pToken +"&debug=1";
	
	var corpId = "ww1328fb894530d716";       // trouvé dans l'admin WeCom
	var vDepartment = [1];
	
	// var vUserID = "12345678912346";
	// var vName = "Hichem Bouzaiene";
	// var vMobile = "0021656105889";
	// var vEmail = "hichem.bouzaiene@ozeol.com";
	// var vPosition = "CRM Developer";
	
	var jon = new System.Text.StringBuilder();
	jon.Append('{  "userid": "');
	jon.Append(pUserID);
	jon.Append('"  }');
	vRetour = jon;
	Selligent.Library.Monitor.Tracer.Write(jon);
	
	var objRequest: System.Net.HttpWebRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(url)); 
	objRequest.Method = "POST";
	//////objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN","4Dm1N5p@!" );
	objRequest.ContentType = "application/json";
	
	var data = System.Text.Encoding.ASCII.GetBytes(jon);
	objRequest.ContentLength = data.Length;
	var stream = objRequest.GetRequestStream();
	stream.Write(data, 0, data.Length);
	stream.Close();
	var oResponse : System.Net.HttpWebResponse = objRequest.GetResponse();
	
	var oStream : System.IO.Stream;
	var oStreamReader : System.IO.StreamReader;
	oStream = oResponse.GetResponseStream();
	oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8);
	var result = oStreamReader.ReadToEnd();
	oStreamReader.Close();
	return result ;
}