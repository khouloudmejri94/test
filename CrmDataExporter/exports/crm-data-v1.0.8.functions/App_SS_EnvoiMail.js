function(strFrom,strTo,strCC,strSubject,strBody,MysmtpServer)
{
	 /*****************************************
	 Nom Script:  Date Création: 06/10/2020
	 Auteur : HB
	 Description: Ce script permet de créer l'email et l'envoyer
	 Parametres d'éntrée: 
	 ********************************************/
		var strReturn: String = String.Empty;
	    var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var MyDoc = CreateSelligentObject("DocumentManagement", CurrentSessionID, false);
	    /*if (MysmtpServer == "ozeol.com") {
	    MysmtpServer = "smtp.topnetpro.com";//"ozeol-com.mail.protection.outlook.com";
	    } else {
	    MysmtpServer = "mail.noz.fr";
	    }*/
	    try {
	        var StrSQL = "SELECT name as name FROM SYSADM.set_smtp_server WHERE template is null ";
	        var MyResults = MyQuery.ExecuteSql(StrSQL);
	        var MyXmlDocument = InitXml(MyResults);
	        var MyRows = FindItem("Flds", MyXmlDocument, true);
	        //MysmtpServer = MyRows[0];
	        var Smtp1 = GetItemValue("name", MyRows[0]);
	        var Smtp2 = GetItemValue("name", MyRows[1]);
	        if (MyRows.Count > 0) {
	            if (MysmtpServer == "ozeol.com") {
	                MysmtpServer = Smtp1;
	            } else {
	                MysmtpServer = Smtp2;
	            }
	        }
	        var MyParameters = new System.Collections.SortedList();
	        MyParameters.Add("Async", "false");
	        MyDoc.SendEmail(strBody, strFrom, strTo, strCC, "", System.Web.Mail.MailPriority.High, System.Web.Mail.MailFormat.Html, strSubject, "", MyParameters, MysmtpServer);
	        strReturn = "mail envoyé";
	    } catch (e) {
	        strReturn = e.message;
	        throw e;
	    } finally {
	        FreeSelligentObject(MyQuery);
	        MyQuery.Dispose();
	        FreeSelligentObject(MyDoc);
	        MyDoc.Dispose();
	        return strReturn;
	    }
}