function SS_App_UpdateStatus(pOfferNb,pCompleted)
{
	/********************************************************************
	 NRID : 43839861298744 
	Lock / Unlock Taquet Fiche
	 Params :
	   pOfferNb  : Offer number
	   pCompleted: 1 = lock (completed) / 0 = unlock (active)
	********************************************************************/
	
	    var result = "";
	    var vRetour = "";
	    var jonStr = "";
	    var MyQryObj = null;
	
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
	
	        if (!pOfferNb)
	            throw new Error("KO|TAQUET STATUS|Missing Offer Number");
	
	        if (pCompleted != 0 && pCompleted != 1)
	            throw new Error("KO|TAQUET STATUS|Invalid completed value (must be 0 or 1)");
	
	        System.Net.ServicePointManager.SecurityProtocol =
	            System.Net.SecurityProtocolType.Tls |
	            System.Net.SecurityProtocolType.Tls11 |
	            System.Net.SecurityProtocolType.Tls12;
	
	        System.Net.ServicePointManager.DefaultConnectionLimit = 100;
	
	        var url = Session["TAQUET_WS"] +
	                  "api/fichetaquet/status?offer_nb=" + pOfferNb +
	                  "&completed=" + pCompleted;
	
	        jonStr = "URL=" + url;
	
	        result = CallAPI("POST", url, null);
	
	        var expectedStatus = (pCompleted == 1) ? '"is_locked":true' : '"is_locked":false';
	
	        if (result && result.indexOf(expectedStatus) != -1) {
	
	            vRetour = "OK|TAQUET STATUS|Fiche successfully " + (pCompleted == 1 ? "locked" : "unlocked");
	
	        } else {
	
	            throw new Error("KO|TAQUET STATUS|Status not updated correctly|" + result);
	        }
	
	    }
	    catch (e) {
	
	        var errorMsg = (e.message || e || "Erreur inconnue").toString();
	
	        if (errorMsg.indexOf("422") !== -1 || errorMsg.indexOf("Unprocessable Entity") !== -1) {
	
	            vRetour = "KO|TAQUET STATUS|Business validation error|Please check with support team";
	
	        } else {
	
	            vRetour = errorMsg;
	        }
	    }
	    finally {
	
	        try {
	
	            MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	
	            var safeJson = jonStr ? jonStr.replace(/'/g, "''") : "";
	            var safeResult = vRetour ? vRetour.replace(/'/g, "''") : "";
	            var safeDebug = result ? result.replace(/'/g, "''") : "";
	
	            MyQryObj.ExecuteSql(
	                "INSERT INTO xlog_ws (xmethod,xappel,xretour,xdebug,xdate_log) VALUES (" +
	                "'SS_App_Taquet_Status'," +
	                "'" + safeJson.substring(0,500) + "'," +
	                "'" + safeResult.substring(0,200) + "'," +
	                "'" + safeDebug.substring(0,1000) + "',GETDATE())"
	            );
	
	        } catch (logErr) {
	            Selligent.Library.Monitor.Tracer.Write("TAQUET STATUS LOG ERROR : " + logErr);
	        }
	
	        if (MyQryObj) {
	            MyQryObj.Dispose();
	            FreeSelligentObject(MyQryObj);
	        }
	
	        return vRetour;
	    }
}