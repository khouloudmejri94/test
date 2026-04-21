function(p_date)
{
	try{
	var vXmlRequest, vReqTmp, objXmlRes, nFullCount, objNodes, vResReq, objNodesTmp, vTagName, vTagVal, vRetour, vReqInsertLog, nbCol, vReqTmp, vLogCom, objSQL;
	objSQL =CreateSelligentObject("SqlHelper", CurrentSessionID);  
	objXmlRes = new ActiveXObject("Microsoft.XMLDOM");
	vLogCom="";
	 //DEBUT HAS - MANTIS 14219 - 19/12/2017
	  vReqTmp = "select ISNULL(case when etat = '07. DEMANDE D''UNE OFFRE' then 'X ' else case when etat = '08. SANS SUITE' then 'N ' else case when etat = '05. DEPOSE' then 'V ' else case when etat = '02. NON SUIVI' then 'S ' else '' end end end end,'') as ref, ISNULL(XDEROG_PERM,''), ISNULL(XFACTURE_PROFORMA,''), ISNULL(XMAIL_SEND,''), ISNULL(XNOTEAFF,''), ISNULL(do0.ref,''), ISNULL(XPROBLOT,''), ISNULL(xcode_sap,'') from sysadm.do0, sysadm.am0 where do0.dmod >= '"+p_date+"' and do0.xChefproduit = am0.titulaire and etat in ('02. NON SUIVI','05. DEPOSE','08. SANS SUITE','07. SUIVI D''UNE OFFRE') order by do0.dmod desc";
	  //FIN  HAS - MANTIS 14219 - 19/12/2017
	  vResReq = objSQL.ExecuteSql(vReqTmp);
	  objXmlRes.async=false;
	  objXmlRes.loadXML(vResReq);
	  objNodes = objXmlRes.getElementsByTagName("Flds");
	  nFullCount=objNodes.length;
	  for(var j=0; j<nFullCount;j++)
	  {
	    vXmlRequest = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>";
	    vXmlRequest = vXmlRequest + "<soapenv:Header/>";
	    vXmlRequest = vXmlRequest + "<soapenv:Body>";
	    vXmlRequest = vXmlRequest + "<urn:ZCrmAffaire>";
	    objNodesTmp=objNodes[j].childNodes;
	    var vStatusAff = objNodesTmp[0].getAttribute("Val");
	    var vDerogPaieCmpt = objNodesTmp[1].getAttribute("Val");
	    var vFacpro = objNodesTmp[2].getAttribute("Val");
	    var vMailComptaEnv = objNodesTmp[3].getAttribute("Val");
	    var vNote = objNodesTmp[4].getAttribute("Val");
	    var vNumAff = objNodesTmp[5].getAttribute("Val");
	    var vOrigi = objNodesTmp[6].getAttribute("Val");
	    var vResp = objNodesTmp[7].getAttribute("Val");
	
	    vXmlRequest = vXmlRequest + "<Dtstatut></Dtstatut>" 
	    vXmlRequest = vXmlRequest + "<Statut>"+vStatusAff+"</Statut>"
	    vXmlRequest = vXmlRequest + "<ZderogPaieCmpt>"+vDerogPaieCmpt+"</ZderogPaieCmpt>"
	    vXmlRequest = vXmlRequest + "<Zfacpro>"+vFacpro+"</Zfacpro>"
	    vXmlRequest = vXmlRequest + "<ZmailComptaEnv>"+vMailComptaEnv+"</ZmailComptaEnv>"
	    vXmlRequest = vXmlRequest + "<Znote>"+vNote+"</Znote>"
	    vXmlRequest = vXmlRequest + "<Zzaffai>"+vNumAff+"</Zzaffai>"
	    vXmlRequest = vXmlRequest + "<Zzorigi>"+vOrigi.substring(0,70)+"</Zzorigi>"
	    vXmlRequest = vXmlRequest + "<Zzresp>"+vResp+"</Zzresp>"
	    vXmlRequest = vXmlRequest + "</urn:ZCrmAffaire>";
	    vXmlRequest = vXmlRequest + "</soapenv:Body>";
	    vXmlRequest = vXmlRequest + "</soapenv:Envelope>";
	
	//NLO le 03/08/2017 : Mantis 12832
	 var no_SAP_WS=false;
	 try 
	  {
	  var vUrlWebService = Session["SAP_WS"];
	  }
	  catch(e)
	  {
	  no_SAP_WS = true;
	  }
	  //var vUrlWebService = top.MyApp.CustomSetting.tabGlobalVar["SAP_WS"];
	  if (!no_SAP_WS)
	  { 
	   //Ouverture de l'activeX Microsoft
	   var objRequest =  new ActiveXObject( "Microsoft.XMLHTTP" ) ;
	   objRequest.open( "POST", vUrlWebService, false,"SP_ADMIN","4Dm1N5p@!" ); 
	   objRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	   objRequest.send(vXmlRequest);
	   var vRetour = objRequest.responseText; 
	   vReqInsertLog="insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCrmAffaire_masse', '"+vXmlRequest.replace(/'/g, "''")+"', '"+vRetour.replace(/'/g, "''")+"', '"+vLogCom.replace(/'/g, "''")+"', getdate()) ";
	   vResReq = objSQL.ExecuteSql(vReqInsertLog);
	  }
	   }
	}
	catch(e)
	{
	     ThrowMessage("Erreur","Erreur SS_Opp_Renvoi_MAJ : "+e.message + " (Ligne "+j+") ");
	}
}