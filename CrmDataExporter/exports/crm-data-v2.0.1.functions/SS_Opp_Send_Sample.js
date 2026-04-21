function SS_Opp_Send_Sample(pNrid)
{
	//SS_Opp_Send_Sample  43161049440344
	
	try {
	var tabRequeteXml=[];
	/****************** Echant ******************/
	tabRequeteXml["Echant"]= "select  "
	       +"do0.ref as Zzaffai , "
	       +"'' as Zzangnr , "
	       +"d.no_echantillon as Znoec , "
	       +"'EV'  as Zvlec ,  "
	       +"convert(varchar(20),NULL,112) as Zddec , "
	       +"convert(varchar(20),d.date_envoi ,112) as Zdeec , "
	       +"d.no_tracking as Znutr , "
	       +"'' as Zcoec , "
	       +"convert(varchar(20),NULL,112) as Zdrec , "
	       +"'' as Zrece , "
	       +"d.NRID as Znrid , "
	       +"'Echant Avant valorisation' as Ztyec  "
	       +"from sysadm.x_echantillon_Affair d "
	    +"inner join sysadm.do0 on do0.nrid = d.do0_nrid "
	    +"where  d.nrid  = ' " + pNrid +"'  "
	
	
	//Appel au ws
	
	var vRetourWS=BS_SRM_CallPostWS(tabRequeteXml, "ZCrmEchantillon", "urn:sap-com:document:sap:soap:functions:mc-style");
	
	
	
	//Selligent.Library.Monitor.Tracer.Write(vRetourWS, false);
	
	return vRetourWS;
	  
	 
	} catch (e) {
	
	 Selligent.Library.Monitor.Tracer.Write("ERREUR ENVOI ECHANTILLON AFFAIRE : " + e, false);
	}
}