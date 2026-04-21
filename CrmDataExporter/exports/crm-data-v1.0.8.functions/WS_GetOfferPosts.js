function(pOfferNumber)
{
	try {
	    var vLogCom = "";
	    var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var vRetour = "";
	    
	    // Validate input parameter
	    if (!pOfferNumber || pOfferNumber === "") {
	        return "Erreur : Numéro d'offre non fourni";
	    }
	
	    // Construct SQL query with sanitized input
	    var vSQL = "SELECT " +
	               "xdc2.[XREF_FOURNISSEUR] AS REFERENCE_FOURN, " +
	               "dc0.NO_DOSSIER AS N_AFFAIRE, " +
	               "dc0.VOS_REF AS OFFRE, " +
	               "xdc2.[XCODE_IFLS] AS CODE_IFLS, " +
	               "xdc2.[XDESIGNATION_FR] AS DESIGNATION, " +
	               "xdc2.[XDESIGNATION_NOZ] AS DESIGNATION_2, " +
	               "xdc2.[XPRIXACH] AS PRIX_ACHAT, " +
	               "xdc2.[XQTE_DISPO] AS QTE_DISPO, " +
	               "xdc2.[XRELPRIX] AS RELEVE_DE_PRIX, " +
	               "xdc2.[XENSG] AS ENSEIGNE, " +
	               "xdc2.[XQTACH] AS QTE_ACHAT, " +
	               "xdc2.[XPRIXTQT] AS PRIX_TAQUET, " +
	               "xdc2.[XVALACH] AS VAL_ACHAT, " +
	               "xdc2.[xDevOffre] AS DEVISE_VENTE, " +
	               "xdc2.[xTxConv] AS TAUX_CONVE ," + 
	               "xdc2.[XNUM_LIGNE] AS NUM_LIGNE ," +
	               "xdc2.[xPrcTVA] AS Prc_TVA " +
	               "FROM xdc2  xdc2 " +
	               "INNER JOIN dc0 ON dc0.nrid = xdc2.DC0_NRID " +
	               "WHERE xdc2.TEMPLATE IS NULL AND dc0.vos_ref = '" + pOfferNumber.replace(/'/g, "''") + "'";
	
	    //vLogCom = "\n WS get offer post :  vSQL" +"------------------------------" + vSQL + "-------------------------------";
	    //Selligent.Library.Monitor.Tracer.Write(vLogCom, false);
	
	    // Execute query
	    var MyResults = MyQuery.ExecuteSql(vSQL);
	    var oXmlRes = InitXml(MyResults);
	    var oRows = FindItem("Flds", oXmlRes, true);
	    var NbRows = oRows.Count;
	
	    // Build JSON response
	    var jsonParts = [];
	    jsonParts.push('{"offerNumber": "' + pOfferNumber + '",');
	    jsonParts.push('"posts": [');
	
	    // Parcours des lignes (si NbRows > 0)
	    if (NbRows > 0) {
	        for (var i = 0; i < NbRows; i++) {
	            var qteAchat = parseFloat(GetItemValue("QTE_ACHAT", oRows[i]));
	            if (isNaN(qteAchat)) qteAchat = 0;
	            
	            var qteDispo = parseFloat(GetItemValue("QTE_DISPO", oRows[i]));
	            if (isNaN(qteDispo)) qteDispo = 0;
	            
	            var percentDispo = "0.00";
	            if (qteAchat !== 0) {
	                percentDispo = ((qteDispo / qteAchat) * 100).toFixed(2);
	            }
	
	            if (i > 0) {
	                jsonParts.push(',');
	            }
	
	            var designation = GetItemValue("DESIGNATION", oRows[i]) || "";
	            designation = designation.replace(/"/g, "''");
	            
	            var designation2 = GetItemValue("DESIGNATION_2", oRows[i]) || "";
	            designation2 = designation2.replace(/"/g, "''");
	
	            jsonParts.push('{');
	            jsonParts.push('"REFERENCE_FOURN": "' + (GetItemValue("REFERENCE_FOURN", oRows[i]) || "") + '",');
	            jsonParts.push('"N_AFFAIRE": "' + (GetItemValue("N_AFFAIRE", oRows[i]) || "") + '",');
	            jsonParts.push('"OFFRE": "' + (GetItemValue("OFFRE", oRows[i]) || "") + '",');
	            jsonParts.push('"NUM_LIGNE": "' + (GetItemValue("NUM_LIGNE", oRows[i]) || "") + '",');
	            jsonParts.push('"CODE_IFLS": "' + (GetItemValue("CODE_IFLS", oRows[i]) || "") + '",');
	            jsonParts.push('"DESIGNATION": "' + designation + '",');
	            jsonParts.push('"DESIGNATION_2": "' + designation2 + '",');
	            jsonParts.push('"PRIX_ACHAT": "' + (GetItemValue("PRIX_ACHAT", oRows[i]) || "") + '",');
	            jsonParts.push('"QTE_DISPO": "' + qteDispo + '",');
	            jsonParts.push('"RELEVE_DE_PRIX": "' + (GetItemValue("RELEVE_DE_PRIX", oRows[i]) || "") + '",');
	            jsonParts.push('"ENSEIGNE": "' + (GetItemValue("ENSEIGNE", oRows[i]) || "") + '",');
	            jsonParts.push('"QTE_ACHAT": "' + qteAchat + '",');
	            jsonParts.push('"percentDispo": "' + percentDispo + '",');
	            jsonParts.push('"PRIX_TAQUET": "' + (GetItemValue("PRIX_TAQUET", oRows[i]) || "") + '",');
	            jsonParts.push('"VAL_ACHAT": "' + (GetItemValue("VAL_ACHAT", oRows[i]) || "") + '",');
	            jsonParts.push('"DEVISE_VENTE": "' + (GetItemValue("DEVISE_VENTE", oRows[i]) || "") + '",');
	            jsonParts.push('"TAUX_CONVE": "' + (GetItemValue("TAUX_CONVE", oRows[i]) || "") + '",');
	            jsonParts.push('"Prc_TVA": "' + (GetItemValue("Prc_TVA", oRows[i]) || "") + '"');
	            jsonParts.push('}');
	        }
	    }
	
	    jsonParts.push(']}');
	    vRetour = jsonParts.join('');
	
	    //vLogCom = "\n WS get offer post :  vRetour" +"------------------------------" + vRetour + "-------------------------------";
	    //Selligent.Library.Monitor.Tracer.Write(vLogCom, false);
	    
	} catch (e) {
	    vRetour = "Erreur WS_GetOfferPosts : " + e.description.substring(0, 10000);
	} finally {
	    var vMethode = "WS_GetOfferPosts";
	    var vXmlRequest = pOfferNumber.replace(/'/g, "''");
	    MyQuery.ExecuteSql("INSERT INTO xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) VALUES ('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.substring(0, 500).replace(/'/g, "''") + "', NULL, GETDATE())");
	    FreeSelligentObject(MyQuery);
	    MyQuery.Dispose();
	    return vRetour;
	}
}