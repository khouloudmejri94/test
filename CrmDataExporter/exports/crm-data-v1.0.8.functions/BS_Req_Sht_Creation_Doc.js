function(pReqNRID,pDocNRID,pSocCAE)
{
	try {
	    // Chemin de destination Document fusionné
	    var vDirDest = 'C:\\inetpub\\wwwroot\\DocFusion\\';
	    var vDocDest = '';
	    var vRefLitige = '';
	    var objDoc = CreateSelligentObject('DocumentManagement', CurrentSessionID, false);
	    var objList = CreateSelligentObject("SelectionList", CurrentSessionID);
	    var arrDocNRID = pDocNRID.split('<_cut_/>');
	    var nCountDoc = 0;
	
	    // Création du/des document(s) fusionné(s)
	    for (var i = 0; i < arrDocNRID.length; i++) {
	        objDoc.Open(arrDocNRID[i]);
	         //ThrowMessage("Erreur",arrDocNRID[i]);
	        
	        var InstNRID = objDoc.NewInstance('Req', pReqNRID);
	         // ThrowMessage("Erreur",InstNRID);
	        var MySelRow: SelectionRow = new SelectionRow();
	        MySelRow.Fields['DocContent'] = objDoc.Merge(InstNRID, true);
	        MySelRow.Fields['DocTypeNbr'] = 42;
	        objDoc.ConvertToAdHoc(InstNRID, MySelRow);
	
	        var MyXmlDoc = InitXml(objDoc.GetXml("AllFields"));
	        var nDocNRID = GetItemValue("DocNRID", MyXmlDoc);
	        //Génération du nom du fichier
	        var vSQL = "select top 1 cal0.xref_interne + ' ' + sy0_col.remarks + ' ' + cal0.company_name + ' ' + CONVERT(VARCHAR(8), GETDATE(), 112), cal0.xref_interne from sysadm.cal0 cal0 inner join sysadm.dm0 dm0 on dm0.nrid = " + arrDocNRID[i] + " inner join sysadm.sy0_col sy0_col on sy0_col.logical_name = dm0.key_words where cal0.nrid = " + pReqNRID;
	        objList.Open(0, -1, vSQL);
	        var MyXml = objList.GetXml("AllFields");
	        var MyXmlDoc = InitXml(MyXml);
	        var MyNodes = FindItem("Flds", MyXmlDoc, true);
	        if (MyNodes.Count > 0) {
	            vDocDest = GetItemValue("Unknown", MyNodes[0]);
	            vRefLitige = GetItemValue("ReqExtRefInterne", MyNodes[0]);
	        } else {
	            vDocDest = '';
	        }
	
	//CBA  #998 - Nom des courriers litiges CRM 
	
	          vDocDest = vDocDest.replace("/", "");        
	          vDocDest = vDocDest.replace(".", ""); 
	          vDocDest = vDocDest.replace("&", "");    
	
	          vDocDest += '.doc'
	          
	          if( (pSocCAE =='3501') ||(pSocCAE =='3502') ||(pSocCAE =='3503') ||(pSocCAE =='3504') ||(pSocCAE =='3505') ||(pSocCAE =='3506') ||(pSocCAE =='3507')||(pSocCAE =='4000') ){
	               vDocDest = vDocDest.replace("Demande d'avoir", "Credit note request");
	               vDocDest = vDocDest.replace("Courrier MAD", "Letter MAD");
	               vDocDest = vDocDest.replace("Relance", "Reminder");
	               vDocDest = vDocDest.replace("Mise en demeure", "Formal demand");
	               vDocDest = vDocDest.replace("Courrier", "Letter");
	          }
	//CBA  #998 - Nom des courriers litiges CRM 
	
	
	        // Transfert du fichier fusionné dans vDirDest puis dans SP
	        var vFileName = BS_SRM_CopyDoc(nDocNRID, vDirDest, vDocDest);
	        var vFileStream = BS_SRM_CopyDoc2(nDocNRID, vDirDest, vDocDest);
	     
	
	        //var  myclass = new SPNOZ();
	        //var res = myclass.CpyToSP("http://localhost/DocFusion/"+vFileName , Session["SHAREPOINT_SRV"]+"/crm/litiges/"+vRefLitige+"/"+vFileName, "adm_selligent", "Masao@2012", "ra_expansion");
	
	        // **************************************************
	        var copyDest = "http://srv-sharep-03/crm/litiges/" + vRefLitige + "/" + vFileName;
	        //var copyDest = Session["SHAREPOINT_SRV"] + "/crm/litiges/" + vRefLitige + "/" + vFileName;
	
	
	        try {
	            var vXmlRequest;
	            //var vStr = Convert.ToBase64String(vFileStream);
	            var vStream = vFileStream ;
	          
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
	
	           // var vRetour = objRequest.getAllResponseHeaders();
	            var vRetour = objRequest.responseText;
	               
	
	        } catch (e) {
	            return "Erreur WS: " + e.description + e.message;
	        }
	
	        // ***************************************************
	
	        try {
	            //System.IO.File.Delete("C:/inetpub/wwwroot/DocFusion/" + vFileName);
	        } catch (e) {
	            ThrowMessage("Erreur", e.message);
	        }
	        nCountDoc = nCountDoc + 1;
	    }
	
	    delete objDoc;
	    delete objList;
	    return nCountDoc;
	} catch (e) {
	    delete objDoc;
	    delete objList;
	    ThrowMessage("Erreur", "BS_Req_sht_Creation_DOC" + e.message);
	}
}