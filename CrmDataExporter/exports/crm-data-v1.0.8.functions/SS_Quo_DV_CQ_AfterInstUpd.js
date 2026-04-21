function()
{
	var objSqlHelper = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var strSoapEnv = new System.Text.StringBuilder();
	var strSoapEnvItems = new System.Text.StringBuilder();
	// HAS DEBMAJ 25/12/2018 : ajouter les statut 'Validation before Loading Check' et 'Demande Loading Check'
	// HAS DEB MAJ 18/02/2019 ajouter les nouveau statuts de demande et de validation
	var vZstcq = "case xcq.statutCQ when 'Réceptionné' then 'RE'  when 'Validé tot' then 'VT'  when 'Validé partiel' then 'VP'  when 'Sans CQ' then 'SC'  when 'Non validé' then 'NV'  when 'Contre visite' then 'CV'  when 'PréCQ validé' then 'PV'  when 'PréCQ non validé' then 'PN'  when 'Annulé' then 'AN'  when 'Validation before Loading Check' then 'VL' when 'Demande Inspecteur' then 'DI' when 'Rapport Envoyé' then 'ER' when 'CQ Stand By' then 'ST'  else '' end ";
	var vZprcq = "case xcq.statutdemCQ when 'Demande pré-CQ' then 'PC'  when 'Demande CQ' then 'CQ'  when 'Demande sans CQ' then 'SC' when 'Demande contre visite' then 'DC'  when 'Demande Loading Check' then 'LC' else '' end ";
	// HAS END MAJ 25/12/2018
	// HAS END MAJ 18/02/2019 ajouter les nouveau statuts de demande et de validation
	
	
	
	var vSQL = "select isnull(dc0.no_dossier, '') QuoOppReference, isnull(dc0.xDateDemande, '') QuoExtDateDemande, isnull(dc0.xDetailDemande, '') QuoExtDetailDemande, "
	vSQL += " isnull(dc0.xHeureDemand, '') QuoExtHeureDemand, isnull(dc0.vos_ref, '') QuoCustReference, "
	vSQL += "isnull('<Zzaffai>' + dc0.no_dossier + '</Zzaffai>', '<Zzaffai></Zzaffai>') as Zzaffai, ";
	vSQL += "isnull('<Zzangnr>' + dc0.vos_ref + '</Zzangnr>', '<Zzangnr></Zzangnr>') as Zzangnr, ";
	vSQL += "isnull('<Znucq>' + CAST(xcq.no_CQ AS VARCHAR(16)) + '</Znucq>', '<Znucq></Znucq>') as Znucq, ";
	vSQL += "isnull('<Zstcq>' + " + vZstcq + " + '</Zstcq>', '<Zstcq></Zstcq>') as Zstcq, ";
	vSQL += "isnull('<Zprcq>' + " + vZprcq + " + '</Zprcq>', '<Zprcq></Zprcq>') as Zprcq, ";
	vSQL += "isnull('<Zdpcq>' + convert(nvarchar(MAX), xcq.dateDemande, 112) + '</Zdpcq>', '<Zdpcq></Zdpcq>') as Zdpcq, ";
	vSQL += "isnull('<Zhecq>' + xcq.heure_demande + '</Zhecq>', '<Zhecq></Zhecq>') as Zhecq, ";
	vSQL += "isnull('<Zcocq>' + xcq.details_demande + '</Zcocq>', '<Zcocq></Zcocq>') as Zcocq, ";
	vSQL += "isnull('<Zcqct>' + xcq.nomContact + '</Zcqct>', '<Zcqct></Zcqct>') as Zcqct, ";
	vSQL += "isnull('<Zcqad>' + xcq.adresse_Stock + '</Zcqad>', '<Zcqad></Zcqad>') as Zcqad, ";
	vSQL += "isnull('<Zcqtl>' + xcq.numTel + '</Zcqtl>', '<Zcqtl></Zcqtl>') as Zcqtl, ";
	vSQL += "isnull('<Zcqml>' + xcq.mail + '</Zcqml>', '<Zcqml></Zcqml>') as Zcqml, ";
	vSQL += "isnull('<Znrid>' + CAST(xcq.nrid AS VARCHAR(16)) + '</Znrid>', '<Znrid></Znrid>') as Znrid ";
	vSQL += "from sysadm.dc0 dc0 inner join sysadm.x_controle_qualite xcq on dc0.nrid = xcq.dc0_nrid ";
	vSQL += "where dc0.nrid = " + CurrentRecord['ExtCntrlQltQuoNRID'];
	var objXmlUtil = objSqlHelper.ExecuteSql(vSQL);
	var xmlDoc = InitXml(objXmlUtil);
	var MyNodes = FindItem("Flds", xmlDoc, true);
	var MyNodesCount = MyNodes.Count;
	for (var i = 0; i < MyNodesCount; i++) {
	 strSoapEnvItems.Append('<item>');
	 strSoapEnvItems.Append(GetItemValue("Zzaffai", MyNodes[i]));
	 strSoapEnvItems.Append(GetItemValue("Zzangnr", MyNodes[i]));
	 strSoapEnvItems.Append(GetItemValue("Znucq", MyNodes[i]));
	 if (GetItemValue("Zstcq", MyNodes[i]) != "" && GetItemValue("Zstcq", MyNodes[i]) != null) strSoapEnvItems.Append(GetItemValue("Zstcq", MyNodes[i]));
	 strSoapEnvItems.Append(GetItemValue("Zprcq", MyNodes[i]));
	 strSoapEnvItems.Append(GetItemValue("Zdpcq", MyNodes[i]));
	 strSoapEnvItems.Append(GetItemValue("Zhecq", MyNodes[i]));
	 strSoapEnvItems.Append(GetItemValue("Zcocq", MyNodes[i]));
	 strSoapEnvItems.Append(GetItemValue("Zcqct", MyNodes[i]));
	 strSoapEnvItems.Append(GetItemValue("Zcqad", MyNodes[i]));
	 strSoapEnvItems.Append(GetItemValue("Zcqtl", MyNodes[i]));
	 strSoapEnvItems.Append(GetItemValue("Zcqml", MyNodes[i]));
	 strSoapEnvItems.Append(GetItemValue("Znrid", MyNodes[i]));
	 strSoapEnvItems.Append('</item>');
	}
	strSoapEnv.Append('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">');
	strSoapEnv.Append('<soapenv:Header/>');
	strSoapEnv.Append('<soapenv:Body>');
	strSoapEnv.Append('<urn:ZCrmDemCq>');
	//strSoapEnv.Append('<Affaire>').Append(GetItemValue("QuoOppReference", MyNodes[0])).Append('</Affaire>');
	strSoapEnv.Append('<Cqitem>');
	strSoapEnv.Append(strSoapEnvItems);
	strSoapEnv.Append('</Cqitem>');
	//strSoapEnv.Append('<DateDemd>').Append(GetItemValue("QuoExtDateDemande", MyNodes[0])).Append('</DateDemd>');
	//strSoapEnv.Append('<DetDemd>').Append(GetItemValue("QuoExtDetailDemande", MyNodes[0])).Append('</DetDemd>');
	//strSoapEnv.Append('<HeureDemd>').Append(GetItemValue("QuoExtHeureDemand", MyNodes[0])).Append('</HeureDemd>');
	//strSoapEnv.Append('<Offre>').Append(GetItemValue("QuoCustReference", MyNodes[0])).Append('</Offre>');
	strSoapEnv.Append('</urn:ZCrmDemCq>');
	strSoapEnv.Append('</soapenv:Body>');
	strSoapEnv.Append('</soapenv:Envelope>');
	//Selligent.Library.Monitor.Tracer.Write(strSoapEnv, false);
	var no_SAP_WS = false;
	try {
	 var vUrlWebService = Session["SAP_WS"];
	} catch (e) {
	 no_SAP_WS = true;
	}
	if (!no_SAP_WS) {
	 //Ouverture de l'activeX Microsoft
	 var objRequest = new ActiveXObject("Microsoft.XMLHTTP");
	 objRequest.open("POST", vUrlWebService, false, "SP_ADMIN", "4Dm1N5p@!");
	 objRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	 objRequest.send(strSoapEnv.ToString());
	 var vRetour = objRequest.responseText;
	 var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCrmDemCq', '" + strSoapEnv.ToString().replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', '" + vSQL.replace(/'/g, "''") + "' , getdate()) ";
	 objSqlHelper.ExecuteSql(vReqInsertLog);
	}
}