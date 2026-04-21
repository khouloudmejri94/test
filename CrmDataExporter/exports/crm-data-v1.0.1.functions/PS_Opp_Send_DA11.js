function PS_Opp_Send_DA11()
{
	//SEND DA11-2
	try {
	    var vOutSrc = top.MyApp.GetItemValue('OppExtOutSrc');
	    var Statut = top.MyApp.GetItemValue("OppStatus");
	    var vAcheteur = top.MyApp.GetItemValue("OppExtAcheteur");
	    var vCp = top.MyApp.GetItemValue("OppExtChefproduit");
	    var vStatut = "";
	    var strRetour = "";
	    var vType = "";
	    var myXmlRequest = "";
	    var vpacakges = top.MyApp.GetItemValue("OppExtProduitspackages");
	    var vBois = top.MyApp.GetItemValue("OppExtBois");
	    vpacakges = vpacakges.substring(0, 3);
	    var vDateDebTraitement = new Date();
	    vDateDebTraitement = top.MyApp.fctFormatDate(vDateDebTraitement, top.MyApp.SYSTEM_DATE, top.MyApp.SYSTEM_DATE);
	    var strSQLRes = "select (select xCodeGI from sysadm.am0 where titulaire ='" + vAcheteur + "' ), (select xcode_sap from sysadm.am0 where titulaire='" + vCp + "' )"
	    var tabTitulaire = top.MyApp._gfctExtReq(strSQLRes);
	    // HAS DEB : 17/07/2019 selectionner le mode de vente conseillé en mode liste de choix multiple et concatener avec des virgules
	    var StrSqlMode = " SELECT  cast(STUFF (  (SELECT ',' + CAST(ap01_name AS VARCHAR(MAX)) FROM sysadm.do6  where do6.do0_nrid = do0.nrid  FOR XML PATH('') ),1, 1, '') AS varchar(255)) as MODE FROM sysadm.do0 where nrid  = '" + top.MyApp.GetItemValue("OppNRID") + "' ";
	    var vModeConseille = top.MyApp._gfctExtReq(StrSqlMode);
	    //top.MyApp.OpenDlg("Alert", ["Attention", "Voici le mode de vente: " + vModeConseille + "."]);
	    /************************** INSERT RESPONSES FOR STANDBY QUESTIONS ********************************** */
	    var strSbSql = "select '<item>'+'<Zid>'+ CAST(idQuestionHub as varchar(15)) +'</Zid>'";
	    strSbSql = strSbSql + "+'<Zcategorie>'+ replace(replace(replace(CAST(categorie as varchar(50)),'&','&amp;'),'<','&lt;'),'>','&gt;') +'</Zcategorie>'";
	    strSbSql = strSbSql + "+'<Zdemandeur>'+ (case when (demandeur IS null)  then '' else CAST(demandeur as varchar(80)) end) +'</Zdemandeur>'";
	    strSbSql = strSbSql + "+'<Zquestion>'+ replace(replace(replace(CAST(question as varchar(1000)),'&','&amp;'),'<','&lt;'),'>','&gt;') +'</Zquestion>'";
	    strSbSql = strSbSql + "+'<Zdatequestion>'+ convert(varchar(20), date_question ,23) + ' ' + convert(varchar, date_question, 24) +'</Zdatequestion>'";
	    strSbSql = strSbSql + "+'<Zreponse>'+  replace(replace(replace(replace(CAST(reponse as varchar(8000)),'&','&amp;'),'<','&lt;'),'>','&gt;'),'''','') + '</Zreponse>'";
	    strSbSql = strSbSql + "+'<Zdatereponse>'+ convert(varchar(20), date_reponse ,23) + ' ' +  convert(varchar, date_reponse, 24) +'</Zdatereponse>'";
	    strSbSql = strSbSql + "+'</item>' from sysadm.xdemande_info where template is null and reponse is not null and do0_nrid =(select nrid from sysadm.do0 where ref='" + top.MyApp.GetItemValue("OppReference") + "') order by dmod desc";
	    var tabResSB = top.MyApp._gfctExtReq(strSbSql);
	    //alert(tabResSB);
	    /************************** INSERT RESPONSES FOR STANDBY QUESTIONS ********************************** */
	    var strReqSQL = "select '<item>'+'<Zvisuel>'+ replace(replace(replace(CAST(  xVisuel_num_echant as varchar(30)),'&','&amp;'),'<','&lt;'),'>','&gt;') +'</Zvisuel>'";
	    strReqSQL = strReqSQL + "+'<Zzlicha>'+ replace(replace(replace(CAST( xref_fournisseur as varchar(15)),'&','&amp;'),'<','&lt;'),'>','&gt;') +'</Zzlicha>'";
	    strReqSQL = strReqSQL + "+'<ZzdesignFour>'+ replace(replace(replace(CAST( xdesignation_fr as varchar(60)),'&','&amp;'),'<','&lt;'),'>','&gt;') +'</ZzdesignFour>'";
	    strReqSQL = strReqSQL + "+'<Zzdesign>'+ replace(replace(replace(CAST( xdesignation_noz as varchar(60)),'&','&amp;'),'<','&lt;'),'>','&gt;') +'</Zzdesign>'";
	    strReqSQL = strReqSQL + "+'<Dontec3>'+  replace(replace(replace(CAST( xcouleurs as varchar(15)),'&','&amp;'),'<','&lt;'),'>','&gt;') +'</Dontec3>'";
	    strReqSQL = strReqSQL + "+'<Dontec2>'+  replace(replace(replace(CAST( xunite_mesure as varchar(15)),'&','&amp;'),'<','&lt;'),'>','&gt;') + '</Dontec2>'";
	    strReqSQL = strReqSQL + "+'<Zlicence>'+  replace(replace(replace(CAST( xmarques_licences as varchar(20)),'&','&amp;'),'<','&lt;'),'>','&gt;') +'</Zlicence>'";
	    strReqSQL = strReqSQL + "+'<Zzdlv>'+  (case when (xdluo IS null)  then '' else convert(varchar(20),xdluo,112) end) +'</Zzdlv>'";
	    strReqSQL = strReqSQL + "+'<Znf>'+  replace(replace(CAST(  xnon_fiscalise as varchar(1)),'<','&lt;'),'>','&gt;') +'</Znf>'";
	    strReqSQL = strReqSQL + "+'<Qtedi>'+  CAST(  xqte_dispo as varchar(17)) +'</Qtedi>'";
	    strReqSQL = strReqSQL + "+'<Privenf>'+  CAST(  xtarif_fr as varchar(16)) +'</Privenf>'";
	    strReqSQL = strReqSQL + "+'<Netpra>'+  CAST(  xprix_cession  as varchar(16)) +'</Netpra>'";
	    strReqSQL = strReqSQL + "+'<Privenm>'+  CAST(  xPVP_PVC as varchar(16)) +'</Privenm>'";
	    strReqSQL = strReqSQL + "+'<Colisage>'+  CAST(  xColisage as varchar(17)) +'</Colisage>'";
	    strReqSQL = strReqSQL + "+'<Znbcolis>'+  CAST(  xNb_colis_palettes as varchar(10)) +'</Znbcolis>'";
	    strReqSQL = strReqSQL + "+'<Znbpal>'+  CAST(  xNb_palettes as varchar(10)) +'</Znbpal>'";
	    strReqSQL = strReqSQL + "+'</item>' from sysadm.xda11 where do0_nrid =(select nrid from sysadm.do0 where ref='" + top.MyApp.GetItemValue("OppReference") + "') and template is null order by xnum_ligne";
	    var tabRes = top.MyApp._gfctExtReq(strReqSQL);
	    if (tabRes.length > 0) {
	        var vPalet = top.MyApp.GetItemValue("OppExtPrdtsdejaplttses");
	        vPalet = vPalet.substring(0, 1);
	        var vPartagable = top.MyApp.GetItemValue("OppExtCommPartg");
	        switch (vPartagable) {
	            case 'A la Référence':
	                vPartagable = 'Q'
	                break;
	            case 'Au Volume':
	                vPartagable = 'V'
	                break;
	            case 'Non partageable':
	                vPartagable = 'N'
	                break;
	            default:
	                vPartagable = ''
	        }
	        if (Statut.substring(0, 2) == "03" || Statut.substring(0, 2) == "04") {
	            vStatut = "04. COMPLET";
	            vType = "ST";
	        } else if (Statut.substring(0, 2) == "06" || Statut.substring(0, 2) == "07" || Statut.substring(0, 2) == "12") {
	            vStatut = "06. Dmd.VALID.MANAG.ACHAT";
	            vType = top.MyApp.GetItemValue("OppType");
	        }
	        var vDateMarche = top.MyApp.GetItemValue("OppExtDMDispMar")
	        vDateMarche = top.MyApp.fctFormatDate(vDateMarche, top.MyApp.SYSTEM_DATE, "[yyyy][MM][dd]");
	        var vDateEcheance = top.MyApp.GetItemValue("OppExtDateEcheance")
	        vDateEcheance = top.MyApp.fctFormatDate(vDateEcheance, top.MyApp.SYSTEM_DATE, "[yyyy][MM][dd]");
	        var vNote = top.MyApp.GetItemValue("OppExtNoteAff")
	        vNote = vNote.substring(0, 2);
	        var vDateCreation = top.MyApp.GetItemValue("OppCreationDate");
	        vDateCreation = top.MyApp.fctFormatDate(vDateCreation, top.MyApp.SYSTEM_DATE, "[yyyy][MM][dd]");
	        var vPaysFacturation = top.MyApp.GetItemValue("OppExtPaysFacturation");
	        var vComment = top.MyApp.GetItemValue("OppComment").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;");
	        //var vURIComment = encodeURIComponent(vComment);
	        vPaysFacturation = vPaysFacturation.substring(0, 2);
	        myXmlAffaire = " <Affaire>"
	        myXmlAffaire = myXmlAffaire + "<Oppreference>" + top.MyApp.GetItemValue("OppReference") + "</Oppreference>"
	        myXmlAffaire = myXmlAffaire + "<Oppstatus>" + vStatut.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppstatus>"
	        myXmlAffaire = myXmlAffaire + "<Oppcreationdate>" + vDateCreation + "</Oppcreationdate>"
	        myXmlAffaire = myXmlAffaire + "<Oppextcodefour>" + top.MyApp.GetItemValue("OppExtCodeFour") + "</Oppextcodefour>"
	        myXmlAffaire = myXmlAffaire + "<Oppcpyname>" + top.MyApp.GetItemValue("OppCpyName").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppcpyname>"
	        myXmlAffaire = myXmlAffaire + "<Oppcomment>" + vComment + "</Oppcomment>"
	        myXmlAffaire = myXmlAffaire + "<Opptype>" + vType.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Opptype>"
	        myXmlAffaire = myXmlAffaire + "<Oppcustreference>" + top.MyApp.GetItemValue("OppCustReference") + "</Oppcustreference>"
	        myXmlAffaire = myXmlAffaire + "<Oppextacheteur>" + tabTitulaire[0][0] + "</Oppextacheteur>"
	        myXmlAffaire = myXmlAffaire + "<Oppextnoteaff>" + top.MyApp.GetItemValue("OppExtNoteAff") + "</Oppextnoteaff>"
	        myXmlAffaire = myXmlAffaire + "<Oppextfamille>" + top.MyApp.GetItemValue("OppExtFamille").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextfamille>"
	        myXmlAffaire = myXmlAffaire + "<Oppextconclot>" + top.MyApp.GetItemValue("OppExtConcLot") + "</Oppextconclot>"
	        myXmlAffaire = myXmlAffaire + "<Oppsource>" + top.MyApp.GetItemValue("OppSource").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppsource>"
	        myXmlAffaire = myXmlAffaire + "<Oppextancienneteproduits>" + top.MyApp.GetItemValue("OppExtAncienneteProduits").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextancienneteproduits>"
	        myXmlAffaire = myXmlAffaire + "<Oppextautrsol>" + top.MyApp.GetItemValue("OppExtAutrSol").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextautrsol>"
	        myXmlAffaire = myXmlAffaire + "<Oppextdateecheance>" + vDateEcheance + "</Oppextdateecheance>"
	        myXmlAffaire = myXmlAffaire + "<Oppextdelaireponsesouh>" + top.MyApp.GetItemValue("Oppextdelaireponsesouh") + "</Oppextdelaireponsesouh>"
	        myXmlAffaire = myXmlAffaire + "<Oppextraisurg>" + top.MyApp.GetItemValue("OppExtRaisUrg").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextraisurg>"
	        myXmlAffaire = myXmlAffaire + "<Oppextdestifinalgi>" + top.MyApp.GetItemValue("OppExtDestiFinalGI").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextdestifinalgi>"
	        myXmlAffaire = myXmlAffaire + "<Oppextdistrinetworkgi>" + top.MyApp.GetItemValue("OppExtDistriNetworkGI").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextdistrinetworkgi>"
	        myXmlAffaire = myXmlAffaire + "<Oppextlotglob>" + top.MyApp.GetItemValue("OppExtLotGlob") + "</Oppextlotglob>"
	        myXmlAffaire = myXmlAffaire + "<Oppextmagasinsinterdits>" + top.MyApp.GetItemValue("OppExtMagasinsinterdits") + "</Oppextmagasinsinterdits>"
	        myXmlAffaire = myXmlAffaire + "<Oppextraisinterd>" + top.MyApp.GetItemValue("OppExtRaisInterd").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextraisinterd>"
	        myXmlAffaire = myXmlAffaire + "<Oppextproduitspackages>" + vpacakges + "</Oppextproduitspackages>"
	        myXmlAffaire = myXmlAffaire + "<Oppextsupplieractivitygi>" + top.MyApp.GetItemValue("OppExtSupplierActivityGI") + "</Oppextsupplieractivitygi>"
	        myXmlAffaire = myXmlAffaire + "<Oppextwebsitegi>" + top.MyApp.GetItemValue("OppExtWebsiteGI").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextwebsitegi>"
	        myXmlAffaire = myXmlAffaire + "<Oppextcatalogue>" + top.MyApp.GetItemValue("OppExtCatalogue") + "</Oppextcatalogue>"
	        myXmlAffaire = myXmlAffaire + "<Oppextechantillonrepresentatif>" + top.MyApp.GetItemValue("OppExtEchantillonRepresentatif") + "</Oppextechantillonrepresentatif>"
	        myXmlAffaire = myXmlAffaire + "<Oppextfact>" + top.MyApp.GetItemValue("OppExtFact") + "</Oppextfact>"
	        myXmlAffaire = myXmlAffaire + "<Oppextgarantie>" + top.MyApp.GetItemValue("OppExtGarantie") + "</Oppextgarantie>"
	        myXmlAffaire = myXmlAffaire + "<Oppextlic>" + top.MyApp.GetItemValue("OppExtLic") + "</Oppextlic>"
	        myXmlAffaire = myXmlAffaire + "<Oppextvisuel>" + top.MyApp.GetItemValue("OppExtVisuel") + "</Oppextvisuel>"
	        myXmlAffaire = myXmlAffaire + "<Oppextcodepaysdepart>" + top.MyApp.GetItemValue("OppExtCodePaysDepart") + "</Oppextcodepaysdepart>"
	        myXmlAffaire = myXmlAffaire + "<Oppextportdepart>" + top.MyApp.GetItemValue("OppExtPortDepart").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextportdepart>"
	        myXmlAffaire = myXmlAffaire + "<Oppextcommpartg>" + top.MyApp.GetItemValue("OppExtCommPartg") + "</Oppextcommpartg>"
	        myXmlAffaire = myXmlAffaire + "<Oppextdmdispmar>" + vDateMarche + "</Oppextdmdispmar>"
	        myXmlAffaire = myXmlAffaire + "<Oppextlieustock>" + top.MyApp.GetItemValue("OppExtLieuStock").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextlieustock>"
	        myXmlAffaire = myXmlAffaire + "<Oppextnbpalettes>" + top.MyApp.GetItemValue("OppExtNbPalettes") + "</Oppextnbpalettes>"
	        myXmlAffaire = myXmlAffaire + "<Oppextprdtsdejaplttses>" + top.MyApp.GetItemValue("OppExtPrdtsdejaplttses") + "</Oppextprdtsdejaplttses>"
	        myXmlAffaire = myXmlAffaire + "<Oppextsioui>" + top.MyApp.GetItemValue("OppExtSiOui").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextsioui>"
	        myXmlAffaire = myXmlAffaire + "<Oppextraisonss>" + top.MyApp.GetItemValue("OppExtRaisonSS").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextraisonss>"
	        myXmlAffaire = myXmlAffaire + "<Oppextproblot>" + top.MyApp.GetItemValue("OppExtProbLot").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextproblot>"
	        myXmlAffaire = myXmlAffaire + "<Oppextinfomarkt>" + top.MyApp.GetItemValue("OppExtInfoMarkt").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextinfomarkt>"
	        myXmlAffaire = myXmlAffaire + "<Oppextcommqu>" + top.MyApp.GetItemValue("OppExtCommQu").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextcommqu>"
	        myXmlAffaire = myXmlAffaire + "<Oppextraisonsscom>" + top.MyApp.GetItemValue("OppExtRaisonSSCom").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextraisonsscom>"
	        // Ajout Pays Facturation
	        myXmlAffaire = myXmlAffaire + "<Oppextpaysfacturation>" + vPaysFacturation + "</Oppextpaysfacturation>"
	        // HAS DEB : 17/07/2019 ajouter le mode de vente conseillé + envoi
	        myXmlAffaire = myXmlAffaire + "<Oppextmodeventeconseille>" + vModeConseille + "</Oppextmodeventeconseille>"
	        myXmlAffaire = myXmlAffaire + "<Oppexturg>" + top.MyApp.GetItemValue("OppExtUrg").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppexturg>"
	        myXmlAffaire = myXmlAffaire + "<Oppextsalon>" + top.MyApp.GetItemValue("OppExtSalon").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/é/g, "&#233;").replace(/è/g, "&#232;").replace(/à/g, "&#224;") + "</Oppextsalon>"
	        
	        if (vBois == "OUI") {
	            vBois = "X"
	        } else {
	            vBois = "";
	        }
	        myXmlAffaire = myXmlAffaire + "<Oppextbois>" + vBois + "</Oppextbois>"
	        
	        myXmlAffaire = myXmlAffaire + "</Affaire>"
	        tabRes = tabRes.join(" ");
	        myXmlRequest = myXmlRequest + "<?xml version='1.0' encoding='UTF-8'?>" //<?xml version='1.0' encoding='UTF-8'?>
	        myXmlRequest = myXmlRequest + "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>"
	        myXmlRequest = myXmlRequest + "<soapenv:Header/>"
	        myXmlRequest = myXmlRequest + "<soapenv:Body>"
	        myXmlRequest = myXmlRequest + "<urn:ZCrmDa11Client>"
	        myXmlRequest = myXmlRequest + myXmlAffaire
	        myXmlRequest = myXmlRequest + "<Da11>"
	        if (tabResSB == '' || tabResSB == null || tabResSB == undefined) {
	            myXmlRequest = myXmlRequest + tabRes.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	        }
	        myXmlRequest = myXmlRequest + "</Da11>"
	        tabResSB = tabResSB.join(" ");
	        myXmlRequest = myXmlRequest + "<Zquestions>"
	        myXmlRequest = myXmlRequest + tabResSB.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	        myXmlRequest = myXmlRequest + "</Zquestions>"
	        myXmlRequest = myXmlRequest + "</urn:ZCrmDa11Client>"
	        myXmlRequest = myXmlRequest + "</soapenv:Body>"
	        myXmlRequest = myXmlRequest + "</soapenv:Envelope>"
	        var vUrlWebService = top.MyApp.CustomSetting.tabGlobalVar["SAP_WS"];
	        var arrParam = [];
	        arrParam[0] = vUrlWebService;
	        arrParam[1] = myXmlRequest;
	        var result = top.MyApp.ExecuteServerScript(38290153425750, arrParam);
	        alert(result)
	        if (result != 'Erreur') {
	            if (vOutSrc == '1') {
	                // traiter la string result
	                //var vMethode = "PS_Opp_Send_DA11_ST";
	                if (result.substring(0, 1) == "I") {
	                    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	                    top.MyApp.Custom_ValidationBtn = true;
	                    top.MyApp.SetItemValue("OppStatus", "04. COMPLET");
	                    PS_Opp_Header_Status();
	                    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	                    var MyReturn = top.MyApp.fraMenuBar.Execute("R_Save");
	                    top.MyApp.OpenDlg(top.MyApp.arrTranslations["Alert"], ["Message", result.substring(1, result.length)]);
	                } else {
	                    top.MyApp.SetItemValue("OppStatus", "03. Dmd.VALID. MANAG.PROS");
	                    PS_Opp_Header_Status();
	                }
	            } else {
	                // traiter la string result
	                //var vMethode = "PS_Opp_Send_DA11_CL";
	                if (result.substring(0, 1) == "I") {
	                    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	                    top.MyApp.Custom_ValidationBtn = true;
	                    top.MyApp.SetItemValue("OppStatus", "07. DEMANDE D'UNE OFFRE");
	                    top.MyApp.SetItemValue("OppExtQui", "");
	                    PS_Opp_Header_Status();
	                    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	                    var MyReturn = top.MyApp.fraMenuBar.Execute("R_Save");
	                    top.MyApp.OpenDlg(top.MyApp.arrTranslations["Alert"], ["Message", result.substring(1, result.length)]);
	                } else {
	                    top.MyApp.SetItemValue("OppStatus", "06. Dmd.VALID.MANAG.ACHAT");
	                    PS_Opp_Header_Status();
	                }
	            }
	        } else {
	            //var vMethode = "PS_Opp_Send_DA11_E";
	            top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Une erreur est survenue lors de la création de la demande d'offre dans SAP !!"]]);
	            return false;
	        }
	        //alert('Insertion dans la table lOG WS');
	        var vMethode = "PS_Opp_Send_DA11";
	        var vXmlRequest = myXmlAffaire //strReqSQL;
	        var vRetour = result;
	        var vLogCom = "";
	        vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + myXmlRequest.replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '" + vLogCom.replace(/'/g, "''") + "', getdate()) ";
	        var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vReqInsertLog]);
	    }
	} catch (e) {
	    // alert("Catch (PS_Opp_Send_DA11) : " + e.description + " -- " + e.message + " ");
	    var vMethode = "PS_Opp_Send_DA11";
	    var vXmlRequest = myXmlAffaire //strReqSQL;
	    var vRetour = e.message;
	    var vLogCom = "";
	    vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + myXmlRequest.replace(/'/g, "''") + "', '" + result.replace(/'/g, "''") + "', '" + vLogCom.replace(/'/g, "''") + "', getdate()) ";
	    var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vReqInsertLog]);
	}
}