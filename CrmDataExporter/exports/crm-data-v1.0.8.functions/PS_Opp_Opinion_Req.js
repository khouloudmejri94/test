function()
{
	try {
	    //debugger;
	    var p_RefAffaire = top.MyApp.GetItemValue("OppReference")
	    var vAcheteur = top.MyApp.GetItemValue("OppExtAcheteur");
	    var vCp = top.MyApp.GetItemValue("OppExtChefproduit");
	    var strRetour = "";
	    var myXmlRequest = "";
	    var vpacakges = top.MyApp.GetItemValue("OppExtProduitspackages");
	    vpacakges = vpacakges.substring(0, 3);
	    var vDateDebTraitement = new Date();
	    vDateDebTraitement = top.MyApp.fctFormatDate(vDateDebTraitement, top.MyApp.SYSTEM_DATE, top.MyApp.SYSTEM_DATE);
	    var strSQLRes = "select (select xCodeGI from sysadm.am0 where titulaire ='" + vAcheteur + "' ), (select xcode_sap from sysadm.am0 where titulaire='" + vCp + "' )"
	    var tabTitulaire = top.MyApp._gfctExtReq(strSQLRes);
	    // HAS DEB : 17/07/2019 selectionner le mode de vente conseillé en mode liste de choix multiple et concatener avec des virgules
	    var StrSqlMode = " SELECT  cast(STUFF (  (SELECT ',' + CAST(ap01_name AS VARCHAR(MAX)) FROM sysadm.do6  where do6.do0_nrid = do0.nrid  FOR XML PATH('') ),1, 1, '') AS varchar(255)) as MODE FROM sysadm.do0 where nrid  = '" + top.MyApp.GetItemValue("OppNRID") + "' ";
	    var vModeConseille = top.MyApp._gfctExtReq(StrSqlMode);
	    //top.MyApp.OpenDlg("Alert", ["Attention", "Voici le mode de vente: " + vModeConseille + "."]);
	    var vDateMarche = top.MyApp.GetItemValue("OppExtDMDispMar")
	    vDateMarche = top.MyApp.fctFormatDate(vDateMarche, top.MyApp.SYSTEM_DATE, "[yyyy][MM][dd]");
	    var vDateEcheance = top.MyApp.GetItemValue("OppExtDateEcheance")
	    vDateEcheance = top.MyApp.fctFormatDate(vDateEcheance, top.MyApp.SYSTEM_DATE, "[yyyy][MM][dd]");
	    var vNote = top.MyApp.GetItemValue("OppExtNoteAff")
	    vNote = vNote.substring(0, 2);
	    var vUserName = top.MyApp.UserSetting.User.Name;
	    var vTest = top.MyApp.UserSetting.User.Name;
	    var vDateCreation = top.MyApp.GetItemValue("OppCreationDate");
	    vDateCreation = top.MyApp.fctFormatDate(vDateCreation, top.MyApp.SYSTEM_DATE, "[yyyy][MM][dd]");
	    var vPaysFacturation = top.MyApp.GetItemValue("OppExtPaysFacturation");
	    vPaysFacturation = vPaysFacturation.substring(0, 2);
	    var strReqSQL = "select  '<item>'+'<Lifnr>'+ s.cd +'</Lifnr>'";
	    strReqSQL = strReqSQL + "+'<Name1>'+ (case when substring(p.prenom,1,30) is null then substring(p.personne,1,30) else substring(p.prenom+' '+p.personne,1,30) end) +'</Name1>'";
	    strReqSQL = strReqSQL + "+'<Tel>'+ (case when (sp.tel IS null)  then '' else convert(varchar(20),sp.tel,112) end) +'</Tel>'";
	    
	    strReqSQL = strReqSQL + "+'<Fax>'+ (case when (sp.fax IS null)  then '' else convert(varchar(20),sp.fax,112) end) +'</Fax>'";
	    strReqSQL = strReqSQL + "+'<Mail>'+ (case when (sp.e_mail IS null)  then '' else convert(varchar(100),sp.e_mail,112) end)  +'</Mail>'";
	    strReqSQL = strReqSQL + "+'<Pafkt>'+  (case when sp.fonction = 'Responsable Logistique' then '09' else 'MK' END) + '</Pafkt>'";
	    strReqSQL = strReqSQL + "+'<Fonction>'+ (case when (sp.fonction IS null)  then '' else convert(varchar(20),sp.fonction,112) end)  +'</Fonction>'";
	    /*************  NEW V2 ****************/
	    strReqSQL = strReqSQL + "+'<Telf2>'+ (case when (sp.mobile_phone IS null)  then '' else convert(varchar(20),sp.mobile_phone,112) end) +'</Telf2>'";
	    /*************  NEW V2 ****************/
	    strReqSQL = strReqSQL + "+'</item>' from sysadm.so0 s,sysadm.pe0 p,sysadm.sp0 sp, sysadm.do0 d ";
	    strReqSQL = strReqSQL + " where ";
	    strReqSQL = strReqSQL + " d.ref = '" + p_RefAffaire + "' and s.cd not like 'COMP%' ";
	    strReqSQL = strReqSQL + " and s.nrid=d.so0_nrid ";
	    strReqSQL = strReqSQL + " and sp.so0_nrid=s.nrid ";
	    strReqSQL = strReqSQL + " and sp.pe0_nrid=p.nrid ";
	    strReqSQL = strReqSQL + " and p.personne is not null ";
	    strReqSQL = strReqSQL + " and (sp.date_sortie is null or sp.date_sortie > GETDATE()) ";
	    var tabResPer = top.MyApp._gfctExtReq(strReqSQL);
	    //alert (strReqSQL);
	    //alert (tabResPer);
	    //alert (tabResPer.length);
	    
	    if (tabResPer.length > 0) {
	        var myXmlAffaire = " <Affaire>"
	        myXmlAffaire = myXmlAffaire + "<Oppreference>" + top.MyApp.GetItemValue("OppReference") + "</Oppreference>"
	        myXmlAffaire = myXmlAffaire + "<Oppstatus>" + '01.A DEMANDE AVIS' + "</Oppstatus>"
	        myXmlAffaire = myXmlAffaire + "<Oppcreationdate>" + vDateCreation + "</Oppcreationdate>"
	        myXmlAffaire = myXmlAffaire + "<Oppextcodefour>" + top.MyApp.GetItemValue("OppExtCodeFour") + "</Oppextcodefour>"
	        myXmlAffaire = myXmlAffaire + "<Oppcpyname>" + top.MyApp.GetItemValue("OppCpyName").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppcpyname>"
	        myXmlAffaire = myXmlAffaire + "<Oppcomment>" + top.MyApp.GetItemValue("OppComment").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppcomment>"
	        myXmlAffaire = myXmlAffaire + "<Opptype>" + 'ST' + "</Opptype>"
	        myXmlAffaire = myXmlAffaire + "<Oppcustreference>" + '' + "</Oppcustreference>"
	        myXmlAffaire = myXmlAffaire + "<Oppextacheteur>" + tabTitulaire[0][0] + "</Oppextacheteur>"
	        myXmlAffaire = myXmlAffaire + "<Oppextnoteaff>" + top.MyApp.GetItemValue("OppExtNoteAff") + "</Oppextnoteaff>"
	        myXmlAffaire = myXmlAffaire + "<Oppextfamille>" + top.MyApp.GetItemValue("OppExtFamille").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextfamille>"
	        myXmlAffaire = myXmlAffaire + "<Oppextconclot>" + top.MyApp.GetItemValue("OppExtConcLot") + "</Oppextconclot>"
	        myXmlAffaire = myXmlAffaire + "<Oppsource>" + top.MyApp.GetItemValue("OppSource").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppsource>"
	        myXmlAffaire = myXmlAffaire + "<Oppextancienneteproduits>" + top.MyApp.GetItemValue("OppExtAncienneteProduits").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextancienneteproduits>"
	        myXmlAffaire = myXmlAffaire + "<Oppextautrsol>" + top.MyApp.GetItemValue("OppExtAutrSol").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextautrsol>"
	        myXmlAffaire = myXmlAffaire + "<Oppextdateecheance>" + vDateEcheance + "</Oppextdateecheance>"
	        myXmlAffaire = myXmlAffaire + "<Oppextdelaireponsesouh>" + top.MyApp.GetItemValue("Oppextdelaireponsesouh") + "</Oppextdelaireponsesouh>"
	        myXmlAffaire = myXmlAffaire + "<Oppextraisurg>" + top.MyApp.GetItemValue("OppExtRaisUrg").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextraisurg>"
	        myXmlAffaire = myXmlAffaire + "<Oppextdestifinalgi>" + top.MyApp.GetItemValue("OppExtDestiFinalGI").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextdestifinalgi>"
	        myXmlAffaire = myXmlAffaire + "<Oppextdistrinetworkgi>" + top.MyApp.GetItemValue("OppExtDistriNetworkGI").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextdistrinetworkgi>"
	        myXmlAffaire = myXmlAffaire + "<Oppextlotglob>" + top.MyApp.GetItemValue("OppExtLotGlob") + "</Oppextlotglob>"
	        myXmlAffaire = myXmlAffaire + "<Oppextmagasinsinterdits>" + top.MyApp.GetItemValue("OppExtMagasinsinterdits") + "</Oppextmagasinsinterdits>"
	        myXmlAffaire = myXmlAffaire + "<Oppextraisinterd>" + top.MyApp.GetItemValue("OppExtRaisInterd").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextraisinterd>"
	        myXmlAffaire = myXmlAffaire + "<Oppextproduitspackages>" + vpacakges + "</Oppextproduitspackages>"
	        myXmlAffaire = myXmlAffaire + "<Oppextsupplieractivitygi>" + top.MyApp.GetItemValue("OppExtSupplierActivityGI") + "</Oppextsupplieractivitygi>"
	        myXmlAffaire = myXmlAffaire + "<Oppextwebsitegi>" + top.MyApp.GetItemValue("OppExtWebsiteGI").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextwebsitegi>"
	        myXmlAffaire = myXmlAffaire + "<Oppextcatalogue>" + top.MyApp.GetItemValue("OppExtCatalogue") + "</Oppextcatalogue>"
	        myXmlAffaire = myXmlAffaire + "<Oppextechantillonrepresentatif>" + top.MyApp.GetItemValue("OppExtEchantillonRepresentatif") + "</Oppextechantillonrepresentatif>"
	        myXmlAffaire = myXmlAffaire + "<Oppextfact>" + top.MyApp.GetItemValue("OppExtFact") + "</Oppextfact>"
	        myXmlAffaire = myXmlAffaire + "<Oppextgarantie>" + top.MyApp.GetItemValue("OppExtGarantie") + "</Oppextgarantie>"
	        myXmlAffaire = myXmlAffaire + "<Oppextlic>" + top.MyApp.GetItemValue("OppExtLic") + "</Oppextlic>"
	        myXmlAffaire = myXmlAffaire + "<Oppextvisuel>" + top.MyApp.GetItemValue("OppExtVisuel") + "</Oppextvisuel>"
	        myXmlAffaire = myXmlAffaire + "<Oppextcodepaysdepart>" + top.MyApp.GetItemValue("OppExtCodePaysDepart") + "</Oppextcodepaysdepart>"
	        myXmlAffaire = myXmlAffaire + "<Oppextportdepart>" + top.MyApp.GetItemValue("OppExtPortDepart").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextportdepart>"
	        myXmlAffaire = myXmlAffaire + "<Oppextcommpartg>" + top.MyApp.GetItemValue("OppExtCommPartg") + "</Oppextcommpartg>"
	        myXmlAffaire = myXmlAffaire + "<Oppextdmdispmar>" + vDateMarche + "</Oppextdmdispmar>"
	        myXmlAffaire = myXmlAffaire + "<Oppextlieustock>" + top.MyApp.GetItemValue("OppExtLieuStock").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextlieustock>"
	        myXmlAffaire = myXmlAffaire + "<Oppextnbpalettes>" + top.MyApp.GetItemValue("OppExtNbPalettes") + "</Oppextnbpalettes>"
	        myXmlAffaire = myXmlAffaire + "<Oppextprdtsdejaplttses>" + top.MyApp.GetItemValue("OppExtPrdtsdejaplttses") + "</Oppextprdtsdejaplttses>"
	        myXmlAffaire = myXmlAffaire + "<Oppextsioui>" + top.MyApp.GetItemValue("OppExtSiOui").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextsioui>"
	        myXmlAffaire = myXmlAffaire + "<Oppextraisonss>" + top.MyApp.GetItemValue("OppExtRaisonSS").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextraisonss>"
	        myXmlAffaire = myXmlAffaire + "<Oppextproblot>" + top.MyApp.GetItemValue("OppExtProbLot").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextproblot>"
	        myXmlAffaire = myXmlAffaire + "<Oppextinfomarkt>" + top.MyApp.GetItemValue("OppExtInfoMarkt").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextinfomarkt>"
	        myXmlAffaire = myXmlAffaire + "<Oppextcommqu>" + top.MyApp.GetItemValue("OppExtCommQu").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextcommqu>"
	        myXmlAffaire = myXmlAffaire + "<Oppextraisonsscom>" + top.MyApp.GetItemValue("OppExtRaisonSSCom").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextraisonsscom>"
	        myXmlAffaire = myXmlAffaire + "<Oppextpaysfacturation>" + 'ST' + "</Oppextpaysfacturation>"
	        myXmlAffaire = myXmlAffaire + "<Oppextmodeventeconseille>" + vModeConseille + "</Oppextmodeventeconseille>"
	        myXmlAffaire = myXmlAffaire + "<Oppextsalon>" + top.MyApp.GetItemValue("OppExtSalon").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "</Oppextsalon>"
	        myXmlAffaire = myXmlAffaire + "</Affaire>"
	        //alert (myXmlAffaire);
	        var strReqFrs = "select DISTINCT ";
	        strReqFrs += "     s.cd Lifnr, ";
	        strReqFrs += "     substring(s.societe,1,35) as Name1, ";
	        strReqFrs += "     substring(s.adresse,1,30) as Stras, ";
	        strReqFrs += "     substring(s.loc,1,35) as Ort01, ";
	        strReqFrs += "     substring(s.code_post,1,10) as Pstlz, ";
	        strReqFrs += "     '' Land1, ";
	        strReqFrs += "     substring(s.prefixe_int + s.tel1,1,16) as Telf1, ";
	        strReqFrs += "     substring(s.prefixe_int + s.tel2,1,16) as Telf2, ";
	        strReqFrs += "     substring(s.fax,1,31) as Telfx, ";
	        strReqFrs += "     'TR' ModeReg, ";
	        strReqFrs += "     ' 60' DelaisReg, ";
	        strReqFrs += "     '' JourReg, ";
	        strReqFrs += "     a.xcode_sap as Ekgrp, ";
	        strReqFrs += "     s.e_mail Mail, ";
	        strReqFrs += "     case when p.code is null then p1.code else p.code end as Land12, ";
	        strReqFrs += "     substring(s.xsiret,1,14) Stcd1, ";
	        strReqFrs += "     substring(s.xsiret,1,9) Stcd2, ";
	        strReqFrs += "     s.nrid Znrid, ";
	        strReqFrs += "     case when s.xPasdescompte = 1 then 1 else 0 end as Zdemesc, ";
	        strReqFrs += "     case when s.xderog_perm = 1 then 1 else 0 end as Zpaicomp,";
	        strReqFrs += "     s.xclass_fourn as Zcodeabc,";
	        strReqFrs += "     substring(a.team_name,1,40) as ZequipAchat,";
	        strReqFrs += "     s.xInfoLogistique as ZinfoLitige,";
	        strReqFrs += "     a.xGI_Zone as ZadminGi, ";
	        strReqFrs += "     s. xPPE1 as ZppeMember, ";
	        strReqFrs += "     s. xPPE2 as ZppeVendor, ";
	        strReqFrs += "     s. xPPE3 as ZppeExtra, ";
	        strReqFrs += "     '' Spars, ";
	        strReqFrs += "     '' Stceg, ";
	        strReqFrs += "     '' Regio, ";
	        strReqFrs += "     '' Waers, ";
	        strReqFrs += "     '' Street, ";
	        strReqFrs += "     '' HouseNum1, ";
	        strReqFrs += "     case  s.type when 'ACTIF' then 'AC' when 'INACTIF' then 'IN' when 'OCCASIONNEL' then 'OC' when 'PROSPECT' then 'PR' else '' end  as Statut, ";
	        strReqFrs += "     substring(CONVERT(VARCHAR(10),s.xdate_creat,103),1,2) + substring(CONVERT(VARCHAR(10),s.xdate_creat,103),4,2) + substring(CONVERT(VARCHAR(10),s.xdate_creat,103),7,4) as Gbdat, ";
	        strReqFrs += "     substring(s.xMatFisc,1,18) as Stenr, ";
	        strReqFrs += "     substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),1,2) + substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),4,2) + substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),7,4) as Revdb, ";
	        /*************  NEW V2 ****************/
	        strReqFrs += "     s.xFamilleProd as Familleprod, ";
	        strReqFrs += "     s.depart as Nature_pdt, ";
	        strReqFrs += "     s.web_link as Website, ";
	        strReqFrs += "     s.xcircuit_distrib as Circuit_dist ";
	        /*************  NEW V2 ****************/
	        strReqFrs += " from  ";
	        strReqFrs += "      sysadm.V_so0 s INNER JOIN sysadm.do0 d ON d.so0_nrid = s.nrid ";
	        strReqFrs += "      LEFT OUTER JOIN sysadm.po2 p ON p.label = s.pays ";
	        strReqFrs += "      LEFT OUTER JOIN sysadm.po2 p1 ON p1.label = s.pays_2 ";
	        strReqFrs += "      INNER JOIN sysadm.am0 a on a.titulaire = s.titulaire ";
	        strReqFrs += "      where ";
	        strReqFrs += "      d.ref='"+p_RefAffaire+"'";
	        var tabResFrs = top.MyApp._gfctExtReq(strReqFrs);
	        //alert (tabResFrs);
	        if (tabResFrs.length > 0) {
	            var Lifnr = tabResFrs[0][0];
	            //alert (Lifnr);
	            var Name1 = tabResFrs[0][1];
	            var Stras = tabResFrs[0][2];
	            var Ort01 = tabResFrs[0][3];
	            var Pstlz = tabResFrs[0][4];
	            var Land1 = tabResFrs[0][5];
	            var Telf1 = tabResFrs[0][6];
	            var Telf2 = tabResFrs[0][7];
	            var Telfx = tabResFrs[0][8];
	            var ModeReg = tabResFrs[0][9];
	            var DelaisReg = tabResFrs[0][10];
	            var JourReg = tabResFrs[0][11];
	            var Ekgrp = tabResFrs[0][12];
	            var Mail = tabResFrs[0][13];
	            var Land12 = tabResFrs[0][14];
	            var Stcd1 = tabResFrs[0][15];
	            var Stcd2 = tabResFrs[0][16];
	            var Znrid = tabResFrs[0][17];
	            var Zdemesc = tabResFrs[0][18];
	            var Zpaicomp = tabResFrs[0][19];
	            var ZcodeAbc = tabResFrs[0][20];
	            var ZequipAchat = tabResFrs[0][21];
	            var ZinfoLitige = tabResFrs[0][22];
	            var ZadminGi = tabResFrs[0][23];
	            var ZppeMember = tabResFrs[0][24];
	            var ZppeVendor = tabResFrs[0][25];
	            var ZppeExtra = tabResFrs[0][26];
	            var Spars = tabResFrs[0][27];
	            var Stceg = tabResFrs[0][28];
	            var Regio = tabResFrs[0][29];
	            var Waers = tabResFrs[0][30];
	            var Street = tabResFrs[0][31];
	            var HouseNum1 = tabResFrs[0][32];
	            var Statut = tabResFrs[0][33];
	            var Gbdat = tabResFrs[0][34];
	            var Stenr = tabResFrs[0][35];
	            var Revdb = tabResFrs[0][36];
	            var Familleprod = tabResFrs[0][37];
	            var Nature_pdt = tabResFrs[0][38];
	            //var Website = encodeURIComponent(tabResFrs[0][39]);  
	            var Website =tabResFrs[0][39].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	            var Circuit_dist = tabResFrs[0][40];
	        }
	        var myXmlFrs = " <IsFrn>"
	        myXmlFrs = myXmlFrs + "<LIFNR>" + Lifnr + "</LIFNR>"
	        myXmlFrs = myXmlFrs + "<NAME1>" + Name1 + "</NAME1>"
	        myXmlFrs = myXmlFrs + "<STRAS>" + Stras + "</STRAS>"
	        myXmlFrs = myXmlFrs + "<ORT01>" + Ort01 + "</ORT01>"
	        myXmlFrs = myXmlFrs + "<PSTLZ>" + Pstlz + "</PSTLZ>"
	        myXmlFrs = myXmlFrs + "<LAND1>" + Land1 + "</LAND1>"
	        myXmlFrs = myXmlFrs + "<TELF1>" + Telf1 + "</TELF1>"
	        myXmlFrs = myXmlFrs + "<TELF2>" + Telf2 + "</TELF2>"
	        myXmlFrs = myXmlFrs + "<TELFX>" + Telfx + "</TELFX>"
	        myXmlFrs = myXmlFrs + "<MODE_REG>" + ModeReg + "</MODE_REG>"
	        myXmlFrs = myXmlFrs + "<DELAIS_REG>" + DelaisReg + "</DELAIS_REG>"
	        myXmlFrs = myXmlFrs + "<JOUR_REG>" + JourReg + "</JOUR_REG>"
	        myXmlFrs = myXmlFrs + "<EKGRP>" + Ekgrp + "</EKGRP>"
	        myXmlFrs = myXmlFrs + "<MAIL>" + Mail + "</MAIL>"
	        myXmlFrs = myXmlFrs + "<LAND1_2>" + Land12 + "</LAND1_2>"
	        myXmlFrs = myXmlFrs + "<STCD1>" + Stcd1 + "</STCD1>"
	        myXmlFrs = myXmlFrs + "<STCD2>" + Stcd2 + "</STCD2>"
	        myXmlFrs = myXmlFrs + "<ZNRID_EXT>" + Znrid + "</ZNRID_EXT>"
	        myXmlFrs = myXmlFrs + "<ZDEMESC>" + Zdemesc + "</ZDEMESC>"
	        myXmlFrs = myXmlFrs + "<ZPAICOMP>" + Zpaicomp + "</ZPAICOMP>"
	        myXmlFrs = myXmlFrs + "<ZCODE_ABC>" + ZcodeAbc + "</ZCODE_ABC>"
	        myXmlFrs = myXmlFrs + "<ZEQUIP_ACHAT>" + ZequipAchat + "</ZEQUIP_ACHAT>"
	        myXmlFrs = myXmlFrs + "<ZINFO_LITIGE>" + ZinfoLitige + "</ZINFO_LITIGE>"
	        myXmlFrs = myXmlFrs + "<ZADMIN_GI>" + ZadminGi + "</ZADMIN_GI>"
	        myXmlFrs = myXmlFrs + "<ZPPE_MEMBER>" + ZppeMember + "</ZPPE_MEMBER>"
	        myXmlFrs = myXmlFrs + "<ZPPE_VENDOR>" + ZppeVendor + "</ZPPE_VENDOR>"
	        myXmlFrs = myXmlFrs + "<ZPPE_EXTRA>" + ZppeExtra + "</ZPPE_EXTRA>"
	        myXmlFrs = myXmlFrs + "<SPARS>" + Spars + "</SPARS>"
	        myXmlFrs = myXmlFrs + "<STCEG>" + Stceg + "</STCEG>"
	        myXmlFrs = myXmlFrs + "<REGIO>" + Regio + "</REGIO>"
	        myXmlFrs = myXmlFrs + "<WAERS>" + Waers + "</WAERS>"
	        myXmlFrs = myXmlFrs + "<STREET>" + Street + "</STREET>"
	        myXmlFrs = myXmlFrs + "<HOUSE_NUM1>" + HouseNum1 + "</HOUSE_NUM1>"
	        myXmlFrs = myXmlFrs + "<STATUT>" + Statut + "</STATUT>"
	        myXmlFrs = myXmlFrs + "<GBDAT>" + Gbdat + "</GBDAT>"
	        myXmlFrs = myXmlFrs + "<STENR>" + Stenr + "</STENR>"
	        myXmlFrs = myXmlFrs + "<REVDB>" + Revdb + "</REVDB>"
	        /*************  NEW V2 ****************/
	        myXmlFrs = myXmlFrs + "<FAMILLEPROD>" + Familleprod + "</FAMILLEPROD>"
	        myXmlFrs = myXmlFrs + "<WEBSITE>" + Website + "</WEBSITE>"
	        myXmlFrs = myXmlFrs + "<CIRCUIT_DIST>" + Circuit_dist + "</CIRCUIT_DIST>"
	        myXmlFrs = myXmlFrs + "<NATURE_PDT>" + Nature_pdt + "</NATURE_PDT>"
	        /*************  NEW V2 ****************/
	        myXmlFrs = myXmlFrs + "</IsFrn>"
	        tabResPer = tabResPer.join(" ");
	        myXmlRequest = myXmlRequest + "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>"
	        myXmlRequest = myXmlRequest + "<soapenv:Header/>"
	        myXmlRequest = myXmlRequest + "<soapenv:Body>"
	        myXmlRequest = myXmlRequest + "<urn:ZCrmDa11Davis>"
	        myXmlRequest = myXmlRequest + myXmlAffaire.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	        myXmlRequest = myXmlRequest + myXmlFrs.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	        myXmlRequest = myXmlRequest + "<ItContact>"
	        myXmlRequest = myXmlRequest + tabResPer.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	        myXmlRequest = myXmlRequest + "</ItContact>"
	        myXmlRequest = myXmlRequest + "</urn:ZCrmDa11Davis>"
	        myXmlRequest = myXmlRequest + "</soapenv:Body>"
	        myXmlRequest = myXmlRequest + "</soapenv:Envelope>"
	        //alert (myXmlRequest);
	        var vUrlWebService = top.MyApp.CustomSetting.tabGlobalVar["SAP_WS"]; //pURL  ///pData
	        var arrParam = [];
	        arrParam[0] = vUrlWebService;
	        arrParam[1] = myXmlRequest;
	        var result = top.MyApp.ExecuteServerScript(39812164272642, arrParam);
	        alert(result);
	        if (result != 'Erreur') {
	           // traiter la string result
	            if (result.substring(0, 1) == "I") {
	                top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	                top.MyApp.Custom_ValidationBtn = true;
	                top.MyApp.SetItemValue("OppStatus", "01.A DEMANDE AVIS");
	                //PS_Opp_Header_Status();
	                top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	                var MyReturn = top.MyApp.fraMenuBar.Execute("R_Save");
	                //top.MyApp.fraMenuBar.Execute("R_Consult");
	                top.MyApp.OpenDlg(top.MyApp.arrTranslations["Alert"], ["Message", result.substring(1, result.length)]);
	            } else {
	                top.MyApp.SetItemValue("OppStatus", "01. EN CONSTITUTION");
	                //PS_Opp_Header_Status();
	                top.MyApp.OpenDlg("Alert", ["Attention", result.substring(1, result.length)]);
	                return false;
	            }
	        } else {
	            //top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Une erreur est survenue lors de la création de la demande avis dans SAP !!"]]);
	            top.MyApp.OpenDlg("Alert", ["Attention", "Une erreur est survenue lors de la création de la demande avis dans SAP !!"]);
	            return false;
	        }
	        var vMethode = "ZCrmDa11Davis";
	        // var vXmlRequest = vParam[0]; //+ " / " + vParam[1];
	        var vXmlRequest = myXmlRequest;
	        var vRetour = strRetour;
	        var vLogCom = "";
	        //alert('Before insert in log');
	        var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest.replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '" + vLogCom.replace(/'/g, "''") + "', getdate()) ";
	        var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vReqInsertLog]);
	        //alert(vReqInsertLog);
	        //alert(strResultat);
	    }
	} catch (e) {
	     alert("Catch (PS_Opp_Send_OPREQ) : " + e.description + " -- " + e.message + " ");
	    var vMethode = "ZCrmDa11Davis";
	    var vXmlRequest = strReqSQL;
	    var vRetour = e.message;
	    var vLogCom = "";
	    vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest.replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '" + vLogCom.replace(/'/g, "''") + "', getdate()) ";
	    var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vReqInsertLog]);
	    //return false;
	}
}