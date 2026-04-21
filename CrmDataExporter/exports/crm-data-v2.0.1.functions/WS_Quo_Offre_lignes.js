function WS_Quo_Offre_lignes(p_RefSAP,p_XML)
{
	var vMessage = "";
	    var nQuoNRID = "";
	    var objReq = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    try {
	        var vSQL = "delete from xdc2 where dc0_nrid in (select dc0.nrid from dc0 dc0 where dc0.vos_ref= '" + p_RefSAP + "')";
	        var MyResults = objReq.ExecuteSql(vSQL);
	    } catch (e) {
	        FreeSelligentObject(objReq);
	        objReq.Dispose();
	        return vSQL + e.description;
	    }
	
	    try {
	        var vSQL = "select top 1 dc0.nrid from dc0 dc0 where dc0.vos_ref= '" + p_RefSAP + "'";
	        var MyResults = objReq.ExecuteSql(vSQL);
	        var oXmlRes = InitXml(MyResults);
	        var oNodes = FindItem("Flds", oXmlRes, true);
	        if (oNodes.Count > 0) {
	            var nQuoNRID = GetItemValue("QuoNRID", oNodes[0]);
	            if (nQuoNRID != "" && nQuoNRID != null && p_XML != "" && p_XML != null) {
	                var MyXmlDoc = InitXml(p_XML);
	                //var MyRows : System.Xml.XmlNodeList = FindItem("DA11", MyXmlDoc, true);
	                var MyRows: System.Xml.XmlNodeList = FindItem("ZCRM_DA11_OFFRE", MyXmlDoc, true);
	                var NbrOfRows = MyRows.Count;
	                //return MyXmlDoc;
	                if (NbrOfRows == 0) {
	                    return "Erreur XML: Aucune ligne trouvée.";
	                }
	                for (var i = 0; i < NbrOfRows; i++) {
	
	                    //Modifié par KHE le 13.06.2013
	                    //On parse le xml
	                    var vZVISUEL = MyRows[i].SelectNodes("ZVISUEL")[0].InnerText;
	                    var vZZLICHA = MyRows[i].SelectNodes("ZZLICHA")[0].InnerText;
	                    var vZZDESIGNF = MyRows[i].SelectNodes("ZZDESIGNF")[0].InnerText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;"); //.replace(/'/g, "''").replace(/&/g, "&&");
	                    //var vZZDESIGNF ="";
	                    var vZZDESIGN = MyRows[i].SelectNodes("ZZDESIGN")[0].InnerText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;"); //.replace(/'/g, "''").replace(/&/g, "&&");
	                    var vZCOULEURS = MyRows[i].SelectNodes("ZCOULEURS")[0].InnerText;
	                    var vZUNITEMES = MyRows[i].SelectNodes("ZUNITEMES")[0].InnerText;
	                    var vZLICENCE = MyRows[i].SelectNodes("ZLICENCE")[0].InnerText;
	                    var vZZDLV = MyRows[i].SelectNodes("ZZDLV")[0].InnerText;
	                    var vZNF = MyRows[i].SelectNodes("ZNF")[0].InnerText;
	
	                    var vZVOL_POIDS = MyRows[i].SelectNodes("ZVOL_POIDS")[0].InnerText;
	                    var vQTEDI = MyRows[i].SelectNodes("QTEDI")[0].InnerText;
	                    var vZZPRIVENF = MyRows[i].SelectNodes("ZZPRIVENF")[0].InnerText;
	                    var vNETPRA = MyRows[i].SelectNodes("NETPRA")[0].InnerText;
	                    var vLIBELR = MyRows[i].SelectNodes("LIBELR")[0].InnerText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;"); //.replace(/'/g, "''").replace(/&/g, "&&");
	                    var vENSEIGN = MyRows[i].SelectNodes("ENSEIGN")[0].InnerText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;"); //.replace(/'/g, "''").replace(/&/g, "&&");
	                    var vSUPPORT = MyRows[i].SelectNodes("SUPPORT")[0].InnerText;
	                    var vPRIVENAP = MyRows[i].SelectNodes("PRIVENAP")[0].InnerText;
	                    var vPRIVENM = MyRows[i].SelectNodes("PRIVENM")[0].InnerText;
	                    var vPRIVEN = MyRows[i].SelectNodes("PRIVEN")[0].InnerText;
	                    var v25ECART_PV_PM = MyRows[i].SelectNodes("_--25ECART_PV_PM")[0].InnerText;
	                    var vNETPR = MyRows[i].SelectNodes("NETPR")[0].InnerText;
	                    var v25ACHAT = MyRows[i].SelectNodes("_--25ACHAT")[0].InnerText;
	                    var vCOEFF_PV_PA = MyRows[i].SelectNodes("COEFF_PV_PA")[0].InnerText;
	                    var vZZTYPEAC = MyRows[i].SelectNodes("ZZTYPEAC")[0].InnerText;
	                    var vMENGE = MyRows[i].SelectNodes("MENGE")[0].InnerText;
	                    var v25DISPO = MyRows[i].SelectNodes("_--25DISPO")[0].InnerText;
	                    var vVAL_ACHAT = MyRows[i].SelectNodes("VAL_ACHAT")[0].InnerText;
	                    var vVAL_VENTE = MyRows[i].SelectNodes("VAL_VENTE")[0].InnerText;
	                    var vNETPRTQ = MyRows[i].SelectNodes("NETPRTQ")[0].InnerText;
	                    var vCOEFF_TAQUET = MyRows[i].SelectNodes("COEFF_TAQUET")[0].InnerText;
	                    var vMATKL = MyRows[i].SelectNodes("MATKL")[0].InnerText;
	                    var vCOLISAGE = MyRows[i].SelectNodes("COLISAGE")[0].InnerText;
	                    var vZZPERIOD = MyRows[i].SelectNodes("ZZPERIOD")[0].InnerText;
	                    var vZTYPSTOCK = MyRows[i].SelectNodes("ZTYPSTOCK")[0].InnerText;
	                    var vZZEBELP = MyRows[i].SelectNodes("ZZEBELP")[0].InnerText;
	                    var vZQTFINV = MyRows[i].SelectNodes("ZQTFINV")[0].InnerText;
	                    var vPOURCEN = MyRows[i].SelectNodes("POURCENTAGE_TVA")[0].InnerText;
	                    var vZZNETPR = MyRows[i].SelectNodes("ZZNETPR")[0].InnerText;
	                    var vWAERS = MyRows[i].SelectNodes("WAERS")[0].InnerText;
	                    var vZTAUX = MyRows[i].SelectNodes("ZTAUX_CONVERSION")[0].InnerText;
	
	                    //Insertion d'une ligne de détail de l offre dans xdc2
	                    var strSQL = "INSERT INTO xdc2 (xVisNEch, xref_fournisseur, xdesignation_fr, xdesignation_noz, xcouleurs, xunite_de_quatite, xmarques_licences, xdluo, xnon_fiscalise, xvol_poids, xqte_dispo, xtarif_fr, xprix_cession, xRelPrix, xEnsg, xSupp, xPrixApp, xPrixMar, xPrixVt, xPrcEcart, xPrixAch, xPrcAch, xCoeff, xT, xQtAch, xPrcDisp, xValAch, xValV, xPrixTqt, xCoeffTqt, xCode_IFLS, xColisage, Code_Saison , xTStck, dc0_nrid , xNum_Ligne, xQteFI, xPrcTVA, xNetPx, xDevOffre, xTxConv)" +
	                        " VALUES ('" + vZVISUEL + "','" + vZZLICHA + "','" + vZZDESIGNF + "','" + vZZDESIGN + "','" + vZCOULEURS + "','" + vZUNITEMES + "','" + vZLICENCE + "','" + vZZDLV + "','" + vZNF + "','" + vZVOL_POIDS + "','" + vQTEDI + "','" + vZZPRIVENF + "','" + vNETPRA + "',substring('" + vLIBELR + "',1,45),'" + vENSEIGN + "','" + vSUPPORT + "','" + vPRIVENAP + "','" + vPRIVENM + "','" + vPRIVEN + "','" + v25ECART_PV_PM + "','" + vNETPR + "','" + v25ACHAT + "','" + vCOEFF_PV_PA + "','" + vZZTYPEAC + "','" + vMENGE + "','" + v25DISPO + "','" + vVAL_ACHAT + "','" + vVAL_VENTE + "','" + vNETPRTQ + "','" + vCOEFF_TAQUET + "','" + vMATKL + "','" + vCOLISAGE + "','" + vZZPERIOD + "','" + vZTYPSTOCK + "','" + nQuoNRID + "','" + vZZEBELP + "','" + vZQTFINV + "','" + vPOURCEN + "','" + vZZNETPR + "','" + vWAERS + "','" + vZTAUX + "')";
	                    objReq.ExecuteSql(strSQL);
	                }
	            } else {
	                return "Erreur des paramètres d’entrés du WS";
	            }
	        } else {
	            return "Erreur l'offre " + p_RefSAP + " n'existe pas dans Selligent";
	        }
	        vMessage = "I Lignes de détails de l offre insérées avec succes.";
	    } catch (e) {
	        return strSQL + e.description;
	    } finally {
	        FreeSelligentObject(objReq);
	        objReq.Dispose();
	    }
	
	    return vMessage;
		return vMessage;
}