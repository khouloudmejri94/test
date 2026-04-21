function WS_Quo_MAJ_CQ(pQuoOppReference,pQuoCustReference,pExtCntrlQltNoCQ,pExtCntrlQltDateprevuCQ,pExtCntrlQltStatutdemCQ,pExtCntrlQltDateRec,pExtCntrlQltStatutCQ,pExtCntrlQltDateValidCQ,pExtCntrlQltCQValide,pExtCntrlQltContQualite,pExtCntrlQltRepControle,pExtCntrlQltLieuInspection,pExtCntrlQltNRID,pExtCntrlQltDateConfirmeCQ,pExtCntrlQltDateDemande,pExtCntrlQltHeureDemande,pExtCntrlQltUserDemCQ)
{
	var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var mySelect = CreateSelligentObject("SelectionList", CurrentSessionID);
	    try {
	        var vStatusCQ = "";
	        switch (pExtCntrlQltStatutCQ) {
	            case 'RE':
	                vStatusCQ = 'Réceptionné';
	                break;
	            case 'DI':
	                vStatusCQ = 'Demande Inspecteur';
	                break;
	            case 'ER':
	                vStatusCQ = 'Rapport Envoyé';
	                break;
	            case 'VT':
	                vStatusCQ = 'Validé tot';
	                break;
	            case 'VP':
	                vStatusCQ = 'Validé partiel';
	                break;
	            case 'SC':
	                vStatusCQ = 'Sans CQ';
	                break;
	            case 'NV':
	                vStatusCQ = 'Non validé';
	                break;
	            case 'CV':
	                vStatusCQ = 'Contre visite';
	                break;
	            case 'PV':
	                vStatusCQ = 'PréCQ validé';
	                break;
	            case 'PN':
	                vStatusCQ = 'PréCQ non validé';
	                break;
	            case 'AN':
	                vStatusCQ = 'Annulé';
	                break;
	            case 'VL':
	                vStatusCQ = 'Validation before Loading Check';
	                break;
	            case 'ST':
	                vStatusCQ = 'CQ Stand By';
	                break;
	            default:
	                '';
	        }
	
	        var vStatusDemCQ = "";
	        switch (pExtCntrlQltStatutdemCQ) {
	            case 'PC':
	                vStatusDemCQ = 'Demande pré-CQ';
	                break;
	            case 'CQ':
	                vStatusDemCQ = 'Demande CQ';
	                break;
	            case 'SC':
	                vStatusDemCQ = 'Demande sans CQ';
	                break;
	            case 'DC':
	                vStatusDemCQ = 'Demande contre visite';
	                break;
	            case 'LC':
	                vStatusDemCQ = 'Demande Loading Check';
	                break;
	            default:
	                '';
	        }
	
	        var vSql = " SELECT nrid FROM SYSADM.dc0 WHERE template is null and vos_ref = '" + pQuoCustReference + "' ";
	        var MyResult = MyQryObj.ExecuteSql(vSql);
	        var MyXmlDocument = InitXml(MyResult);
	        var MyRows = FindItem("Flds", MyXmlDocument, true);
	        var vQuoNRID = GetItemValue("QuoNRID", MyXmlDocument);
	
	        var vRetour = '';
	        var mySelectionRowCollection = new SelectionRowCollection();
	        var mySelectionRow = new SelectionRow();
	        mySelectionRow.Fields["ExtCntrlQltNoCQ"] = pExtCntrlQltNoCQ;
	        mySelectionRow.Fields["ExtCntrlQltDateprevuCQ"] = pExtCntrlQltDateprevuCQ;
	        mySelectionRow.Fields["ExtCntrlQltDateRec"] = pExtCntrlQltDateRec;
	        mySelectionRow.Fields["ExtCntrlQltStatutCQ"] = vStatusCQ;
	        mySelectionRow.Fields["ExtCntrlQltDateValidCQ"] = pExtCntrlQltDateValidCQ;
	        mySelectionRow.Fields["ExtCntrlQltCQValide"] = pExtCntrlQltCQValide;
	        mySelectionRow.Fields["ExtCntrlQltContQualite"] = pExtCntrlQltContQualite;
	        mySelectionRow.Fields["ExtCntrlQltRepControle"] = pExtCntrlQltRepControle;
	        mySelectionRow.Fields["ExtCntrlQltExtLieuInspection"] = pExtCntrlQltLieuInspection;
	        mySelectionRow.Fields["ExtCntrlQltDateDemande"] = pExtCntrlQltDateDemande;
	        mySelectionRow.Fields["ExtCntrlQltHeureDemande"] = pExtCntrlQltHeureDemande;
	        mySelectionRow.Fields["ExtCntrlQltUserDemCQ"] = pExtCntrlQltUserDemCQ;
	
	        var monRetour = mySelect.Open(0, 1, "select no_CQ, dateprevuCQ, statutdemCQ, dateRec, statutCQ, dateValidCQ, cQValide, contQualite, repControle, lieu_inspection, nrid, date_confirmeCQ, dateDemande, heure_demande, UserDemCQ from x_controle_qualite where no_CQ = '" + pExtCntrlQltNoCQ + "' and dc0_nrid = '" + vQuoNRID + "'");
	        var MyXml = mySelect.GetXml("AllFields");
	        var MyXmlDoc = InitXml(MyXml);
	        var Exist = GetItemAttribute("Result", MyXmlDoc, "FullCount");
	        var selectionNRID = GetItemValue("ExtCntrlQltNRID", MyXmlDoc);
	        mySelectionRow.Keys["ExtCntrlQltNRID"] = selectionNRID;
	        mySelectionRow.RowState = Selligent.Application.Enum.SelectionRowState.Updated;
	        mySelectionRowCollection.Add(mySelectionRow);
	
	        if (Exist == '0') {
	            // Création d'une nouvelle ligne avec INSERT direct
	            var strSQL = "INSERT INTO sysadm.x_controle_qualite (" +
	                         "no_CQ, dateprevuCQ, statutdemCQ, dateRec, statutCQ, dateValidCQ, cQValide, contQualite, repControle, lieu_inspection, date_confirmeCQ, dateDemande, heure_demande, UserDemCQ, dc0_nrid) " +
	                         "VALUES (" +
	                         (pExtCntrlQltNoCQ ? "'" + pExtCntrlQltNoCQ + "'" : "NULL") + ", " +
	                         (pExtCntrlQltDateprevuCQ ? "CONVERT(date, '" + pExtCntrlQltDateprevuCQ + "', 103)" : "NULL") + ", " +
	                         (vStatusDemCQ ? "'" + vStatusDemCQ + "'" : "NULL") + ", " +
	                         (pExtCntrlQltDateRec ? "CONVERT(date, '" + pExtCntrlQltDateRec + "', 103)" : "NULL") + ", " +
	                         (vStatusCQ ? "'" + vStatusCQ + "'" : "NULL") + ", " +
	                         (pExtCntrlQltDateValidCQ ? "CONVERT(date, '" + pExtCntrlQltDateValidCQ + "', 103)" : "NULL") + ", " +
	                         (pExtCntrlQltCQValide ? "'" + pExtCntrlQltCQValide + "'" : "NULL") + ", " +
	                         (pExtCntrlQltContQualite ? "'" + pExtCntrlQltContQualite.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                         (pExtCntrlQltRepControle ? "'" + pExtCntrlQltRepControle.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                         (pExtCntrlQltLieuInspection ? "'" + pExtCntrlQltLieuInspection.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                         (pExtCntrlQltDateConfirmeCQ ? "CONVERT(date, '" + pExtCntrlQltDateConfirmeCQ + "', 103)" : "NULL") + ", " +
	                         (pExtCntrlQltDateDemande ? "CONVERT(date, '" + pExtCntrlQltDateDemande + "', 103)" : "NULL") + ", " +
	                         (pExtCntrlQltHeureDemande ? "'" + pExtCntrlQltHeureDemande + "'" : "NULL") + ", " +
	                         (pExtCntrlQltUserDemCQ ? "'" + pExtCntrlQltUserDemCQ.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                         "'" + vQuoNRID + "')";
	            MyResult = MyQryObj.ExecuteSql(strSQL);
	            // Analyse du XML de vDebug pour vérifier RowUpdated
	            var vDebugXmlDoc = InitXml(MyResult);
	            var rowUpdated = GetItemAttribute("Result", vDebugXmlDoc, "RowUpdated");
	            if (rowUpdated > 0) {
	                vRetour = "Quality Control insertion successful for no_CQ: " + pExtCntrlQltNoCQ;
	            } else {
	                vRetour = "Quality Control insertion failed for no_CQ: " + pExtCntrlQltNoCQ;
	            }
	        } else {
	            MyResult = mySelect.SetAndSave(mySelectionRowCollection);
	            vRetour = "Quality Control update successful for no_CQ: " + pExtCntrlQltNoCQ;
	        }
	
	        if (vStatusCQ == 'Sans CQ') {
	            var vValidationNormes = GetItemValue("QuoExtValidationNormes", MyXmlDocument);
	            if (MyRows.Count == 1) {
	                if (vValidationNormes == '' || vValidationNormes == null || vValidationNormes == undefined) {
	                    var OP = CreateSelligentObject("Quotation", CurrentSessionID, false);
	                    var row = new SelectionRow();
	                    row.Fields["QuoExtValidationNormes"] = 'Sans Normes';
	                    OP.OpenSetAndSave(parseInt(vQuoNRID), row);
	                    OP.Dispose();
	                    FreeSelligentObject(OP);
	                }
	            }
	        }
	    } catch (e) {
	        vRetour = e.description.substring(0, 2000);
	    } finally {
	        var vMethode = "WS_Quo_MAJ_CQ";
	        var vXmlRequest = pQuoOppReference + ";" + pQuoCustReference + ";" + pExtCntrlQltNoCQ + ";" + 
	                          pExtCntrlQltDateprevuCQ + ";" + pExtCntrlQltStatutdemCQ + ";" + pExtCntrlQltDateRec + ";" + 
	                          pExtCntrlQltStatutCQ + ";" + pExtCntrlQltDateValidCQ + ";" + pExtCntrlQltCQValide + ";" + 
	                          pExtCntrlQltContQualite + ";" + pExtCntrlQltRepControle + ";" + pExtCntrlQltLieuInspection + ";" + 
	                          pExtCntrlQltNRID + ";" + pExtCntrlQltDateConfirmeCQ + ";" + pExtCntrlQltDateDemande + ";" + 
	                          pExtCntrlQltHeureDemande + ";" + pExtCntrlQltUserDemCQ;
	        vXmlRequest = vXmlRequest.replace(/'/g, "''");
	        MyQryObj.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	
	        MyQryObj.Dispose();
	        FreeSelligentObject(MyQryObj);
	        
	        mySelect.Dispose();
	        FreeSelligentObject(mySelect);
	        
	        return vRetour;
	    }
}