function WS_Send_FicheTaquet(pNRID)
{
	//WS_Send_FicheTaquet NEW
	    try {
	        var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	
	        var vRetour = "";
	        var vResult = "";
	        var strLignes = "";
	
	        // =========================
	        // HELPERS
	        // =========================
	        function xmlEscape(val) {
	            return (val || "")
	                .replace(/&/g, "&amp;")
	                .replace(/</g, "&lt;")
	                .replace(/>/g, "&gt;")
	                .replace(/'/g, "&#39;")
	                .replace(/"/g, "&quot;");
	        }
	
	        function formatNumber(val, fixed) {
	            var num = parseFloat((val || "0").toString().replace(",", "."));
	            if (isNaN(num)) return "0.00";
	            return fixed ? num.toFixed(2) : num.toString();
	        }
	
	        function tag(name, value) {
	            return "<" + name + ">" + value + "</" + name + ">";
	        }
	
	        // =========================
	        // SQL LIGNES
	        // =========================
	        var vSQL = ""
	            + "SELECT "
	            + " dc0.vos_ref AS Zzangnr, "
	            + " xq.xpost_nb AS Zzebelp, "
	            + " xq.xref_fournisseur AS Zzlicha, "
	            + " xq.xcode_IFLS AS Matkl, "
	            + " xq.xdesign_noz AS Zzdesign, "
	            + " xq.xdesign_fr AS Zzdesignf, "
	            + " xq.xgloss_fr AS Glossairef, "
	            + " xq.xgloss_noz AS Glossaireet, "
	            + " '' AS Znote, '' AS Zmwskz, '' AS Mwskz, "
	            + " REPLACE(ISNULL(xq.xqte_dispo,0),',','.') AS Qtedi, "
	            + " '' AS Meins, "
	            + " REPLACE(ISNULL(xq.xprc_douane,0),',','.') AS Zfrde, "
	            + " REPLACE(ISNULL(xq.xprix_cp,0),',','.') AS Zpuma, "
	            + " REPLACE(ISNULL(xq.xqte_achat,0),',','.') AS Menge, "
	            + " REPLACE(ISNULL(xq.xqte_nego,0),',','.') AS MengeNego, "
	            + " REPLACE(ISNULL(xq.xmnt_douane,0),',','.') AS Zfrdo, "
	            + " REPLACE(ISNULL(xq.xpriach_frs,0),',','.') AS Zprun "
	            + "FROM sysadm.x_quotes xq "
	            + "INNER JOIN sysadm.dc0 ON dc0.nrid = xq.dc0_nrid "
	            + "WHERE xq.dc0_nrid = '" + pNRID + "' AND xq.template IS NULL "
	            + "ORDER BY xq.xpost_nb";
	
	        var xmlDoc = InitXml(MyQryObj.ExecuteSql(vSQL));
	        var nodes = FindItem("Flds", xmlDoc, true);
	
	        // =========================
	        // BUILD LIGNES XML
	        // =========================
	        for (var i = 0; i < nodes.Count; i++) {
	            var n = nodes[i];
	
	            strLignes += "<item>"
	                + tag("Zzangnr", xmlEscape(GetItemValue("Zzangnr", n)))
	                + tag("Zzebelp", xmlEscape(GetItemValue("Zzebelp", n)))
	                + tag("Zzlicha", xmlEscape(GetItemValue("Zzlicha", n)))
	                + tag("Matkl", xmlEscape(GetItemValue("Matkl", n)))
	                + tag("Zzdesign", xmlEscape(GetItemValue("Zzdesign", n)))
	                + tag("Zzdesignf", xmlEscape(GetItemValue("Zzdesignf", n)))
	                + tag("Glossairef", xmlEscape(GetItemValue("Glossairef", n)))
	                + tag("Glossaireet", xmlEscape(GetItemValue("Glossaireet", n)))
	                + tag("Znote", "")
	                + tag("Zmwskz", "")
	                + tag("Mwskz", "")
	                + tag("Qtedi", formatNumber(GetItemValue("Qtedi", n), true))
	                + tag("Meins", xmlEscape(GetItemValue("Meins", n)))
	                + tag("Zfrde", formatNumber(GetItemValue("Zfrde", n)))
	                + tag("Zpuma", formatNumber(GetItemValue("Zpuma", n), true))
	                + tag("Menge", formatNumber(GetItemValue("Menge", n), true))
	                + tag("MengeNego", formatNumber(GetItemValue("MengeNego", n), true))
	                + tag("Zfrdo", formatNumber(GetItemValue("Zfrdo", n), true))
	                + tag("Zprun", formatNumber(GetItemValue("Zprun", n), true))
	                + "</item>";
	        }
	
	        // =========================
	        // SQL HEADER
	        // =========================
	        var vSQLTaquet = ""
	            + "SELECT "
	            + " ISNULL(no_dossier,'') AS Zzaffai, "
	            + " ISNULL(vos_ref,'') AS Zzangnr, "
	            + " ISNULL(xPaysMarchandises,'') AS Zpyor, "
	            + " ISNULL(xPaysProvenance,'') AS Zpypr, "
	            + " ISNULL(xIncotermAchat,'') AS Inco1, "
	            + " ISNULL(xCodePaysDep,'') AS Land1, "
	            + " ISNULL(xPort,'') AS Inco2, "
	            + " REPLACE(ISNULL(xValeurProforma,0),',','.') AS Zptac, "
	            + " REPLACE(ISNULL(xValeurVente,0),',','.') AS Zvvcp, "
	            + " REPLACE(ISNULL(xVolumeCBM,0),',','.') AS Zvolu, "
	            + " REPLACE(ISNULL(xCoutTrans,0),',','.') AS Zfrtr, "
	            + " REPLACE(ISNULL(xAssurance,0),',','.') AS Zfras, "
	            + " REPLACE(ISNULL(xCoutQualite,0),',','.') AS Zfrqa, "
	            + " REPLACE(ISNULL(xCoutDouane,0),',','.') AS Zfrdo, "
	            + " REPLACE(ISNULL(xCoutTest,0),',','.') AS Zfrrt, "
	            + " REPLACE(ISNULL(xDiscount,0),',','.') AS Zpaar "
	            + "FROM sysadm.dc0 WHERE nrid = '" + pNRID + "'";
	
	        var xmlDoc2 = InitXml(MyQryObj.ExecuteSql(vSQLTaquet));
	        var headerNode = FindItem("Flds", xmlDoc2, true)[0];
	
	        // =========================
	        // SOAP BUILD
	        // =========================
	        var strSoapEnv =
	            '<?xml version="1.0" encoding="UTF-8"?>' +
	            '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
	            'xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">' +
	            '<soapenv:Header/>' +
	            '<soapenv:Body>' +
	            '<urn:ZCrmTaquetN>' +
	
	            '<LigneOffre>' + strLignes + '</LigneOffre>' +
	
	            '<Taquet>' +
	            tag("Zzaffai", GetItemValue("Zzaffai", headerNode)) +
	            tag("Zzangnr", GetItemValue("Zzangnr", headerNode)) +
	            tag("Zpyor", xmlEscape(GetItemValue("Zpyor", headerNode))) +
	            tag("Zpypr", xmlEscape(GetItemValue("Zpypr", headerNode))) +
	            tag("Inco1", xmlEscape(GetItemValue("Inco1", headerNode))) +
	            tag("Land1", xmlEscape(GetItemValue("Land1", headerNode))) +
	            tag("Inco2", xmlEscape(GetItemValue("Inco2", headerNode))) +
	            tag("Zptac", GetItemValue("Zptac", headerNode)) +
	            tag("Zvvcp", GetItemValue("Zvvcp", headerNode)) +
	            tag("Zvolu", GetItemValue("Zvolu", headerNode)) +
	            tag("Zfrtr", GetItemValue("Zfrtr", headerNode)) +
	            tag("Zfras", GetItemValue("Zfras", headerNode)) +
	            tag("Zfrqa", GetItemValue("Zfrqa", headerNode)) +
	            tag("Zfrdo", GetItemValue("Zfrdo", headerNode)) +
	            tag("Zfrrt", GetItemValue("Zfrrt", headerNode)) +
	            tag("Zpaar", GetItemValue("Zpaar", headerNode)) +
	            '</Taquet>' +
	
	            '</urn:ZCrmTaquetN>' +
	            '</soapenv:Body>' +
	            '</soapenv:Envelope>';
	
	        // =========================
	        // CALL SAP
	        // =========================
	        var vUrlWebService = Session["SAP_WS"];
	
	        var request = System.Net.WebRequest.Create(vUrlWebService);
	        request.Method = "POST";
	        request.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	        request.ContentType = "text/xml; charset=utf-8";
	
	        var data = System.Text.Encoding.ASCII.GetBytes(strSoapEnv);
	        request.ContentLength = data.Length;
	
	        var stream = request.GetRequestStream();
	        stream.Write(data, 0, data.Length);
	        stream.Close();
	
	        var response = request.GetResponse();
	        var reader = new System.IO.StreamReader(response.GetResponseStream(), System.Text.Encoding.UTF8);
	
	        vRetour = reader.ReadToEnd();
	        reader.Close();
	
	        return vRetour;
	
	    } catch (e) {
	    // Error handling and logging
	    vRetour = "KO - ERREUR TAQUET PORTAL : " + (e.message || e.description || "Erreur inconnue").substring(0, 1000);
	    Selligent.Library.Monitor.Tracer.Write("ERREUR SEND Taquet : " + vRetour);
	
	} finally {
	    // Log xlog_ws - always execute regardless of success/failure
	    var safeJson = strSoapEnv.replace(/'/g, "''");
	    var safeResult = vRetour.replace(/'/g, "''");
	    var safeDebug = vRetour.replace(/'/g, "''");
	
	    MyQryObj.ExecuteSql("INSERT INTO xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) " +
	        "VALUES ('ZCrmTaquetN', '" + safeJson.substring(0, 500) + "', '" + safeResult.substring(0, 500) + "', '" + safeDebug.substring(0, 1000) + "', GETDATE())");
	
	    // Cleanup resources
	    if (MyQryObj) {
	        MyQryObj.Dispose();
	        FreeSelligentObject(MyQryObj);
	    }
	    return vRetour;
	}
}