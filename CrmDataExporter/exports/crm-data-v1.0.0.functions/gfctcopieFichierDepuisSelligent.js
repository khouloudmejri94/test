function _gfctcopieFichierDepuisSelligent(NRIDModele,sRepertoireDestination)
{
	alert('1'); 
	
	try
	  {
	   //var objXMLHttp = new ActiveXObject('Microsoft.XMLHTTP');
	   var objXMLHttp = new XMLHttpRequest();
	   objXMLHttp.open('Post', top.MyApp.location.protocol + "//" + top.MyApp.location.hostname + top.MyApp.MySetting.RootPath + "dlgDialogBox/dlgDownloadDocument/Download.aspx?DocNRID=" + NRIDModele + "&DoclnsNRID=&SID=" + top.MyApp.AppSetting.sstrSID + "&AppUrl=http://octave/selligentxat/&ToDownload=Document&bEasyDownload=true" ,false);
	   objXMLHttp.send();
	   var MyFileName = top.MyApp.UserSetting.User.Initials +'-'+ objXMLHttp.getResponseHeader('DocFileName');
	   var strFileName = sRepertoireDestination + MyFileName;
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
	   try
	   {
	    top.MyApp.OpenDlg("Alert",["Erreur","Erreur de creation de fichier : "+ e.message]);
	    objStream.Close();
	    delete objXMLHttp;   
	   }
	   catch(e){}
	   return "Erreur lors de la copie : " + e.description;
	  }
	  return strFileName;
	
	
	oReq.open("POST", vUrlWebService , [false,"SP_ADMIN", "4Dm"] );
	oReq.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	oReq.send(myXmlRequest );
	alert(oReq.responseText)
}