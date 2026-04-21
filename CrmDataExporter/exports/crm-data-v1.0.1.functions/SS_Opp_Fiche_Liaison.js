function SS_Opp_Fiche_Liaison(do0_nrid,dc0_nrid,pRef,offRef)
{
	try {
	    var DBName = CurrentDatabase;
	    var sUrl = "http://srv-crmdev-bdd/ReportServer?%2fSelligent2012%2fFiche_Liaison&rs:Command=Render&rs:format=PDF&DO0_NRID="+do0_nrid+"&DC0_NRID="+dc0_nrid
	    var objXMLHttp = new ActiveXObject('Microsoft.XMLHTTP');
	    objXMLHttp.open('get', sUrl, false, "ra_expansion\\adm_selligent", "Masao@2012");
	    objXMLHttp.send();
	    var strFileName = "Fiche_Liaison" + offRef + ".pdf";
	    var mavariable = objXMLHttp.responseBody;
	    //var copyDest = Session["SHAREPOINT_SRV"]+"/crm/affaires/" + pRef + "/" + strFileName;
	
	    //var copyDest = Session["SHAREPOINT_SRV"]+"/crm/affaires/" + pRef + "/" + strFileName; (RLM 20.06.2016 - Comment pour probleme  avec .noz.local)
	    var copyDest = "http://srv-sharep-03/crm/affaires/" + pRef + "/" + strFileName;    
	
	  
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
	} catch (e) {
	    throw (e.message);
	    try {
	        //objStream.Close();
	        delete objXMLHttp;
	    } catch (e) {}
	    return "Erreur lors de la copie : " + e.description;
	}
		return true;
}