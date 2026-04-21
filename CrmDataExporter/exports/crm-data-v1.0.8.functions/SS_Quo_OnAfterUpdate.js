function()
{
	var no_SAP_WS=false;
	try
	{
	    var vUrlWebService = Session["SAP_WS"];
	}
	catch(e)
	{
	    no_SAP_WS = true;
	}
	
	var objSQL =CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vQuoExtDateDemmande   = CurrentRecord["QuoExtDateDemande"];
	var vQuoExtDetailDemande  = CurrentRecord["QuoExtDetailDemande"];
	
	var vSQL = "select convert(varchar(20), xDateDemande ,112) as QuoExtDateDemande , convert(varchar(20), xDateDemPassDer ,112) as QuoExtDateDemPassDer ,   ";
	vSQL += " convert(varchar(20), xDateDemDeposit ,112) as QuoExtDateDemDeposit, convert(varchar(20), xDateDemDepositDer ,112) as QuoExtDateDemDepositDer, ";
	vSQL += " convert(varchar(20),XDATEMDM ,112) as QuoExtDateMDM ,  convert(varchar(20), xDateMDM_SCH ,112) as QuoExtDateMDMSCH ";
	vSQL += " ,convert(varchar(20), xDateValidMKTNormes ,112) as QuoExtDateValidMKTNormes ,convert(varchar(20), XDATEVALIDMKT ,112) as QuoExtDateValidMkt ";
	vSQL += " from dc0 where nrid='" + CurrentRecord["QuoNRID"] + "' ";
	
	
	var MyResult = objSQL.ExecuteSql(vSQL);
	var MyXmlDocument = InitXml(MyResult);
	
	var vDateDemande  = GetItemValue("QuoExtDateDemande",MyXmlDocument);
	var vDateDemandeDer  = GetItemValue("QuoExtDateDemPassDer",MyXmlDocument);
	var vPremDemDep  = GetItemValue("QuoExtDateDemDeposit",MyXmlDocument);
	var vDernDemDep  = GetItemValue("QuoExtDateDemDepositDer",MyXmlDocument);
	var vDateMDM = GetItemValue("QuoExtDateMDM",MyXmlDocument);
	var vDateMDMSCH = GetItemValue("QuoExtDateMDMSCH",MyXmlDocument);
	var vDateValidPack = GetItemValue("QuoExtDateValidMKTNormes",MyXmlDocument);
	var vDateValRt = GetItemValue("QuoExtDateValidMkt",MyXmlDocument);
	
	if (vDateDemandeDer != '' && vDateDemandeDer != null && vDateDemandeDer != undefined) {
	    vDateDemande = vDateDemandeDer;
	}
	
	//Selligent.Library.Monitor.Tracer.Write("KELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL DEMPASS DEMDEP", false);
	//Selligent.Library.Monitor.Tracer.Write(vDateDemande  , false);
	//Selligent.Library.Monitor.Tracer.Write(vDateDem  , false);
	
	// HAS DEB 02/07/2020 - ajouter les données de la modalité de paiement
	var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL = " select top 1 code as CODEMDP from sysadm.dcx01 where label = '" + CurrentRecord["QuoExtDelPai"] + "' ";
	var oRes = oQryObj.ExecuteSql(vSQL);
	var oXmlDoc = InitXml(oRes);
	var oRows = FindItem("Flds", oXmlDoc, true);
	var vModePai = GetItemValue("CODEMDP", oXmlDoc);
	
	var vMDP = "";
	if (vModePai != '' && vModePai != null && vModePai != undefined) {
	    vMDP = vModePai;
	}
	//delete oQryObj;
	oQryObj.Dispose();
	FreeSelligentObject(oQryObj);
	
	// HAS DEB 02/07/2020 - ajouter les données de la modalité de paiement
	
	
	
		var oResponse: System.Net.HttpWebResponse ;
	var objRequest: System.Net.HttpWebRequest;
	var oStream: System.IO.Stream; // Fournit une vue générique d'une séquence d'octets 
	var oStreamReader: System.IO.StreamReader; //Implements a TextReader that reads characters from a byte stream 
		 if (Session["QUO_CREATE_AGEXP"] == true) {
	  //var vAgExport = CurrentRecord["QuoExtFrsExport"];
	  var vCodeAgExp = CurrentRecord["QuoExtFrsExpCd"];
	  //var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID); //'" + vAgExport + "'
	  //var vSQL = "select top 1 so0.cd as code , so0.nrid as sonrid from lnk0 , so0 where lnk0.lnk1_nrid = so0.nrid and ref_1 = '" + vAgExport + "' and so0.template is null and lnk0.template is null";
	  //var MyResult = oQryObj.ExecuteSql(vSQL);
	  //throw (MyResult);
	  //var MyXmlDocument = InitXml(MyResult);
	  //var MyRows = FindItem("Flds", MyXmlDocument, true);
	  //if (MyRows.Count == 1) {
	  //var CpyCode = GetItemValue("code", MyRows[0]);
	  try {
	   if (vCodeAgExp.substring(0, 4) != 'COMP') {
	    var tabRequeteXml = [];
	    /******************CONTACT******************/
	    tabRequeteXml["IvContact"] = "select DISTINCT " +
	     "     s.cd Lifnr, " +
	     "     case when substring(p.prenom,1,30) is null then substring(p.personne,1,30) else substring(p.prenom+' '+p.personne,1,30) end as Name1, " +
	     "     sp.tel Tel, " +
	     "     sp.fax Fax, " +
	     "     sp.e_mail Mail, " +
	     "     case when sp.fonction = 'Responsable Logistique' then 'LO' else 'MK' END Pafkt " +
	     "from sysadm.V_so0 s,sysadm.V_pe0 p,sysadm.sp0 sp " +
	     "where " +
	     "    s.cd = '" + vCodeAgExp + "' and s.cd not like 'COMP%'" +
	     "and sp.so0_nrid=s.nrid " +
	     "and sp.pe0_nrid=p.nrid " +
	     "and p.personne is not null " +
	     "and (sp.date_sortie is null or sp.date_sortie > GETDATE())";
	    /******************FOURNISSEUR******************/
	    tabRequeteXml["IvFrn"] = "select DISTINCT " +
	     "     s.cd Lifnr, " +
	     "     substring(s.societe,1,35) as Name1, " +
	     "     substring(s.adresse,1,30) as Stras, " +
	     "     substring(s.loc,1,35) as Ort01, " +
	     "     substring(s.code_post,1,10) as Pstlz, '' Land1, " +
	     "     substring(s.prefixe_int + s.tel1,1,16) as Telf1, " +
	     "     substring(s.prefixe_int + s.tel2,1,16) as Telf2, " +
	     "     substring(s.fax,1,31) as Telfx, " +
	     "     'TR' ModeReg, " +
	     "     ' 60' DelaisReg, " +
	     "     '' JourReg, " +
	     "     a.xcode_sap as Ekgrp, " +
	     "     s.e_mail Mail, " +
	     "     case when p.code is null then p1.code else p.code end as Land12, " +
	     "     substring(s.xsiret,1,11) Stcd2, " +
	     "     case when s.xPasdescompte = 1 then 1 else 0 end as Zdemesc, " +
	     "     case when s.xderog_perm = 1 then 1 else 0 end as Zpaicomp," +
	     "     s.xclass_fourn as Zcodeabc," +
	     "     substring(a.team_name,1,40) as ZequipAchat," +
	     "     s.xInfoLogistique as ZinfoLitige," +
	     "     a.xGI_Zone as ZadminGi, " +
	     "     substring(s.xMatFisc,1,18) as Stenr, " +
	     "     substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),1,2) + substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),4,2) + substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),7,4) as Revdb " +
	     " from  " +
	     "  sysadm.V_so0 s LEFT OUTER JOIN sysadm.po2 p ON p.label = s.pays " +
	     "       LEFT OUTER JOIN sysadm.po2 p1 ON p1.label = s.pays_2 " +
	     " ,sysadm.am0 a " +
	     " where " +
	     "     s.cd = '" + vCodeAgExp + "' and s.cd not like 'COMP%'" +
	     " and a.titulaire = s.titulaire ";
	    //var vRetourWS = BS_SRM_CallPostWS(tabRequeteXml, "ZCrmFrn", "urn:sap-com:document:sap:soap:functions:mc-style");
	    var vRetourWS = BS_CDM_CallPostWS(tabRequeteXml, "ZCrmFrn", "urn:sap-com:document:sap:soap:functions:mc-style");
	
	
	    //var MySql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	    //var res = MySql.ExecuteSql("update sysadm.v_so0 set xflag_histo = 0 where xflag_histo = 1");
	   }
	  } catch (e) {
	   ThrowMessage("Alert", "Error on SS_Quo_OnAfterUpdate " + e);
	  }
	 }
	 delete oQryObj;
	 Session["QUO_CREATE_AGEXP"] = false;
		if (Session["SAP_VALID_NORM"] == true) {
	 var vNumeroAaffaire = CurrentRecord["QuoOppReference"];
	 var vNumeroAoffre = CurrentRecord["QuoCustReference"];
	 var vValidationNormes = CurrentRecord["QuoExtValidationNormes"];
	 var vCommentaireNorms = CurrentRecord["QuoExtNorDoc"];
	 var vRapTest = CurrentRecord["QuoExtRapTest"];
	 var vCommentairePack = CurrentRecord["QuoExtCommPack"];
	 var vStatutPack = CurrentRecord["QuoExtStatutPack"];
	 var vStatutRT = CurrentRecord["QuoExtStatutRT"];
	
	 if (vNumeroAaffaire == null) vNumeroAaffaire = "";
	 if (vNumeroAoffre == null) vNumeroAoffre = "";
	 if (vValidationNormes == null) vValidationNormes = "";
	 if (vCommentaireNorms == null) vCommentaireNorms = "";
	 if (vRapTest == null) vRapTest = "";
	 if (vCommentairePack == null) vCommentairePack = "";
	 if (vStatutPack == null) vStatutPack = "";
	 if (vStatutRT == null) vStatutRT = "";
	
	 var vNRID;
	 var vDT = CurrentRecord["ExtEchntlln1DateReception"];
	
	 var vValidNormes = ""
	 switch (vValidationNormes) {
	  case 'Totalement validé':
	   vValidNormes = 'VT';
	   break;
	  case 'Non validé':
	   vValidNormes = 'NV';
	   break;
	  case 'Partiellement validé':
	   vValidNormes = 'VP';
	   break;
	  case 'Sans Normes':
	   vValidNormes = 'SN';
	   break;
	  default:
	   '';
	 }
	
	
	 var vStatP = ""
	 switch (vStatutPack) {
	  case 'En attente':
	   vStatP = 'EA';
	   break;
	  case 'Envoyé pour validation':
	   vStatP = 'EV';
	   break;
	  case 'Non Validé':
	   vStatP = 'NV';
	   break;
	  case 'Validé':
	   vStatP = 'VA';
	   break;
	  case 'En stand by':
	   vStatP = 'SB';
	   break;
	  case 'Non reçu':
	   vStatP = 'NR';
	   break;
	  case 'Sans Packaging':
	   vStatP = 'SP';
	   break;
	  default:
	   '';
	 }
	
	
	 var vStatRT = ""
	 switch (vStatutRT) {
	  case 'Envoyé':
	   vStatRT = 'EV';
	   break;
	  case 'Non conforme':
	   vStatRT = 'NC';
	   break;
	  case 'Non Validé':
	   vStatRT = 'NV';
	   break;
	  case 'Validé':
	   vStatRT = 'VA';
	   break;
	  case 'Stand by':
	   vStatRT = 'SB';
	   break;
	  case 'Non reçu':
	   vStatRT = 'NR';
	   break;
	  default:
	   '';
	 }
	
	 var RapT = "";
	 switch (vRapTest) {
	  case "Obligatoire":
	   RapT = 'X';
	   break;
	  case "Non Obligatoire":
	   RapT = 'N';
	   break;
	  default:
	   '';
	 }
	
	 var vXmlRequest = " <soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>" +
	  "     <soapenv:Header/>" +
	  "     <soapenv:Body>" +
	  "     <urn:ZCrmNorms>" +
	  "     <ComCondTrans>" + vStatRT + "</ComCondTrans>" +
	  "   <CommentPal>" + RapT + "</CommentPal>" +
	  "     <Zcomfinv>" + vCommentairePack.replace(/[&\\\#,+()~%."*?<>{}]/g, "") + "</Zcomfinv>" +
	  "     <Zcons>" + vCommentaireNorms.replace(/[&\\\#,+()~%."*?<>{}]/g, "") + "</Zcons>" +
	  "     <ZfinvAssist>" + vStatP + "</ZfinvAssist>" +
	  "     <Zvcns>" + vValidNormes + "</Zvcns>" +
	  "     <Zzaffai>" + vNumeroAaffaire + "</Zzaffai>" +
	  "     <Zzangnr>" + vNumeroAoffre + "</Zzangnr>" +
	  "     <ZdatePackaging>" + vDateValidPack + "</ZdatePackaging>" +
	  "     <ZdateValRt>" + vDateValRt + "</ZdateValRt>" +
	  "     </urn:ZCrmNorms>" +
	  "     </soapenv:Body>" +
	  "  </soapenv:Envelope>";
	
	 if (!no_SAP_WS) {
	  objRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(vUrlWebService));
	  objRequest.Method = "POST";
	  objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	  objRequest.ContentType = "text/xml; charset=utf-8";
	
	  var data = System.Text.Encoding.ASCII.GetBytes(vXmlRequest);
	  objRequest.ContentLength = data.Length; // Set the 'ContentLength' property of the WebRequest.
	  var stream = objRequest.GetRequestStream(); // Fournit une vue générique d'une séquence d'octets d'un Request
	  stream.Write(data, 0, data.Length); // injecter les données dans la vue générique
	  stream.Close(); // fermer la vue générique
	  oResponse = objRequest.GetResponse(); // returns a response to an Internet request
	
	  oStream = oResponse.GetResponseStream(); // Fournit une vue générique d'une séquence d'octets d'une Reponse
	  oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8); // reads characters from a byte stream in a particular encoding
	
	  var result = oStreamReader.ReadToEnd(); // récupérer toute la réponse
	  var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCrmNorms', '" + vXmlRequest.replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '', getdate()) ";
	
	  var vResReq = objSQL.ExecuteSql(vReqInsertLog);
	
	  Selligent.Library.Monitor.Tracer.Write("HAAAAAAAAAAAAAAAAAAAAAS MAJ ZCrmNorms V9", false);
	  Selligent.Library.Monitor.Tracer.Write(result, false);
	  oStreamReader.Close();
	  //return result ;
	  objSQL.Dispose();
	  FreeSelligentObject(objSQL);
	 }
	}
		if (Session["SAP_DETAIL_COM"] == true) {
	  // HAS : DEB - 02/10/2019 - récupérer le passeport de phytosanitaire du fournisseur
	  var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	  var vSQL = "select top 1 xPPE1 as xPPE1 , xPPE2 as xPPE2 , xPPE3 as xPPE3 from so0 inner join dc0 on dc0.so0_nrid = so0.nrid inner join xdc2 on xdc2.DC0_NRID = dc0.nrid where dc0.nrid ='" + CurrentRecord["QuoNRID"] + "' ";
	  var oRes = oQryObj.ExecuteSql(vSQL);
	  var oXmlDoc = InitXml(oRes);
	  var oRows = FindItem("Flds", oXmlDoc, true);
	  var vPPE1 = GetItemValue("xPPE1", oXmlDoc);
	  var vPPE2 = GetItemValue("xPPE2", oXmlDoc);
	  var vPPE3 = GetItemValue("xPPE3", oXmlDoc);
	  FreeSelligentObject(oQryObj);
	  oQryObj.Dispose();
	
	  //delete oQryObj;
	  if (vPPE1 == null) vPPE1 = "";
	  if (vPPE2 == null) vPPE2 = "";
	  if (vPPE3 == null) vPPE3 = "";
	
	  var vNumeroAaffaire = CurrentRecord["QuoOppReference"];
	  var vNumeroAoffre = CurrentRecord["QuoCustReference"];
	  var vQuoExtHeureDemand = CurrentRecord["QuoExtHeureDemande"];
	  //var vQuoExtDateDemmande   = CurrentRecord["QuoExtDateDemande"];
	  var vQuoExtHeureDemandDer = CurrentRecord["QuoExtHeureDemPassDer"];
	  var vQuoExtDetailDemande = CurrentRecord["QuoExtDetailDemande"];
	  //var vQuoExtDateMDM = CurrentRecord["QuoExtDateMDM"];
	  var vQuoExtLieuCQ = CurrentRecord["QuoExtLieuCQ"];
	  var vQuoExtStockPrior = CurrentRecord["QuoExtStockPrior"];
	  var vValidStockPrior = CurrentRecord["QuoExtValidStockPrior"];
	  var vQuoExtFrsExpCd = CurrentRecord["QuoExtFrsExpCd"];
	  //var vDiscount = CurrentRecord["QuoExtDiscount"];
	
	  var vChangePkg = CurrentRecord["QuoExtChangePkg"];
	  var vComChangePkg = CurrentRecord["QuoExtComChangePkg"];
	
	
	  if (vNumeroAaffaire == null) vNumeroAaffaire = "";
	  if (vNumeroAoffre == null) vNumeroAoffre = "";
	  if (vQuoExtHeureDemand == null) vQuoExtHeureDemand = "";
	  //if( vQuoExtDateDemmande   == null)  vQuoExtDateDemmande  =""; 
	  if (vQuoExtDetailDemande == null) vQuoExtDetailDemande = "";
	  if (vQuoExtHeureDemandDer == null) vQuoExtHeureDemandDer = "";
	  if (vQuoExtHeureDemandDer != '' && vQuoExtHeureDemandDer != null && vQuoExtHeureDemandDer != undefined) {
	    vQuoExtHeureDemand = vQuoExtHeureDemandDer;
	  }
	  if (vQuoExtHeureDemandDer == null) vQuoExtHeureDemandDer = "";
	  if (vDateMDM == null) vDateMDM = "";
	  if (vQuoExtLieuCQ == null) vQuoExtLieuCQ = "";
	  if (vQuoExtStockPrior == '1' && vValidStockPrior == 'Approuvé') {
	    var vPriority = 'X';
	  } else {
	    var vPriority = "";
	  }
	
	  switch (vQuoExtLieuCQ) {
	    case 'Entrepot fournisseur':
	      vQuoExtLieuCQ = '1';
	    break;
	    case 'Entrepot Ningbo Ozeol':
	      vQuoExtLieuCQ = '2';
	    break;
	    default:
	    vQuoExtLieuCQ = '';
	  }
	
	  if (vQuoExtFrsExpCd == null) vQuoExtFrsExpCd = "";
	  //if (vDiscount == null) vDiscount = "";
	
	  if (vChangePkg == null) vChangePkg = "";
	  if (vComChangePkg == null) vComChangePkg = "";
	
	  switch (vChangePkg) {
	    case 'Pas demballage':
	      vChangePkg = 'PE';
	    break;
	    case 'Changement total':
	      vChangePkg = 'CT';
	    break;
	    case 'Changement partiel':
	      vChangePkg = 'CP';
	    break;
	    case 'Sans changement':
	      vChangePkg = 'SC';
	    break;
	    default:
	      vChangePkg = '';
	  }
	
	  var vXmlRequest = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>" +
	  "     <soapenv:Header/>" +
	  "   <soapenv:Body>" +
	  "     <urn:ZCrmDemPassCmd>" +
	  "     <Zzaffai>" + vNumeroAaffaire + "</Zzaffai>" +
	  "     <Zdapc>" + vDateDemande + "</Zdapc>" +
	  "     <Zdpcm>" + vQuoExtDetailDemande + "</Zdpcm>" +
	  "     <Zhepc>" + vQuoExtHeureDemand + "</Zhepc>" +
	  "     <Zzangnr>" + vNumeroAoffre + "</Zzangnr>" +
	  "     <Zdatedispo>" + vDateMDM + "</Zdatedispo>" +
	  "     <ZppeImmat>" + vPPE1 + "</ZppeImmat>" +
	  "     <ZppeOrga>" + vPPE2 + "</ZppeOrga>" +
	  "     <ZppeSupp>" + vPPE3 + "</ZppeSupp>" +
	  "     <Zterm>" + vMDP + "</Zterm>" +
	  "     <Prest>" + vQuoExtFrsExpCd + "</Prest>" +
	  "     <Zzprio>" + vPriority + "</Zzprio>" +
	  "     <Zadrcq>" + vQuoExtLieuCQ + "</Zadrcq>" +
	  //"     <Zpaar>" + vDiscount + "</Zpaar>" +
	  "     <Zstemb>" + vChangePkg + "</Zstemb>" +
	  "     <Zcomchangepkg>" + vComChangePkg.replace(/[&\\\#,+()~%."*?<>{}]/g, "") + "</Zcomchangepkg>" +
	  "     </urn:ZCrmDemPassCmd>" +
	  "   </soapenv:Body>" +
	  "   </soapenv:Envelope>";
	
	  if (!no_SAP_WS) {
	    objRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(vUrlWebService));
	    objRequest.Method = "POST";
	    objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	    objRequest.ContentType = "text/xml; charset=utf-8";
	
	    var data = System.Text.Encoding.ASCII.GetBytes(vXmlRequest);
	    objRequest.ContentLength = data.Length; // Set the 'ContentLength' property of the WebRequest.
	    var stream = objRequest.GetRequestStream(); // Fournit une vue générique d'une séquence d'octets d'un Request
	    stream.Write(data, 0, data.Length); // injecter les données dans la vue générique
	    stream.Close(); // fermer la vue générique
	    oResponse = objRequest.GetResponse(); // returns a response to an Internet request
	    oStream = oResponse.GetResponseStream(); // Fournit une vue générique d'une séquence d'octets d'une Reponse
	    oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8); // reads characters from a byte stream in a particular encoding
	    var result = oStreamReader.ReadToEnd(); // récupérer toute la réponse
	    var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCRMDEMPASSCMD', '" + vXmlRequest.replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '', getdate()) ";
	    var vResReq = objSQL.ExecuteSql(vReqInsertLog);
	
	    //Selligent.Library.Monitor.Tracer.Write("HAAAAAAAAAAAAAAAAAAAAAS MAJ ZCRMDEMPASSCMD V9", false);
	    //Selligent.Library.Monitor.Tracer.Write(result, false);
	    oStreamReader.Close();
	    //return result ;
	    FreeSelligentObject(objSQL);
	    objSQL.Dispose();
	  }
	}
		if (Session["SAP_DETAIL_DEM"] == true) {
	 var vQuoExtDateDem = CurrentRecord["QuoExtDateDemDeposit"];
	 var demdeposit = CurrentRecord["QuoExtDemdep"];
	 if (demdeposit == null) demdeposit = "";
	 var vdemdep = "";
	 // HAS : Envoyer X si demande de deposit est cochée
	 switch (demdeposit) {
	  case 1:
	   vdemdep = 'X';
	   break;
	  default:
	   '';
	 }
	 var objSqlHelper = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var strSoapEnv = new System.Text.StringBuilder();
	 var vXmlRequest1 = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>";
	 strSoapEnv.Append(vXmlRequest1);
	 strSoapEnv.Append('<soapenv:Header/>');
	 strSoapEnv.Append('<soapenv:Body>');
	 strSoapEnv.Append('<urn:ZCrmDemDep>');
	 strSoapEnv.Append('<Affaire>').Append(CurrentRecord["QuoOppReference"]).Append('</Affaire>');
	 strSoapEnv.Append('<Offre>').Append(CurrentRecord["QuoCustReference"]).Append('</Offre>');
	 // si date dernière demande est renseigné alors envoyer
	 //var vPremDemDep = CurrentRecord["QuoExtDateDemDeposit"];
	 //var vDernDemDep = CurrentRecord["QuoExtDateDemDepositDer"];
	 var vDteDemDep = "";
	 if (vDernDemDep != '' && vDernDemDep != null && vDernDemDep != undefined) {
	  vDteDemDep = vDernDemDep;
	 } else {
	  vDteDemDep = vPremDemDep;
	 }
	 if (vDateMDMSCH == null) vDateMDMSCH = "";
	 strSoapEnv.Append('<Zdade>').Append(vDteDemDep).Append('</Zdade>');
	
	 // fin Aappen date première et dernière demande
	 // la super ligne : 
	 //strSoapEnv.Append('<Zdade>').Append(CurrentRecord["QuoExtDateDemDeposit"]).Append('</Zdade>');
	
	 //strSoapEnv.Append('<Zdede>').Append(((CurrentRecord["QuoExtDemdep"] == '' || CurrentRecord["QuoExtDemdep"] == undefined) ? 0 : CurrentRecord["QuoExtDemdep"])).Append('</Zdede>');
	 //strSoapEnv.Append('<Zdede>').Append(CurrentRecord["QuoExtDemdep"]).Append('</Zdede>')
	 // HAS transco X 
	 strSoapEnv.Append('<Zdede>').Append(vdemdep).Append('</Zdede>');
	 // strSoapEnv.Append('<Zdtdp>').Append(CurrentRecord["QuoExtDetailsDem"].replace(/[^a-zA-Z0-9-]/g,"")).Append('</Zdtdp>');
	 //strSoapEnv.Append('<Zdtdp>').Append(CurrentRecord["QuoExtDetailsDem"].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")).Append('</Zdtdp>');
	 strSoapEnv.Append('<Zdtdp>').Append(CurrentRecord["QuoExtDetailsDem"].replace(/[&\\\#,+()~%."*?<>{}]/g, "")).Append('</Zdtdp>');
	 strSoapEnv.Append('<Zdatedispsc>').Append(vDateMDMSCH).Append('</Zdatedispsc>');
	 strSoapEnv.Append('</urn:ZCrmDemDep>');
	 strSoapEnv.Append('</soapenv:Body>');
	 strSoapEnv.Append('</soapenv:Envelope>');
	
	
	 if (!no_SAP_WS) {
	
	  objRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(vUrlWebService));
	  objRequest.Method = "POST";
	  objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	  objRequest.ContentType = "text/xml; charset=utf-8";
	  var data = System.Text.Encoding.ASCII.GetBytes(strSoapEnv);
	  objRequest.ContentLength = data.Length; // Set the 'ContentLength' property of the WebRequest.
	  var stream = objRequest.GetRequestStream(); // Fournit une vue générique d'une séquence d'octets d'un Request
	  stream.Write(data, 0, data.Length); // injecter les données dans la vue générique
	  stream.Close(); // fermer la vue générique
	  oResponse = objRequest.GetResponse(); // returns a response to an Internet request
	  oStream = oResponse.GetResponseStream(); // Fournit une vue générique d'une séquence d'octets d'une Reponse
	  oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8); // reads characters from a byte stream in a particular encoding
	  var result = oStreamReader.ReadToEnd(); // récupérer toute la réponse
	  var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCrmDemDep', '" + strSoapEnv.ToString().replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '', getdate()) ";
	  var vResReq = objSQL.ExecuteSql(vReqInsertLog);
	  Selligent.Library.Monitor.Tracer.Write("HAAAAAAAAAAAAAAAAAAAAAS MAJ ZCrmDemDep V9", false);
	  Selligent.Library.Monitor.Tracer.Write(result, false);
	  oStreamReader.Close();
	  //return result ;
	  objSQL.Dispose();
	  FreeSelligentObject(objSQL);
	 }
	}
		var no_SAP_SATUT_NEGO = false;
	
	try {
	 var no_SAP_STAT_NEGO = Session["SAP_SATUT_NEGO"];
	} catch (e) {
	 var no_SAP_SATUT_NEGO = false;
	}
	
	if (no_SAP_STAT_NEGO) {
	 var objSqlHelper = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var strSoapEnv = new System.Text.StringBuilder();
	 var strSoapEnvItems = new System.Text.StringBuilder();
	 var vSQL = "select isnull('<Zzdesignf>' + xdc2.xref_fournisseur + '</Zzdesignf>', '<Zzdesignf></Zzdesignf>') as Zzdesignf, "
	 vSQL += " isnull('<Zzebelp>' + cast( xdc2.xNum_Ligne as varchar)  + '</Zzebelp>', '<Zzebelp></Zzebelp>') as Zzebelp, ";
	 vSQL += " isnull('<Zzlicha>' + xdc2.xCode_IFLS + '</Zzlicha>', '<Zzlicha></Zzlicha>') as Zzlicha, ";
	 vSQL += " isnull('<Zpuma>' + CAST(xdc2.xPrixAch AS VARCHAR(16)) + '</Zpuma>', '<Zpuma></Zpuma>') as Zpuma, ";
	 vSQL += " isnull('<Menge>' + CAST(xdc2.xQtAch AS VARCHAR(16)) + '</Menge>', '<Menge></Menge>') as Menge, ";
	 vSQL += " isnull('<Meins>' + xdc2.xUnite + '</Meins>', '<Meins></Meins>') as Meins, ";
	 vSQL += " isnull('<Zpmar>' + CAST(xdc2.xPrixTqt AS VARCHAR(16)) + '</Zpmar>', '<Zpmar></Zpmar>') as Zpmar, ";
	 vSQL += " isnull('<Zdvmr>' + xdc2.xdevise_nego + '</Zdvmr>', '<Zdvmr></Zdvmr>') as Zdvmr, ";
	 vSQL += " isnull('<Zprun>' + CAST(xdc2.xPXAchatFeur AS VARCHAR(16)) + '</Zprun>', '<Zprun></Zprun>') as Zprun, ";
	 vSQL += " isnull('<Commentaire>' + xdc2.xGlossaireFr + '</Commentaire>', '<Commentaire></Commentaire>') as Commentaire, ";
	 vSQL += " isnull('<Zcomment>' + xdc2.xGlossaireE + '</Zcomment>', '<Zcomment></Zcomment>') as Zcomment, ";
	 vSQL += " isnull('<Zfrde>' + CAST(xdc2.xPRCDouane AS VARCHAR(16)) + '</Zfrde>', '<Zfrde></Zfrde>') as Zfrde, ";
	 vSQL += " isnull('<Zofcc>' + CAST(xdc2.xCoutDouane AS VARCHAR(16)) + '</Zofcc>', '<Zofcc></Zofcc>') as Zofcc, ";
	 vSQL += " isnull('<Zfrdp>' + CAST(xdc2.xAssurance AS VARCHAR ) + '</Zfrdp>', '<Zfrdp></Zfrdp>') as Zfrdp";
	 vSQL += " from sysadm.xdc2 ";
	 vSQL += " where dc0_nrid = 0 ";
	
	 var objXmlUtil = objSqlHelper.ExecuteSql(vSQL);
	 var xmlDoc = InitXml(objXmlUtil);
	 var MyNodes = FindItem("Flds", xmlDoc, true);
	 var MyNodesCount = MyNodes.Count;
	
	 for (var i = 0; i < MyNodesCount; i++) {
	  strSoapEnvItems.Append('<item>');
	  strSoapEnvItems.Append(GetItemValue("Zzebelp", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Zzdesignf", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Zzlicha", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Zpuma", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Menge", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Meins", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Zpmar", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Zdvmr", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Zprun", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Commentaire", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Zcomment", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Zfrde", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Zofcc", MyNodes[i]));
	  strSoapEnvItems.Append(GetItemValue("Zfrdp", MyNodes[i]));
	  strSoapEnvItems.Append('</item>');
	 }
	
	 var vstatut = CurrentRecord["QuoExtStatOff"];
	 var vStatusOffre = ""
	 switch (vstatut) {
	  case '1. Valorisé':
	   vStatusOffre = 'VL';
	   break;
	  case '2. Négocié':
	   vStatusOffre = 'NG';
	   break;
	  case '3. Perdue':
	   vStatusOffre = 'PE';
	   break;
	  case '4. Acceptée':
	   vStatusOffre = 'AC';
	   break;
	  case '5. Commandée':
	   vStatusOffre = 'CC';
	   break;
	  case '6. Annulée':
	   vStatusOffre = 'AN';
	   break;
	  case '8. A Revaloriser':
	   vStatusOffre = 'AR';
	   break;
	  case '9. A Négocier':
	   vStatusOffre = 'TN';
	   break;
	  default:
	   '';
	 }
	
	 var vRaisonOffre = "";
	 var vRaison = CurrentRecord["QuoExtRaisonOffre"];
	
	 switch (vRaison) {
	  case 'Perdue/ Stock Client':
	   vRaisonOffre = '01';
	   break;
	  case 'Perdue/Doublon':
	   vRaisonOffre = '02';
	   break;
	  case 'N.C/Prix':
	   vRaisonOffre = '03';
	   break;
	  case 'N.C/Quatité':
	   vRaisonOffre = '04';
	   break;
	  case 'N.C/Stock vendu':
	   vRaisonOffre = '05';
	   break;
	  case 'N.C/Réactivité Client':
	   vRaisonOffre = '06';
	   break;
	  case 'N.C/Quantité':
	   vRaisonOffre = '07';
	   break;
	  case 'N.C/Provenance':
	   vRaisonOffre = '08';
	   break;
	  case 'N.C/Modalité de paiement':
	   vRaisonOffre = '09';
	   break;
	  case 'N.C/Echantillon':
	   vRaisonOffre = '10';
	   break;
	  case 'N.C/Conformité':
	   vRaisonOffre = '11';
	   break;
	  case 'Annulée':
	   vRaisonOffre = '12';
	   break;
	  case 'Perdue Auto OZ':
	   vRaisonOffre = '13';
	   break;
	  default:
	   '';
	 }
	
	 strSoapEnv.Append('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">');
	 strSoapEnv.Append('<soapenv:Header/>');
	 strSoapEnv.Append('<soapenv:Body>');
	 strSoapEnv.Append('<urn:ZCrmDa11Nego>');
	 strSoapEnv.Append('<Da11nego>');
	 strSoapEnv.Append('<item>');
	 //strSoapEnv.Append(strSoapEnvItems);
	 strSoapEnv.Append('</item>');
	 strSoapEnv.Append('</Da11nego>');
	 strSoapEnv.Append('<CommNego>').Append(CurrentRecord["QuoExtSocFac"]).Append('</CommNego>');
	//HAS : 27/09/2018 Ajouter la date de mise en Perdu
	 strSoapEnv.Append('<Datperdue>').Append(CurrentRecord["QuoExtDatePerdue"]).Append('</Datperdue>');
	strSoapEnv.Append('<Statut>').Append(vStatusOffre).Append('</Statut>');
	//HAS : 27/09/2018 Ajouter le motif de mise en Perdu
	 strSoapEnv.Append('<Zmope>').Append(vRaisonOffre).Append('</Zmope>');
	 //strSoapEnv.Append('<Zterm>').Append(CurrentRecord["QuoExtDelPai"]).Append('</Zterm>');
	 // HAS DEB : envoyer valeur vide
	 var vZterm = '';
	 strSoapEnv.Append('<Zterm>').Append(vZterm).Append('</Zterm>');
	
	 strSoapEnv.Append('<Zzaffai>').Append(CurrentRecord["QuoOppReference"]).Append('</Zzaffai>');
	 strSoapEnv.Append('<Zzangnr>').Append(CurrentRecord["QuoCustReference"]).Append('</Zzangnr>');
	 
	 
	 
	 /*
	  //HAS : 26/10/2018 Ajouter la date de mise en Perdu
	  var date = CurrentRecord["QuoExtDatePerdue"];
	  var date1 = date.substring(0,10);
	  throw "la date de mise en perdu" +date1;
	  strSoapEnv.Append('<Datperdue>').Append(date1).Append('</Datperdue>');
	 */
	 
	 
	
	 strSoapEnv.Append('</urn:ZCrmDa11Nego>');
	 strSoapEnv.Append('</soapenv:Body>');
	 strSoapEnv.Append('</soapenv:Envelope>');
	
	 var no_SAP_WS = false;
	 try {
	  var vUrlWebService = Session["SAP_WS"];
	 } catch (e) {
	  no_SAP_WS = true;
	 }
	
	 if (!no_SAP_WS) {
	  objRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(vUrlWebService));
	  objRequest.Method = "POST";
	  objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	  objRequest.ContentType = "text/xml; charset=utf-8";
	  var data = System.Text.Encoding.ASCII.GetBytes(strSoapEnv);
	  objRequest.ContentLength = data.Length; // Set the 'ContentLength' property of the WebRequest.
	  var stream = objRequest.GetRequestStream(); // Fournit une vue générique d'une séquence d'octets d'un Request
	  stream.Write(data, 0, data.Length); // injecter les données dans la vue générique
	  stream.Close(); // fermer la vue générique
	  oResponse = objRequest.GetResponse(); // returns a response to an Internet request
	  oStream = oResponse.GetResponseStream(); // Fournit une vue générique d'une séquence d'octets d'une Reponse
	  oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8); // reads characters from a byte stream in a particular encoding
	  var result = oStreamReader.ReadToEnd(); // récupérer toute la réponse
	  var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCrmDa11Nego', '" + strSoapEnv.ToString().replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '', getdate()) ";
	  var vResReq = objSQL.ExecuteSql(vReqInsertLog);
	  Selligent.Library.Monitor.Tracer.Write("HAAAAAAAAAAAAAAAAAAAAAS MAJ ZCrmDa11Nego V9", false);
	  Selligent.Library.Monitor.Tracer.Write(result, false);
	  oStreamReader.Close();
	  //return result ;
	  objSQL.Dispose();
	  FreeSelligentObject(objSQL);
	 }
	}
		if (Session["SAP_WH_INS"] == true || Session["SAP_WH_UP"] == true) {
	 var objSQL1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vSQL1 = "select convert(varchar(20), xDateDemRecWH ,112) as QuoExtDateDemRecWH,convert(varchar(20), xDateLivPrevWH ,112) as QuoExtDateLivPrevWH from dc0 where nrid='" + CurrentRecord["QuoNRID"] + "'";
	 var MyResult1 = objSQL1.ExecuteSql(vSQL1);
	 var MyXmlDocument1 = InitXml(MyResult1);
	 var vDateDemande = GetItemValue("QuoExtDateDemande", MyXmlDocument);
	
	 var vNumeroAaffaire = CurrentRecord["QuoOppReference"];
	 var vNumeroAoffre = CurrentRecord["QuoCustReference"];
	 var vStatutWH = CurrentRecord["QuoExtStatutWH"];
	 var vContactWH = CurrentRecord["QuoExtNomContact"];
	 var vTelWH = CurrentRecord["QuoExtNumTel"];
	 var vDateDemWH = GetItemValue("QuoExtDateDemRecWH", MyXmlDocument1);
	 var vEmailWH = CurrentRecord["QuoExtEmailWH"];
	 var vCbmWH = CurrentRecord["QuoExtVolumeCbmWH"];
	 var vDatePrevWH = GetItemValue("QuoExtDateLivPrevWH", MyXmlDocument1);
	
	 var vNRID
	 var statWH = ""
	 switch (vStatutWH) {
	  case 'Demande Réception':
	   statWH = 'DR';
	   break;
	  case 'En cours':
	   statWH = 'IP';
	   break;
	  case 'Livré':
	   statWH = 'LV';
	   break;
	  case 'Stand by':
	   statWH = 'ST';
	   break;
	  default:
	   '';
	 }
	
	 var vXmlRequest = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>" +
	  "<soapenv:Header/>" +
	  "<soapenv:Body>" +
	  "<urn:ZCrmDemRecep>" +
	  "<Zcontact>" + vContactWH + "</Zcontact>" +
	  "<Zddate>" + vDatePrevWH + "</Zddate>" +
	  "<Zddem>" + vDateDemWH + "</Zddem>" +
	  "<Zemail>" + vEmailWH + "</Zemail>" +
	  "<Zntel>" + vTelWH + "</Zntel>" +
	  "<Zstat>" + statWH + "</Zstat>" +
	  "<Zwvl>" + vCbmWH + "</Zwvl>" +
	  "<Zzaffai>" + vNumeroAaffaire + "</Zzaffai>" +
	  "<Zzangnr>" + vNumeroAoffre + "</Zzangnr>" +
	  "</urn:ZCrmDemRecep>" +
	  "</soapenv:Body>" +
	  "</soapenv:Envelope>";
	
	  if (!no_SAP_WS) {
	   objRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(vUrlWebService));
	   objRequest.Method = "POST";
	   objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	   objRequest.ContentType = "text/xml; charset=utf-8";
	 
	   var data = System.Text.Encoding.ASCII.GetBytes(vXmlRequest);
	   objRequest.ContentLength = data.Length; // Set the 'ContentLength' property of the WebRequest.
	   var stream = objRequest.GetRequestStream(); // Fournit une vue générique d'une séquence d'octets d'un Request
	   stream.Write(data, 0, data.Length); // injecter les données dans la vue générique
	   stream.Close(); // fermer la vue générique
	   oResponse = objRequest.GetResponse(); // returns a response to an Internet request
	 
	 
	   oStream = oResponse.GetResponseStream(); // Fournit une vue générique d'une séquence d'octets d'une Reponse
	   oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8); // reads characters from a byte stream in a particular encoding
	 
	   var result = oStreamReader.ReadToEnd(); // récupérer toute la réponse
	   var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCrmDemRecep', '" + vXmlRequest.replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '', getdate()) ";
	 
	   var vResReq = objSQL.ExecuteSql(vReqInsertLog);
	 
	   Selligent.Library.Monitor.Tracer.Write("HAAAAAAAAAAAAAAAAAAAAAS MAJ ZCrmDemRecep V9", false);
	   Selligent.Library.Monitor.Tracer.Write(result, false);
	   oStreamReader.Close();
	   //return result ;
	   objSQL.Dispose();
	   FreeSelligentObject(objSQL);
	  }
	}
		if (Session["Z_CRM_AFF_SUPPLYC"] == true) {
	
	 var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vSQL = "select xcode_sap as SUPCHN from am0 where fonction like '%supply chain%' and titulaire ='" + CurrentRecord["QuoExtSupChain"] + "' ";
	 var oRes = oQryObj.ExecuteSql(vSQL);
	 var oXmlDoc = InitXml(oRes);
	 var oRows = FindItem("Flds", oXmlDoc, true);
	 var vSupChn = GetItemValue("SUPCHN", oXmlDoc);
	 var nSupChn = "";
	 if (vSupChn != '' && vSupChn != null && vSupChn != undefined) {
	  nSupChn = vSupChn;
	 }
	 delete oQryObj;
	 var objSqlHelper = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var strSoapEnv = new System.Text.StringBuilder();
	 var vXmlRequest1 = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>";
	 strSoapEnv.Append(vXmlRequest1);
	 strSoapEnv.Append('<soapenv:Header/>');
	 strSoapEnv.Append('<soapenv:Body>');
	 strSoapEnv.Append('<urn:ZCrmAffSupplyc>');
	 strSoapEnv.Append('<Affaire>').Append(CurrentRecord["QuoOppReference"]).Append('</Affaire>');
	 strSoapEnv.Append('<Offre>').Append(CurrentRecord["QuoCustReference"]).Append('</Offre>');
	 strSoapEnv.Append('<Supplyc>').Append(nSupChn).Append('</Supplyc>');
	 strSoapEnv.Append('</urn:ZCrmAffSupplyc>');
	 strSoapEnv.Append('</soapenv:Body>');
	 strSoapEnv.Append('</soapenv:Envelope>');
	 if (!no_SAP_WS) {
	  objRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(vUrlWebService));
	  objRequest.Method = "POST";
	  objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	  objRequest.ContentType = "text/xml; charset=utf-8";
	  var data = System.Text.Encoding.ASCII.GetBytes(strSoapEnv);
	  objRequest.ContentLength = data.Length; // Set the 'ContentLength' property of the WebRequest.
	  var stream = objRequest.GetRequestStream(); // Fournit une vue générique d'une séquence d'octets d'un Request
	  stream.Write(data, 0, data.Length); // injecter les données dans la vue générique
	  stream.Close(); // fermer la vue générique
	  oResponse = objRequest.GetResponse(); // returns a response to an Internet request
	  oStream = oResponse.GetResponseStream(); // Fournit une vue générique d'une séquence d'octets d'une Reponse
	  oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8); // reads characters from a byte stream in a particular encoding
	  var result = oStreamReader.ReadToEnd(); // récupérer toute la réponse
	  var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCrmAffSupplyc', '" + strSoapEnv.ToString().replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '', getdate()) ";
	  var vResReq = objSQL.ExecuteSql(vReqInsertLog);
	  Selligent.Library.Monitor.Tracer.Write("HAAAAAAAAAAAAAAAAAAAAAS MAJ ZCrmAffSupplyc V9", false);
	  Selligent.Library.Monitor.Tracer.Write(result, false);
	  oStreamReader.Close();
	  //return result ;
	  objSQL.Dispose();
	  FreeSelligentObject(objSQL);
	 }
	}
	//Selligent.Library.Monitor.Tracer.Write("HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS SUPCHN", false);
	//Selligent.Library.Monitor.Tracer.Write(vRetour, false);
		if (Session["SAP_ENVOI_DEROG"] == true) {
	 var vTypeDerog = CurrentRecord["QuoExtTypeDerog"];
	 var vMntDerog = CurrentRecord["QuoExtValDepassDerog"];
	 var vAffaire = CurrentRecord["QuoOppReference"];
	 var vOffre = CurrentRecord["QuoCustReference"];
	 var vNature = 'VL';
	 switch (vTypeDerog) {
	  case 'Controle qualité':
	   vTypeDerog = 'CQ'
	   break;
	  case 'Emballage et stickers':
	   vTypeDerog = 'ES'
	   break;
	  case 'Rapport de test':
	   vTypeDerog = 'RT'
	   break;
	  case 'Transport':
	   vTypeDerog = 'TR'
	   break;
	  default:
	   vTypeDerog = ''
	 }
	 var objSqlHelper = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var strSoapEnv = new System.Text.StringBuilder();
	 var vXmlRequest1 = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>";
	 strSoapEnv.Append(vXmlRequest1);
	 strSoapEnv.Append('<soapenv:Header/>');
	 strSoapEnv.Append('<soapenv:Body>');
	 strSoapEnv.Append('<urn:ZCrmDemRent>');
	 strSoapEnv.Append('<ExtraCost>').Append(vMntDerog).Append('</ExtraCost>');
	 strSoapEnv.Append('<ZtypeDem>').Append(vTypeDerog).Append('</ZtypeDem>');
	 strSoapEnv.Append('<ZtypeVal>').Append(vNature).Append('</ZtypeVal>');
	 strSoapEnv.Append('<Zzaffai>').Append(vAffaire).Append('</Zzaffai>');
	 strSoapEnv.Append('<Zzangnr>').Append(vOffre).Append('</Zzangnr>');
	 strSoapEnv.Append('</urn:ZCrmDemRent>');
	 strSoapEnv.Append('</soapenv:Body>');
	 strSoapEnv.Append('</soapenv:Envelope>');
	 if (!no_SAP_WS) {
	  objRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(vUrlWebService));
	  objRequest.Method = "POST";
	  objRequest.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	  objRequest.ContentType = "text/xml; charset=utf-8";
	  var data = System.Text.Encoding.ASCII.GetBytes(strSoapEnv);
	  objRequest.ContentLength = data.Length; // Set the 'ContentLength' property of the WebRequest.
	  var stream = objRequest.GetRequestStream(); // Fournit une vue générique d'une séquence d'octets d'un Request
	  stream.Write(data, 0, data.Length); // injecter les données dans la vue générique
	  stream.Close(); // fermer la vue générique
	  oResponse = objRequest.GetResponse(); // returns a response to an Internet request
	  oStream = oResponse.GetResponseStream(); // Fournit une vue générique d'une séquence d'octets d'une Reponse
	  oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8); // reads characters from a byte stream in a particular encoding
	  var result = oStreamReader.ReadToEnd(); // récupérer toute la réponse
	  var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCrmDemRent', '" + strSoapEnv.ToString().replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '', getdate()) ";
	  var vResReq = objSQL.ExecuteSql(vReqInsertLog);
	  //Selligent.Library.Monitor.Tracer.Write("HAAAAAAAAAAAAAAAAAAAAAS MAJ ZCrmDemDep V9", false);
	  //Selligent.Library.Monitor.Tracer.Write(result, false);
	  oStreamReader.Close();
	  //return result ;
	  objSQL.Dispose();
	  FreeSelligentObject(objSQL);
	 }
	}
	if (Session["CLOTURE_DEROG"] == true) {
	    var vNRID = CurrentRecord['QuoNRID'];
	    var MyQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	    var myselectionrow: SelectionRow = new SelectionRow();
	    myselectionrow.Fields["QuoExtDateValDerog1"] = '';
	    myselectionrow.Fields["QuoExtDateValDerog3"] = '';
	    myselectionrow.Fields["QuoExtDeviseDerogTq"] = '';
	    myselectionrow.Fields["QuoExtDetailDemDerog"] = '';
	    myselectionrow.Fields["QuoExtStatDerog3"] = '';
	    myselectionrow.Fields["QuoExtUserValDerog2"] = '';
	    myselectionrow.Fields["QuoExtDeviseDerogPi"] = '';
	    myselectionrow.Fields["QuoExtStatDerog1"] = '';
	    myselectionrow.Fields["QuoExtMntDerogPi"] = '';
	    myselectionrow.Fields["QuoExtMntDerogAnego"] = '';
	    myselectionrow.Fields["QuoExtDateValDerog2"] = '';
	    myselectionrow.Fields["QuoExtDetailValDerog1"] = '';
	    myselectionrow.Fields["QuoExtStatDerog2"] = '';
	    myselectionrow.Fields["QuoExtDetailValDerog3"] = '';
	    myselectionrow.Fields["QuoExtUserValDerog1"] = '';
	    myselectionrow.Fields["QuoExtDetailValDerog2"] = '';
	    myselectionrow.Fields["QuoExtMntDerogMarge"] = '';
	    myselectionrow.Fields["QuoExtTypeDerog"] = '';
	    myselectionrow.Fields["QuoExtDeviseDepassDerog"] = '';
	    myselectionrow.Fields["QuoExtDeviseDerogMarge"] = '';
	    myselectionrow.Fields["QuoExtUserValDerog3"] = '';
	    myselectionrow.Fields["QuoExtAppelDerog"] = '';
	    myselectionrow.Fields["QuoExtMntDerogTq"] = '';
	    myselectionrow.Fields["QuoExtValDepassDerog"] = '';
	    myselectionrow.Fields["QuoExtFlagDepassDerog"] = '';
	    myselectionrow.Fields["QuoExtMntDerogNego"] = '';
	    MyQuotation.Open(vNRID);
	    MyQuotation.SetAndSave(myselectionrow);
	}
		return true;
}