function SS_WS_GetItemNode(ptabListeReq,pvMethode)
{
	var vXmlRequest, vReqTmp, objXmlRes, nFullCount, objNodes, vResReq, objNodesTmp, vTagName, vTagVal, vRetour, vReqInsertLog, nbCol, vReqTmp, vLogCom, objSQL;
	objSQL =CreateSelligentObject("SqlHelper", CurrentSessionID);  
	objXmlRes = new ActiveXObject("Microsoft.XMLDOM");
	vLogCom="";
	vXmlRequest = ""
	if(typeof(ptabListeReq)=="string")
	{
	  vReqTmp=ptabListeReq;
	  ptabListeReq=[];
	  ptabListeReq["notab"]=vReqTmp
	}
	for(var vTab in ptabListeReq)
	{
	  vReqTmp = ptabListeReq[vTab];
	  if(vTab!="notab")
	  {
	    vXmlRequest = vXmlRequest + "<"+vTab+">";
	  }
	  //objXmlRes = top.MyApp.fctGetQryResult( vReqTmp , "true" , 0 , -1 )
	  vResReq = objSQL.ExecuteSql(vReqTmp);
	
	  //Selligent.Library.Monitor.Tracer.Write(vLogCom, false);
	 
	  objXmlRes.async=false;
	  objXmlRes.loadXML(vResReq);
	  objNodes = objXmlRes.getElementsByTagName("Flds");
	  nFullCount=objNodes.length;
	  
	  
	  //return vReqTmp +"\n\n"+objXmlRes.xml;
	  for(var j=0; j<nFullCount;j++)
	  {
	    if(pvMethode != "ZCrmTaquet"  && pvMethode != "Echant" )
	    {vXmlRequest = vXmlRequest + "<item>";}
	    objNodesTmp=objNodes[j].childNodes;
	    nbCol=objNodesTmp.length;
	    for(var i=0; i<nbCol;i++)
	    {
	      vTagName = objNodesTmp[i].tagName;
	      if(vTagName.indexOf("Unknown")!=0)
	      {
	        vTagVal = objNodesTmp[i].getAttribute("Val");
	//        vXmlRequest = vXmlRequest + "<"+vTagName+">"+vTagVal+"</"+vTagName+">";
	        vXmlRequest = vXmlRequest + "<"+vTagName+">"+vTagVal.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;") +"</"+vTagName+">";
	      }
	    }
	    if(pvMethode != "ZCrmTaquet" && pvMethode != "Echant" )
	    {vXmlRequest = vXmlRequest + "</item>";}
	  }
	  if(vTab!="notab")
	  {
	    vXmlRequest = vXmlRequest + "</"+vTab+">";
	  }
	  
	}  
	return vXmlRequest;
}