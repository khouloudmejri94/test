function()
{
	var ExtPmntSldNRID  = CurrentRecord["ExtPmntSldNRID"]; 
	 var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vSQL = "select  no_dossier as Aff  , vos_ref as Offre from sysadm.dc0 d join sysadm.x_paiement_solde x on x.dc0_nrid =d.nrid and x.nrid='"+ExtPmntSldNRID+"' ";
	 var oRes = oQryObj.ExecuteSql(vSQL); 
	 var oXmlDoc = InitXml(oRes);   
	 var oRows = FindItem("Flds", oXmlDoc, true); 
	 var vNumeroAaffaire    = GetItemValue("Aff", oRows[0]) ;
	 var vNumeroAoffre      = GetItemValue("Offre", oRows[0]) ;
	 var ExtPmntSldDateDemandeSolde    = CurrentRecord["ExtPmntSldDateDemandeSolde"];
	 var ExtPmntSldDetailsDemande   = CurrentRecord["ExtPmntSldDetailsDemande"];
	 var ExtPmntSldNoDemande  = CurrentRecord["ExtPmntSldNoDemande"];  
	 var ExtPmntSldStatutSolde  = CurrentRecord["ExtPmntSldStatutSolde"]; 
	 
	 if( vNumeroAaffaire    == null) vNumeroAaffaire    ="";
	 if( vNumeroAoffre      == null) vNumeroAoffre      ="";
	 if( ExtPmntSldDateDemandeSolde    == null)   ExtPmntSldDateDemandeSolde  ="";
	 if( ExtPmntSldDetailsDemande   == null)  ExtPmntSldDetailsDemande  =""; 
	 if( ExtPmntSldNoDemande  == null) ExtPmntSldNoDemande  ="";
	 if( ExtPmntSldStatutSolde   == null)  ExtPmntSldStatutSolde  =""; 
	 if( ExtPmntSldNRID  == null) ExtPmntSldNRID  ="";
	  
	 if(ExtPmntSldDateDemandeSolde !="")  ExtPmntSldDateDemandeSolde = ExtPmntSldDateDemandeSolde.ToString("yyyyMMdd");
	 
	    var vStatutSolde =""
	    switch (ExtPmntSldStatutSolde) 
	    {
	      case 'Demande traitée' : vStatutSolde =  'DT' ; break ;
	      case 'Documets à corriger' : vStatutSolde =  'DC' ; break ;
	      case 'Solde envoyé' : vStatutSolde =  'SE' ; break ;
	      case 'Demande envoyée' : vStatutSolde =  'DE' ; break ;
	      case 'En stand by' : vStatutSolde =  'ES' ; break ;
	      default: '';
	    }
	    
	    
	   var xmlheader = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>";
	   
	   var vXmlRequest = xmlheader
	   + '     <soapenv:Header/>'
	   + '     <soapenv:Body>'
	   + '     <urn:ZCrmDemSo>'
	   + '     <Zddsa>'+ExtPmntSldDateDemandeSolde+'</Zddsa>'
	   + '     <Zdtsa>'+ExtPmntSldDetailsDemande+'</Zdtsa>'
	   + '     <Zlode>'+ExtPmntSldNoDemande+'</Zlode>'
	   + '     <Zlost>'+ vStatutSolde +'</Zlost>'
	   + '     <Znrid>'+ExtPmntSldNRID+'</Znrid>'
	   + '     <Zzaffai>'+vNumeroAaffaire+'</Zzaffai>'
	   + '     <Zzangnr>'+vNumeroAoffre+'</Zzangnr>'
	   + '     </urn:ZCrmDemSo>'
	   + '     </soapenv:Body>'
	   + '  </soapenv:Envelope>'
	   var no_SAP_WS=false;
	   try 
	   {
	      var vUrlWebService = Session["SAP_WS"];
	   }
	   catch(e)
	   {
	      no_SAP_WS = true;
	   }
	 
	   if (!no_SAP_WS)
	   {
	     //Ouverture de l'activeX Microsoft
	     var objRequest =  new ActiveXObject( "Microsoft.XMLHTTP" ) ;
	     objRequest.open( "POST", vUrlWebService, false,"SP_ADMIN","4Dm1N5p@!" ); 
	     objRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	     objRequest.send(vXmlRequest);
	     var vRetour = objRequest.responseText; 
	     var vReqInsertLog="insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCrmDemSo', '"+vXmlRequest.replace(/'/g, "''")+"', '"+vRetour.replace(/'/g, "''")+"', '', getdate()) ";
	     var oResQryObj = oQryObj.ExecuteSql(vReqInsertLog);
	     //Selligent.Library.Monitor.Tracer.Write("KELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL", false);
	     //Selligent.Library.Monitor.Tracer.Write(vXmlRequest , false);
	     //Selligent.Library.Monitor.Tracer.Write(vRetour , false);
	     //return vXmlRequest+"\n"+vRetour;
	   }
	    delete oQryObj;
}