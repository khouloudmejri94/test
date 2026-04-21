function()
{
	 var vNRID = CurrentRecord["ExtLgstqNRID"];
	 var tabRequeteXml=[];
	 /****************** Z_CRM_DEM_BK ******************/
	 tabRequeteXml["ZCrmDemBk"]="  select"
	  + "  D.no_dossier as Zzaffai ,"
	  + "  d.vos_ref as Zzangnr ,"
	  + "  x.no_Booking as Zbond,"
	 
	  + "  case x.statut_Booking "
	  + "  when 'Demande de booking' then 'DB' "
	  + "  when 'Soldé' then 'SL'  "
	  + "  when 'Partiel' then 'PR'  "
	  + "  when 'Stand by' then 'SB'  "
	  + "  else '' "
	  + "  end  as Zbost ,"
	
	  + "  convert(varchar(20), x.date_demande_booking ,112) as Zbodd,"
	  + "  d.xVolumeCBM Zvolu,"
	  + "  d.xPort as Inco2,"
	  + "  x.volume_CBM Zbovl,"
	  + "  x.nomContact Zbonc,"
	  + "  x.adresse Zboad,"
	  + "  x.numTel Zbont,"
	  + "  x.mail Zboem,"
	  + "  x.code_paysDep Zbopd,"
	  + "  x.port_chargement as Zbopc,"
	  + "  x.nrid as Znrid"
	  + "  from sysadm.x_logistique x join sysadm.dc0 d on d.nrid = x.dc0_nrid"
	  + "  where x.nrid = '" +vNRID  + "'"
	  
	 //Appel au ws
	 var vRetourWS=BS_SRM_CallPostWS(tabRequeteXml, "ZCrmDemBk", "urn:sap-com:document:sap:soap:functions:mc-style")
	 
	 //Selligent.Library.Monitor.Tracer.Write(vRetourWS, false);
	 
	 return vRetourWS;
}