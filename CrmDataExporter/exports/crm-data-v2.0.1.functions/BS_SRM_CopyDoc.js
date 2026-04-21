function BS_SRM_CopyDoc(pDocNRID,pvDirDest,pvDocDest)
{
	try 
	{ 
	
	  var objXMLHttp = new ActiveXObject('Microsoft.XMLHTTP'); 
	  objXMLHttp.open('POST', "https://crm2012.noz.local/srm8/dlgDialogBox/dlgDownloadDocument/Download.aspx?DocNRID=" + pDocNRID + "&DoclnsNRID=&SID=" + CurrentSessionID + "&ToDownload=Document&bEasyDownload=true" ,false,"ra_expansion\\adm_selligent","Masao@2012"); 
	
	  objXMLHttp.send(); 
	  var MyFileName = objXMLHttp.getResponseHeader('DocFileName'); 
	
	  if(pvDocDest=="")
	  {
	    var strFileName = pvDirDest + MyFileName; 
	    var vFileName = MyFileName;
	  }
	  else
	  {
	    var strFileName = pvDirDest + pvDocDest;
	    var vFileName = pvDocDest;
	  }
	  
	  var objStream = new ActiveXObject('ADODB.Stream'); 
	  objStream.Type = 1; 
	  objStream.Open(); 
	  objStream.Write(objXMLHttp.responseBody); 
	  objStream.SaveToFile (strFileName, 2); 
	  objStream.Close(); 
	  delete objXMLHttp; 
	  delete objStream; 
	}
	catch(e)
	{ 
	  var errMsg="Erreur fonction BS_SRM_CopyDoc lors de la copie : " + e.description;
	  return errMsg;
	  try 
	  { 
	    objStream.Close(); 
	    delete objXMLHttp;    
	  } 
	  catch(e)
	  {
	    return e
	  } 
	} 
	//Ne pas modifier car utilisé par raccourci litige : création
	return vFileName ;
}