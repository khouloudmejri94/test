function WS_Quo_MAJ_Swift(pQuoOppReference,pQuoCustReference,pQuoExtDateSwift,pTypeSwift)
{
	try {
		if (pTypeSwift == 'SD') {
			try {
				var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
				var vRetour = '';
				var vSQL = "SELECT * FROM SYSADM.dc0 WHERE vos_ref = '" + pQuoCustReference + "'";
				var MyResult = MyQuery.ExecuteSql(vSQL);
	
				var MyXmlDocument = InitXml(MyResult);
				var MyRows = FindItem("Flds", MyXmlDocument, true);
	
				if (MyRows.Count == 1) {
					var nQuoNRID = GetItemValue("QuoNRID", MyXmlDocument);
					var objQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
					var mySelectionRow1: SelectionRow = new SelectionRow();
					objQuotation.Open(nQuoNRID);
					mySelectionRow1.Fields["QuoExtDateSwift"] = pQuoExtDateSwift;
					objQuotation.SetValues(mySelectionRow1);
					objQuotation.Save();
				} else {
					if (MyRows.Count >= 1) {
						vRetour = "Erreur : Il existe plusieurs offres avec ce numéro !! ";
					} else {
						vRetour = "Erreur : Ce numéro d'offre n’existe pas dans le CRM ! ";
					}
				}
			} catch (e) {
				vRetour = e.description.substring(0, 2000);
			} finally {
				var vMethode = "WS_Quo_MAJ_Swift";
				var vXmlRequest = pQuoOppReference + ";" + pQuoCustReference + ";" + pQuoExtDateSwift + ";" + pTypeSwift;
				vXmlRequest = vXmlRequest.replace(/'/g, "''");
				MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
				delete MyQuery;
	
				MyQuery.Dispose();
				FreeSelligentObject(MyQuery);
	
	
				return vRetour;
			}
	
	
		}
		if (pTypeSwift == 'SS') {
			try {
				var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
				var vSQL1 = "select TOP 1 S.nrid as vnrid from sysadm.x_paiement_solde S, sysadm.dc0 O where O.nrid = S.DC0_NRID and STATUT_SOLDE = 'Solde envoyé' and O.vos_ref = '" + pQuoCustReference + "' order by S.NO_DEMANDE desc";
				var oRes1 = oQryObj1.ExecuteSql(vSQL1);
				var oXmlDoc1 = InitXml(oRes1);
				var oRows1 = FindItem("Flds", oXmlDoc1, true);
				var Vsnrid = GetItemValue("vnrid", oRows1[0]);
	
				var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
				var mySelect = CreateSelligentObject("SelectionList", CurrentSessionID);
				var vRetour = '';
	
				var mySelectionRowCollection: SelectionRowCollection = new SelectionRowCollection();
				var mySelectionRow2: SelectionRow = new SelectionRow();
				mySelectionRow2.Fields["ExtPmntSldDateSwift"] = pQuoExtDateSwift;
				mySelectionRow2.Keys["ExtPmntSldNRID"] = Vsnrid;
				mySelectionRow2.RowState = Selligent.Application.Enum.SelectionRowState.Updated;
				mySelectionRowCollection.Add(mySelectionRow2);
				var monRetour = mySelect.Open(0, 1, "select DateSwift, nrid from sysadm.x_paiement_solde where nrid = '" + Vsnrid + "' ");
				mySelect.SetAndSave(mySelectionRowCollection);
	
				var MyXml = mySelect.GetXml("AllFields");
				var MyXmlDoc = InitXml(MyXml);
				if (GetItemAttribute("Result", MyXmlDoc, "FullCount") == '1') {
					vRetour = "Swift mis à jour";
				} else {
					vRetour = "Swift non mis à jour";
				}
			} catch (e) {
				vRetour = e.description.substring(0, 2000);
			} finally {
				var vMethode = "WS_Quo_MAJ_Swift";
				var vXmlRequest = pQuoOppReference + ";" + pQuoCustReference + ";" + pQuoExtDateSwift + ";" + pTypeSwift;
				vXmlRequest = vXmlRequest.replace(/'/g, "''");
				MyQryObj.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	
				MyQryObj.Dispose();
				FreeSelligentObject(MyQryObj);
				mySelect.Dispose();
				FreeSelligentObject(mySelect);
	      oQryObj1.Dispose();
				FreeSelligentObject(oQryObj1);
	
				return vRetour;
			}
		}
	} catch (e) {
		throw " WS QUO MAJ SWIFT : " + e.message;
	}
}