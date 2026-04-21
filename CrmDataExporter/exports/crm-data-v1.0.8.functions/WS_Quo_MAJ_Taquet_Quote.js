function(p_RefAff,p_RefOff,pQuoExtPaysMarchandises,pQuoExtPaysProvenance,pQuoExtIncotermAchat,pQuoExtCodePaysDep,pQuoExtPort,pQuoExtValeurProforma,pQuoExtDeviseAchat,pQuoExtValeurVente1,pQuoExtDeviseVente,pQuoExtVolumeCBM,pQuoExtCoutTrans,pQuoExtAssurance,pQuoExtCoutQualite,pQuoExtCoutDouane,pQuoExtCoutTest,pQuoExtValeurAchat1,pQuoExtDiscount,p_XML)
{
	//WS QUOTE
	try {
	    var WSretour = "";
	    var vMessage = "";
	    var nQuoNRID = "";
	    var vTaquet = new System.Text.StringBuilder();
	    var objReq = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    try {
	        var vSQL = "delete from x_quotes where dc0_nrid = (select dc0.nrid from dc0 dc0 where dc0.vos_ref= '" + p_RefOff + "')";
	        var MyResults = objReq.ExecuteSql(vSQL);
	    } catch (e) {
	        return vSQL + e.description;
	    }
	
	    try {
	        var vSQL = "select top 1 dc0.nrid, dc0.do0_nrid from dc0 dc0 where dc0.vos_ref= '" + p_RefOff + "' and dc0.no_dossier = '"+ p_RefAff +"' ";
	        var MyResults = objReq.ExecuteSql(vSQL);
	        var oXmlRes = InitXml(MyResults);
	        var oNodes = FindItem("Flds", oXmlRes, true);
	        if (oNodes.Count > 0) {
	            vTaquet =  p_RefAff + ";" + p_RefOff + ";" + pQuoExtPaysMarchandises + ";" + pQuoExtPaysProvenance + ";" + pQuoExtIncotermAchat + ";" + pQuoExtCodePaysDep + ";" + pQuoExtPort + ";" + pQuoExtValeurProforma + ";" + pQuoExtDeviseAchat + ";" + pQuoExtValeurVente1 + ";" + pQuoExtDeviseVente + ";" + pQuoExtVolumeCBM + ";" + pQuoExtCoutTrans + ";" + pQuoExtAssurance + ";" + pQuoExtCoutQualite + ";" + pQuoExtCoutDouane + ";" + pQuoExtCoutTest + ";" + pQuoExtValeurAchat1
	            var nMarge = 0;
	            var vInvCountry = "";
	            var nQuoNRID = GetItemValue("QuoNRID", oNodes[0]);
	            var nQuoOppNRID = GetItemValue("QuoOppNRID", oNodes[0]);
	            //UPDATE OFFER TAQUET DETAILS//
	            var objQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	            var mySelectionRow: SelectionRow = new SelectionRow();
	            objQuotation.Open(nQuoNRID);
	            //lv_zzaffai " paramètre 1 // affair
	            //lv_zzangnr " paramètre 2 // offer
	            mySelectionRow.Fields["QuoExtPaysMarchandises"] = pQuoExtPaysMarchandises;// Zpyor   " paramètre 3
	            mySelectionRow.Fields["QuoExtPaysProvenance"] = pQuoExtPaysProvenance;// Zpypr       " paramètre 4
	            mySelectionRow.Fields["QuoExtIncotermAchat"] = pQuoExtIncotermAchat;// Inco1         " paramètre 5
	            mySelectionRow.Fields["QuoExtCodePaysDep"] = pQuoExtCodePaysDep;// Land1             " paramètre 6
	            mySelectionRow.Fields["QuoExtPort"] = pQuoExtPort;// Inco2                           " paramètre 7
	            mySelectionRow.Fields["QuoExtValeurAchat1"] = pQuoExtValeurAchat1;// Zptac           " paramètre 8
	            mySelectionRow.Fields["QuoExtDeviseAchat"] = pQuoExtDeviseAchat; //Zwaer             " paramètre 9
	            mySelectionRow.Fields["QuoExtValeurVente1"] = pQuoExtValeurVente1;//Zvvcp            " paramètre 10
	            mySelectionRow.Fields["QuoExtDeviseVente"] = pQuoExtDeviseVente;// waers             " paramètre 11
	            mySelectionRow.Fields["QuoExtVolumeCBM"] = pQuoExtVolumeCBM;// Zvolu                 " paramètre 12
	            mySelectionRow.Fields["QuoExtCoutTrans"] = pQuoExtCoutTrans;//Zfrtr                  " paramètre 13
	            mySelectionRow.Fields["QuoExtAssurance"] = pQuoExtAssurance;//Zfras                  " paramètre 14
	            if(pQuoExtCoutQualite == "0,00"){
	                mySelectionRow.Fields["QuoExtCoutQualite"] = pQuoExtCoutQualite;
	                mySelectionRow.Fields["QuoExtCQ"] = "NON";
	            } else {
	                mySelectionRow.Fields["QuoExtCoutQualite"] = pQuoExtCoutQualite;//Zfrqa          " paramètre 15
	                mySelectionRow.Fields["QuoExtCQ"] = "OUI";
	            }
	            
	            mySelectionRow.Fields["QuoExtCoutDouane"] = pQuoExtCoutDouane;//Zfrdo                " paramètre 16
	            mySelectionRow.Fields["QuoExtCoutTest"] = pQuoExtCoutTest;//Zfrrt                    " paramètre 17
	            
	            // Valeur proforma **************************************************************    " paramètre 19
	            mySelectionRow.Fields["QuoExtValeurProforma"] = pQuoExtValeurProforma;
	            
	            nMarge = parseFloat(pQuoExtValeurAchat1.replace(',','.')) - parseFloat(pQuoExtValeurProforma.replace(',','.'));
	            mySelectionRow.Fields["QuoExtValMargeNego"] = nMarge.ToString("F2");
	
	            //totalSample += parseFloat(parseFloat(sample_new).toFixed(2));
	
	            //editer le champ Pays de facturation    ***************************************     " paramètre 18
	            /*if (pQuoExtPaysFacturation == "FR") {
	                vInvCountry = "Europe";
	            } else if (pQuoExtPaysFacturation == "ZZ") {
	                vInvCountry = "Autres";
	            }
	            mySelectionRow.Fields["QuoExtPaysFacturation"] = vInvCountry;*/
	
	            /********************Other scurrecy fields = pQuoExtDeviseAchat */
	
	            mySelectionRow.Fields["QuoExtDeviseMarge"] = pQuoExtDeviseAchat;
	            mySelectionRow.Fields["QuoExtDeviseTrans"] = pQuoExtDeviseAchat;
	            mySelectionRow.Fields["QuoExtDeviseAssu"] = pQuoExtDeviseAchat;
	            mySelectionRow.Fields["QuoExtDeviseCQ"] = pQuoExtDeviseAchat;
	            mySelectionRow.Fields["QuoExtDeviseDouane"] = pQuoExtDeviseAchat;
	            mySelectionRow.Fields["QuoExtDeviseProforma"] = pQuoExtDeviseAchat;
	            mySelectionRow.Fields["QuoExtDeviseTest"] = pQuoExtDeviseAchat;
	            if (pQuoExtDiscount=="") {
	                pQuoExtDiscount='0';
	            }
	            
	            mySelectionRow.Fields["QuoExtDiscount"] = pQuoExtDiscount;
	
	            objQuotation.SetValues(mySelectionRow);
	            objQuotation.Save();
	            vMessage = "S Offer taquet details correctly updated #" + pQuoExtCoutQualite + "# ";
	        } else {
	            if (MyRows.Count >= 1) {
	                vMessage = "E Many offers having the same number ! ";
	            } else {
	                vMessage = "E Offer number does not exist on CRM ! ";
	            }
	        }
	        WSretour = vMessage;
	    } catch (e) {
	        WSretour = "E ERREUR WS_Quo_Devis_Taquet - TAQUET- " + e;
	    }
	
	    /*************************** Traitement XML QUOTE DETAILS ******************************* */
	    //QUOTE DETAILS INSERT//
	    if (nQuoNRID != "" && nQuoNRID != null && p_XML != "" && p_XML != null) {
	        var MyXmlDoc = InitXml(p_XML);
	        var MyRows: System.Xml.XmlNodeList = FindItem("ZST_DEVIS_CRM", MyXmlDoc, true);
	        var NbrOfRows = MyRows.Count;
	        //return MyXmlDoc;
	        if (NbrOfRows == 0) {
	            vMessage += "HAS Error XML: No Quote posts to be inserted.";
	        } else {
	            for (var i = 0; i < NbrOfRows; i++) {
	                //On parse le xml
	                var vZZEBELP = MyRows[i].SelectNodes("ZZEBELP")[0].InnerText;// Poste de l'offre -- xpost_nb
	                var vZZLICHA = MyRows[i].SelectNodes("ZZLICHA")[0].InnerText;//Numéro de lot fournisseur  -- xref_fournisseur
	                var vMATKL = MyRows[i].SelectNodes("MATKL")[0].InnerText;// Groupe de marchandises ---CODE ifls -- xcode_IFLS
	                var vZZDESIGN = MyRows[i].SelectNodes("ZZDESIGN")[0].InnerText.replace(/'/g, "''"); //.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;"); // Désignation futura --xdesign_noz
	                var vZZDESIGNF = MyRows[i].SelectNodes("ZZDESIGNF")[0].InnerText.replace(/'/g, "''"); //.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");// Désignation fournisseur de la référence-- xdesign_fr
	                var vGLOSSAIREF = MyRows[i].SelectNodes("GLOSSAIREF")[0].InnerText.replace(/'/g, "''"); //.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");// Glossaire français -- xgloss_fr
	                var vGLOSSAIREET = MyRows[i].SelectNodes("GLOSSAIREET")[0].InnerText.replace(/'/g, "''"); //.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");// Glossaire etranger -- xgloss_noz
	                var vZNOTE = MyRows[i].SelectNodes("ZNOTE")[0].InnerText;// Note -- xnote
	                var vZMWSKZ = MyRows[i].SelectNodes("ZMWSKZ")[0].InnerText;// Code TVA déductible -- xtva_d
	                var vMWSKZ = MyRows[i].SelectNodes("MWSKZ")[0].InnerText;// Code TVA sur C.A. -- xtva_c
	                var vQTEDI = MyRows[i].SelectNodes("QTEDI")[0].InnerText;// Quantité dispo chez le fournisseur --xqte_dispo
	                var vMEINS = MyRows[i].SelectNodes("MEINS")[0].InnerText;// Unité d'achat -- xunite_achat
	                var vZFRDE = MyRows[i].SelectNodes("ZFRDE")[0].InnerText.replace(',','.');// Montant frais de douane... -- xprc_douane
	                var vZPUMA = MyRows[i].SelectNodes("ZPUMA")[0].InnerText;// Montant Prix cp Unitaire -- xpriven_cp_mar
	                var vMENGE = MyRows[i].SelectNodes("MENGE")[0].InnerText;// Quantité de commande -- xqte_achat
	                var vMENGE_NEGO = MyRows[i].SelectNodes("MENGE_NEGO")[0].InnerText;//Quantité d’achat négociée -- xqte_nego
	                var vZFRDP = MyRows[i].SelectNodes("ZFRDP")[0].InnerText;// Montant DOUANE -- xmnt_douane
	                var vZPRUN = MyRows[i].SelectNodes("ZPRUN")[0].InnerText;// Montant PRIX ACHAT FRS UNITAIRE -- xpriach_frs
	
	                if (vZMWSKZ == '') {
	                    vZMWSKZ = 0
	                }
	                if (vMWSKZ == '') {
	                    vMWSKZ = 0
	                }
	                //Insertion d'une ligne de détail de l offre dans xdc2
	                var strSQL = "INSERT INTO x_quotes (DC0_NRID,xpost_nb, xref_fournisseur, xcode_IFLS, xdesign_noz, xdesign_fr, xgloss_fr, xgloss_noz, xnote, xtva_d, xtva_c, xqte_dispo, xunite_achat, xprc_douane, xpriven_cp_mar, xqte_achat, xqte_nego, xmnt_douane, xpriach_frs)" +
	                    " VALUES ('" + nQuoNRID + "','" + vZZEBELP + "','" + vZZLICHA + "','" + vMATKL + "','" + vZZDESIGN + "','" + vZZDESIGNF + "','" + vGLOSSAIREF + "','" + vGLOSSAIREET + "','" + vZNOTE + "','" + vZMWSKZ + "','" + vMWSKZ + "','" + vQTEDI + "','" + vMEINS + "','" + vZFRDE + "','" + vZPUMA + "','" + vMENGE + "','" + vMENGE_NEGO + "','" + vZFRDP + "','" + vZPRUN + "')";
	                objReq.ExecuteSql(strSQL);
	            }
	            vMessage += "Insertion of '"+ NbrOfRows +"' quote posts correctly done";
	        }
	        WSretour += vMessage;
	    } else {
	        vMessage = "E Error on WS parameters";
	    }
	} catch (e) {
	    WSretour += "ERREUR WS_Quo_Devis_Taquet - QUOTE - " + e;
	} finally {
	    var objReqf = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var vMethode = "ZST_DEVIS_TAQUET_CRM";
	    var vXmlRequest = vTaquet;
	    vXmlRequest = vXmlRequest.replace(/'/g, "''");
	    objReqf.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest.replace(/'/g, "''") + "' , '" + WSretour.replace(/'/g, "''") + "', null , getdate())");
	    
	    //liberer memoire pour les objets
	    FreeSelligentObject(objQuotation);
	    objQuotation.Dispose();
	    FreeSelligentObject(objReq);
	    objReq.Dispose();
	    FreeSelligentObject(objReqf);
	    objReqf.Dispose();
	}
	return WSretour;
}