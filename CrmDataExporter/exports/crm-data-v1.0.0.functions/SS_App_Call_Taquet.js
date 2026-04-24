function SS_App_Call_Taquet(pOfferNb,pRequest,pNRID)
{
	/********************************************************************
	 NRID : 42449689158944
	 Call Taquet portal API to send or retrieve Offer data
	 Params :
	   pOfferNb : Offer number
	   pRequest : I (Import) / E (Export)
	   pNRID    : NRID OF THE OFFER
	********************************************************************/
	
	var jonStr = "";
	var result = "";
	var vRetour = "";
	var vMessage = "";
	var url = Session["TAQUET_WS"];
	
	function GetJsonValue(obj, key) {
	
	    if (obj && obj[key] !== undefined && obj[key] !== null)
	        return obj[key].ToString();
	
	    return "";
	}
	
	function GetJsonDecimal(obj, key) {
	
	    if (!obj[key])
	        return "0";
	
	    return obj[key].ToString().replace('.', ',');
	}
	
	function CallAPI(method, url, payload) {
	
	    try {
	
	        var objRequest = System.Net.WebRequest.Create(url);
	        objRequest.Method = method;
	        objRequest.ContentType = "application/json";
	
	        if (payload) {
	
	            var data = System.Text.Encoding.UTF8.GetBytes(payload);
	            objRequest.ContentLength = data.Length;
	
	            var stream = objRequest.GetRequestStream();
	            stream.Write(data, 0, data.Length);
	            stream.Close();
	        }
	
	        var oResponse = objRequest.GetResponse();
	        var reader = new System.IO.StreamReader(oResponse.GetResponseStream(), System.Text.Encoding.UTF8);
	
	        var responseText = reader.ReadToEnd();
	
	        reader.Close();
	        oResponse.Close();
	
	        return responseText;
	
	    }
	    catch (err) {
	
	        if (err instanceof System.Net.WebException) {
	
	            var response = err.Response;
	
	            if (response) {
	
	                var reader = new System.IO.StreamReader(response.GetResponseStream());
	                var body = reader.ReadToEnd();
	                reader.Close();
	
	                try {
	
	                    var jsonError = Newtonsoft.Json.Linq.JObject.Parse(body);
	                    Selligent.Library.Monitor.Tracer.Write("TAQUET IMPORT|API ERROR " + response.StatusCode + " : " + jsonError["detail"]);
	                    throw new Error("KO|TAQUET IMPORT|API ERROR|Please check wheck with support team");
	
	                } catch (e) {
	                    Selligent.Library.Monitor.Tracer.Write("TAQUET IMPORT|API ERROR " + response.StatusCode + " : " + body);
	                    throw new Error("KO|TAQUET IMPORT|API ERROR|Please check wheck with support team");
	                }
	
	            } else {
	                Selligent.Library.Monitor.Tracer.Write("TAQUET IMPORT|API CONNECTION ERROR : " + err.Message);
	                throw new Error("KO|TAQUET IMPORT|API CONNECTION ERROR|Please check wheck with support team");
	            }
	        }
	
	        throw err;
	    }
	}
	
	try {
	
	    System.Net.ServicePointManager.SecurityProtocol =
	        System.Net.SecurityProtocolType.Tls |
	        System.Net.SecurityProtocolType.Tls11 |
	        System.Net.SecurityProtocolType.Tls12;
	
	    System.Net.ServicePointManager.DefaultConnectionLimit = 100;
	
	    var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	
	    /********************************************************************
	     EXPORT
	    ********************************************************************/
	    if (pRequest == "E") {
	
	        url += "api/fichetaquet/add";
	
	        var vSQL = "select dc0.NRID as pNRID, dc0.vos_ref as pOfferNb, dc0.XCLIENT as pClient," +
	                   "dc0.XACHT as pNegociator, dc0.no_dossier as pAffairNb," +
	                   "dc0.xPaysFacturation as pSupplierInvCountry," +
	                   "dc0.xDeviseVV as pPurchCurr, xTxchange as pExchangeRt," +
	                   "case xStockPrior when 1 then 'true' else 'false' end as pStockPrior," +
	                   "case when dc0.xValeurVT is null then 1 else dc0.xValeurVT end as pSalesPrice " +
	                   "from sysadm.dc0 where vos_ref='" + pOfferNb + "'";
	
	        var MyResult = MyQryObj.ExecuteSql(vSQL);
	        var xml = InitXml(MyResult);
	
	        var pNRID = GetItemValue("pNRID", xml);
	        var pClient = GetItemValue("pClient", xml);
	        var pNegociator = GetItemValue("pNegociator", xml);
	        var pAffairNb = GetItemValue("pAffairNb", xml);
	        var pSupplierInvCountry = GetItemValue("pSupplierInvCountry", xml);
	        var pPurchCurr = GetItemValue("pPurchCurr", xml);
	        var pExchangeRt = GetItemValue("pExchangeRt", xml);
	        var pSalesPrice = GetItemValue("pSalesPrice", xml);
	        var pStockPrior = GetItemValue("pStockPrior", xml);
	
	        var jon = new System.Text.StringBuilder();
	
	        jon.Append('{');
	        jon.Append('"external_id":"' + pNRID + '",');
	        jon.Append('"fiche_name":"' + pOfferNb + '",');
	        jon.Append('"user_name":"' + CurrentUserName + '",');
	        jon.Append('"client":"' + pClient + '",');
	        jon.Append('"negociator":"' + pNegociator + '",');
	        jon.Append('"affair_nb":"' + pAffairNb + '",');
	        jon.Append('"offer_nb":"' + pOfferNb + '",');
	        jon.Append('"supplier_inv_country":"' + pSupplierInvCountry + '",');
	        jon.Append('"purch_curr":"' + pPurchCurr + '",');
	        jon.Append('"exchange_rt":' + pExchangeRt + ',');
	        jon.Append('"sales_price":' + pSalesPrice + ',');
	        jon.Append('"status":"active",');
	        jon.Append('"priority":' + pStockPrior);
	        jon.Append('}');
	
	        jonStr = jon.ToString();
	
	        result = CallAPI("POST", url, jonStr);
	
	        if (result != null && result.indexOf('"success":true') != -1) {
	
	            vMessage = "Offer successfully exported to Oz Simulator";
	
	        } else {
	            throw new Error("Error : " + result);
	        }
	    }
	
	    /********************************************************************
	     IMPORT
	    ********************************************************************/
	    else {
	
	        if (!pNRID)
	            throw "Missing NRID";
	
	        vSQL = "delete from SYSADM.x_quotes where x_quotes.dc0_nrid =  '" + pNRID + "'";
	            var MyResults = MyQryObj.ExecuteSql(vSQL);
	
	        url += "api/fichetaquet/by_offer_nb/crm/" + pOfferNb;
	
	        result = CallAPI("GET", url, null);
	
	        jonStr = url ; 
	
	        if (!result || result == "")
	            throw new Error("KO|TAQUET IMPORT|Empty API response|Please check wheck with support team");
	
	        var fiches = Newtonsoft.Json.Linq.JArray.Parse(result);
	
	        if (fiches.Count == 0)
	            throw new Error("KO|TAQUET IMPORT|No data returned by API|Please check wheck with support team");
	
	        var fiche = fiches[0];
	
	        var objQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	        var mySelectionRow = new SelectionRow();
	
	        objQuotation.Open(pNRID);
	
	        // Logistics / Countries
	        mySelectionRow.Fields["QuoExtPaysMarchandises"] = GetJsonValue(fiche, "country_origin");
	        mySelectionRow.Fields["QuoExtPaysProvenance"]   = GetJsonValue(fiche, "country_boarding");
	        mySelectionRow.Fields["QuoExtIncotermAchat"]    = GetJsonValue(fiche, "incoterm");
	        mySelectionRow.Fields["QuoExtCodePaysDep"]      = GetJsonValue(fiche, "country_code");
	        mySelectionRow.Fields["QuoExtPort"]             = GetJsonValue(fiche, "loading_port");
	
	
	        // Purchase values
	        mySelectionRow.Fields["QuoExtValeurAchat1"] = GetJsonDecimal(fiche, "taquet_price");
	        mySelectionRow.Fields["QuoExtDeviseAchat"]  = GetJsonValue(fiche, "purch_curr");
	
	
	        // Sales values
	        mySelectionRow.Fields["QuoExtValeurVente1"] = GetJsonDecimal(fiche, "sales_price");
	        mySelectionRow.Fields["QuoExtDeviseVente"]  = GetJsonValue(fiche, "purch_curr");
	
	
	        // Volume / Transport
	        mySelectionRow.Fields["QuoExtVolumeCBM"] = GetJsonDecimal(fiche, "cbm_nbr");
	        mySelectionRow.Fields["QuoExtCoutTrans"] = GetJsonDecimal(fiche, "transport_total_cost");
	        mySelectionRow.Fields["QuoExtAssurance"] = GetJsonDecimal(fiche, "insurance_cost");
	
	
	        // Quality cost
	        var pQuoExtCoutQualite = GetJsonDecimal(fiche, "quality_cost");
	
	                    // Handle quality cost logic
	            if (pQuoExtCoutQualite === "0,00") {
	                mySelectionRow.Fields["QuoExtCoutQualite"] = pQuoExtCoutQualite;
	                mySelectionRow.Fields["QuoExtCQ"]          = "NON";
	            } else {
	                mySelectionRow.Fields["QuoExtCoutQualite"] = pQuoExtCoutQualite;
	                mySelectionRow.Fields["QuoExtCQ"]          = "OUI";
	            }
	
	
	        // Customs
	        mySelectionRow.Fields["QuoExtCoutDouane"] = GetJsonDecimal(fiche, "customs_duties");
	
	
	        // Test report
	        mySelectionRow.Fields["QuoExtCoutTest"] = GetJsonValue(fiche, "test_report_cost");
	
	
	        // Proforma
	        mySelectionRow.Fields["QuoExtValeurProforma"] = GetJsonDecimal(fiche, "purchase_price_pi");
	
	
	        // Discount
	        mySelectionRow.Fields["QuoExtDiscount"] = GetJsonDecimal(fiche, "discount");
	
	
	        // Priority
	        var priority = GetJsonValue(fiche, "priority");
	
	        if (priority == "true" || priority == "True")
	            mySelectionRow.Fields["QuoExtStockPrior"] = 1;
	        else
	            mySelectionRow.Fields["QuoExtStockPrior"] = 0;
	
	
	        // Margin
	        mySelectionRow.Fields["QuoExtValMargeNego"] = GetJsonDecimal(fiche, "negociation_margin");
	
	
	        // Currency mapping
	        var devise = GetJsonValue(fiche, "purch_curr");
	
	        mySelectionRow.Fields["QuoExtDeviseMarge"]    = devise;
	        mySelectionRow.Fields["QuoExtDeviseTrans"]    = devise;
	        mySelectionRow.Fields["QuoExtDeviseAssu"]     = devise;
	        mySelectionRow.Fields["QuoExtDeviseCQ"]       = devise;
	        mySelectionRow.Fields["QuoExtDeviseDouane"]   = devise;
	        mySelectionRow.Fields["QuoExtDeviseProforma"] = devise;
	        mySelectionRow.Fields["QuoExtDeviseTest"]     = devise;
	
	
	        var PosteTaquets = Newtonsoft.Json.Linq.JArray.Parse(fiche["poste_taquets"]);
	
	        if (!PosteTaquets || PosteTaquets.Count == 0)
	            throw new Error("KO|TAQUET IMPORT|There is No quote posts in your offer|Please check wheck with support team");
	
	        var inserted = 0;
	
	        for (var i = 0; i < PosteTaquets.Count; i++) {
	
	            var ligne = PosteTaquets[i];
	
	            var xqte_nego = ligne["order_quantity"];
	
	            if (xqte_nego <= 0)
	                continue;
	
	                // Vérification taux douane
	            var xprc_douane = ligne["customs_duties_prc"];
	
	            // Si undefined, null ou vide => stop et message
	            if ( !xprc_douane && xprc_douane != 0) {
	                //throw new Error("Please check empty Custom Duty Rate");
	                throw new Error("KO|TAQUET IMPORT|There is one or many empty Custom Duty Rate|Please check and update it in Oz Simulator");
	            }  
	
	            inserted++;
	
	            var sql = "INSERT INTO x_quotes (" +
	                "DC0_NRID," +
	                "xpost_nb," +
	                "xref_fournisseur," +
	                "xcode_IFLS," +
	                "xdesign_noz," +
	                "xdesign_fr," +
	                "xgloss_fr," +
	                "xgloss_noz," +
	                "xPrcTVA," +
	                "xqte_dispo," +
	                "xprc_douane," +
	                "xqte_achat," +
	                "xqte_nego," +
	                "xmnt_douane," +
	                "xprix_cp," +
	                "xpriach_frs" +
	                ") VALUES (" +
	
	                "'" + pNRID + "'," +
	                "'" + ligne["offer_post_nb"] + "'," +
	                "'" + ligne["supplier_reference"].ToString().replace(/'/g, "''") + "'," +
	                "'" + ligne["merchandise_group"].ToString().replace(/'/g, "''") + "'," +
	                "'" + ligne["post_description_noz"].ToString().replace(/'/g, "''") + "'," +
	                "'" + ligne["post_description_fr"].ToString().replace(/'/g, "''") + "'," +
	                "'" + ligne["gloss_description_fr"].ToString().replace(/'/g, "''") + "'," +
	                "'" + ligne["gloss_description_noz"].ToString().replace(/'/g, "''") + "'," +
	                "'" + ligne["per_tva"] + "'," +
	                "'" + ligne["available_quantity"] + "'," +
	                "'" + ligne["customs_duties_prc"] + "'," +
	                "'" + ligne["request_quantity"] + "'," +
	                "'" + ligne["order_quantity"] + "'," +
	                "'" + ligne["customs_duties_cost"] + "'," +
	                "'" + ligne["sales_unit_price"] + "'," +
	                "'" + ligne["purchase_unit_price"] + "'" +
	
	                ")";
	            //Selligent.Library.Monitor.Tracer.Write("TAQUET QUOTE SQL : " + sql);
	            MyQryObj.ExecuteSql(sql);
	        }
	
	        if (inserted == 0)
	            throw new Error("KO|TAQUET IMPORT|There is No quote posts with negociated quantity|Please check and update it in Oz Simulator");
	
	        Session["SAP_FICHE_TAQ"] = true;
	        objQuotation.SetValues(mySelectionRow);
	        objQuotation.Save();
	
	        //vMessage = "S Import OK : " + inserted + " lines inserted";
	        vMessage = "S|TAQUET IMPORT|This file has been correcty imported.|" + inserted + " lines inserted";
	        Selligent.Library.Monitor.Tracer.Write("TAQUET QUOTE vMessage : " + vMessage);
	    }
	
	    vRetour = vMessage;
	
	}
	catch (e) {
	
	    var errorMsg = (e.message || e || "Erreur inconnue").toString();
	
	    // On cherche si le message contient "422" (pas parfait mais souvent suffisant dans Selligent)
	    if (errorMsg.indexOf("422") !== -1 || errorMsg.indexOf("Unprocessable Entity") !== -1) {
	        /*vRetour = "KO TAQUET IMPORT : This file has a validated derogation request while having a positive margin.\n" +
	                    "\n" + 
	                  "Please ask a transport cost update via Oz Simulator";*/
	        vRetour = "KO|TAQUET IMPORT|This file has a validated derogation request while having a positive margin.|Please ask a transport cost update via Oz Simulator";          
	    } else {
	        vRetour = /* "KO TAQUET IMPORT : " +*/ errorMsg;
	    }
	}
	finally {
	
	    
	
	    var safeJson = jonStr ? jonStr.replace(/'/g, "''") : "";
	    var safeResult = vRetour ? vRetour.replace(/'/g, "''") : "";
	    var safeDebug = result ? result.replace(/'/g, "''") : "";
	
	    MyQryObj.ExecuteSql(
	        "INSERT INTO xlog_ws (xmethod,xappel,xretour,xdebug,xdate_log) VALUES (" +
	        "'SS_App_Call_Taquet'," +
	        "'" + safeJson.substring(0,500) + "'," +
	        "'" + safeResult.substring(0,200) + "'," +
	        "'" + safeDebug.substring(0,1000) + "',GETDATE())"
	    );
	
	    //Selligent.Library.Monitor.Tracer.Write("TAQUET QUOTE Finally : " + safeJson.substring(0,500) + " | " + safeResult.substring(0,200) + " | " + safeDebug.substring(0,1000));
	
	    if (MyQryObj) {
	        MyQryObj.Dispose();
	        FreeSelligentObject(MyQryObj);
	    }
	
	    return vRetour;
	}
}