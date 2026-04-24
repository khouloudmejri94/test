function BS_SRM_CopyDoc2(pDocNRID,pvDirDest,pvDocDest)
{
	/*
	try 
	{ 
	
	  var objXMLHttp = new ActiveXObject('Microsoft.XMLHTTP'); 
	
	     //return "https://crm2012.noz.local/srm8/dlgDialogBox/dlgDownloadDocument/Download.aspx?DocNRID=" + pDocNRID + "&DoclnsNRID=&SID=" + CurrentSessionID + "&ToDownload=Document&bEasyDownload=true";
	
	  objXMLHttp.open('Post', "https://crm2012.noz.local/srm8/dlgDialogBox/dlgDownloadDocument/Download.aspx?DocNRID=" + pDocNRID + "&DoclnsNRID=&SID=" + CurrentSessionID + "&ToDownload=Document&bEasyDownload=true" ,false,"ra_expansion\\adm_selligent","Masao@2012"); 
	
	  objXMLHttp.send(); 
	  
	     var ret = objXMLHttp.responseBody;
	  
	  delete objXMLHttp; 
	 }
	catch(e)
	{ 
	  var errMsg="Erreur fonction BS_SRM_CopyDoc lors de la copie : " + e.description;
	  return errMsg;
	  try 
	  { 
	  
	    delete objXMLHttp;    
	  } 
	  catch(e)
	  {
	    return e
	  } 
	} 
	//Ne pas modifier car utilisé par raccourci litige : création
	return ret;
	*/
	
	var objSQL =CreateSelligentObject("SqlHelper", CurrentSessionID); 
	var objXmlRes = new ActiveXObject("Microsoft.XMLDOM");
	var vSQL = "SELECT memo FROM sysadm.dm0 WHERE nrid =" +pDocNRID;
	var vResReq = objSQL.ExecuteSql(vSQL);
	objXmlRes.async=false;
	objXmlRes.loadXML(vResReq);
	var objNodes = objXmlRes.getElementsByTagName("Flds");
	var objNodesTmp=objNodes[0].childNodes;
	var vStream = objNodesTmp[0].getAttribute("Val");
	
	return vStream;
}