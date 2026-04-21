function SS_Quo_Reprise_Affaire_SAP()
{
	 
	 function Rep_Envoi_Affaire(do0_ref){ 
	
	var tabRequeteXml=[];
	/****************** AFFAIRE ******************/
	tabRequeteXml["Affaire"]="select DISTINCT "
	+"     '"+do0_ref+"' Zzaffai, "
	+"     s.cd as Lifnr, "
	+"     do0.sujet as Zzobjet, "
	+"     do0.xOrgLot as Naturelot, "
	+"     p3.xcode_sap as Zzekgrp, "
	+"     substring(do0.rmod,7,4)+substring(do0.rmod,12,2)+substring(do0.rmod,15,2) as Zdtcre, "
	+"     substring(do0.xObjAct,1, 3) as Typecont, "
	+"     '' as Zzphon, "
	+"     isnull(p1.xcode_sap,'') as 'Zzpres', "
	+"     substring(isnull(do0.xsalon, ''),1, 30) as 'Evenement', "
	+"     p2.xcode_sap as Zzresp, "
	+"     substring(do0.rmod,7,4)+substring(do0.rmod,12,2)+substring(do0.rmod,15,2) as Zdtvisite, "
	+"     isnull(case when pe0.prenom is null then pe0.personne  "
	+"        else pe0.prenom+' '+pe0.personne  "
	+"        end,'') as 'Contact', "
	+"     '' as Zzstatut, "
	+"     case when p1.fonction like 'Assistant Commercial' then 'Ph' else "
	+"    case when p1.fonction like 'Acheteur' then 'AC' else "
	+"    case when p1.fonction like 'Chef Produit' then 'CP' else ''   "
	+"  end end end as Zztype ,"
	+"  do0.sujet as DescLot ,"
	+"  do0.xfamille as FamProduit "
	+"from   "
	+"    sysadm.do0 do0 LEFT OUTER JOIN sysadm.V_pe0 pe0 ON pe0.nrid = do0.pe0_nrid "
	+"     LEFT OUTER JOIN sysadm.am0 p1 ON do0.xprospecteur = p1.titulaire "
	+"     LEFT OUTER JOIN sysadm.am0 p2 ON p2.titulaire = do0.xChefproduit"
	+"     LEFT OUTER JOIN sysadm.am0 p3 ON p3.titulaire = do0.xAcheteur "
	+"    ,sysadm.V_so0 s "
	+"where do0.so0_nrid = s.nrid"
	+" and do0.ref='"+do0_ref+"'";
	/******************CONTACT******************/
	tabRequeteXml["Contact"]="select DISTINCT "
	//+"    '02F', "
	+"     s.cd Lifnr, "
	+"     case when substring(p.prenom,1,30) is null then substring(p.personne,1,30) else substring(p.prenom+' '+p.personne,1,30) end as Name1, "
	//+"     '' Tel , "
	//+"     '' Fax, "
	+"     sp.tel Tel, "
	+"     sp.fax Fax, "
	+"     sp.e_mail Mail, "
	+"     case when sp.fonction = 'Responsable Logistique' then 'LO' else 'MK' END Pafkt "
	+"from sysadm.V_so0 s,sysadm.do0 do0,sysadm.V_pe0 p,sysadm.sp0 sp "
	+"where "
	+"  do0.ref = '"+do0_ref+"' "
	+"and do0.so0_nrid = s.nrid "
	+"and sp.so0_nrid=s.nrid "
	+"and sp.pe0_nrid=p.nrid "
	+"and p.personne is not null "
	+"and (sp.date_sortie is null or sp.date_sortie > GETDATE())";
	
	/******************FOURNISSEUR******************/
	tabRequeteXml["Frn"]="select DISTINCT "
	//+"    '01F', "
	+"     s.cd Lifnr, "
	+"     substring(s.societe,1,35) as Name1, "
	+"     substring(s.adresse,1,30) as Stras, "
	+"     substring(s.loc,1,35) as Ort01, "
	+"     substring(s.code_post,1,10) as Pstlz, '' Land1, "
	+"     substring(s.prefixe_int + s.tel1,1,16) as Telf1, "
	+"     substring(s.prefixe_int + s.tel2,1,16) as Telf2, "
	+"     substring(s.fax,1,31) as Telfx, "
	//+"     '' as Telf1, "
	//+"     '' as Telf2, "
	//+"     '' as Telfx, "
	+"     'TR' ModeReg, "
	+"     ' 60' DelaisReg, "
	+"     '' JourReg, "
	+"     case a.xcode_sap when '000' then '' else a.xcode_sap end as Ekgrp, "
	+"     s.e_mail Mail, "
	+"     case when p.code is null then p1.code else p.code end as Land12, " 
	+"     substring(s.xsiret,1,11) Stcd2, "
	+"     case when s.xPasdescompte = 1 then 1 else 0 end as Zdemesc, "
	+"     case when s.xderog_perm = 1 then 1 else 0 end as Zpaicomp, "
	 +"  substring(s.adresse,1,35) as Street, "
	 +"     substring(s.street_nb,1,50) as HouseNum1, "
	 //+"     substring(s.reg_code,1,50) as Regio, "
	 +"     substring(s.no_tva,1,50) as Stceg, "
	 +"     case  s.type when 'ACTIF' then 'AC' when 'INACTIF' then 'IN' when 'OCCASIONNEL' then 'OC' when 'PROSPECT' then 'PR' else '' end  as Statut  , "
	 +"     convert(varchar(8),s.xdate_creat,112) as Gbdat "
	+" from  "
	+"  sysadm.V_so0 s LEFT OUTER JOIN sysadm.po2 p ON p.label = s.pays "
	+"       LEFT OUTER JOIN sysadm.po2 p1 ON p1.label = s.pays_2 "
	+" ,sysadm.do0   do0 "
	+" ,sysadm.am0 a "
	+" where do0.so0_nrid  = s.nrid "
	+" and do0.ref = '"+do0_ref+"' "
	+" and a.titulaire = s.titulaire ";
	//Appel au ws
	var vRetourWS=BS_SRM_CallPostWS(tabRequeteXml, "ZCrmFrnAffaire", "urn:sap-com:document:sap:soap:functions:mc-style");
	//return vRetourWS;
	//throw vRetourWS;
	 }
		
	 
	try 
	{
	        
	 // Exécution de la procédure stockée pour affecter un numéro de fournisseur avant création de l'affaire
	  var ObjSQL = CreateSelligentObject("SqlHelper",CurrentSessionID);
	  var ProcParam : StoredProcParam[] = new StoredProcParam[1];
	  var objNodes, objNodesTmp, nFullCount, objXmlRes, vResReq;
	
	  objXmlRes = new ActiveXObject("Microsoft.XMLDOM");
	
	  var vSQL = "select d.ref, d.so0_nrid from sysadm.xRepriseAff x inner join sysadm.do0 d on x.do0_ref = d.ref ";
	   vResReq = ObjSQL.ExecuteSql(vSQL);
	  objXmlRes.async=false;
	  objXmlRes.loadXML(vResReq);
	  objNodes = objXmlRes.getElementsByTagName("Flds");
	  nFullCount=objNodes.length;
	 for(var j=0; j<nFullCount;j++)
	  {
	    objNodesTmp=objNodes[j].childNodes;
	    var do0_ref = objNodesTmp[0].getAttribute("Val");
	    var so0_nrid = objNodesTmp[1].getAttribute("Val");
	   
	      try 
	      {
	           ProcParam[0]  = new StoredProcParam("pCpyNRID", "NUMBER", "IN", 200, so0_nrid);
	           var strResultProc = ObjSQL.ExecuteStoredProc("sp_seq_four_new", ProcParam);
	      }
	      catch(e)
	      {
	           return "addNewAffaire sp_seq_four_new "+e.message;
	      }
	   
	    //SS_Opp_Create_Affaire_SAP(do0_ref);
	
	     Rep_Envoi_Affaire(do0_ref);
	
	     //var strResultat = top.MyApp.ExecuteServerScript(30902106629150, [do0_ref],'','',true);
	     //alert(strResultat );
	  } 
	}
	catch(e)
	{
	     return e.message;    
	//throw ("SS "+e.message);
	}
}