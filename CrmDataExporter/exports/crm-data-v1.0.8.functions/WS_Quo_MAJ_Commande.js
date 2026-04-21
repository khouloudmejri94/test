//[Start - 35221449629840 - START]
function(pQuoOppReference,pQuoCustReference,pQuoExtResDemande,pQuoExtValidComm,pQuoExtBCFourn,pQuoExtBCClient,pQuoExtDateComm,pQuoExtDateAnn,pQuoExtValeurAchat1,pQuoExtValeurVente1,pQuoExtImportateur,pQuoExtRepAnn,pQuoExtDeviseAchat,pQuoExtDeviseVente,pQuoExtStatOff,pQuoExtDelPaiRectif,pQuoExtDateEnvPO,pQuoExtDateRecPO)
{
//[Start - 35221449629840 - END]
//[Code - 35211449629840 - START]
	try {
	
	
	 var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var MyQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	
	
	 var vRepAnn = ""
	 switch (pQuoExtRepAnn) {
	  case '1':
	   vRepAnn = 'Stock Sold';
	   break;
	  case '2':
	   vRepAnn = 'Supplier refuses CQ';
	   break;
	  case '3':
	   vRepAnn = 'Registered Trademark';
	   break;
	  case '4':
	   vRepAnn = 'Supplier Trader';
	   break;
	  case '5':
	   vRepAnn = 'Volume CBM changed';
	   break;
	  case '6':
	   vRepAnn = 'Disagreement with  Supplier';
	   break;
	  case '7':
	   vRepAnn = 'Stock damaged';
	   break;
	  case '8':
	   vRepAnn = 'Supplier unreachable';
	   break;
	  case '9':
	   vRepAnn = 'Quality problem';
	   break;
	  case '10':
	   vRepAnn = 'Test report not accepted';
	   break;
	  case '11':
	   vRepAnn = 'Closed company';
	   break;
	  case '12':
	   vRepAnn = 'Other';
	   break;
	  case '13':
	   vRepAnn = 'Changement Prix CP';
	   break;
	  case '14':
	   vRepAnn = 'Changement Prix Four';
	   break;
	  case '15':
	   vRepAnn = 'Changement Référence';
	   break;
	  case '16':
	   vRepAnn = 'Modification Quantit';
	   break;
	  case '17':
	   vRepAnn = 'Modification Designation';
	   break;
	  case '18':
	   vRepAnn = 'Changement Import';
	   break;
	  case '19':
	   vRepAnn = 'Erreur Interne CLT';
	   break;
	  case '20':
	   vRepAnn = 'Changement CODE GI';
	   break;
	  case '21':
	   vRepAnn = 'Changement CAE';
	   break;
	  case '22':
	   vRepAnn = 'NON-CONFORMITÉ ECHAN';
	   break;
	  case '23':
	   vRepAnn = 'ERREUR DE SAISIE';
	   break;
	  case '24':
	   vRepAnn = 'ERREUR DE CALCUL';
	   break;
	  default:
	   '';
	 }
	
	
	 var vStatusOffre = ""
	 switch (pQuoExtStatOff) {
	  case 'VL':
	   vStatusOffre = '1. Valorisé';
	   break;
	  case 'NG':
	   vStatusOffre = '2. Négocié';
	   break;
	  case 'PE':
	   vStatusOffre = '3. Perdue';
	   break;
	  case 'AC':
	   vStatusOffre = '4. Acceptée';
	   break;
	  case 'CC':
	   vStatusOffre = '5. Commandée';
	   break;
	  case 'AN':
	   vStatusOffre = '6. Annulée';
	   break;
	  default:
	   '';
	 }
	
	
	 var vRetour = '';
	 var vSQL = "SELECT * FROM SYSADM.dc0 WHERE vos_ref = '" + pQuoCustReference + "'";
	 var MyResult = MyQryObj.ExecuteSql(vSQL);
	
	
	 var MyXmlDocument = InitXml(MyResult);
	 var MyRows = FindItem("Flds", MyXmlDocument, true);
	
	
	 if (MyRows.Count == 1) {
	  var nQuoNRID = GetItemValue("QuoNRID", MyXmlDocument);
	  var nQuoExtDateComm = GetItemValue("QuoExtDateComm", MyXmlDocument);
	  var nOldBCFrs = GetItemValue("QuoExtBCFourn", MyXmlDocument);
	  var nOldBCClt = GetItemValue("QuoExtBCClient", MyXmlDocument);
	  var nOldDateAnn = GetItemValue("QuoExtDateAnn", MyXmlDocument);
	  var nOldResDem = GetItemValue("QuoExtResDemande", MyXmlDocument);
	
	
	  var nOldDACmd = GetItemValue("QuoExtDeviseAchatCommande", MyXmlDocument);
	  var nOldVACmd = GetItemValue("QuoExtValeurAchatCommande", MyXmlDocument);
	  var nOldImportateur = GetItemValue("QuoExtImportateur", MyXmlDocument);
	  var nOldRepAnn = GetItemValue("QuoExtRepAnn", MyXmlDocument);
	
	
	  var nOldDVCmd = GetItemValue("QuoExtDeviseVenteCommande", MyXmlDocument);
	  var nOldVVCmd = GetItemValue("QuoExtValeurVenteCommande", MyXmlDocument);
	
	var nOldDelPai = GetItemValue("QuoExtDelPai", MyXmlDocument);
	
	
	  var objQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	
	
	  var mySelectionRow: SelectionRow = new SelectionRow();
	  objQuotation.Open(nQuoNRID);
	 // mySelectionRow.Fields["QuoExtResDemande"] = pQuoExtResDemande;
	
	   if (nOldResDem != '' && nOldResDem != null && nOldResDem != undefined) {
	          mySelectionRow.Fields["QuoExtResDemande"] = nOldResDem + '\r' + DateTime.Now.ToString("dd/MM/yyyy HH:mm") + ' : ' + pQuoExtResDemande;
	        } else {
	          mySelectionRow.Fields["QuoExtResDemande"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm") + ' : ' + pQuoExtResDemande;
	        }
	
	
	  mySelectionRow.Fields["QuoExtValidComm"] = pQuoExtValidComm;
	  mySelectionRow.Fields["QuoExtBCFourn"] = pQuoExtBCFourn;
	  mySelectionRow.Fields["QuoExtBCClient"] = pQuoExtBCClient;
	  if (nQuoExtDateComm == '' || nQuoExtDateComm == null) {
	   mySelectionRow.Fields["QuoExtDateComm"] = pQuoExtDateComm;
	  }
	  mySelectionRow.Fields["QuoExtDateAnn"] = pQuoExtDateAnn;
	  mySelectionRow.Fields["QuoExtValeurAchatCommande"] = pQuoExtValeurAchat1;
	  mySelectionRow.Fields["QuoExtValeurVenteCommande"] = pQuoExtValeurVente1;
	  mySelectionRow.Fields["QuoExtImportateur"] = pQuoExtImportateur;
	  mySelectionRow.Fields["QuoExtRepAnn"] = vRepAnn;
	  mySelectionRow.Fields["QuoExtDeviseAchatCommande"] = pQuoExtDeviseAchat;
	  mySelectionRow.Fields["QuoExtDeviseVenteCommande"] = pQuoExtDeviseVente;
	  mySelectionRow.Fields["QuoExtStatOff"] = vStatusOffre;
	       //HAS DEB 15/09/2020 : ajouter la date envoi et receprio PO
	        mySelectionRow.Fields["QuoExtDateEnvPO"] = pQuoExtDateEnvPO;
	        mySelectionRow.Fields["QuoExtDateRecPO"] = pQuoExtDateRecPO;
	        //HAS END 15/09/2020 : ajouter la date envoi et receprio PO
	
	
	
	        // DEB HAS : Ajouter les données de mode de paiement rectifié
	        var MyQuerMdp = CreateSelligentObject("SqlHelper", CurrentSessionID);
	        var vSqlMdp = " SELECT top 1 label as label FROM SYSADM.dcx01 WHERE code = '" + pQuoExtDelPaiRectif + "' ";
	        var MyResultMdp = MyQuerMdp.ExecuteSql(vSqlMdp);
	        var MyXmlMdp = InitXml(MyResultMdp);
	        var MyRowsMdp = FindItem("Flds", MyXmlMdp, true);
	        if (MyRowsMdp.Count == 1) {
	            var vlabel = GetItemValue("label", MyRowsMdp[0]);
	            if (nOldDelPai != vlabel) {
	              mySelectionRow.Fields["QuoExtDelPaiRectif"] = vlabel;
	            }
	        }
	        delete MyQuerMdp;
	        MyQuerMdp.Dispose();
	        FreeSelligentObject(MyQuerMdp);
	
	
	        // DEB HAS : Ajouter les données de mode de paiement rectifié
	
	
	
	
	  objQuotation.SetValues(mySelectionRow);
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
	 var vMethode = "WS_Quo_MAJ_Commande";
	 //var vXmlRequest = pQuoCustReference + ";" + pQuoExtStatOff + ";" + pQuoExtValeurAchat1 + ";" + pQuoExtValeurVente1 + ";" + pQuoExtImportateur + ";" + pQuoExtDeviseAchat + ";" + pQuoExtDeviseVente+ ";" + vRepAnn;
	
	
	 var vXmlRequest = pQuoCustReference + ";" + pQuoExtStatOff + ";" + pQuoExtBCFourn + ";" + pQuoExtBCClient + ";" + pQuoExtDateComm + ";" + pQuoExtDateAnn + ";" + pQuoExtValeurAchat1 + ";" + pQuoExtValeurVente1 + ";" + pQuoExtImportateur + ";" + pQuoExtDeviseAchat + ";" + pQuoExtDeviseVente + ";" + vRepAnn + ";" + vlabel + ";" + pQuoExtDateEnvPO + ";" + pQuoExtDateRecPO;
	
	
	
	 vXmlRequest = vXmlRequest.replace(/'/g, "''");
	 MyQryObj.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	
	
	 MyQryObj.Dispose();
	 FreeSelligentObject(MyQryObj);
	 //mySelect.Dispose();
	 //FreeSelligentObject(mySelect);
	}
	
	var vSQL1 = "SELECT * FROM SYSADM.dc0 WHERE vos_ref = '" + pQuoCustReference + "'";
	var MyResult1 = MyQryObj1.ExecuteSql(vSQL1);
	
	
	var MyXmlDocument1 = InitXml(MyResult1);
	var MyRows1 = FindItem("Flds", MyXmlDocument1, true);
	
	
	if (MyRows1.Count == 1) {
	 var vNumOffre = GetItemValue("QuoCustReference", MyXmlDocument1);
	 var vResDemande = GetItemValue("QuoExtResDemande", MyXmlDocument1);
	 var vValidComm = GetItemValue("QuoExtValidComm", MyXmlDocument1);
	 var vBCFourn = GetItemValue("QuoExtBCFourn", MyXmlDocument1);
	 var vBCClient = GetItemValue("QuoExtBCClient", MyXmlDocument1);
	 var vDateComm = GetItemValue("QuoExtDateComm", MyXmlDocument1);
	 var vDateAnn = GetItemValue("QuoExtDateAnn", MyXmlDocument1);
	 var vVACmd = GetItemValue("QuoExtValeurAchatCommande", MyXmlDocument1);
	 var vVVCmd = GetItemValue("QuoExtValeurVenteCommande", MyXmlDocument1);
	 var vImportateur = GetItemValue("QuoExtImportateur", MyXmlDocument1);
	 var vRepAnn = GetItemValue("QuoExtRepAnn", MyXmlDocument1);
	 var vDACmd = GetItemValue("QuoExtDeviseAchatCommande", MyXmlDocument1);
	 var vDVCmd = GetItemValue("QuoExtDeviseVenteCommande", MyXmlDocument1);
	 var vStatOff = GetItemValue("QuoExtStatOff", MyXmlDocument1);
	
	
	 //if ((pQuoExtValeurAchat1 != '0.00') && (nOldDACmd == null || nOldDACmd != vDACmd || nOldVACmd == null || nOldVACmd != vVACmd || nOldImportateur == null || nOldImportateur != vImportateur || nOldRepAnn == null || nOldRepAnn != vRepAnn || nOldDVCmd == null || nOldDVCmd != vDVCmd || nOldVVCmd == null || nOldVVCmd != vVVCmd || nOldBCFrs == null || nOldBCFrs != vBCFourn || nOldBCClt == null || nOldBCClt != vBCClient || (nOldDateAnn != vDateAnn && vDateAnn != null)) {
	   MyQryObj1.ExecuteSql("insert into x_commande ( NumOffre, BCClient, BCFourn, DACmd, DateAnn, DateComm, DVCmd, Importateur, RepAnn, ResDemande, StatOff, VACmd, ValidComm, VVCmd) values ('" + vNumOffre + "' ,'" + vBCClient + "' ,'" + vBCFourn + "' , '" + vDACmd + "' , '" + vDateAnn + "' , '" + vDateComm + "' , '" + vDVCmd + "' , '" + vImportateur + "' ,'" + vRepAnn + "' ,'' ,'" + vStatOff + "' , '" + vVACmd + "' ,'" + vValidComm + "' , '" + vVVCmd + "')");
	 // }
	
	
	  MyQryObj1.Dispose(); FreeSelligentObject(MyQryObj1);
	 }
	
	
	// return vRetour;
	//[Code - 35211449629840 - END]
}