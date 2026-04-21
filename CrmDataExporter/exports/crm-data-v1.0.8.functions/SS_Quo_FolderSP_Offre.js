function(p_AffNum,p_OffNum)
{
	var vDossier = p_AffNum+"/"+p_OffNum;
	
	var myXmlRequest = "";
	myXmlRequest = myXmlRequest + "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>"
	myXmlRequest = myXmlRequest + "  <soap:Body>"
	myXmlRequest = myXmlRequest + "    <AddFolder xmlns='http://noz.fr/webservices/'>"
	myXmlRequest = myXmlRequest + "      <listName>CRM</listName>"
	myXmlRequest = myXmlRequest + "      <folderURL></folderURL>"
	myXmlRequest = myXmlRequest + "      <folderName>Affaires/" + vDossier + "</folderName>"
	myXmlRequest = myXmlRequest + "    </AddFolder>"
	myXmlRequest = myXmlRequest + "  </soap:Body>"
	myXmlRequest = myXmlRequest + "</soap:Envelope>"
	
	
	try
	{
	  var strURL  =Session["SHAREPOINT_SRV"]+"/_vti_bin/CRM.asmx?op=AddFolder";
	  var objRequest =  new ActiveXObject( "Microsoft.XMLHTTP" ) ;
	  objRequest.open( "POST", strURL, false,"SP_ADMIN","4Dm1N5p@!" ); 
	  objRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	  
	  objRequest.send(myXmlRequest);
	  var strRetourWS = objRequest.responseText; 
	  return strRetourWS;
	}
	catch(e)
	{
	  return e.description;
	}
}