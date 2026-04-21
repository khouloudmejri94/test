function(p_ref,pFileContent)
{
	//try
	//{
	 var MyDocMgmt     = CreateSelligentObject("DocumentManagement", CurrentSessionID, false);
	 var objReq = CreateSelligentObject("SelectionList", CurrentSessionID); 
	 var myQuo=CreateSelligentObject("Quotation",CurrentSessionID,true); 
	
	Selligent.Library.Monitor.Tracer.Write("2XMLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL22 : "+   pFileContent, false);
	
	 var nQuoNRID = "";
	 try
	 {
	  var vSQL = "select nrid from dc0 dc0 where dc0.vos_ref = '" + p_ref+ "'";
	  objReq.Open(0,-1, vSQL);
	  var vXmlRes = objReq.GetXml("AllFields");
	  var oXmlRes = InitXml(vXmlRes);
	  var oNodes = FindItem("Flds", oXmlRes, true);
	  if(oNodes.Count > 0)
	  {
	    nQuoNRID = GetItemValue("QuoNRID",oNodes[0]);
	  }
	  else
	  {
	   return "Cette référence n'existe pas dans le CRM"
	  } 
	 }
	 catch(e) { return "Erreur " + e.desciption}
	 myQuo.Open(nQuoNRID);
	
	 var DocContentBytes : System.Byte[] ;
	/*
	 var XmlDocFileContent : XmlDocument=new XmlDocument();
	 XmlDocFileContent.LoadXml(pFileContent);
	
	 var MyNode:XmlNode=XmlDocFileContent.SelectSingleNode("//DOCCONTENT");
	 Selligent.Library.Monitor.Tracer.Write("XMLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL : "+   MyNode.InnerText, false);
	
	 DocContentBytes = Convert.FromBase64String(MyNode.InnerText);
	
	 var MyNodeName :XmlNode=XmlDocFileContent.SelectSingleNode("//NAME");
	 var MyNomFichier = MyNodeName.InnerText;
	 
	 var MyNodeTitle :XmlNode=XmlDocFileContent.SelectSingleNode("//TITLE");
	 var MyTitle = MyNodeTitle.InnerText;
	 
	 var MyNodeExtension :XmlNode=XmlDocFileContent.SelectSingleNode("//EXTENSION");
	 var MyExtension = MyNodeExtension.InnerText;
	*/
	
	 DocContentBytes = Convert.FromBase64String(pFileContent);
	
	 var rowDoc : SelectionRow = new SelectionRow();
	 rowDoc.Fields["DocContent"]  = DocContentBytes ;
	 rowDoc.Fields["DocFileSize"] = DocContentBytes.Length; 
	 rowDoc.Fields["DocTypeNbr"]  = 42;
	 rowDoc.Fields["DocFileName"] = p_ref+".pdf";
	 rowDoc.Fields["DocTitle"] = "MyTitle";
	 rowDoc.Fields["DocFileExtension"] = "PDF";
	 rowDoc.Fields["DocAuthor"] = CurrentUserName ;
	 rowDoc.Fields["DocOwner"]  =  CurrentUserName ;
	 //MyDocMgmt.InsertAdHoc("Quo", nQuoNRID, rowDoc);
	 myQuo.InsertAdHoc(rowDoc);
	
	/*
	 var MyXml = MyDocMgmt.GetXml(XmlOptions.NotNullFields);
	 var MyUtil = InitXml(MyXml);
	 var NewDocNRID = GetItemValue("DocNRID", MyUtil );
	*/
	 delete MyDocMgmt ;
	 delete objReq ; 
	 return true;
	/*
	}
	catch(e)
	{
	 delete MyDocMgmt ;
	 delete objReq ; 
	 return e.decription
	} 
	finally
	{
	 delete MyDocMgmt ;
	 delete objReq ; 
	}
	*/
}