function WS_SP_MiseAJourStatut(vFolder,vStatus)
{
	var myXmlRequest = "";
	myXmlRequest = myXmlRequest + " <soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>"
	myXmlRequest = myXmlRequest + "  <soap:Body>"
	myXmlRequest = myXmlRequest + "   <UpdateFieldFolder xmlns='http://noz.fr/webservices/'>"
	myXmlRequest = myXmlRequest + "      <listName>crm</listName>"
	myXmlRequest = myXmlRequest + "      <folderName>"+vFolder+"</folderName>"
	myXmlRequest = myXmlRequest + "      <fieldName>Status</fieldName>"
	myXmlRequest = myXmlRequest + "      <fieldValue>"+vStatus+"</fieldValue>"
	myXmlRequest = myXmlRequest + "    </UpdateFieldFolder>"
	myXmlRequest = myXmlRequest + "  </soap:Body>"
	myXmlRequest = myXmlRequest + " </soap:Envelope>"
	
	
	try
	{
	  var strURL  =Session["SHAREPOINT_SRV"]+"/_vti_bin/crm.asmx?op=UpdateFieldFolder";
	  var objRequest =  new ActiveXObject( "Microsoft.XMLHTTP" ) ;
	  objRequest.open( "POST", strURL, false,"SP_ADMIN","4Dm1N5p@!" ); 
	  objRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	  
	  objRequest.send(myXmlRequest);
	  var strRetourWS = objRequest.responseText; 
	  return myXmlRequest + " -- " + strRetourWS;
	}
	catch(e)
	{
	  return e.description;
	}
}