function SS_Quo_DV_Echantillon_AfterInstUpd()
{
	var vNRID = CurrentRecord["ExtEchntlln1NRID"];
	//var vDT = CurrentRecord["ExtEchntlln1DateReception"];
	var tabRequeteXml=[];
	/****************** Echant ******************/
	tabRequeteXml["Echant"]="  select "
	    +" no_dossier as Zzaffai ,"
	    +" vos_ref as Zzangnr ,"
	    +" no_echantillon as Znoec ,"
	    +" case status_echantillon "
	    +" when 'Demande d''envoi' then 'DE'  "
	    +" when 'Déposé' then 'DP'  "
	    +" when 'Validé' then 'VL'  "
	    +" when 'Validé sous condition' then 'VC'  "
	    +" when 'Non validé' then 'NV'  "
	    +" when 'Sans échantillon' then 'SE'  "
	    +" when 'Réceptionné' then 'RC'   "
	    +" when 'Envoyé' then 'EV'  "
	    +" when 'Commande avant échantillon' then 'CE'  "
	    +" when 'Confirmé commande avant échant' then 'CC'  "
	    +" else '' "
	    +" end  as Zvlec , "
	    +" convert(varchar(20),date_dem_envoi,112) as Zddec ,"
	    +" convert(varchar(20),date_envoi,112) as Zdeec ,"
	    +" no_tracking as Znutr ,"
	    +" detail as Zcoec ,"
	    +" convert(varchar(20),date_reception,112) as Zdrec ,"
	    // +" Receptionneur as Zrece ,"
	    +" substring(Receptionneur,1,10) as Zrece ,"
	    //+" commentaire_ech as Zcoec ,"
	    +" x.NRID as Znrid ,"
	    +" Type_Echt as Ztyec "
	    +" from sysadm.dc0 d join sysadm.x_echantillon x on d.nrid = x.dc0_nrid and x.nrid ='"+vNRID+"'"
	//Appel au ws
	var vRetourWS=BS_SRM_CallPostWS(tabRequeteXml, "ZCrmEchantillon", "urn:sap-com:document:sap:soap:functions:mc-style")
	//Selligent.Library.Monitor.Tracer.Write(vRetourWS, false);
	return vRetourWS;
}