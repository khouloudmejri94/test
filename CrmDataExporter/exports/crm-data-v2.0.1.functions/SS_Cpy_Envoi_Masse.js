function SS_Cpy_Envoi_Masse()
{
	 function BS_SRM_CallPostWS_Cpy(ptabListeReq,pvMethode,pvNameSpace){ 
	     var vXmlRequest, vReqTmp, objXmlRes, nFullCount, objNodes, vResReq, objNodesTmp, vTagName, vTagVal, vRetour, vReqInsertLog, nbCol, vReqTmp, vLogCom, objSQL;
	 
	     objSQL =CreateSelligentObject("SqlHelper", CurrentSessionID);   
	     objXmlRes = new ActiveXObject("Microsoft.XMLDOM"); 
	     vLogCom=""; 
	     vXmlRequest = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='"+pvNameSpace+"'>";
	 
	     vXmlRequest = vXmlRequest + "<soapenv:Header/>"; 
	     vXmlRequest = vXmlRequest + "<soapenv:Body>"; 
	     vXmlRequest = vXmlRequest + "<urn:"+pvMethode+">"; 
	     if(typeof(ptabListeReq)=="string") 
	     { 
	       vReqTmp=ptabListeReq; 
	       ptabListeReq=[]; 
	       ptabListeReq["notab"]=vReqTmp 
	     } 
	     for(var vTab in ptabListeReq) 
	     { 
	       vReqTmp = ptabListeReq[vTab]; 
	       vLogCom+="\n vReqTmp : "+vReqTmp ; 
	       if(vTab!="notab") 
	       { 
	         vXmlRequest = vXmlRequest + "<"+vTab+">"; 
	       } 
	       vResReq = objSQL.ExecuteSql(vReqTmp); 
	      
	      
	       vLogCom+="\n res req KELLLLLLLLLLLLLLL : "+vTab +"  : "+vResReq //+"------------------------------" + vReqTmp + "-------------------------------";
	 
	       objXmlRes.async=false; 
	       objXmlRes.loadXML(vResReq); 
	       vLogCom+="\n format xml : "+vTab +"  : "+objXmlRes.xml ; 
	       objNodes = objXmlRes.getElementsByTagName("Flds"); 
	       nFullCount=objNodes.length; 
	        
	       vLogCom+="\n nb lig : "+nFullCount; 
	       vLogCom+="\n objNodes[0]: "+objNodes[0]; 
	        
	       for(var j=0; j<nFullCount;j++) 
	       { 
	         {vXmlRequest = vXmlRequest + "<item>";} 
	         objNodesTmp=objNodes[j].childNodes; 
	         nbCol=objNodesTmp.length; 
	         vLogCom+="\n nb col: "+nbCol; 
	         for(var i=0; i<nbCol;i++) 
	         { 
	           vTagName = objNodesTmp[i].tagName; 
	           vLogCom+="\n vTagName : "+vTagName ; 
	           if(vTagName.indexOf("Unknown")!=0) 
	           { 
	             vTagVal = objNodesTmp[i].getAttribute("Val"); 
	             vXmlRequest = vXmlRequest + "<"+vTagName+">"+vTagVal.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;") +"</"+vTagName+">";
	 
	           } 
	         } 
	         {vXmlRequest = vXmlRequest + "</item>";} 
	       } 
	       if(vTab!="notab") 
	       { 
	         vXmlRequest = vXmlRequest + "</"+vTab+">"; 
	       } 
	        
	     }   
	     vXmlRequest = vXmlRequest + "</urn:"+pvMethode+">"; 
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
	    
	   vReqInsertLog="insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('"+pvMethode+"', '"+vXmlRequest.replace(/'/g, "''")+"', '"+vRetour.replace(/'/g, "''")+"', '"+vLogCom.replace(/'/g, "''")+"', getdate()) ";
	  
	   vResReq = objSQL.ExecuteSql(vReqInsertLog); 
	   return vXmlRequest+"\n"+vRetour;
	   }
	} 
		 //RLM - 27/06/2014
	 //Modif : RLM - 09/07/2014 (+MAJ Poubelle)
	 try{
	
	  var tabRequeteXml=[];
	  /******************CONTACT******************/
	  tabRequeteXml["IvContact"]="select DISTINCT "
	  +"     s.cd Lifnr, "
	  +"     case when substring(p.prenom,1,30) is null then substring(p.personne,1,30) else substring(p.prenom+' '+p.personne,1,30) end as Name1, "
	  +"     sp.tel Tel, "
	  +"     sp.fax Fax, "
	  +"     sp.e_mail Mail, "
	  +"     case when sp.fonction = 'Responsable Logistique' then 'LO' else 'MK' END Pafkt "
	  +"from sysadm.V_so0 s,sysadm.V_pe0 p,sysadm.sp0 sp "
	  +"where "
	  +"    s.cd not like 'COMP%' and s.xetat_pepite <> 'POUBELLE'"
	  +"and sp.so0_nrid=s.nrid "
	  +"and sp.pe0_nrid=p.nrid "
	  +"and p.personne is not null "
	  +"and (sp.date_sortie is null or sp.date_sortie > GETDATE())";
	
	  /******************FOURNISSEUR******************/
	  tabRequeteXml["IvFrn"]="select DISTINCT "
	 +"     s.cd Lifnr, "
	 +"     substring(s.societe,1,35) as Name1, "
	 +"     substring(s.adresse,1,30) as Stras, "
	 +"     substring(s.loc,1,35) as Ort01, "
	 +"     substring(s.code_post,1,10) as Pstlz, '' Land1, "
	 +"     substring(s.prefixe_int + s.tel1,1,16) as Telf1, "
	 +"     substring(s.prefixe_int + s.tel2,1,16) as Telf2, "
	 +"     substring(s.fax,1,31) as Telfx, "
	 +"     'TR' ModeReg, "
	 +"     ' 60' DelaisReg, "
	 +"     '' JourReg, "
	 +"     a.xcode_sap as Ekgrp, "
	 +"     s.e_mail Mail, "
	 +"     case when p.code is null then p1.code else p.code end as Land12, " 
	 +"     substring(s.xsiret,1,11) Stcd2, "
	 +"     case when s.xPasdescompte = 1 then 1 else 0 end as Zdemesc, "
	 +"     case when s.xderog_perm = 1 then 1 else 0 end as Zpaicomp,"
	 +"     s.xclass_fourn as Zcodeabc,"
	 +"     substring(a.team_name,1,40) as ZequipAchat"
	  +" from  "
	  +"  sysadm.V_so0 s LEFT OUTER JOIN sysadm.po2 p ON p.label = s.pays "
	  +"       LEFT OUTER JOIN sysadm.po2 p1 ON p1.label = s.pays_2 "
	  +" ,sysadm.am0 a "
	  +" where "
	  +"     s.cd not like 'COMP%' and s.xetat_pepite <> 'POUBELLE'"
	  +" and a.titulaire = s.titulaire ";
	
	  var vRetourWS = BS_SRM_CallPostWS_Cpy(tabRequeteXml, "ZCrmFrn", "urn:sap-com:document:sap:soap:functions:mc-style");
	
	  return "Retour Envoi Masse : " + vRetourWS;
	
	 }catch(e){
	   ThrowMessage("Alert","Error on SS_Cpy_Envoi_Masse " + e);
	 }
}