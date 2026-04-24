function WS_Quo_MAJ_Solde(pQuoOppReference,pQuoCustReference,pExtPmntSldNoDemande,pExtPmntSldStatutSolde,pExtPmntSldReponsePaiement,pExtPmntSldDateSolde,pExtPmntSldPriseChargePar,pExtPmntSldMontantSolde,pExtPmntSldDateTraitement,pExtPmntSldSoldeTraitePar,pExtPmntSldNRID,pExtPmntSldDateDemandeSolde)
{
	var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var mySelect = CreateSelligentObject("SelectionList", CurrentSessionID);
	    try {
	        // Conversion du statut SAP en libellé Selligent
	        var vStatutSolde = "";
	        switch (pExtPmntSldStatutSolde) {
	            case 'DT': vStatutSolde = 'Demande approuvée'; break;
	            case 'DC': vStatutSolde = 'Documets à corriger'; break;
	            case 'SE': vStatutSolde = 'Solde envoyé'; break;
	            case 'DS': vStatutSolde = 'Demande envoyée'; break;
	            case 'ST': vStatutSolde = 'Stand by'; break;
	            case 'AN': vStatutSolde = 'Annulé'; break;
	            default: vStatutSolde = '';
	        }
	
	        // récupération NRID offre
	        var vSql = "SELECT nrid FROM SYSADM.dc0 WHERE template is null and vos_ref = '" + pQuoCustReference + "'";
	        var MyResult = MyQryObj.ExecuteSql(vSql);
	        var MyXmlDocument = InitXml(MyResult);
	        var MyRows = FindItem("Flds", MyXmlDocument, true);
	        var vQuoNRID = GetItemValue("QuoNRID", MyXmlDocument);
	
	        var vRetour = '';
	        var mySelectionRowCollection = new SelectionRowCollection();
	        var mySelectionRow = new SelectionRow();
	
	        // Remplissage des champs
	        mySelectionRow.Fields["ExtPmntSldNoDemande"] = pExtPmntSldNoDemande || '';
	        mySelectionRow.Fields["ExtPmntSldStatutSolde"] = vStatutSolde;
	        if (pExtPmntSldDateDemandeSolde && pExtPmntSldDateDemandeSolde !== '') {
	            mySelectionRow.Fields["ExtPmntSldDateDemandeSolde"] = pExtPmntSldDateDemandeSolde;
	        }
	        if (pExtPmntSldReponsePaiement && pExtPmntSldReponsePaiement !== '') {
	            mySelectionRow.Fields["ExtPmntSldReponsePaiement"] = pExtPmntSldReponsePaiement;
	        }
	        if (pExtPmntSldDateSolde && pExtPmntSldDateSolde !== '') {
	            mySelectionRow.Fields["ExtPmntSldDateSolde"] = pExtPmntSldDateSolde;
	        }
	        if (pExtPmntSldPriseChargePar && pExtPmntSldPriseChargePar !== '') {
	            mySelectionRow.Fields["ExtPmntSldPriseChargePar"] = pExtPmntSldPriseChargePar;
	        }
	        if (pExtPmntSldMontantSolde && pExtPmntSldMontantSolde !== '') {
	            mySelectionRow.Fields["ExtPmntSldMontantSolde"] = pExtPmntSldMontantSolde;
	        }
	        if (pExtPmntSldDateTraitement && pExtPmntSldDateTraitement !== '') {
	            mySelectionRow.Fields["ExtPmntSldDateTraitement"] = pExtPmntSldDateTraitement;
	        }
	        if (pExtPmntSldSoldeTraitePar && pExtPmntSldSoldeTraitePar !== '') {
	            mySelectionRow.Fields["ExtPmntSldSoldeTraitePar"] = pExtPmntSldSoldeTraitePar;
	        }
	
	        // Vérification de l'existence de la ligne
	        var monRetour = mySelect.Open(0, 1, "SELECT no_demande, statut_solde, date_demande_solde, reponse_paiement, date_solde, prise_charge_par, montant_solde, date_traitement, solde_traite_par, nrid FROM x_paiement_solde WHERE no_demande = '" + pExtPmntSldNoDemande.replace(/'/g, "''") + "' AND dc0_nrid = '" + vQuoNRID + "'");
	        var MyXml = mySelect.GetXml("AllFields");
	        var MyXmlDoc = InitXml(MyXml);
	        var Exist = GetItemAttribute("Result", MyXmlDoc, "FullCount");
	        var selectionNRID = GetItemValue("ExtPmntSldNRID", MyXmlDoc);
	        mySelectionRow.Keys["ExtPmntSldNRID"] = selectionNRID;
	        mySelectionRow.RowState = Selligent.Application.Enum.SelectionRowState.Updated;
	        mySelectionRowCollection.Add(mySelectionRow);
	
	        if (Exist == '0') {
	            // Création d'une nouvelle ligne avec INSERT direct
	            var strSQL = "INSERT INTO sysadm.x_paiement_solde (" +
	                         "no_demande, statut_solde, date_demande_solde, reponse_paiement, date_solde, prise_charge_par, montant_solde, date_traitement, solde_traite_par, dc0_nrid) " +
	                         "VALUES (" +
	                         (pExtPmntSldNoDemande ? "'" + pExtPmntSldNoDemande.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                         (vStatutSolde ? "'" + vStatutSolde + "'" : "NULL") + ", " +
	                         (pExtPmntSldDateDemandeSolde ? "CONVERT(date, '" + pExtPmntSldDateDemandeSolde + "', 103)" : "NULL") + ", " +
	                         (pExtPmntSldReponsePaiement ? "'" + pExtPmntSldReponsePaiement.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                         (pExtPmntSldDateSolde ? "CONVERT(date, '" + pExtPmntSldDateSolde + "', 103)" : "NULL") + ", " +
	                         (pExtPmntSldPriseChargePar ? "'" + pExtPmntSldPriseChargePar.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                         (pExtPmntSldMontantSolde ? "'" + pExtPmntSldMontantSolde + "'" : "NULL") + ", " +
	                         (pExtPmntSldDateTraitement ? "CONVERT(date, '" + pExtPmntSldDateTraitement + "', 103)" : "NULL") + ", " +
	                         (pExtPmntSldSoldeTraitePar ? "'" + pExtPmntSldSoldeTraitePar.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                         "'" + vQuoNRID + "')";
	            MyResult = MyQryObj.ExecuteSql(strSQL);
	            var vDebugXmlDoc = InitXml(MyResult);
	            var rowUpdated = GetItemAttribute("Result", vDebugXmlDoc, "RowUpdated");
	            if (rowUpdated > 0) {
	                vRetour = "Solde insertion successful for no_demande: " + pExtPmntSldNoDemande;
	            } else {
	                vRetour = "Solde insertion failed for no_demande: " + pExtPmntSldNoDemande;
	            }
	        } else {
	            // Mise à jour de la ligne existante
	            MyResult = mySelect.SetAndSave(mySelectionRowCollection);
	            vRetour = "Solde update successful for no_demande: " + pExtPmntSldNoDemande;
	        }
	    } catch (e) {
	        vRetour = e.description.substring(0, 2000);
	    } finally {
	        // Journalisation
	        var vMethode = "WS_Quo_MAJ_Solde";
	        var vXmlRequest = pQuoOppReference + ";" + pQuoCustReference + ";" + pExtPmntSldNoDemande + ";" + pExtPmntSldStatutSolde + ";" + pExtPmntSldReponsePaiement + ";" + pExtPmntSldDateSolde + ";" + pExtPmntSldPriseChargePar + ";" + pExtPmntSldMontantSolde + ";" + pExtPmntSldDateTraitement + ";" + pExtPmntSldSoldeTraitePar + ";" + pExtPmntSldNRID + ";" + pExtPmntSldDateDemandeSolde;
	        vXmlRequest = vXmlRequest.replace(/'/g, "''");
	        MyQryObj.ExecuteSql("INSERT INTO xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) VALUES ('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	        MyQryObj.Dispose();
	        FreeSelligentObject(MyQryObj);
	        mySelect.Dispose();
	        FreeSelligentObject(mySelect);
	        return vRetour;
	    }
}