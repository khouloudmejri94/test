function WS_Quo_Search_Tracking(pTrack)
{
	//WS_Quo_Search_Tracking
	//NRID : 41500657585550
	//Params : pTrack
	try {
	 var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vRetour = '';
	 var jon = new System.Text.StringBuilder();
	 var vSQL = new System.Text.StringBuilder();
	vSQL.Append("SELECT ");
	vSQL.Append("    ech.NO_TRACKING          AS Tracking_Number ");
	vSQL.Append("  , O.xFamille               AS PRange ");
	vSQL.Append("  , O.XDESLOT                AS DescLot ");
	vSQL.Append("  , ech.Type_Echt            AS TypeEch ");
	vSQL.Append("  , O.no_dossier             AS Affaire_Number ");
	vSQL.Append("  , O.vos_ref                AS Offer_Number ");
	vSQL.Append("  , am0.xCodeGI              AS GI_Code ");
	vSQL.Append("  , O.XCPAFF                 AS CP_Code ");
	vSQL.Append("  , O.XCLIENT                AS Client ");
	vSQL.Append("  , O.XSTATOFF               AS Status ");
	vSQL.Append("  , ech.DATE_ENVOI           AS Sent_Date ");
	vSQL.Append("  , O.XDATE_NEGOCIE          AS Negociation_Date ");
	vSQL.Append("  , ech.no_echantillon       AS no_echantillon ");
	vSQL.Append("  , ech.NRID                 AS Sample_NRID ");
	vSQL.Append("FROM sysadm.dc0 O ");
	vSQL.Append("INNER JOIN sysadm.x_echantillon ech ");
	vSQL.Append("        ON O.nrid = ech.dc0_nrid ");
	vSQL.Append("       AND ech.template IS NULL ");
	vSQL.Append("INNER JOIN sysadm.am0 am0 ");
	vSQL.Append("        ON O.XACHT = am0.titulaire ");
	vSQL.Append("       AND am0.template IS NULL ");
	vSQL.Append("WHERE O.template IS NULL ");
	vSQL.Append("  AND ech.NO_TRACKING = '");
	vSQL.Append(pTrack);
	vSQL.Append("' ");
	
	vSQL.Append("UNION ALL ");
	
	vSQL.Append("SELECT ");
	vSQL.Append("    E.NO_TRACKING              AS Tracking_Number ");
	vSQL.Append("  , A.xFamille               AS PRange ");
	vSQL.Append("  , A.sujet                  AS DescLot ");
	vSQL.Append("  , 'Echant Avant valorisation' AS TypeEch ");
	vSQL.Append("  , A.ref                    AS Affaire_Number ");
	vSQL.Append("  , ''                       AS Offer_Number ");
	vSQL.Append("  , am0.xCodeGI              AS GI_Code ");
	vSQL.Append("  , ''                       AS CP_Code ");
	vSQL.Append("  , ''                       AS Client ");
	vSQL.Append("  , A.etat                   AS Status ");
	vSQL.Append("  , E.DATE_ENVOI               AS Sent_Date ");
	vSQL.Append("  , ''                       AS Negociation_Date ");
	vSQL.Append("  , E.no_echantillon         AS no_echantillon ");
	vSQL.Append("  , E.NRID                   AS Sample_NRID ");
	vSQL.Append("FROM sysadm.do0 A ");
	vSQL.Append("INNER JOIN sysadm.x_echantillon_Affair E on A.nrid = E.do0_nrid ");
	vSQL.Append("INNER JOIN sysadm.am0 am0 ");
	vSQL.Append("        ON A.xAcheteur = am0.titulaire ");
	vSQL.Append("       AND am0.template IS NULL ");
	vSQL.Append("WHERE A.template IS NULL and E.template is null ");
	vSQL.Append("  AND E.NO_TRACKING = '");
	vSQL.Append(pTrack);
	vSQL.Append("' ");
	
	
	 var oRes = MyQryObj.ExecuteSql(vSQL);
	 var oXmlDoc = InitXml(oRes);
	 var oRows = FindItem("Flds", oXmlDoc, true);
	
	 if (oRows.Count >= 1) {
	  jon.Append('[ ');
	  for (var i = 0; i < oRows.Count; i++) {
	   var vTracking_Number = GetItemValue("Tracking_Number", oRows[i]);
	   var vAffaire_Number = GetItemValue("Affaire_Number", oRows[i]);
	   var vOffer_Number = GetItemValue("Offer_Number", oRows[i]);
	   var vGI_Code = GetItemValue("GI_Code", oRows[i]);
	   var vCP_Code = GetItemValue("CP_Code", oRows[i]);
	   var vClient = GetItemValue("Client", oRows[i]);
	   var vStatus = GetItemValue("Status", oRows[i]);
	   var vSent_Date = GetItemValue("Sent_Date", oRows[i]);
	   var vNegociation_Date = GetItemValue("Negociation_Date", oRows[i]);
	   var vSample_NRID = GetItemValue("Sample_NRID", oRows[i]);
	   var vNo_echantillon = GetItemValue("no_echantillon", oRows[i]);
	   var vPRange = GetItemValue("PRange", oRows[i]);
	   var vDescLot = GetItemValue("DescLot", oRows[i]);
	   var vTypeEch = GetItemValue("TypeEch", oRows[i]);
	
	   jon.Append('{  "Tracking_Number": "');
	   jon.Append(vTracking_Number);
	   jon.Append('",  "Affaire_Number": "');
	   jon.Append(vAffaire_Number);
	   jon.Append('",  "Offer_Number": "');
	   jon.Append(vOffer_Number);
	   jon.Append('",  "GI_Code": "');
	   jon.Append(vGI_Code);
	   jon.Append('",  "CP_Code": "');
	   jon.Append(vCP_Code);
	   jon.Append('", "Client": "');
	   jon.Append(vClient);
	   jon.Append('",  "Status": "');
	   jon.Append(vStatus);
	   jon.Append('",  "Sent_Date": "');
	   jon.Append(vSent_Date);
	   jon.Append('",  "Negociation_Date": "');
	   jon.Append(vNegociation_Date);
	   jon.Append('",  "Sample_NRID": "');
	   jon.Append(vSample_NRID);
	   jon.Append('",  "no_echantillon": "');
	   jon.Append(vNo_echantillon);
	   jon.Append('",  "PRange": "');
	   jon.Append(vPRange);
	   jon.Append('",  "DescLot": "');
	   jon.Append(vDescLot);
	   jon.Append('",  "TypeEch": "');
	   jon.Append(vTypeEch);
	
	   jon.Append('"  }');
	   if (i + 1 < oRows.Count) {
	    jon.Append(' ,');
	   }
	  }
	  jon.Append(' ]');
	  vRetour = jon;
	  Selligent.Library.Monitor.Tracer.Write(jon);
	 } else {
	  vRetour = 'INTROUVABLE'
	 }
	
	 return vRetour;
	
	} catch (e) {
	 vRetour = e.description.substring(0, 2000);
	 return vRetour;
	} finally {
	 FreeSelligentObject(MyQryObj);
	 MyQryObj.Dispose();
	}
}