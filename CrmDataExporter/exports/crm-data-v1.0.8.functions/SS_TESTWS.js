function()
{
	var vUrlWebService =Session["SAP_WS"];
	
	
	var vXmlRequest = " <soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>"
	   +"     <soapenv:Header/>"   +"     <soapenv:Body>"
	   +"     <urn:ZCrmNorms>"
	   +"     <ComCondTrans>"+"EV"+"</ComCondTrans>"
	   +"   <CommentPal>"+"X"+"</CommentPal>"
	   +"     <Zcomfinv>"+"comment"+"</Zcomfinv>"
	   +"     <Zcons>"+"test"+"</Zcons>"
	   +"     <ZfinvAssist>"+"VT"+"</ZfinvAssist>"
	   +"     <Zvcns>"+"NV"+"</Zvcns>"
	   +"     <Zzaffai>"+"716324"+"</Zzaffai>"
	   +"     <Zzangnr>"+"671909"+"</Zzangnr>"
	   +"     </urn:ZCrmNorms>"
	   +"     </soapenv:Body>"
	   +"  </soapenv:Envelope>";
	
	
	
	
	var objRequest: System.Net.HttpWebRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(vUrlWebService)); 
	objRequest.Method = "POST";
	objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN","4Dm1N5p@!" );
	objRequest.ContentType = "text/xml; charset=utf-8";
	
	var data = System.Text.Encoding.ASCII.GetBytes(vXmlRequest );
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
	
	
	/*
	
	    var objRequest =  new ActiveXObject( "Microsoft.XMLHTTP" ) ;
	    objRequest.open( "POST", vUrlWebService, false,"SP_ADMIN","4Dm1N5p@!" ); 
	    objRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	    objRequest.send(vXmlRequest);
	    var vRetour = objRequest.responseText; 
	    return vXmlRequest+"\n"+vRetour;
	
	*/
}