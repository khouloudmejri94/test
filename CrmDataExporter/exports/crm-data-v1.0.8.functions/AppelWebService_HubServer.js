function(pReference,ParamWS)
{
	System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
	// Appel Webservice HUB TOKEN FINAL 26/05/2021 08H15
	var no_HUB_WS = false;
	try {
	 var MyURL = Session["HUB_WS"];
	} catch (e) {
	 no_HUB_WS = true;
	}
	var objSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	//HASV9 var MyURL = 'http://172.31.101.101/hub-api/public/index.php/soap';
	//var MyURL = 'http://srv-hubdev-01/hub-api/public/index.php/soap';
	var vMethode = "";
	var vLogin = 'ozeoluser';
	var vPassword = 'fXyp^F^jfPIS';
	var t_data = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:hubaffairwsdl">'
	t_data += '<soapenv:Header/>'
	t_data += '<soapenv:Body>'
	t_data += '<urn:Login_Auth soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'
	t_data += '<username xsi:type="xsd:string">' + vLogin + '</username>'
	t_data += '<password xsi:type="xsd:string">' + vPassword + '</password>'
	t_data += '</urn:Login_Auth>'
	t_data += '</soapenv:Body>'
	t_data += '</soapenv:Envelope>'
	//System.Net.WebRequest.DefaultWebProxy = new System.Net.WebProxy("127.0.0.1", 8888);
	var oReq: System.Net.HttpWebRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(MyURL));
	oReq.Timeout = 60000;
	//oReq.Method = "POST";
	//oReq.Credentials = new System.Net.NetworkCredential("SP_ADMIN", "4Dm1N5p@!");
	oReq.set_Method("POST");
	oReq.set_ContentType("text/xml; charset=UTF-8");
	var data = System.Text.Encoding.ASCII.GetBytes(t_data);
	oReq.ContentLength = data.Length;
	var stream = oReq.GetRequestStream();
	stream.Write(data, 0, data.Length);
	stream.Close();
	var oResponse: System.Net.HttpWebResponse = oReq.GetResponse();
	//if (oResponse.StatusCode == 200) {
	var oStream: System.IO.Stream;
	var oStreamReader: System.IO.StreamReader;
	try {
	 oStream = oResponse.GetResponseStream();
	 oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8);
	 var result = oStreamReader.ReadToEnd();
	 var objXml = new XmlDocument();
	 objXml.LoadXml(result);
	 //return objXml.SelectSingleNode("//Result").InnerText;
	 var vToken = objXml.SelectSingleNode("//return").InnerText;
	 Selligent.Library.Monitor.Tracer.Write(result);
	} finally {
	 oResponse.Close();
	 oStreamReader.Close();
	}
	//} else {
	// Selligent.Library.Monitor.Tracer.Write("GetResponse " + oResponse.StatusCode);
	// result = 'Erreur';
	//}
	if (ParamWS == 'Lot') {
	 vMethode = 'Add_Lot';
	 var vSQL = "select convert(varchar, xDate_Publication, 105) as OppExtDatePublication, sujet as OppComment, xQuantite_Totale as OppExtQuantiteTotale, xCode_pays_depart as OppExtCodePaysDepart, xport_depart as OppExtPortDepart, xFamille as OppExtFamille, xCategorie as OppExtCategorie, substring (Base64, 11, LEN(Base64)) as Base64   from do0  left join x_Photo on do0.nrid = x_Photo.do0_nrid and x_Photo.type = 'Ph'  where ref = '" + pReference + "' ";
	 var MyResult = objSQL.ExecuteSql(vSQL);
	 var MyXmlDocument = InitXml(MyResult);
	 var DatePub = GetItemValue("OppExtDatePublication", MyXmlDocument);
	 var Reference = GetItemValue("OppComment", MyXmlDocument);
	 var Quantite = GetItemValue("OppExtQuantiteTotale", MyXmlDocument);
	 var Pays = GetItemValue("OppExtCodePaysDepart", MyXmlDocument);
	 var Port = GetItemValue("OppExtPortDepart", MyXmlDocument);
	 var Famille = GetItemValue("OppExtFamille", MyXmlDocument);
	 var Categorie = GetItemValue("OppExtCategorie", MyXmlDocument);
	 var Photo = GetItemValue("Base64", MyXmlDocument);
	 if (DatePub == null) DatePub = "";
	 if (Reference == null) Reference = "";
	 if (Quantite == null) Quantite = "";
	 if (Pays == null) Pays = "";
	 if (Port == null) Port = "";
	 if (Famille == null) Famille = "";
	 if (Categorie == null) Categorie = "";
	 if (Photo == null) Photo = "";
	 /*var vcatg = 'Autres';
	 if (Categorie == 'Agroalimentaire' || Categorie == 'Armes et munitions' || Categorie == 'Bieres - Cidres') {
	  vcatg = Categorie;
	 }*/
	 //var MyURL = 'http://srv-hubdev-01/hub-api/public/soap/';
	 var p_data = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:hubaffairwsdl">';
	 p_data += '<soapenv:Header/>';
	 p_data += '<soapenv:Body>';
	 p_data += '<urn:Add_Lot soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">';
	 p_data += '<nAffaire xsi:type="xsd:string">' + pReference + '</nAffaire>';
	 p_data += '<Token xsi:type="xsd:string">' + vToken + '</Token>'
	 p_data += '<Reference xsi:type="xsd:string">' + Reference.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Reference>';
	 p_data += '<Quantite xsi:type="xsd:string">' + Quantite + '</Quantite>';
	 p_data += '<DatePub xsi:type="xsd:string">' + DatePub + '</DatePub>';
	 p_data += '<Pays xsi:type="xsd:string">' + Pays + '</Pays>';
	 p_data += '<Port xsi:type="xsd:string">' + Port + '</Port>';
	 p_data += '<Famille xsi:type="xsd:string">' + Famille + '</Famille>';
	 p_data += '<Categorie xsi:type="xsd:string">' + Categorie + '</Categorie>';
	 p_data += '<Phitem xsi:type="urn:Photos" xmlns:urn="urn:hubaffairservicewsdl">';
	 p_data += ' <item xsi:type="xsd:string">' + Photo + '</item>';
	 p_data += '</Phitem>';
	 p_data += '<Pjitem xsi:type="urn:Pieces" xmlns:urn="urn:hubaffairservicewsdl">';
	 p_data += '<item xsi:type="xsd:string">?</item>';
	 p_data += '</Pjitem>';
	 p_data += '</urn:Add_Lot>';
	 p_data += '</soapenv:Body>';
	 p_data += '</soapenv:Envelope>';
	 //var MyURI = "https://intuiz.altares.fr/iws-v3.12/services/CallistoIdentite.CallistoIdentiteHttpsSoap11Endpoint/";
	} else if (ParamWS == 'UpdtLot') {
	 vMethode = 'Update_Lot';
	 var vSQL = "select top 1 convert(varchar, xDate_Publication, 105) as OppExtDatePublication, sujet as OppComment, xQuantite_Totale as OppExtQuantiteTotale, xCode_pays_depart as OppExtCodePaysDepart, xport_depart as OppExtPortDepart, xFamille as OppExtFamille, xCategorie as OppExtCategorie, substring (Base64, 11, LEN(Base64)) as Base64   from do0  left join x_Photo on do0.nrid = x_Photo.do0_nrid  and x_Photo.type = 'Ph' where ref = '" + pReference + "' order by x_Photo.dmod desc ";
	 var MyResult = objSQL.ExecuteSql(vSQL);
	 var MyXmlDocument = InitXml(MyResult);
	 var DatePub = GetItemValue("OppExtDatePublication", MyXmlDocument);
	 var Reference = GetItemValue("OppComment", MyXmlDocument);
	 var Quantite = GetItemValue("OppExtQuantiteTotale", MyXmlDocument);
	 var Pays = GetItemValue("OppExtCodePaysDepart", MyXmlDocument);
	 var Port = GetItemValue("OppExtPortDepart", MyXmlDocument);
	 var Famille = GetItemValue("OppExtFamille", MyXmlDocument);
	 var Categorie = GetItemValue("OppExtCategorie", MyXmlDocument);
	 var Photo = GetItemValue("Base64", MyXmlDocument);
	 if (DatePub == null) DatePub = "";
	 if (Reference == null) Reference = "";
	 if (Quantite == null) Quantite = "";
	 if (Pays == null) Pays = "";
	 if (Port == null) Port = "";
	 if (Famille == null) Famille = "";
	 if (Categorie == null) Categorie = "";
	 if (Photo == null) Photo = "";
	 /*var vcatg = 'Autres';
	 if (Categorie == 'Agroalimentaire' || Categorie == 'Armes et munitions' || Categorie == 'Bieres - Cidres') {
	  vcatg = Categorie;
	 }*/
	 //var MyURL = 'http://srv-hubdev-01/hub-api/public/soap/';
	 var p_data = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:hubaffairwsdl">';
	 p_data += '<soapenv:Header/>';
	 p_data += '<soapenv:Body>';
	 p_data += '<urn:Update_Lot soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">';
	 p_data += '<nAffaire xsi:type="xsd:string">' + pReference + '</nAffaire>';
	 p_data += '<Token xsi:type="xsd:string">' + vToken + '</Token>'
	 p_data += '<Reference xsi:type="xsd:string">' + Reference.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '</Reference>';
	 p_data += '<Quantite xsi:type="xsd:string">' + Quantite + '</Quantite>';
	 p_data += '<DatePub xsi:type="xsd:string">' + DatePub + '</DatePub>';
	 p_data += '<Pays xsi:type="xsd:string">' + Pays + '</Pays>';
	 p_data += '<Port xsi:type="xsd:string">' + Port + '</Port>';
	 p_data += '<Famille xsi:type="xsd:string">' + Famille + '</Famille>';
	 p_data += '<Categorie xsi:type="xsd:string">' + Categorie + '</Categorie>';
	 p_data += '<Phitem xsi:type="urn:Photos" xmlns:urn="urn:hubaffairservicewsdl">';
	 p_data += '<item xsi:type="xsd:string">' + Photo + '</item>';
	 p_data += '</Phitem>';
	 p_data += '<Pjitem xsi:type="urn:Pieces" xmlns:urn="urn:hubaffairservicewsdl">';
	 p_data += '<item xsi:type="xsd:string">?</item>';
	 p_data += '</Pjitem>';
	 p_data += '</urn:Update_Lot>';
	 p_data += '</soapenv:Body>';
	 p_data += '</soapenv:Envelope>';
	 //var MyURI = "https://intuiz.altares.fr/iws-v3.12/services/CallistoIdentite.CallistoIdentiteHttpsSoap11Endpoint/";
	} else if (ParamWS == 'AddPj') {
	 vMethode = 'Add_Pj';
	 var vSQL = "select top 1 Affaire as Aff, substring (Base64, 11, LEN(Base64)) as Base64 from x_Photo where x_Photo.type = 'Pj' and Affaire = '" + pReference + "' order by dmod desc ";
	 var oRes = objSQL.ExecuteSql(vSQL);
	 var oXmlDoc = InitXml(oRes);
	 var oRows = FindItem("Flds", oXmlDoc, true);
	 var vNumAffaire = GetItemValue("Aff", oRows[0]);
	 var vPj = GetItemValue("Base64", oRows[0]);
	 if (vNumAffaire == null) vNumAffaire = "";
	 if (vPj == null) vPj = "";
	 //var MyURL = 'http://srv-hubdev-01/hub-api/public/soap/';
	 var p_data = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:hubaffairwsdl">';
	 p_data += '<soapenv:Header/>';
	 p_data += '<soapenv:Body>';
	 p_data += '<urn:Add_Pj soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">';
	 p_data += '<nAffaire xsi:type="xsd:string">' + vNumAffaire + '</nAffaire>';
	 p_data += '<Token xsi:type="xsd:string">' + vToken + '</Token>';
	 p_data += '<Pjitem xsi:type="urn:Pieces" xmlns:urn="urn:hubaffairservicewsdl">';
	 p_data += '<item xsi:type="xsd:string">' + vPj + '</item>';
	 p_data += '</Pjitem>';
	 p_data += '</urn:Add_Pj>';
	 p_data += '</soapenv:Body>';
	 p_data += '</soapenv:Envelope>';
	} else if (ParamWS == 'Reponse') {
	 vMethode = 'Add_Reponse';
	 var vSQL = "select Affaire as Aff, Reponse as Reponse, Repondeur as Repondeur, Date_reponse as DateRep, Heure_reponse as HeureRep from x_QuestionLot where no_question = '" + pReference + "' ";
	 var oRes = objSQL.ExecuteSql(vSQL);
	 var oXmlDoc = InitXml(oRes);
	 var oRows = FindItem("Flds", oXmlDoc, true);
	 var vNumAffaire = GetItemValue("Aff", oRows[0]);
	 var vReponse = GetItemValue("Reponse", oRows[0]);
	 var vRepondeur = GetItemValue("Repondeur", oRows[0]);
	 var vDateRep = GetItemValue("DateRep", oRows[0]);
	 var vHeureRep = GetItemValue("HeureRep", oRows[0]);
	 if (vReponse == null) vReponse = "";
	 if (vRepondeur == null) vRepondeur = "";
	 if (vDateRep == null) vDateRep = "";
	 if (vHeureRep == null) vHeureRep = "";
	 //var MyURL = 'http://srv-hubdev-01/hub-api/public/soap/';
	 var p_data = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:hubaffairwsdl">';
	 p_data += '<soapenv:Header/>';
	 p_data += '<soapenv:Body>';
	 p_data += '<urn:Add_Reponse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">';
	 p_data += '<Affaire xsi:type="xsd:string">' + vNumAffaire + '</Affaire>';
	 p_data += '<Token xsi:type="xsd:string">' + vToken + '</Token>';
	 p_data += '<Nquest xsi:type="xsd:string">' + pReference + '</Nquest>';
	 p_data += '<Reponse xsi:type="xsd:string">' + vReponse + '</Reponse>';
	 p_data += '<Repondeur xsi:type="xsd:string">' + vRepondeur + '</Repondeur>';
	 p_data += '<Daterep xsi:type="xsd:string">' + vDateRep + '</Daterep>';
	 p_data += '<Hrep xsi:type="xsd:string">' + vHeureRep + '</Hrep>';
	 p_data += '</urn:Add_Reponse>';
	 p_data += '</soapenv:Body>';
	 p_data += '</soapenv:Envelope>';
	}
	var MyURI = MyURL;
	//var MyPassword = "U2014003610|747a4d80993e29f4b317e9142e1c04f6663c37f9";
	//var MyReplyText = "";
	var MyNodes = null;
	var monRtn = '';
	if (!no_HUB_WS) {
	 var myWebRequest: System.Net.HttpWebRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(MyURI));
	 //myWebRequest.Proxy = System.Net.WebRequest.DefaultWebProxy; // System.Net.WebRequest.GetSystemWebProxy();
	 var myReturn: String = "";
	 //Headers
	 myWebRequest.set_Method("POST");
	 myWebRequest.set_ContentType("text/xml; charset=UTF-8");
	 //myWebRequest.Headers.Add("SOAPAction", "");
	 var XmlDoc: XmlDocument = new XmlDocument();
	 XmlDoc.LoadXml(p_data);
	 //Envoi des donnees
	 var newStream: System.IO.Stream = myWebRequest.GetRequestStream();
	 XmlDoc.Save(newStream);
	 newStream.Close();
	 //Reponse
	 var httpWResp: System.Net.HttpWebResponse = System.Net.HttpWebResponse(myWebRequest.GetResponse());
	 var ResponseStream: System.IO.Stream = httpWResp.GetResponseStream();
	 var Reader: System.IO.StreamReader = new System.IO.StreamReader(ResponseStream, System.Text.Encoding.UTF8, true);
	 var myReponse: String = Reader.ReadToEnd();
	 Reader.Close();
	 ResponseStream.Close();
	 //    return( myReponse);
	 var WSRetourXML: XmlDocument = new XmlDocument();
	 WSRetourXML.LoadXml(myReponse);
	 /////////////////////////
	 //Lecture du retour
	 /////////////////////////
	 var MyResponse = "";
	 Selligent.Library.Monitor.Tracer.Write("Appel webservice HUB:" + WSRetourXML);
	 var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + p_data.replace(/'/g, "''") + "', '" + myReponse.replace(/'/g, "''") + "', '', getdate()) ";
	 var vResReq = objSQL.ExecuteSql(vReqInsertLog);
	 return 'Data correctly sent to HUB';
	}
	delete objSQL;
}