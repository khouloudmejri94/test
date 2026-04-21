function WS_Opp_Question_Lot(pData)
{
	 /*************************************************************/
	  // Société                                : LUXHOLD INVEST SA
	  // Nom script                             : WS_Opp_Question_Lot
	  // Infos Paramètres                       : 
	  // Auteur                                 : HAS                                          
	  // Chapitre concerné                      : Affaire  
	  // Date de création                       : 04/05/2021
	  // Modifié par                            :                                   
	  // Date de modification                   :  
	  // Commentaires                           : Reception Question HUB -> CDM
	  /*************************************************************/
		//INTEGRATION QUESTION LOT ATYPIQUE
	//  numAffaire|question|demandeur|IdQuestion
	var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vRetour = "";
	try {
	 var vdata = [];
	 vdata = pData.split('|');
	 var pExtQstnLtAffaire = vdata[0];
	 var pExtQstnLtQuestion = vdata[1];
	 var pExtQstnLtDemandeur = vdata[2];
	 var pExtQstnLtNoQuestion = vdata[3];
	 var vSQL = "select top 1 do0.nrid from do0 do0 where do0.ref= '" + pExtQstnLtAffaire + "'";
	 var MyResults = MyQuery.ExecuteSql(vSQL);
	 var oXmlRes = InitXml(MyResults);
	 var oNodes = FindItem("Flds", oXmlRes, true);
	 if (oNodes.Count > 0) {
	  var strSQL = "INSERT INTO x_QuestionLot (no_question, Affaire, Date_question, Heure_question, Question,  Demandeur)" +
	   " VALUES ('" + pExtQstnLtNoQuestion + "','" + pExtQstnLtAffaire + "', getdate(), CONVERT(VARCHAR(5),getdate(),108), '" + pExtQstnLtQuestion.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;") + "','" + pExtQstnLtDemandeur + "')";
	  MyQuery.ExecuteSql(strSQL);
	  vRetour = "S Question insérée dans le CRM";
	 } else {
	  vRetour = "Erreur l'affaire " + pExtQstnLtAffaire + " n'existe pas dans Selligent";
	 }
	} catch (e) {
	 vRetour = strSQL + e.description.substring(0, 2000);
	} finally {
	 var vMethode = "WS_Question_Lot";
	 var vXmlRequest = pExtQstnLtAffaire + "|" + pExtQstnLtQuestion + "|" + pExtQstnLtDemandeur + "|" + pExtQstnLtNoQuestion;
	 vXmlRequest = vXmlRequest.replace(/'/g, "''");
	 MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	 delete MyQuery;
	 return vRetour;
	}
}