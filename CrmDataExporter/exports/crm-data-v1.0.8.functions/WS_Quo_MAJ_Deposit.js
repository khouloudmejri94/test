function(pQuoOppReference,pQuoCustReference,pQuoExtDateDemDeposit,pQuoExtDateDerDemDeposit,pQuoExtDepositEnvoye,pQuoExtDateEnvoiDep,pQuoExtMontantDep,pQuoExtDevise,pQuoExtDepositSB,pQuoExtDetailsDem,pQuoExtRepPaiement)
{
	//WS_Quo_MAJ_Deposit
	    try {
	        var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	        var vRetour = '';
	        var vSQL = "SELECT * FROM SYSADM.dc0 WHERE vos_ref = '" + pQuoCustReference + "'";
	        var MyResult = MyQuery.ExecuteSql(vSQL);
	        var MyXmlDocument = InitXml(MyResult);
	        var MyRows = FindItem("Flds", MyXmlDocument, true);
	
	        if (MyRows.Count == 1) {
	            // Update existing record
	            var nQuoNRID = GetItemValue("QuoNRID", MyXmlDocument);
	            var vPremEnvDep = GetItemValue("QuoExtDateEnvoiDep", MyXmlDocument);
	            var vDernEnvDep = GetItemValue("QuoExtDateEnvoiDepDer", MyXmlDocument);
	            var vOldStandby = GetItemValue("QuoExtDateSB", MyXmlDocument);
	            var vOldMontant = GetItemValue("QuoExtMontantDep", MyXmlDocument);
	            var vOldResponse = GetItemValue("QuoExtRepPaiement", MyXmlDocument);
	            var ParseOldMontant = parseInt(vOldMontant) || 0;
	            var parseNewMontant = parseInt(pQuoExtMontantDep) || 0;
	
	            var objQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	            var mySelectionRow = new SelectionRow();
	            objQuotation.Open(nQuoNRID);
	
	            // Set QuoExtAppelDeposit to '0' as in original code
	            mySelectionRow.Fields["QuoExtAppelDeposit"] = '0';
	
	            // Update fields
	            if (pQuoExtDepositEnvoye != '' && pQuoExtDepositEnvoye != null && pQuoExtDepositEnvoye != undefined) {
	                mySelectionRow.Fields["QuoExtDepositEnvoye"] = pQuoExtDepositEnvoye;
	            }
	
	            // Date handling for first and second deposit dates
	            if (pQuoExtDateEnvoiDep != '' && pQuoExtDateEnvoiDep != null && pQuoExtDateEnvoiDep != undefined) {
	                if (parseNewMontant > ParseOldMontant) {
	                    if (vPremEnvDep == '' || vPremEnvDep == null || vPremEnvDep == undefined) {
	                        if (vOldStandby == '' || vOldStandby == null || vOldStandby == undefined) {
	                            mySelectionRow.Fields["QuoExtDateEnvoiDep"] = pQuoExtDateEnvoiDep;
	                        } else {
	                            mySelectionRow.Fields["QuoExtDateEnvoiDepDer"] = pQuoExtDateEnvoiDep;
	                        }
	                    } else {
	                        mySelectionRow.Fields["QuoExtDateEnvoiDepDer"] = pQuoExtDateEnvoiDep;
	                    }
	                }
	            }
	
	            // Update deposit request date
	            if (pQuoExtDateDemDeposit != '' && pQuoExtDateDemDeposit != null && pQuoExtDateDemDeposit != undefined) {
	                mySelectionRow.Fields["QuoExtDateDemDeposit"] = pQuoExtDateDemDeposit;
	            }
	
	            if (pQuoExtDateDerDemDeposit != '' && pQuoExtDateDerDemDeposit != null && pQuoExtDateDerDemDeposit != undefined) {
	                mySelectionRow.Fields["QuoExtDateDemDepositDer"] = pQuoExtDateDerDemDeposit;
	            }
	
	            // Update details field
	            if (pQuoExtDetailsDem != '' && pQuoExtDetailsDem != null && pQuoExtDetailsDem != undefined) {
	                mySelectionRow.Fields["QuoExtDetailsDem"] = pQuoExtDetailsDem.replace(/[&\\\#,+()~%."*?<>{}]/g, "");
	            }
	
	            if (pQuoExtMontantDep != '' && pQuoExtMontantDep != null && pQuoExtMontantDep != undefined) {
	                mySelectionRow.Fields["QuoExtMontantDep"] = pQuoExtMontantDep;
	            }
	
	            if (pQuoExtDevise != '' && pQuoExtDevise != null && pQuoExtDevise != undefined) {
	                mySelectionRow.Fields["QuoExtDevise"] = pQuoExtDevise;
	            }
	
	            if (pQuoExtDepositSB != '' && pQuoExtDepositSB != null && pQuoExtDepositSB != undefined) {
	                mySelectionRow.Fields["QuoExtDepositSB"] = pQuoExtDepositSB;
	            }
	
	            if (pQuoExtDepositSB == '1' && (mySelectionRow.Fields["QuoExtDateSB"] == null || mySelectionRow.Fields["QuoExtDateSB"] == '')) {
	                mySelectionRow.Fields["QuoExtDateSB"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	            }
	
	            // Payment response concatenation
	            if (pQuoExtRepPaiement != '' && pQuoExtRepPaiement != null && pQuoExtRepPaiement != undefined) {
	                if (vOldResponse != '' && vOldResponse != null && vOldResponse != undefined) {
	                    var ArrResponse = vOldResponse.split("\r");
	                    var count = ArrResponse.length;
	                    var lastRow = ArrResponse[count - 1];
	                    var lastRow1 = lastRow.substr(19);
	                    if (lastRow1 != pQuoExtRepPaiement) {
	                        mySelectionRow.Fields["QuoExtRepPaiement"] = vOldResponse + '\r' + DateTime.Now.ToString("dd/MM/yyyy HH:mm") + ' : ' + pQuoExtRepPaiement;
	                    }
	                } else {
	                    mySelectionRow.Fields["QuoExtRepPaiement"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm") + ' : ' + pQuoExtRepPaiement;
	                }
	            }
	
	            objQuotation.SetValues(mySelectionRow);
	            objQuotation.Save();
	            vRetour = "Mise à jour effectuée avec succès.";
	        } else if (MyRows.Count == 0) {
	            vRetour = "Erreur : Ce numéro d'offre n’existe pas dans le CRM ! ";
	        } else {
	            vRetour = "Erreur : Il existe plusieurs offres avec ce numéro !! ";
	        }
	    } catch (e) {
	        vRetour = e.description.substring(0, 2000);
	    } finally {
	        var vMethode = "WS_Quo_MAJ_Deposit";
	        var vXmlRequest = pQuoOppReference + ";" + pQuoCustReference + ";" + pQuoExtDateDemDeposit + ";" + pQuoExtDateDerDemDeposit + ";" + pQuoExtDepositEnvoye + ";" + pQuoExtDateEnvoiDep + ";" + pQuoExtMontantDep + ";" + pQuoExtDevise + ";" + pQuoExtDepositSB + ";" + pQuoExtDetailsDem + ";" + pQuoExtRepPaiement;
	        vXmlRequest = vXmlRequest.replace(/'/g, "''");
	        MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	        delete MyQuery;
	        MyQuery.Dispose();
	        FreeSelligentObject(MyQuery);
	        return vRetour;
	    }
}