function BS_CDM_CallPostWS(ptabListeReq,pvMethode,pvNameSpace)
{
	var vXmlRequest, vReqTmp, objXmlRes, nFullCount, objNodes, vResReq, objNodesTmp, vTagName, vTagVal, vRetour, vReqInsertLog, nbCol, vReqTmp, vLogCom, objSQL;
	objSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	objXmlRes = new ActiveXObject("Microsoft.XMLDOM");
	vLogCom = "";
	vXmlRequest = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='" + pvNameSpace + "'>";
	vXmlRequest = vXmlRequest + "<soapenv:Header/>";
	vXmlRequest = vXmlRequest + "<soapenv:Body>";
	vXmlRequest = vXmlRequest + "<urn:" + pvMethode + ">";
	
	
	if (typeof (ptabListeReq) == "string") {
	 vReqTmp = ptabListeReq;
	 ptabListeReq = [];
	 ptabListeReq["notab"] = vReqTmp
	}
	
	
	for (var vTab in ptabListeReq) {
	 vReqTmp = ptabListeReq[vTab];
	 vLogCom += "\n vReqTmp : " + vReqTmp;
	 if (vTab != "notab" && vTab != "ZCrmDemBk") {
	  vXmlRequest = vXmlRequest + "<" + vTab + ">";
	 }
	 //objXmlRes = top.MyApp.fctGetQryResult( vReqTmp , "true" , 0 , -1 )
	 vResReq = objSQL.ExecuteSql(vReqTmp);
	
	
	
	 vLogCom += "\n res req KELLLLLLLLLLLLLLL : " + vTab + "  : " + vResReq //+"------------------------------" + vReqTmp + "-------------------------------";
	
	
	 Selligent.Library.Monitor.Tracer.Write(vLogCom, false);
	 //throw vLogCom;
	
	
	 objXmlRes.async = false;
	 objXmlRes.loadXML(vResReq);
	 vLogCom += "\n format xml : " + vTab + "  : " + objXmlRes.xml;
	 objNodes = objXmlRes.getElementsByTagName("Flds");
	 nFullCount = objNodes.length;
	
	
	 vLogCom += "\n nb lig : " + nFullCount;
	 vLogCom += "\n objNodes[0]: " + objNodes[0];
	
	
	 // return vReqTmp +"\n\n"+objXmlRes.xml;
	 for (var j = 0; j < nFullCount; j++) {
	  if (pvMethode != "ZCrmTaquet" && pvMethode != "Echant" && pvMethode != "Z_CRM_DEM_BK" && pvMethode != "ZCrmEchantillon" && pvMethode != "ZCrmDemBk") {
	   vXmlRequest = vXmlRequest + "<item>";
	  }
	  objNodesTmp = objNodes[j].childNodes;
	  nbCol = objNodesTmp.length;
	  vLogCom += "\n nb col: " + nbCol;
	  for (var i = 0; i < nbCol; i++) {
	   vTagName = objNodesTmp[i].tagName;
	   vLogCom += "\n vTagName : " + vTagName;
	   if (vTagName.indexOf("Unknown") != 0) {
	    vTagVal = objNodesTmp[i].getAttribute("Val");
	    //        vXmlRequest = vXmlRequest + "<"+vTagName+">"+vTagVal+"</"+vTagName+">";
	    vXmlRequest = vXmlRequest + "<" + vTagName + ">" + vTagVal.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</" + vTagName + ">";
	   }
	  }
	  if (pvMethode != "ZCrmTaquet" && pvMethode != "Echant" && pvMethode != "Z_CRM_DEM_BK" && pvMethode != "ZCrmEchantillon" && pvMethode != "ZCrmDemBk") {
	   vXmlRequest = vXmlRequest + "</item>";
	  }
	 }
	 if (vTab != "notab" && vTab != "ZCrmDemBk") {
	  vXmlRequest = vXmlRequest + "</" + vTab + ">";
	 }
	}
	vXmlRequest = vXmlRequest + "</urn:" + pvMethode + ">";
	vXmlRequest = vXmlRequest + "</soapenv:Body>";
	vXmlRequest = vXmlRequest + "</soapenv:Envelope>";
	
	
	Selligent.Library.Monitor.Tracer.Write('KELLLLLLLLLLLLLLLLLLLLLLLLLL vXmlRequest  :', false);
	Selligent.Library.Monitor.Tracer.Write(vXmlRequest , false);
	
	
	
	//NLO le 03/08/2017 : Mantis 12832
	var no_SAP_WS = false;
	try {
	 var vUrlWebService = Session["SAP_WS"];
	} catch (e) {
	 no_SAP_WS = true;
	}
	
	//var vUrlWebService = top.MyApp.CustomSetting.tabGlobalVar["SAP_WS"];
	if (!no_SAP_WS) {
	
	
	 var objRequest: System.Net.HttpWebRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(vUrlWebService));
	 objRequest.Method = "POST";
	 objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	 objRequest.ContentType = "text/xml; charset=utf-8";
	 
	 var data = System.Text.Encoding.ASCII.GetBytes(vXmlRequest);
	 objRequest.ContentLength = data.Length; // Set the 'ContentLength' property of the WebRequest.
	 var stream = objRequest.GetRequestStream(); // Fournit une vue générique d'une séquence d'octets d'un Request
	 stream.Write(data, 0, data.Length); // injecter les données dans la vue générique
	 stream.Close(); // fermer la vue générique
	
	
	 var oResponse: System.Net.HttpWebResponse = objRequest.GetResponse(); // returns a response to an Internet request
	 
	 var oStream: System.IO.Stream; // Fournit une vue générique d'une séquence d'octets
	 var oStreamReader: System.IO.StreamReader; //Implements a TextReader that reads characters from a byte stream
	 
	 oStream = oResponse.GetResponseStream(); // Fournit une vue générique d'une séquence d'octets d'une Reponse
	 oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8); // reads characters from a byte stream in a particular encoding
	 
	 var result = oStreamReader.ReadToEnd(); // récupérer toute la réponse
	
	 var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + pvMethode + "', '" + vXmlRequest.replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '', getdate()) ";
	 
	 var vResReq = objSQL.ExecuteSql(vReqInsertLog);
	 
	 Selligent.Library.Monitor.Tracer.Write("HAAAAAAAAAAAAAAAAAAAAAS MAJ NORMS V9", false);
	 Selligent.Library.Monitor.Tracer.Write(result, false);
	 oStreamReader.Close();
	 //Selligent.Library.Monitor.Tracer.Write(result , false);
	
	  objSQL.Dispose();
	  FreeSelligentObject(objSQL);
	// return vXmlRequest + "\n" + result;
	}
	
	
	
	return result;
}