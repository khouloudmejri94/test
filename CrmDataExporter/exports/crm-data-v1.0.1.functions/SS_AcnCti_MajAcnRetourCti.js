function SS_AcnCti_MajAcnRetourCti(pHeureDebut,pHeureFin,pAbouti,pCallId)
{
	//Auteur : Pierre-Louis EGAUD
	//Société : MASAO
	//Date de création : 11/09/2012
	//Description : mise à jour d'action à la suite du retour d'appel CTI
		//on va chercher la dernière action correspondant au CallID
	//RLM - Mis en comment à cause problème perf
	/*
	
	var oReq = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var oResult = oReq.ExecuteSql("select top 1 hi0.nrid as hi0_nrid from hi0 hi0 where hi0.xcallid = '" + pCallId + "' and hi0.dmod >= getutcdate() - 0.02");
	var oDocXml = InitXml(oResult);
	var oRowRes = FindItem("Flds", oDocXml,true);
	if (oRowRes.Count > 0)
	{
	  var nAcnNRID = GetItemValue("hi0_nrid",oRowRes[0]);
	  //mise à jour de l'action (heure début, heure de fin, et appel abouti ou non
	  var oAcn = CreateSelligentObject("Action", CurrentSessionID, false);
	  var oRow = new SelectionRow();
	
	  oRow.Fields["AcnExtCTIHeureDebut"] = pHeureDebut;
	  oRow.Fields["AcnExtCTIHeurefin"] = pHeureFin;
	  if(pAbouti == "True") pAbouti = 1;
	  else  pAbouti = 0;
	  oRow.Fields["AcnExtAbouti"] = pAbouti;
	  oRow.Fields["AcnExtAppelant"] = CurrentUserName;
	  oAcn.OpenSetAndSave(nAcnNRID, oRow);
	  delete oAcn;
	}
	delete oReq;
	
	*/
	
	return true;
}