function WS_Opp_InsUpdate_Offer(p_XML)
{
	
	
	
	/*var vAFFAIRE = '0001080077'
	var vAFFAIRE2 = vAFFAIRE.substring(3, 10);
	//return vAFFAIRE2;
	var objReq = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL = "select nrid from do0 where ref = '" + vAFFAIRE2 + "'  and template is null ";
	var oRes = objReq.ExecuteSql(vSQL);
	var oXmlDoc = InitXml(oRes);
	var oRows = FindItem("Flds", oXmlDoc, true);
	if (oRows.Count > 0) {
	    var NridAff = GetItemValue("OppNRID", oRows[0]);
	    var objOpp = CreateSelligentObject("Opportunity", CurrentSessionID, false);
	    var myselectionrowOpp: SelectionRow = new SelectionRow(); 
	    myselectionrowOpp.Fields["OppStatus"] = "11. SUIVI D'OFFRE(S)";
	    //myselectionrowOpp.Fields["OppExtDateEcheanceValid"] = DateTime.Now.ToString("dd/MM/yyyy");
	    objOpp.OpenSetAndSave(parseInt(NridAff), myselectionrowOpp);
	    delete objOpp;
	    objOpp.Dispose();
	    FreeSelligentObject(objOpp);
	}
	return NridAff;
	
	*/
	
	 
	
	var objReq = CreateSelligentObject("SqlHelper", CurrentSessionID);
	try {
	    var vResult = "";
	    var vRetour = "";
	    var WSretour = "";
	    var MyXmlDoc = InitXml(p_XML);
	    var MyRows: System.Xml.XmlNodeList = FindItem("ZST_SYNT_OFF", MyXmlDoc, true);
	    var NbrOfRows = MyRows.Count;
	    if (NbrOfRows == 0) {
	        return "XML Error: HAS - No Offers to be cheked.";
	    } else {
	        for (var i = 0; i < NbrOfRows; i++) {
	            var vAFFAIRE = MyRows[i].SelectNodes("AFFAIRE")[0].InnerText;
	            var vOFFRE = MyRows[i].SelectNodes("OFFRE")[0].InnerText;
	            var vCLIENT = MyRows[i].SelectNodes("CLIENT")[0].InnerText;
	            var vACHETEUR = MyRows[i].SelectNodes("ACHETEUR")[0].InnerText;
	            var vSTATUT_OFF = MyRows[i].SelectNodes("STATUT_OFF")[0].InnerText;
	            var vVALEUR_VCP = MyRows[i].SelectNodes("VALEUR_VCP")[0].InnerText;
	            var vDEVISE_VVCP = MyRows[i].SelectNodes("DEVISE_VVCP")[0].InnerText;
	            var vDATE_CMD = MyRows[i].SelectNodes("DATE_CMD")[0].InnerText;
	            var vVALEUR_VALO = MyRows[i].SelectNodes("VALEUR_VALO")[0].InnerText;
	            var vDEVISE_VALO = MyRows[i].SelectNodes("DEVISE_VALO")[0].InnerText;
	            var vVVMAG_HT = MyRows[i].SelectNodes("VVMAG_HT")[0].InnerText;
	            //var vPURCH_CURR = MyRows[i].SelectNodes("DEVISE_ACH")[0].InnerText;
	            //var vPURCH_VAL = MyRows[i].SelectNodes("ZZNETPRA")[0].InnerText;
	            var vDEVISE_VVMAG = MyRows[i].SelectNodes("DEVISE_VVMAG")[0].InnerText;
	            var vUKURS_CURR = MyRows[i].SelectNodes("UKURS_CURR")[0].InnerText;
	            var vDATE_REC = MyRows[i].SelectNodes("CPUDT")[0].InnerText;
	            if (vDATE_CMD == '0000-00-00') {
	                vDATE_CMD = '1900-01-01'
	            }
	            if (vDATE_REC == '0000-00-00') {
	                vDATE_REC = '1900-01-01'
	            }
	            
	            var vSQL = "select count(Offer) Fcount from sysadm.x_Offer_Order where template is null and Affair = '" + vAFFAIRE + "' and Offer = '" + vOFFRE + "'  ";
	            var MyResults = objReq.ExecuteSql(vSQL);
	            var oXmlRes = InitXml(MyResults);
	            var oRows = FindItem("Flds", oXmlRes, true);
	            var NbRows = oRows.Count;
	            if (oRows.Count > 0) {
	                var vcount = GetItemValue("Fcount", oRows[0]);
	                if (vcount == 0) {
	                    var strSQL = "INSERT INTO x_Offer_Order (Affair, Offer, Buyer, Client, Status, Valorisation, Valoris_Curr, Orders, Order_Curr, VVMAG_HT, UKURS_CURR, DEVISE_VVMAG, Order_Date, Rec_Date)" +
	                    " VALUES ('" + vAFFAIRE + "','" + vOFFRE + "','" + vACHETEUR + "','" + vCLIENT + "','" + vSTATUT_OFF + "','" + vVALEUR_VALO + "','" + vDEVISE_VALO + "','" + vVALEUR_VCP + "','" + vDEVISE_VVCP + "','" + vVVMAG_HT + "','" + vUKURS_CURR + "','" + vDEVISE_VVMAG + "','" + vDATE_CMD + "','" + vDATE_REC + "')";
	                    objReq.ExecuteSql(strSQL);
	                    vResult = "Insertion nouvelle offre avec succès";
	                    vRetour += vAFFAIRE + ";" + vOFFRE + ";" + "S" + "/";
	                } else if (vcount == 1) {
	                    var strSQL = "UPDATE x_Offer_Order set " +
	                    " Buyer = '" + vACHETEUR + "' , " +
	                    " Client = '" + vCLIENT + "' , " +
	                    " Status = '" + vSTATUT_OFF + "' , " +
	                    " Valorisation = '" + vVALEUR_VALO + "' , " +
	                    " Valoris_Curr = '" + vDEVISE_VALO + "' , " +
	                    " Orders = '" + vVALEUR_VCP + "', " +
	                    " Order_Curr = '" + vDEVISE_VVCP + "' , " +
	                    " Order_Date = '" + vDATE_CMD + "' , " +
	                    " VVMAG_HT = '" + vVVMAG_HT + "' , " +
	                    " UKURS_CURR = '" + vUKURS_CURR + "' , " +
	                    " DEVISE_VVMAG = '" + vDEVISE_VVMAG + "' , " +
	                    " Rec_Date = '" + vDATE_REC + "'  " +
	                    " where template is null and Affair = '" + vAFFAIRE + "' and Offer = '" + vOFFRE + "' ";
	                    objReq.ExecuteSql(strSQL);
	                    vResult = "Mise à jour Offre avec succès";
	                    vRetour += vAFFAIRE + ";" + vOFFRE + ";" + "S" + "/";
	                } else if (vcount > 1) {
	                    vResult = "Erreur : Il existe plusieurs offres avec ce numéro !! ";
	                    vRetour += vAFFAIRE + ";" + vOFFRE + ";" + "E" + "/";
	                }
	                /*********************************************************************/
	                //var vAFFAIRE2 = vAFFAIRE.substring(3, 10);
	                //var vAFFAIRE = '0001004553'
	                var vAFFAIRE2 = vAFFAIRE.ToString().substr(3);
	                var vSQL = "select nrid from do0 where ref = '" + vAFFAIRE2 + "'  and template is null ";
	                var oRes = objReq.ExecuteSql(vSQL);
	                var oXmlDoc = InitXml(oRes);
	                var oRows = FindItem("Flds", oXmlDoc, true);
	                if (oRows.Count > 0) {
	                    var NridAff = GetItemValue("OppNRID", oRows[0]);
	                    var objOpp = CreateSelligentObject("Opportunity", CurrentSessionID, false);
	                    var myselectionrowOpp: SelectionRow = new SelectionRow(); 
	                    myselectionrowOpp.Fields["OppStatus"] = "11. SUIVI D'OFFRE(S)";
	                    myselectionrowOpp.Fields["OppExtDateEcheanceValid"] = DateTime.Now.ToString("dd/MM/yyyy");
	                    objOpp.OpenSetAndSave(parseInt(NridAff), myselectionrowOpp);
	                    delete objOpp;
	                    objOpp.Dispose();
	                    FreeSelligentObject(objOpp);
	                }
	                /*********************************************************************/
	
	            }
	        }
	        WSretour += "WS_OK" + vRetour.substring(0, (vRetour.Length)-1);
	    }
	    var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZCRM_RECAP_OFF_ORD', '" + NbrOfRows + "' + ' offers to check', '" + WSretour.replace(/'/g, "''") + "', '" + p_XML + "' , getdate()) ";
	    objReq.ExecuteSql(vReqInsertLog);
	} catch (e) {
	    delete objReq;
	    return strSQL + e.description;
	}
	/*try {
	    var vAFFAIRE2 = vAFFAIRE.ToString().substring(3, 9);
	    //var vAFFAIRE = '0001080077'
	    //var vAFFAIRE2 = vAFFAIRE.substring(3, 10);
	    var vSQL = "select nrid from do0 where ref = '" + vAFFAIRE2 + "'  and template is null ";
	    var oRes = objReq.ExecuteSql(vSQL);
	    var oXmlDoc = InitXml(oRes);
	    var oRows = FindItem("Flds", oXmlDoc, true);
	    if (oRows.Count > 0) {
	        var NridAff = GetItemValue("OppNRID", oRows[0]);
	        var objOpp = CreateSelligentObject("Opportunity", CurrentSessionID, false);
	        var myselectionrowOpp: SelectionRow = new SelectionRow(); 
	        myselectionrowOpp.Fields["OppStatus"] = "11. SUIVI D'OFFRE(S)";
	        myselectionrowOpp.Fields["OppExtDateEcheanceValid"] = DateTime.Now.ToString("dd/MM/yyyy");
	        objOpp.OpenSetAndSave(parseInt(NridAff), myselectionrowOpp);
	        delete objOpp;
	        objOpp.Dispose();
	        FreeSelligentObject(objOpp);
	    }
	} catch (e) {
	    delete  objOpp;
	    return "WS Opp Inst Updt affair ST: " + e.description; 
	}*/
	delete objReq;
	objReq.Dispose();
	FreeSelligentObject(objReq);
	return WSretour;
}