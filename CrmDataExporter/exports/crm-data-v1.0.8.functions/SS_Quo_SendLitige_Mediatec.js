function(pdc0_nrid,pTypeLtg,pQualifLitige)
{
	// HAS DEB - 29/07/2024 - Envoyer les litiges vers lma mediatheque - WS Litige
	try
	{
	    //var oResponse: System.Net.HttpWebResponse;
	    var oReq: System.Net.HttpWebRequest;
	    //var oStream: System.IO.Stream; // Fournit une vue générique d'une séquence d'octets 
	    //var oStreamReader: System.IO.StreamReader; //Implements a TextReader that reads characters from a byte stream 
	
	    System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
	    var json_data = new System.Text.StringBuilder();
	    var vSQL = new System.Text.StringBuilder();
	    var jsonString = new System.Text.StringBuilder();
	    var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var MyURL = 'https://litigation.najnah.tn/api/post-litige'; // //https://contact-list-dev.najnah.tn/api/get-litige
	
	    vSQL.Append('select top 1  CONVERT(nvarchar(10), xDateLtg, 103) as DateLtgClt, no_dossier as Affair, vos_ref as Offer, XBCCLIENT as OrderBuyer, ');
	    vSQL.Append('(select top 1 trans0.lang_en from sysadm.trans0 where trans0.lang_fr = dc0.xFamille)as pRange ');
	    vSQL.Append(', so0.pays as Country ');
	
	    vSQL.Append(', so0.societe as Supplier ');
	    vSQL.Append(', (select top 1 trans0.lang_en from sysadm.trans0 where trans0.lang_fr = dc0.xTypeLtg) as TypeLtg ');
	    vSQL.Append(', (select top 1 trans0.lang_en from sysadm.trans0 where trans0.lang_fr = dc0.xQualifLitige) as QualifLitige ');
	    vSQL.Append(' from sysadm.dc0 ');
	
	    vSQL.Append('inner join sysadm.so0 on so0.nrid = dc0.so0_nrid ');
	    vSQL.Append('where so0.template is null and dc0.nrid = ');
	    vSQL.Append('\'');
	    vSQL.Append('' + pdc0_nrid + '');
	    vSQL.Append('\'');
	
	    var oRes = MyQryObj.ExecuteSql(vSQL);
	    var oXmlDoc = InitXml(oRes);
	    var oRows = FindItem("Flds", oXmlDoc, true);
	    if (oRows.Count == 1) {
	        var vDateLtgClt = GetItemValue("DateLtgClt", oRows[0]);
	        var vAffair = GetItemValue("Affair", oRows[0]);
	        var vOffer = GetItemValue("Offer", oRows[0]);
	        var vOrderBuyer = GetItemValue("OrderBuyer", oRows[0]);
	        var vpRange = GetItemValue("pRange", oRows[0]);
	        var vCountry = GetItemValue("Country", oRows[0]);
	        var vSupplier = GetItemValue("Supplier", oRows[0]);
	        /////////var vTypeLtg = GetItemValue("TypeLtg", oRows[0]);
	        /////////var vQualifLitige = GetItemValue("QualifLitige", oRows[0]);
	        var vTypeLtg = pTypeLtg;
	        var vQualifLitige = pQualifLitige;
	
	        json_data.Append('{ "Date_Ltg_Frs": "');
	        json_data.Append(vDateLtgClt);
	        json_data.Append('", "Affaire_Number": "');
	        json_data.Append(vAffair);
	        json_data.Append('", "Offer_Number": "');
	        json_data.Append(vOffer);
	        json_data.Append('", "Order_Buyer": "');
	        json_data.Append(vOrderBuyer);
	        json_data.Append('", "Product_Range": "');
	        json_data.Append(vpRange);
	        json_data.Append('", "Country": "');
	        json_data.Append(vCountry);
	        json_data.Append('", "Supplier": "');
	        json_data.Append(vSupplier);
	        json_data.Append('", "Dispute_Type": "');
	        json_data.Append(vTypeLtg);
	        json_data.Append('", "Ltg_Qualif": "');
	        json_data.Append(vQualifLitige);
	        json_data.Append('" }');
	
	        //Selligent.Library.Monitor.Tracer.Write(json_data);
	        
	        //jsonString.Append('{ "Date_Ltg_Frs": "27/09/2023", "Affaire_Number": "1086889",  "Offer_Number": "1000001396",  "Order_Buyer": "0006002738", ');
	        //jsonString.Append('"Product_Range": "DPH", "Country": "CN- CHINE", "Supplier": "STANDBY HOUSEHOLD ARTICLES LIMITED", "Dispute_Type": "Ecart Qualité", "Ltg_Qualif": "Qualité non conforme à la commande" }');
	
	        var oReq = System.Net.HttpWebRequest(System.Net.WebRequest.Create(MyURL));
	        oReq.Timeout = 60000;
	        oReq.Method = "POST";
	        oReq.ContentType = "application/json";
	
	
	        //oReq.ContentType = "application/json";
	        var oResponse: System.Net.HttpWebResponse = oReq.GetResponse();
	        var result = "";
	        return oResponse.StatusCode;
	
	        /*if (oResponse.StatusCode == 200 || oResponse.StatusCode == "OK") {
	            var oStream: System.IO.Stream;
	            var oStreamReader: System.IO.StreamReader;
	            try {
	                oStream = oResponse.GetResponseStream();
	                oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8);
	                var result = oStreamReader.ReadToEnd();
	                return result;
	                // var Doc =  arrJson.Item['message'] ;
	                // {"code":1,"message":"Appel lanc\u00e9 vers 0033612058338 \/ num\u00e9ro de poste : 614"}
	                Selligent.Library.Monitor.Tracer.Write(result);
	            } finally {
	                oResponse.Close();
	                oStreamReader.Close();
	            }
	        } else {
	            Selligent.Library.Monitor.Tracer.Write("GetResponse " + oResponse.StatusCode);
	            result = 'Erreur';
	        }
	        return result;*/
	
	
	        /*
	        //if (oResponse.StatusCode == "OK" || oResponse.StatusCode == 200) {
	        // Convertir les données JSON en tableau d'octets
	        var byteArray = System.Text.Encoding.UTF8.GetBytes(json_data);
	
	        // Définir la longueur du contenu
	        oReq.ContentLength = byteArray.Length;
	
	        // Écrire les données dans le flux de la requête
	        var dataStream = oReq.GetRequestStream();
	        dataStream.Write(byteArray, 0, byteArray.Length);
	        dataStream.Close();
	
	        oResponse = oReq.GetResponse();
	        //var oStream: System.IO.Stream;
	        //var oStreamReader: System.IO.StreamReader;
	        try {
	            oStream = oResponse.GetResponseStream();
	            oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8);
	            var result = oStreamReader.ReadToEnd();
	            //Selligent.Library.Monitor.Tracer.Write("Appel webservice Litige:" + result);
	        } finally {
	            oResponse.Close();
	            oStreamReader.Close();
	        }
	        return result;*/
	    }
	} catch (e){
	   return e.description;
	} finally {
	 FreeSelligentObject(MyQryObj);
	 MyQryObj.Dispose();
	}
	
	// HAS END - 29/07/2024 - Envoyer les litiges vers lma mediatheque - WS Litige
}