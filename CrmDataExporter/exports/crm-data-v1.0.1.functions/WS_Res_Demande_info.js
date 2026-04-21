function WS_Res_Demande_info(pEmail)
{
	try {
		var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
		var vRetour = "";
	
		// Verif user name by email address
		var vSQL = "SELECT top 1 titulaire as owner FROM am0 WHERE template is null and e_mail = '" + pEmail + "' order by dmod desc ";
		var MyResults = MyQuery.ExecuteSql(vSQL);
		var oXmlRes = InitXml(MyResults);
		var oRows = FindItem("Flds", oXmlRes, true);
		var NbRows = oRows.Count;
	
		if (oRows.Count > 0) {
			vRetour = GetItemValue("owner", oRows[0]);
		} else {
			vRetour = "KO-unknown email address!";
		}
	} catch (e) {
		vRetour = "Erreur WS_Res_Demande_info : " + e.description.substring(0, 1000);
	} finally {
		var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
		var vMethode = "WS_Res_Demande_info";
		var vXmlRequest = pEmail;
		vXmlRequest = vXmlRequest.replace(/'/g, "''");
		MyQuery.ExecuteSql("INSERT INTO xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) VALUES ('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', NULL, GETDATE())");
		MyQuery.Dispose();
	  FreeSelligentObject(MyQuery);
		return vRetour;
	}
}