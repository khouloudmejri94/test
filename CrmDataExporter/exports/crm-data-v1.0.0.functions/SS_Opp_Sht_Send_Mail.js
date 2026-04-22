function SS_Opp_Sht_Send_Mail(pFrom,pTo,pCc,pTitle,pAffaire,pFournisseur,pAcheteur)
{
	 var strMSG = true;
	 try
	 {
	              strMSG = true;
	              var MyParameters = new System.Collections.SortedList();
	              MyParameters.Add("Async", "false");
	
	              var MyDoc   = CreateSelligentObject("DocumentManagement",CurrentSessionID,false);
	              MyDoc.Open(31269497523164);
	              var arrBody = MyDoc.GetValue("DocContent");
	              var utf8 : System.Text.UTF8Encoding = new System.Text.UTF8Encoding();
	              var strBody = utf8.GetString(arrBody );
	
	   strBody  = strBody.replace ("[NUMERO D’AFFAIRE]", pAffaire);
	   strBody  = strBody.replace ("[NOM DU FOURNISSEUR]",pFournisseur );
	   strBody  = strBody.replace ("[ACHETEUR]" , pAcheteur);
	
	              var strRet = MyDoc.SendEmail(strBody ,pFrom, pTo, pCc, "",System.Web.Mail.MailPriority.High, System.Web.Mail.MailFormat.Html, pTitle, "", MyParameters);
	 }
	 catch (e)
	 {
	      strMSG = e.description;
	 }
	 finally
	 {
	      delete MyDoc ;
	      return strMSG ;
	 }       
	       
		try
	{
	     var MyQuery = CreateSelligentObject("SqlHelper",CurrentSessionID);
	     var consulta = "SELECT * FROM SYSADM.do0 WHERE do0.ref='"+pAffaire+"'";
	     var MyResults = MyQuery.ExecuteSql(consulta); 
	     var MyXmlDocument = InitXml(MyResults);
	     var MyRows = FindItem("Flds", MyXmlDocument, true);
	     if(MyRows.Count == 1)
	     {
	        var vOppNRID =GetItemValue("OppNRID", MyXmlDocument); 
	        var objAffaire = CreateSelligentObject("Opportunity",CurrentSessionID,true);
	        var mySelectionRow : SelectionRow = new SelectionRow();
	        objAffaire.Open(vOppNRID);
	
	        mySelectionRow.Fields["OppExtMailSend"] = "1";
	
	        objAffaire.SetValues(mySelectionRow);
	        objAffaire.Save();
	     }
	}
	catch(e)
	{
	   return "E Opp Sht Send Mail : "+e;
	}
}