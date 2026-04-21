function(pOppRef,pStatus,pOppExtRaisonSSCom,p_XML)
{
	  /*************************************************************/
	  // Société                           : MASAO
	  // Infos Paramètres Entree           :
	  // Infos Paramètres Sortie           : 
	  // Auteur                            : KEL                                                  
	  // Date de création                  : 19/12/20112
	  // Commentaires                      : WS_Opp_MAJ
	  /*************************************************************/
		// WS OPP MAJ STAT
	var vRetour = "";
	var WSretour = "";
	var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	try {
	    var vStatusAffaire = "";
	    switch (pStatus) {
	        case '01.B':
	            vStatusAffaire = "01.B PRENEGOCIATION";
	            break;
	        case '01.C':
	            vStatusAffaire = "01.C OK POUR CRV";
	            break;
	        case '04.':
	            vStatusAffaire = "04. COMPLET";
	            break;
	        case '07.':
	            vStatusAffaire = "07. DEMANDE D'UNE OFFRE";
	            break;
	        case '08.':
	            vStatusAffaire = "08. SANS SUITE";
	            break;
	        case '12.':
	            vStatusAffaire = "12. STAND BY";
	            break;
	        case '02.':
	            vStatusAffaire = "02. NON SUIVI";
	            break;
	        default:
	            '';
	    }
	    var consulta = "SELECT * FROM SYSADM.do0 WHERE do0.ref='" + pOppRef + "'";
	    var MyResults = MyQuery.ExecuteSql(consulta);
	    var MyXmlDocument = InitXml(MyResults);
	    var MyRows = FindItem("Flds", MyXmlDocument, true);
	    if (MyRows.Count == 1) {
	        var vOppNRID = GetItemValue("OppNRID", MyXmlDocument);
	        var objAffaire = CreateSelligentObject("Opportunity", CurrentSessionID, true);
	        var mySelectionRow: SelectionRow = new SelectionRow();
	        objAffaire.Open(vOppNRID);
	        if ((mySelectionRow.Fields["OppStatus"] != vStatusAffaire) && vStatusAffaire != "") {
	            mySelectionRow.Fields["OppStatus"] = vStatusAffaire;
	        }
	        if (pOppExtRaisonSSCom != "") {
	            if (pStatus == "01.C") {
	                mySelectionRow.Fields["OppExtCommentTF"] = pOppExtRaisonSSCom;
	            } else if (pStatus == "02.") {
	                mySelectionRow.Fields["OppExtRaisonComNS"] = pOppExtRaisonSSCom;
	            } else if (pStatus == "08.") {
	                mySelectionRow.Fields["OppExtRaisonSSCom"] = pOppExtRaisonSSCom;
	            }
	        }
	        objAffaire.SetValues(mySelectionRow);
	        objAffaire.Save();
	        vRetour = "S Affaire mise à jour dans le CRM";
	    } else {
	        if (MyRows.Count >= 1) {
	            vRetour = "Erreur : Il existe plusieurs affaire avec ce numéro !! ";
	        } else {
	            vRetour = "Ce numéro d’affaire n’existe pas dans le CRM ! ";
	        }
	    }
	    WSretour = vRetour;
	} catch (e) {
	    WSretour = "ERREUR WS_Opp_MAJ_Statut " + e;
	}
	/*************************** Traitement XML QUESTION STANDBYY ******************************* */
	try {
	    var vResult = "";
	    var vdatex = "";
	    var vdatetrans = ""; 
	    var MyXmlDoc = InitXml(p_XML);
	    var MyRowsXML: System.Xml.XmlNodeList = FindItem("ZST_AGI_AFF_T_QUEST", MyXmlDoc, true);
	    var NbrOfRows = MyRowsXML.Count;
	    if (NbrOfRows == 0) {
	        vRetour += " / XML : HAS - No Questions to be cheked.";
	    } else {
	        for (var i = 0; i < NbrOfRows; i++) {
	            var vNRID = MyRowsXML[i].SelectNodes("ZID")[0].InnerText;
	            var vQUESTION = MyRowsXML[i].SelectNodes("ZQUESTION")[0].InnerText.Replace(";", "&amp;");
	            var vCATEGORIE = MyRowsXML[i].SelectNodes("ZCATEGORIE")[0].InnerText;
	            var vDEMANDEUR = MyRowsXML[i].SelectNodes("ZDEMANDEUR")[0].InnerText;
	            var vDATE_QUESTION = MyRowsXML[i].SelectNodes("ZDATEQUESTION")[0].InnerText;
	            vdatetrans = vDATE_QUESTION;
	            if (vDATE_QUESTION == '0000-00-00 00:00:00') {
	                vDATE_QUESTION = '1900-01-01 00:00:00'
	            }
	            vdatex += vdatetrans;
	            var vSQL = "select count(NRID) Fcount from sysadm.xdemande_info where template is null and idQuestionHub = '" + vNRID + "'  ";
	            var MyResults = MyQuery.ExecuteSql(vSQL);
	            var oXmlRes = InitXml(MyResults);
	            var oRows = FindItem("Flds", oXmlRes, true);
	            var NbRows = oRows.Count;
	            if (oRows.Count > 0) {
	                var vcount = GetItemValue("Fcount", oRows[0]);
	                if (vcount == 0) {
	                    var strSQL = "INSERT INTO xdemande_info (do0_nrid, idQuestionHub, date_question, question, categorie, demandeur)" +
	                        " VALUES ('" + vOppNRID + "', '" + vNRID + "','" + vdatetrans + "','" + vQUESTION.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;') + "','" + vCATEGORIE.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;') + "', '"+ vDEMANDEUR +"')";
	                    MyQuery.ExecuteSql(strSQL);
	                    vResult = "Insertion nouvelle question avec succès";
	                    vRetour += vNRID + ";" + "I" + "/";
	                } else if (vcount == 1) {
	                    var strSQL = "UPDATE xdemande_info set " +
	                    " idQuestionHub = '" + vNRID + "' , " +
	                    " date_question = '" + vdatetrans + "' , " +
	                    " question = '" + vQUESTION.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;') + "' , " +
	                    " categorie = '" + vCATEGORIE.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;') + "' , " +
	                    " demandeur = '" + vDEMANDEUR + "'  " +
	                    " where idQuestionHub = '" + vNRID + "' ";
	                    MyQuery.ExecuteSql(strSQL);
	                    vResult = "Mise à jour question avec succès";
	                    vRetour += vNRID + ";" + "U" + "/";
	                } else if (vcount > 1) {
	                    vResult = "Erreur : Il existe plusieurs questions avec cet ID !! ";
	                    vRetour += vNRID + ";" + "E" + "/";
	                }
	            }
	        }
	        WSretour += "WS_HB_RESPONSE: " + vRetour.substring(0, (vRetour.Length) - 1);
	    }
	} catch (e) {
	    vRetour = e.description.substring(0, 2000);
	} finally {
	    var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var vMethode = "WS_Opp_MAJ_Statut";
	    var vXmlRequest = pOppRef + ";" + pStatus + ";" + pOppExtRaisonSSCom + ";" + p_XML;
	    vXmlRequest = vXmlRequest.replace(/'/g, "''");
	    MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest.replace(/'/g, "''").replace(";", "&amp;") + "' , '" + WSretour.replace(/'/g, "''") + "', '" + vdatex + "' , getdate())");
	    delete MyQuery;
	    return WSretour;
	}
		return true;
}