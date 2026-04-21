function(pToken,pUserID,pName,pMobile,pEmail,pPosition)
{
	//SS_App_AddContact_Wecom
	//NRID  : 42992076586836
	//Params: pToken;pUserID;pName;pMobile;pEmail;pPosition
	/********************************************************/
	
	System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
	System.Net.ServicePointManager.DefaultConnectionLimit = 100;
	var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vRetour = "";
	var corpId = "ww1328fb894530d716";       // trouvé dans l'admin WeCom
	var url = "https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token=" + pToken +"&debug=1";
	
	//vUserID,vName,vMobile,vEmail,vPosition
	
	var corpId = "ww1328fb894530d716";       // trouvé dans l'admin WeCom
	var vDepartment = [1];
	
	// var vUserID = "12345678912346";
	// var vName = "Hassen Bouzouita";
	// var vMobile = "0021656105889";
	// var vEmail = "hichem.bouzaiene@ozeol.com";
	// var vPosition = "DEV Manager";
	
	var jon = new System.Text.StringBuilder();
	jon.Append('{  "userid": "');
	jon.Append(pUserID);
	jon.Append('",  "name": "');
	jon.Append(pName);
	jon.Append('",  "mobile": "');
	jon.Append(pMobile);
	jon.Append('",  "department": "');
	jon.Append(vDepartment);
	jon.Append('",  "email": "');
	jon.Append(pEmail);
	jon.Append('",  "position": "');
	jon.Append(pPosition);
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
	
	//Insert in log table
	/* var vApiAction = "AddContact";
	var vRequestPayload = jon;
	var vResponsePayload = result;
	var vStatusCode = oResponse.StatusCode;
	var vErrorCode = "";
	var vErrorMessage = "";
	var vCRMContactID = "";
	var vExternalUserID = "";
	var vUserID = "";
	var vTimestampUTC = "";
	var vCorrelationID = ""; */
	
	////////////MyQryObj.ExecuteSql("insert into xlog_wecom (ApiAction, RequestPayload, ResponsePayload, StatusCode, ErrorCode, ErrorMessage, CRMContactID, ExternalUserID, UserID, TimestampUTC, CorrelationID) values('" + vApiAction + "', '" + vRequestPayload + "', '" + vResponsePayload + "', '" + vStatusCode + "', '" + vErrorCode + "', '" + vErrorMessage + "', '" + vCRMContactID + "', '" + vExternalUserID + "', '" + vUserID + "', getdate(), '" + vCorrelationID + "')");
	//clear object
	MyQryObj.Dispose();
	FreeSelligentObject(MyQryObj);
	//return
	return result ;
}