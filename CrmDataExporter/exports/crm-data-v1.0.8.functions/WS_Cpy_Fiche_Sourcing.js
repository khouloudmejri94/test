function(pCompany,pOwner,pEmailOwner,pAdress,pPhone,pMobile,pWebsite,pContact,pFunction,pEmail,pSource,pSpecifySource,pProductRange,pProductNature,pActivity,pComment,pRid)
{
	try {
	    var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var strSQL = "";
	    var vRetour = "";
	    var newNRID = 0;
	
	    // Vérifier si une fiche existe déjà (basé sur Email et Company)
	    var vSQL = "SELECT COUNT(nrid) Fcount FROM sysadm.x_Sourcing WHERE Email = '" + pEmail.replace(/'/g, "''") + "' AND Company = '" + pCompany.replace(/'/g, "''") + "'";
	    var MyResults = MyQuery.ExecuteSql(vSQL);
	    var oXmlRes = InitXml(MyResults);
	    var oRows = FindItem("Flds", oXmlRes, true);
	    var NbRows = oRows.Count;
	
	    if (oRows.Count > 0) {
	        var vcount = GetItemValue("Fcount", oRows[0]);
	        
	        // Si nouvelle fiche, insérer
	        if (vcount == 0) {
	            // Générer un nouveau NRID
	            vSQL = "SELECT top 1 titulaire AS owner FROM sysadm.am0 where e_mail = '" + pEmailOwner.replace(/'/g, "''") + "' and bactive = 1 ";
	            MyResults = MyQuery.ExecuteSql(vSQL);
	            oXmlRes = InitXml(MyResults);
	            var oRows1 = FindItem("Flds", oXmlRes, true);
	            var NbRows1 = oRows1.Count;
	            if (NbRows1 == 1) {
	                pOwner = GetItemValue("owner", oRows1[0]);
	            } 
	
	            // Insérer la nouvelle fiche
	            strSQL = "INSERT INTO sysadm.x_Sourcing (" +
	                     "dmod, Company, Owner, Email_Owner, Adress, Phone, Mobile, Website, Contact, [Function], Email, Source, Specify_Source, Product_Range, Product_Nature, Activity, Comment) " +
	                     "VALUES (" +
	                     "GETDATE()," +
	                     "'" + pCompany.replace(/'/g, "''") + "'," +
	                     "'" + pOwner.replace(/'/g, "''") + "'," +
	                     "'" + pEmailOwner.replace(/'/g, "''") + "'," +
	                     "'" + pAdress.replace(/'/g, "''") + "'," +
	                     "'" + pPhone.replace(/'/g, "''") + "'," +
	                     "'" + pMobile.replace(/'/g, "''") + "'," +
	                     "'" + pWebsite.replace(/'/g, "''") + "'," +
	                     "'" + pContact.replace(/'/g, "''") + "'," +
	                     "'" + pFunction.replace(/'/g, "''") + "'," +
	                     "'" + pEmail.replace(/'/g, "''") + "'," +
	                     "'" + pSource.replace(/'/g, "''") + "'," +
	                     "'" + pSpecifySource.replace(/'/g, "''") + "'," +
	                     "'" + pProductRange.replace(/'/g, "''") + "'," +
	                     "'" + pProductNature.replace(/'/g, "''") + "'," +
	                     "'" + pActivity.replace(/'/g, "''") + "'," +
	                     "'" + pComment.replace(/'/g, "''") + "')";
	
	            MyResults = MyQuery.ExecuteSql(strSQL);
	            vRetour = "Fiche sourcing créée avec succès";
	        } else {
	            vRetour = "Erreur : Fiche existante pour cet email et cette entreprise";
	        }
	    } else {
	        vRetour = "Erreur : Impossible de vérifier l'existence de la fiche";
	    }
	} catch (e) {
	    vRetour = "Erreur WS_Cpy_Fiche_Sourcing : " + e.description.substring(0, 10000);
	} finally {
	    var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var vMethode = "WS_Cpy_Fiche_Sourcing";
	    var vXmlRequest = pCompany + ";" + pOwner + ";" + pEmailOwner + ";" + pAdress + ";" + pPhone + ";" + pMobile + ";" + pWebsite + ";" +
	                      pContact + ";" + pFunction + ";" + pEmail + ";" + pSource + ";" + pSpecifySource + ";" + pProductRange + ";" +
	                      pProductNature + ";" + pActivity + ";" + pComment + ";" + pRid;
	    vXmlRequest = vXmlRequest.replace(/'/g, "''");
	    MyQuery.ExecuteSql("INSERT INTO xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) VALUES ('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', NULL, GETDATE())");
	    FreeSelligentObject(MyQuery);
	    MyQuery.Dispose();
	    return vRetour;
	}
}