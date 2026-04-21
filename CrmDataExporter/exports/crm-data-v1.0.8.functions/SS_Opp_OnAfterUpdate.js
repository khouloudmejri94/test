function()
{
	//DEB HAS  01/05/2021 : envoi MAJ lot atypique
	if (Session["HUB_UPDATE_LOT"] == true) {
	    var nAffaire = CurrentRecord["OppReference"];
	    AppelWebService_HubServer(nAffaire, 'UpdtLot');
	}
	//DEB HAS  01/05/2021 : envoi MAJ lot atypique
		//HAS DEB 11/05/2021 : creation affaire SAP lot atypique
	try {
	 if (Session["OPP_CREATE_OPP"] == true) {
	  var strOppRef = CurrentRecord["OppReference"];
	  SS_Opp_Create_Affaire_SAP(strOppRef);
	  Session["OPP_CREATE_OPP"] = false;
	 }
	} catch (e) {
	 Session["OPP_CREATE_OPP"] = false;
	 Selligent.Library.Monitor.Tracer.Write("Erreur lors de l'appel de la méthode ATYPIC SS_Opp_Create_Affaire_SAP : " + e, false);
	}
	//HAS END 11/05/2021 : creation affaire SAP lot atypique
		//DEB HAS  01/05/2021 : envoi MAJ lot atypique
	if (Session["OPP_ENVOIPJ_HUB"] == true) {
	    var nAffaire = CurrentRecord["OppReference"];
	    AppelWebService_HubServer(nAffaire, 'AddPj');
	}
	//DEB HAS  01/05/2021 : envoi MAJ lot atypique
		//SS_Opp_OnAfterUpdate => echantillon
	
	try {
	 if (Session["ADD_SAMPLE"] == true) {
	var vNRID = CurrentRecord["OppNRID"];
	
	
	var tabRequeteXml=[];
	/****************** Echant ******************/
	tabRequeteXml["Echant"]="select "
	     +" d.ref as Zzaffai ,"
	     +" '' as Zzangnr ,"
	     +" 1 as Znoec ,"
	     +" 'EV'  as Zvlec , "
	
	
	     +" convert(varchar(20),NULL,112) as Zddec ,"
	     +" convert(varchar(20),d.XDTEENVOI ,112) as Zdeec ,"
	     +" d.XNUMTRACK as Znutr ,"
	    +"  '' as Zcoec ,"
	     +" convert(varchar(20),NULL,112) as Zdrec ,"
	
	     +" '' as Zrece ,"
	
	
	     +" d.NRID as Znrid ,"
	      
	     +" 'Echant Avant valorisation' as Ztyec "
	     +" from sysadm.do0 d where  d.nrid  ='"+vNRID+"'" 
	
	
	//Appel au ws
	
	var vRetourWS=BS_SRM_CallPostWS(tabRequeteXml, "ZCrmEchantillon", "urn:sap-com:document:sap:soap:functions:mc-style");
	
	
	
	Selligent.Library.Monitor.Tracer.Write(vRetourWS, false);
	
	Session["ADD_SAMPLE"] = false;
	return vRetourWS;
	  
	 }
	} catch (e) {
	 Session["ADD_SAMPLE"] = false;
	 Selligent.Library.Monitor.Tracer.Write("ERREUR ENVOI ECHANTILLON AFFAIRE : " + e, false);
	}
}