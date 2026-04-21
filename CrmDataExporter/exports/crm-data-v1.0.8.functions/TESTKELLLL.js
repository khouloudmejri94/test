function()
{
	//var vNRID = CurrentRecord[ExtEchntlln1NRID];
	//var vDT = CurrentRecord[ExtEchntlln1DateReception];
	var tabRequeteXml=[];
	/****************** ZCrmDemCq ******************/
	tabRequeteXml["Cqitem"]=" select "
	 +" ref as ZZAFFAI ,"
	 +" no_dossier as ZZANGNR ,"
	 //"  x.nCQ as ZNUCQ ,"
	 +" statutCQ as ZNUCQ ,"
	 +" statut_demande_CQ as ZPRCQ ,"
	 +" date_Dem_Controle as ZDPCQ ,"
	 +" heure_demande as ZHECQ ,"
	 +" details_demande as ZCOCQ ,"
	 +" nomContact as ZCQCT ,"
	 +" adresse_Stock as ZCQAD ,"
	 +" numTel as ZCQTL ,"
	 +" mail as ZCQML ,"
	 +" x.NRID as ZNRID "
	 +" from sysadm.dc0 d join sysadm.x_controle_qualite x  on d.nrid = x.dc0_nrid " //and x.nrid ='vNRID'
	//Appel au ws
	var vRetourWS=SS_WS_GetItemNode(tabRequeteXml, "" )
	//Selligent.Library.Monitor.Tracer.Write(vRetourWS, false);
	return vRetourWS;
}