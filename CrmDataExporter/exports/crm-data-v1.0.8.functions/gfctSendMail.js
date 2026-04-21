function(pFrom,pTo,pTitle,pBody)
{
	var strMSG = true;
	    var MyDoc = CreateSelligentObject("DocumentManagement", CurrentSessionID, false);
	    try {
	        var MyParameters = new System.Collections.SortedList();
	        MyParameters.Add("Async", "false");
	        var strRet = MyDoc.SendEmail(pBody, pFrom, pTo, "", "", System.Web.Mail.MailPriority.High, System.Web.Mail.MailFormat.Html, pTitle, "", MyParameters);
	    } catch (e) {
	        strMSG = e.description;
	    } finally {
	        FreeSelligentObject(MyDoc);
	        MyDoc.Dispose();
	        return strMSG;
	    }
}