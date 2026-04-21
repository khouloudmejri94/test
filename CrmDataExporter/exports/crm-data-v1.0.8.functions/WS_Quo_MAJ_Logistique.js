function(pQuoOppReference,pQuoCustReference,pExtLgstqNoBooking,pExtLgstqStatutBooking,pExtLgstqDateBooking,pExtLgstqDateFacturation,pExtLgstqETD,pExtLgstqETA,pExtLgstqDateLivraison,pExtLgstqValidateurBooking,pExtLgstqReponseBooking,pExtLgstqDateAnnulation,pExtLgstqDateFinConsolid,pExtLgstqDateDebConsolid,pExtLgstqDateSB,pExtLgstqDateFinSB,pExtLgstqDateDerSB,pExtLgstqNRID,pExtLgstqDateDemandeBooking,pExtLgstqVolumeCBM,pExtLgstqNomContact,pExtLgstqAdresse,pExtLgstqNumTel,pExtLgstqMail,pExtLgstqCodePaysDep,pExtLgstqPortChargement)
{
	var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var mySelect = CreateSelligentObject("SelectionList", CurrentSessionID);
	try {
	    var vStatutBooking = "";
	    switch (pExtLgstqStatutBooking) {
	        case 'DB':
	            vStatutBooking = 'Demande de booking';
	            break;
	        case 'SL':
	            vStatutBooking = 'Soldé';
	            break;
	        case 'PR':
	            vStatutBooking = 'Partiel';
	            break;
	        case 'SB':
	            vStatutBooking = 'Stand by';
	            break;
	        case 'AN':
	            vStatutBooking = 'Annulé';
	            break;
	        case 'CI':
	            vStatutBooking = 'Consolidation en cours';
	            break;
	        default:
	            '';
	    }
	
	    var vSql = "SELECT nrid FROM SYSADM.dc0 WHERE template is null and vos_ref = '" + pQuoCustReference + "'";
	    var MyResult = MyQryObj.ExecuteSql(vSql);
	    var MyXmlDocument = InitXml(MyResult);
	    var MyRows = FindItem("Flds", MyXmlDocument, true);
	    var vQuoNRID = GetItemValue("QuoNRID", MyXmlDocument);
	
	    var vRetour = '';
	    var mySelectionRowCollection = new SelectionRowCollection();
	    var mySelectionRow = new SelectionRow();
	    mySelectionRow.Fields["ExtLgstqNoBooking"] = pExtLgstqNoBooking;
	    mySelectionRow.Fields["ExtLgstqStatutBooking"] = vStatutBooking;
	    if (pExtLgstqDateBooking != '' && pExtLgstqDateBooking != null && pExtLgstqDateBooking != undefined) {
	        mySelectionRow.Fields["ExtLgstqDateBooking"] = pExtLgstqDateBooking;
	    }
	    mySelectionRow.Fields["ExtLgstqDateFacturation"] = pExtLgstqDateFacturation;
	    mySelectionRow.Fields["ExtLgstqETD"] = pExtLgstqETD;
	    mySelectionRow.Fields["ExtLgstqETA"] = pExtLgstqETA;
	    mySelectionRow.Fields["ExtLgstqDateLivraison"] = pExtLgstqDateLivraison;
	    mySelectionRow.Fields["ExtLgstqValidateurBooking"] = pExtLgstqValidateurBooking;
	    mySelectionRow.Fields["ExtLgstqReponseBooking"] = pExtLgstqReponseBooking;
	    mySelectionRow.Fields["ExtLgstqDateFinSB"] = pExtLgstqDateFinSB;
	    mySelectionRow.Fields["ExtLgstqDateSB"] = pExtLgstqDateSB;
	    mySelectionRow.Fields["ExtLgstqDateFinConsolid"] = pExtLgstqDateFinConsolid;
	    mySelectionRow.Fields["ExtLgstqDateDebConsolid"] = pExtLgstqDateDebConsolid;
	    if (pExtLgstqStatutBooking == 'AN') {
	        mySelectionRow.Fields["ExtLgstqDateAnnulation"] = pExtLgstqDateAnnulation;
	    }
	    mySelectionRow.Fields["ExtLgstqDateDerSB"] = pExtLgstqDateDerSB;
	    mySelectionRow.Fields["ExtLgstqDateDemandeBooking"] = pExtLgstqDateDemandeBooking;
	    mySelectionRow.Fields["ExtLgstqVolumeCBM"] = pExtLgstqVolumeCBM;
	    mySelectionRow.Fields["ExtLgstqNomContact"] = pExtLgstqNomContact;
	    // Troncature de pExtLgstqAdresse à 180 caractères
	    mySelectionRow.Fields["ExtLgstqAdresse"] = pExtLgstqAdresse ? pExtLgstqAdresse.substring(0, 180) : '';
	    mySelectionRow.Fields["ExtLgstqNumTel"] = pExtLgstqNumTel;
	    mySelectionRow.Fields["ExtLgstqMail"] = pExtLgstqMail;
	    mySelectionRow.Fields["ExtLgstqCodePaysDep"] = pExtLgstqCodePaysDep;
	    mySelectionRow.Fields["ExtLgstqPortChargement"] = pExtLgstqPortChargement;
	
	    var monRetour = mySelect.Open(0, 1, "select no_booking, statut_Booking, date_booking, date_facturation, etd, eta, date_livraison, validateur_booking, reponse_booking, Date_SB, Date_fin_SB, Date_Deb_Consolid, Date_Fin_Consolid, Date_Annulation, Date_der_SB, date_demande_booking, volume_CBM, nomContact, adresse, numTel, mail, code_paysDep, port_chargement, nrid from x_logistique where no_booking = '" + pExtLgstqNoBooking + "' and dc0_nrid = '" + vQuoNRID + "'");
	    var MyXml = mySelect.GetXml("AllFields");
	    var MyXmlDoc = InitXml(MyXml);
	    var Exist = GetItemAttribute("Result", MyXmlDoc, "FullCount");
	    var selectionNRID = GetItemValue("ExtLgstqNRID", MyXmlDoc);
	    mySelectionRow.Keys["ExtLgstqNRID"] = selectionNRID;
	    mySelectionRow.RowState = Selligent.Application.Enum.SelectionRowState.Updated;
	    mySelectionRowCollection.Add(mySelectionRow);
	
	    if (Exist == '0') {
	        // Création d'une nouvelle ligne avec INSERT direct
	        var strSQL = "INSERT INTO sysadm.x_logistique (" +
	                     "no_booking, statut_Booking, date_booking, date_facturation, etd, eta, date_livraison, validateur_booking, reponse_booking, Date_SB, Date_fin_SB, Date_Deb_Consolid, Date_Fin_Consolid, Date_Annulation, Date_der_SB, date_demande_booking, volume_CBM, nomContact, adresse, numTel, mail, code_paysDep, port_chargement, dc0_nrid) " +
	                     "VALUES (" +
	                     (pExtLgstqNoBooking ? "'" + pExtLgstqNoBooking + "'" : "NULL") + ", " +
	                     (vStatutBooking ? "'" + vStatutBooking + "'" : "NULL") + ", " +
	                     (pExtLgstqDateBooking ? "CONVERT(date, '" + pExtLgstqDateBooking + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqDateFacturation ? "CONVERT(date, '" + pExtLgstqDateFacturation + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqETD ? "CONVERT(date, '" + pExtLgstqETD + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqETA ? "CONVERT(date, '" + pExtLgstqETA + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqDateLivraison ? "CONVERT(date, '" + pExtLgstqDateLivraison + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqValidateurBooking ? "'" + pExtLgstqValidateurBooking.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                     (pExtLgstqReponseBooking ? "'" + pExtLgstqReponseBooking.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                     (pExtLgstqDateSB ? "CONVERT(date, '" + pExtLgstqDateSB + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqDateFinSB ? "CONVERT(date, '" + pExtLgstqDateFinSB + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqDateDebConsolid ? "CONVERT(date, '" + pExtLgstqDateDebConsolid + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqDateFinConsolid ? "CONVERT(date, '" + pExtLgstqDateFinConsolid + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqDateAnnulation ? "CONVERT(date, '" + pExtLgstqDateAnnulation + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqDateDerSB ? "CONVERT(date, '" + pExtLgstqDateDerSB + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqDateDemandeBooking ? "CONVERT(date, '" + pExtLgstqDateDemandeBooking + "', 103)" : "NULL") + ", " +
	                     (pExtLgstqVolumeCBM ? "'" + pExtLgstqVolumeCBM + "'" : "NULL") + ", " +
	                     (pExtLgstqNomContact ? "'" + pExtLgstqNomContact.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                     (pExtLgstqAdresse ? "'" + pExtLgstqAdresse.substring(0, 180).replace(/'/g, "''") + "'" : "NULL") + ", " +
	                     (pExtLgstqNumTel ? "'" + pExtLgstqNumTel.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                     (pExtLgstqMail ? "'" + pExtLgstqMail.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                     (pExtLgstqCodePaysDep ? "'" + pExtLgstqCodePaysDep.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                     (pExtLgstqPortChargement ? "'" + pExtLgstqPortChargement.replace(/'/g, "''") + "'" : "NULL") + ", " +
	                     "'" + vQuoNRID + "')";
	        MyResult = MyQryObj.ExecuteSql(strSQL);
	        var vDebugXmlDoc = InitXml(MyResult);
	        var rowUpdated = GetItemAttribute("Result", vDebugXmlDoc, "RowUpdated");
	        if (rowUpdated > 0) {
	            vRetour = "Logistique insertion successful for no_booking: " + pExtLgstqNoBooking;
	        } else {
	            vRetour = "Logistique insertion failed for no_booking: " + pExtLgstqNoBooking;
	        }
	    } else {
	        MyResult = mySelect.SetAndSave(mySelectionRowCollection);
	        vRetour = "Logistique update successful for no_booking: " + pExtLgstqNoBooking;
	    }
	} catch (e) {
	    vRetour = e.description.substring(0, 2000);
	} finally {
	    var vMethode = "WS_Quo_MAJ_Logistique";
	    var vXmlRequest = pQuoOppReference + ";" + pQuoCustReference + ";" + pExtLgstqNoBooking + ";" + pExtLgstqStatutBooking + ";" + pExtLgstqDateBooking + ";" + pExtLgstqDateFacturation + ";" + pExtLgstqETD + ";" + pExtLgstqETA + ";" + pExtLgstqDateLivraison + ";" + pExtLgstqValidateurBooking + ";" + pExtLgstqReponseBooking + ";" + pExtLgstqDateSB + ";" + pExtLgstqDateFinSB + ";" + pExtLgstqDateDebConsolid + ";" + pExtLgstqDateFinConsolid + ";" + pExtLgstqDateAnnulation + ";" + pExtLgstqDateDerSB + ";" + pExtLgstqNRID + ";" + pExtLgstqDateDemandeBooking + ";" + pExtLgstqVolumeCBM + ";" + pExtLgstqNomContact + ";" + pExtLgstqAdresse + ";" + pExtLgstqNumTel + ";" + pExtLgstqMail + ";" + pExtLgstqCodePaysDep + ";" + pExtLgstqPortChargement;
	    vXmlRequest = vXmlRequest.replace(/'/g, "''");
	    MyQryObj.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	    FreeSelligentObject(MyQryObj);
	    MyQryObj.Dispose();
	    FreeSelligentObject(mySelect);
	    mySelect.Dispose();
	    return vRetour;
	}
}