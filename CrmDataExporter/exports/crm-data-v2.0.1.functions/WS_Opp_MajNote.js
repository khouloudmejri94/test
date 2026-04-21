function WS_Opp_MajNote(pOppRef,pCodeNote,pObjet,pAch,pChefPro,pCode,pPort)
{
	  /*************************************************************/
	  // Société                           : MASAO
	  // Infos Paramètres Entree           : pOppRef
	  // Infos Paramètres Sortie           : 
	  // Auteur                            : PLE                                                  
	  // Date de création                  : 28/01/2014
	  // Commentaires                      : WS_Opp_MajNote
	  /*************************************************************/
		var MyQuery = CreateSelligentObject("SqlHelper",CurrentSessionID);
	var vRetour = "";
	try
	{
	     var consulta = "SELECT * FROM SYSADM.do0 WHERE do0.ref='"+pOppRef+"'";
	     var MyResults = MyQuery.ExecuteSql(consulta); 
	     var MyXmlDocument = InitXml(MyResults);
	     var MyRows = FindItem("Flds", MyXmlDocument, true);
	     if(MyRows.Count == 1)
	     {
	        var vOppNRID = GetItemValue("OppNRID", MyXmlDocument); 
	        var objAffaire = CreateSelligentObject("Opportunity",CurrentSessionID,true);
	        var mySelectionRow : SelectionRow = new SelectionRow();
	        objAffaire.Open(vOppNRID);
	        //on va chercher le libellé de la note
	        consulta = "select cp00.label as labelNote from sysadm.cp00 cp00 where sy0_col_logicname = 'OppExtNoteAff' and SUBSTRING(cp00.label,1,2) = '" + pCodeNote + "'";
	        MyResults = MyQuery.ExecuteSql(consulta); 
	        MyXmlDocument = InitXml(MyResults);
	        MyRows = FindItem("Flds", MyXmlDocument, true);
	        var vOppExtNoteAff = "";
	        if(MyRows.Count == 1)
	        {
	          vOppExtNoteAff = GetItemValue("labelNote", MyXmlDocument); 
	        }
	        mySelectionRow.Fields["OppExtNoteAff"] = vOppExtNoteAff;
	        mySelectionRow.Fields["OppComment"] = pObjet;
	
	
	        //on va chercher l'acheteur cp
	        if(pAch == "" || pAch == null ) pAch = "XXXXX";
	        if(pChefPro == "" || pChefPro == null ) pChefPro = "XXXXX";
	        var strSQLRes ="select (select top 1 titulaire from sysadm.am0 where xcode_sap ='"+pAch+"' and fonction='Acheteur') as Acheteur, (select top 1 titulaire from sysadm.am0 where xcode_sap='"+pChefPro+"' and fonction='Chef Produit') as CP"
	    
	        MyResults = MyQuery.ExecuteSql(strSQLRes); 
	        MyXmlDocument = InitXml(MyResults);
	        MyRows = FindItem("Flds", MyXmlDocument, true);
	    
	        if(MyRows.Count > 0)
	        {
	            mySelectionRow.Fields["OppExtAcheteur"] = GetItemValue("Acheteur",MyXmlDocument);
	            mySelectionRow.Fields["OppExtChefproduit"] = GetItemValue("CP",MyXmlDocument); 
	        //    mySelectionRow.Fields["OppOwner"]= GetItemValue("Acheteur",MyXmlDocument)+";"+GetItemValue("CP",MyXmlDocument);
	       }
	             //MH - 17092015 - Ajout Code pays et Port Depart
	            mySelectionRow.Fields["OppExtCodePaysDepart"] = pCode;
	            mySelectionRow.Fields["OppExtPortDepart"] = pPort;
	
	
	        objAffaire.SetValues(mySelectionRow);
	        objAffaire.Save();
	        delete objAffaire;
	     }
	     else
	     {
	          if(MyRows.Count >= 1)
	          {
	                vRetour = "Erreur : Il existe plusieurs affaire avec ce numéro ! ";
	                return "Erreur : Il existe plusieurs affaire avec ce numéro ! ";          
	          }
	          else  
	          {
	                vRetour = "Erreur : Ce numéro d’affaire n’existe pas dans le CRM ! ";
	                return "Erreur : Ce numéro d’affaire n’existe pas dans le CRM ! ";
	          }
	     }
	     vRetour = "I";
	     return "I";
	}
	catch(e)
	{
	   return "E WS_Opp_MajNote : "+e;
	}
	finally
	{
	  /************************************************* LOG *************************************************/
	  try
	  {
	    var vMethode = "WS_Opp_MajNote";
	    var vXmlRequest = pOppRef + ";" + pCodeNote;
	    vXmlRequest = vXmlRequest.replace(/'/g, "''");
	    vRetour = vRetour.replace(/'/g, "''");
	    MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour + "', '" + vRetour + "', getdate())");
	    delete MyQuery;
	  }
	  catch(e)
	  {
	    Selligent.Library.Monitor.Tracer.Write("Erreur dans le server script 'SS_Req_AppelWS : " + e.description, false);
	  }
	}
}