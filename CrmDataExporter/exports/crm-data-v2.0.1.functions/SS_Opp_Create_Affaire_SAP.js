function SS_Opp_Create_Affaire_SAP(p_RefAffaire)
{
	var tabRequeteXml=[];
	/****************** AFFAIRE ******************/
	tabRequeteXml["Affaire"]="select DISTINCT "
	//+"     '03E' as id, "
	//+"     substring(hi0.no_dossier,1,6) as Zzaffai, "
	+"     '"+p_RefAffaire+"' Zzaffai, "
	+"     s.cd Lifnr, "
	+"     hi0.sujet as Zzobjet, "
	+"     hi0.objet Naturelot, "
	+"     p3.xcode_sap as Zzekgrp, "
	+"     substring(hi0.rmod,7,4)+substring(hi0.rmod,12,2)+substring(hi0.rmod,15,2) as Zdtcre, "
	+"     substring(hi0.ref,1, 3) Typecont, "
	+"     substring(hi0.rmod,4,3) as Zzphon, "
	+"     isnull(p1.xcode_sap,'') as 'Zzpres', "
	+"     substring(isnull(hi0.xliste_salon, ''),1, 30) as 'Evenement', "
	+"     p2.xcode_sap as Zzresp, "
	+"     convert(varchar(8),hi0.date_deb,112) as Zdtvisite, "
	+"     isnull(case when pe0.prenom is null then pe0.personne  "
	+"        else pe0.prenom+' '+pe0.personne  "
	+"        end,'') as 'Contact', "
	+"     case when hi0.status = 'ANNULE' then 'N' else '' END Zzstatut, "
	+"     case when p1.fonction like 'Assistant Commercial' then 'Ph' else "
	+"    case when p1.fonction like 'Acheteur' then 'AC' else "
	+"    case when p1.fonction like 'Chef Produit' then 'CP' else ''   "
	+"  end end end as Zztype ,"
	
	
	
	
	+"  hi0.sujet as DescLot ,"
	+"  s.xfamilleprod as FamProduit "
	
	
	
	
	
	+"from   "
	+"    sysadm.V_hi0 hi0 LEFT OUTER JOIN sysadm.V_pe0 pe0 ON pe0.nrid = hi0.pe0_nrid "
	+"     LEFT OUTER JOIN sysadm.am0 p1 ON hi0.xprospecteur = p1.titulaire "
	+"     LEFT OUTER JOIN sysadm.am0 p2 ON p2.titulaire = hi0.xcp "
	+"     LEFT OUTER JOIN sysadm.am0 p3 ON p3.titulaire = hi0.xAcheteur "
	+"    ,sysadm.V_so0 s "
	+"where hi0.so0_nrid = s.nrid "
	//+" and hi0.nrid=:AcnNRID "
	+" and hi0.no_dossier='"+p_RefAffaire+"'";
	
	
	
	
	/******************CONTACT******************/
	tabRequeteXml["Contact"]="select DISTINCT "
	//+"    '02F', "
	+"     s.cd Lifnr, "
	+"     case when substring(p.prenom,1,30) is null then substring(p.personne,1,30) else substring(p.prenom+' '+p.personne,1,30) end as Name1, "
	+"     sp.tel Tel, "
	+"     sp.fax Fax, "
	+"     sp.e_mail Mail, "
	+"     case when sp.fonction = 'Responsable Logistique' then 'LO' else 'MK' END Pafkt "
	+"from sysadm.V_so0 s,sysadm.V_hi0 hi0,sysadm.V_pe0 p,sysadm.sp0 sp "
	+"where "
	//+" hi0.nrid=:AcnNRID "
	+"  hi0.no_dossier = '"+p_RefAffaire+"' "
	+"and hi0.so0_nrid = s.nrid "
	+"and sp.so0_nrid=s.nrid "
	+"and sp.pe0_nrid=p.nrid "
	+"and p.personne is not null "
	+"and (sp.date_sortie is null or sp.date_sortie > GETDATE())";
	
	
	
	
	
	/******************FOURNISSEUR******************/
	tabRequeteXml["Frn"]="select DISTINCT "
	//+"    '01F', "
	+"     s.cd Lifnr, "
	+"     substring(s.societe,1,35) as Name1, "
	+"     substring(s.adresse,1,30) as Stras, "
	+"     substring(s.loc,1,35) as Ort01, "
	+"     substring(s.code_post,1,10) as Pstlz, '' Land1, "
	+"     substring(s.prefixe_int + s.tel1,1,16) as Telf1, "
	+"     substring(s.prefixe_int + s.tel2,1,16) as Telf2, "
	+"     substring(s.fax,1,31) as Telfx, "
	+"     'TR' ModeReg, "
	+"     ' 60' DelaisReg, "
	+"     '' JourReg, "
	+"     a.xcode_sap as Ekgrp, "
	+"     s.e_mail Mail, "
	+"     case when p.code is null then p1.code else p.code end as Land12, " 
	+"     substring(s.xsiret,1,11) Stcd2, "
	+"     case when s.xPasdescompte = 1 then 1 else 0 end as Zdemesc, "
	+"     case when s.xderog_perm = 1 then 1 else 0 end as Zpaicomp, "
	 +"  substring(s.adresse,1,35) as Street, "
	 +"     substring(s.street_nb,1,4) as HouseNum1, "
	 +"     substring(s.reg_code,1,50) as Regio, "
	 +"     substring(s.no_tva,1,50) as Stceg, "
	 +"     case  s.type when 'ACTIF' then 'AC' when 'INACTIF' then 'IN' when 'OCCASIONNEL' then 'OC' when 'PROSPECT' then 'PR' else '' end  as Statut  , "
	 +"     convert(varchar(8),s.xdate_creat,112) as Gbdat, "
	
	
	
	
	 +"     substring(s.xMatFisc,1,18) as Stenr, "
	 +"     substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),1,2) + substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),4,2) + substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),7,4) as Revdb "
	
	
	
	
	+" from  "
	+"  sysadm.V_so0 s LEFT OUTER JOIN sysadm.po2 p ON p.label = s.pays "
	+"       LEFT OUTER JOIN sysadm.po2 p1 ON p1.label = s.pays_2 "
	+" ,sysadm.V_hi0   hi0 "
	+" ,sysadm.am0 a "
	+" where hi0.so0_nrid  = s.nrid "
	//+" and hi0.nrid=:AcnNRID "
	+" and hi0.no_dossier = '"+p_RefAffaire+"' "
	+" and a.titulaire = s.titulaire ";
	
	
	
	
	//Appel au ws
	  var vRetourWS=BS_SRM_CallPostWS(tabRequeteXml, "ZCrmFrnAffaire", "urn:sap-com:document:sap:soap:functions:mc-style");
	//var vRetourWS=BS_CDM_CallPostWS(tabRequeteXml, "ZCrmFrnAffaire", "urn:sap-com:document:sap:soap:functions:mc-style");
	return vRetourWS;
	
	
	
	
	//throw vRetourWS;
}