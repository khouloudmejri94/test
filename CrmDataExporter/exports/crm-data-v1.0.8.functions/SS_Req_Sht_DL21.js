function(pRef,pNRID)
{
	try
	{
	    var DBName = CurrentDatabase;
	    var sUrl = "http://srv-crmdev-bdd/ReportServer?%2fSelligent2012%2fDeclaration&rs:Command=Render&rs:format=WORD&CAL0_NRID="+pNRID
	    var objXMLHttp = new ActiveXObject('Microsoft.XMLHTTP');
	    objXMLHttp.open('get', sUrl ,false,"ra_expansion\\adm_selligent","Masao@2012");
	   
	     objXMLHttp.send();
	     var strFileName = pRef+"-DL21.doc";
	  
	     var mavariable=objXMLHttp.responseBody;
	     //var copyDest = Session["SHAREPOINT_SRV"]+"/crm/litiges/"+pRef+"/"+strFileName;
	     var copyDest = "http://srv-sharep-03/crm/litiges/"+pRef+"/"+strFileName;
	
	    try {
	        var vXmlRequest;
	        var vStr = Convert.ToBase64String(mavariable);
	        var vStream = vStr;
	        vXmlRequest = '<?xml version="1.0" encoding="utf-8"?>';
	        vXmlRequest += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
	        vXmlRequest += "<soap:Body>";
	        vXmlRequest += '<CopyIntoItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">';
	        //source
	        //vXmlRequest += "<SourceUrl>"+copySource+"</SourceUrl>";
	        vXmlRequest += "<SourceUrl>http://null</SourceUrl>";
	        //dest
	        vXmlRequest += "<DestinationUrls><string>" + copyDest + "</string></DestinationUrls>";
	        vXmlRequest += "<Fields><FieldInformation Type='File' /></Fields>";
	        vXmlRequest += "<Stream>" + vStream + "</Stream>";
	        vXmlRequest += "</CopyIntoItems>";
	        vXmlRequest += "</soap:Body>";
	        vXmlRequest += "</soap:Envelope>";
	        var vUrlWebService = "http://srv-sharep-03/_vti_bin/copy.asmx";
	        var objRequest = new ActiveXObject("Microsoft.XMLHTTP");
	        objRequest.open("POST", vUrlWebService, false, "ra_expansion\\SP_ADMIN", "4Dm1N5p@!");
	        objRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        objRequest.setRequestHeader("X-Frame-Options", "SAMEORIGIN");
	        objRequest.setRequestHeader('SOAPAction', 'http://schemas.microsoft.com/sharepoint/soap/CopyIntoItems');
	        objRequest.send(vXmlRequest);
	        var vRetour = objRequest.getAllResponseHeaders();
	    } catch (e) {
	        return "Erreur WS: " + e.description + e.message;
	    }
	 
	
	    return 'True';
	    // return vRetour;
	} catch (e) {
	    throw (e.message);
	    try {
	        
	        delete objXMLHttp;
	    } catch (e) {}
	    return "Erreur lors de la copie : " + e.description;
	}
	 
		return true;
}