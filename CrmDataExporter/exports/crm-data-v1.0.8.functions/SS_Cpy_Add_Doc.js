function(nCpyNRID,pFileName,pFileExtension,pFileContent)
{
	try
	 {
	 var MyDocMgmt = CreateSelligentObject("DocumentManagement", CurrentSessionID, false); 
	 var myCpy=CreateSelligentObject("Company",CurrentSessionID,true); 
	 Selligent.Library.Monitor.Tracer.Write("serachtheLofFileIntheServer : "+   pFileContent, false); 
	//return nCpyNRID;
	 myCpy.Open(nCpyNRID);
	 var DocContentBytes : System.Byte[] ;
	 DocContentBytes = Convert.FromBase64String(pFileContent);
	 var rowDoc : SelectionRow = new SelectionRow();
	 rowDoc.Fields["DocContent"]  = DocContentBytes;
	 rowDoc.Fields["DocFileSize"] = DocContentBytes.Length; 
	 rowDoc.Fields["DocTypeNbr"]  = 42;
	 rowDoc.Fields["DocFileName"] = pFileName; //p_ref+".pdf";
	 rowDoc.Fields["DocTitle"] = "CompAccessReq";
	 rowDoc.Fields["DocFileExtension"] = pFileExtension;
	 rowDoc.Fields["DocAuthor"] = CurrentUserName ;
	 rowDoc.Fields["DocOwner"]  =  CurrentUserName ;
	 var res = myCpy.InsertAdHoc(rowDoc);
	 delete MyDocMgmt ; 
	 return res;
	 }
	 catch(e) 
	 { 
	    return "Erreur " + e.desciption
	    }
}