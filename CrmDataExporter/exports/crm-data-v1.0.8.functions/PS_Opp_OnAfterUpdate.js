function()
{
	top.MyApp.OpenDlg("Alert", ["MERCI", "L'affaire a été mise ajour avec succés"]);
	     top.MyApp.fraMenuBar.Execute("R_Consult");
	    return true;
	
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) 
	{
	 _oCurWnd = top.MyData_View; 
	}
	else
	{
	 _oCurWnd = top.MyApp.wizardWindow; 
	}
		//RLM - 21/08/2013
	//Modifs :
	//-- RLM - Création WS envoi status SAP
	//-- RLM - 28/07/2013 - Ajout log WS
	//-- MH  - 19/10/2015 - Ajout champs port depart code pays Lotglob 
	//DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	if (top.MyApp.GetItemValue("OppStatus", _oCurWnd).substr(0, 2) == "05" || top.MyApp.GetItemValue("OppStatus", _oCurWnd).substr(0, 2) == "06" || top.MyApp.GetItemValue("OppStatus", _oCurWnd).substr(0, 2) == "07" || top.MyApp.GetItemValue("OppStatus", _oCurWnd).substr(0, 2) == "02") {
	//FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	    try {
	        var vNumAff = top.MyApp.GetItemValue("OppReference", _oCurWnd);
	        var vNote = top.MyApp.GetItemValue("OppExtNoteAff", _oCurWnd);
	        var vResp = "";
	        var vStatusAff = "";
	        var vDerogPaieCmpt = top.MyApp.GetItemValue("OppExtDerogPerm", _oCurWnd);
	        var vFacpro = top.MyApp.GetItemValue("OppExtFactureProforma", _oCurWnd);
	        var vMailComptaEnv = top.MyApp.GetItemValue("OppExtMailSend", _oCurWnd);
	        var vOrigi = top.MyApp.GetItemValue("OppExtProbLot", _oCurWnd);
	        var vCodePays = top.MyApp.GetItemValue("OppExtCodePaysDepart", _oCurWnd);
	        var vPortDepart = top.MyApp.GetItemValue("OppExtPortDepart", _oCurWnd);
	        var vLotGlob = top.MyApp.GetItemValue("OppExtLotGlob", _oCurWnd);
	        var vCommentTF = top.MyApp.GetItemValue("OppExtCommentTF", _oCurWnd);
	
	        var strSQLRes = "select xcode_sap from sysadm.am0 where titulaire ='" + top.MyApp.GetItemValue("OppExtChefproduit", _oCurWnd) + "'"
	        var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	        vResp = arrRes[0][0];
	
	        //DEBUT FTC@MASAO  15/09/2017 - Mantis 13273
	        var strSQLRes2 = "SELECT ap01_name FROM sysadm.do6 where template is null AND ap00_name = 'Interdit' AND do0_nrid = '" + top.MyApp.GetItemValue("OppNRID", _oCurWnd) + "'"
	        var arrRes2 = top.MyApp._gfctExtReq(strSQLRes2);
	        //FIN FTC@MASAO  15/09/2017
	       //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	        if (top.MyApp.GetItemValue("OppStatus", _oCurWnd).substr(0, 2) == "02") vStatusAff = "N ";
	        if (top.MyApp.GetItemValue("OppStatus", _oCurWnd).substr(0, 2) == "05") vStatusAff = "V ";
	        if (top.MyApp.GetItemValue("OppStatus", _oCurWnd).substr(0, 2) == "06") vStatusAff = "X ";
	        if (top.MyApp.GetItemValue("OppStatus", _oCurWnd).substr(0, 2) == "07") vStatusAff = "S ";
	       //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	  
	        var myXmlRequest = "";
	        myXmlRequest = myXmlRequest + "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:urn='urn:sap-com:document:sap:soap:functions:mc-style'>"
	        myXmlRequest = myXmlRequest + "<soapenv:Header/>"
	        myXmlRequest = myXmlRequest + "<soapenv:Body>"
	        myXmlRequest = myXmlRequest + "<urn:ZCrmAffaire>"
	        myXmlRequest = myXmlRequest + "<Dtstatut></Dtstatut>"
	        myXmlRequest = myXmlRequest + "<IvComTopFlop>" + vCommentTF + "</IvComTopFlop>"
	        myXmlRequest = myXmlRequest + "<Lotglo>" + vLotGlob + "</Lotglo>"
	        myXmlRequest = myXmlRequest + "<PHarbourDeparture>" + vPortDepart + "</PHarbourDeparture>"
	        myXmlRequest = myXmlRequest + "<PLandDeparture>" + vCodePays + "</PLandDeparture>"
	        myXmlRequest = myXmlRequest + "<Statut>" + vStatusAff + "</Statut>"
	        //DEBUT FTC@MASAO  15/09/2017 - Mantis 13273
	        myXmlRequest = myXmlRequest + "<TabInterdit>";
	        for (var i = 0; i < arrRes2.length; i++) {
	            myXmlRequest = myXmlRequest + "<item>";
	            //myXmlRequest = myXmlRequest + "<Mandt>"+""+"</Mandt>";
	            myXmlRequest = myXmlRequest + "<Zzaffair>" + vNumAff + "</Zzaffair>";
	            myXmlRequest = myXmlRequest + "<TypeInterdit>" + arrRes2[i][0] + "</TypeInterdit>";
	            myXmlRequest = myXmlRequest + "<Actif>" + "" + "</Actif>";
	            myXmlRequest = myXmlRequest + "</item>";
	        }
	        myXmlRequest = myXmlRequest + "</TabInterdit>";
	        //FIN FTC@MASAO  15/09/2017
	        myXmlRequest = myXmlRequest + "<ZderogPaieCmpt>" + vDerogPaieCmpt + "</ZderogPaieCmpt>"
	        myXmlRequest = myXmlRequest + "<Zfacpro>" + vFacpro + "</Zfacpro>"
	        myXmlRequest = myXmlRequest + "<ZmailComptaEnv>" + vMailComptaEnv + "</ZmailComptaEnv>"
	        myXmlRequest = myXmlRequest + "<Znote>" + vNote + "</Znote>"
	        myXmlRequest = myXmlRequest + "<Zzaffai>" + vNumAff + "</Zzaffai>"
	        myXmlRequest = myXmlRequest + "<Zzorigi>" + vOrigi.substring(0, 60).replace('&', ' ') + "</Zzorigi>"
	        myXmlRequest = myXmlRequest + "<Zzresp>" + vResp + "</Zzresp>"
	        myXmlRequest = myXmlRequest + "</urn:ZCrmAffaire>"
	        myXmlRequest = myXmlRequest + "</soapenv:Body>"
	        myXmlRequest = myXmlRequest + "</soapenv:Envelope>"
	        //NLO le 03/08/2017 : Mantis 12832
	        var no_SAP_WS = false;
	        try {
	            var vUrlWebService = top.MyApp.CustomSetting.tabGlobalVar["SAP_WS"];
	        } catch (e) {
	            no_SAP_WS = true;
	        }
	        if (!no_SAP_WS) {
	            //Ouverture de l'activeX Microsoft
	            var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	            //Ouverture
	            xmlHttp.open("POST", vUrlWebService, false);
	            xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	            xmlHttp.send(myXmlRequest);
	            strRetour = xmlHttp.responseXML.xml;
	            var vMethode = "ZCrmAffaire";
	            var vXmlRequest = myXmlRequest;
	            var vRetour = strRetour;
	            var vLogCom = "";
	            var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', '" + vLogCom.replace(/'/g, "''") + "', getdate()) ";
	            var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vReqInsertLog], '', '', true);
	        }
	
	    } catch (e) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Catch - PS_Opp_OnAfterUpdate - " + e.description]);
	    }
	}
	 
		//DEBUT FTC@MASAO - MANTIS 14219 - 19/12/2017
	if( top.MyApp.GetItemValue("OppStatus",_oCurWnd).substr(0, 2) == "07" )
	//FIN FTC@MASAO - MANTIS 14219 - 19/12/2017
	{
	
	     var oppStatus = top.MyApp.GetItemValue("OppReference",_oCurWnd);
	     var vReqInsertLog="select COUNT(*) as nb from sysadm.dc0 where no_dossier = '"+oppStatus+"' ";
	     var strResultat = top.MyApp._gfctExtReq(vReqInsertLog);
	
	     if( strResultat[0][0] >= 1)
	     {
	          //Desactivation msg RLM 09.07.2015
	          //alert("Attention. Une offre à déja été créée.");
	     }else{
	          PS_Opp_Send_DA11();
	     }
	}
		try{
	
	/*[D]Grand Import*/
	if (top.MyApp.wizardWindow) 
	{
	     var vStatut  = top.MyApp.GetItemValue("OppStatus",_oCurWnd); 
	     var strSQLRes= "select COUNT(*) as nbLigne from sysadm.am0 where titulaire = '"+ top.MyApp.GetItemValue("OppExtAcheteur") +"' and team_name = 'GI'"
	     var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	//DEBUT FTC@MASAO - MANTIS 14219 - 19/12/2017
	     if(arrRes == 1 && vStatut.substr(0, 2) == "03"){
	//FIN FTC@MASAO - MANTIS 14219 - 19/12/2017
	        strSQLInsert = "insert into sysadm.xdemande_info (do0_nrid, categorie, question) values ("+top.MyApp.GetItemValue("OppNRID",_oCurWnd)+",'"+top.MyApp.GetItemValue("OppExtInfoMarktListe",_oCurWnd)+"','"+top.MyApp.GetItemValue("OppExtInfoMarkt",_oCurWnd)+"')";
	        var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [strSQLInsert],'','',true);
	       var vAcheteur    = top.MyApp.GetItemValue('OppExtAcheteur');
	       var vProfilInit  = top.MyApp.UserSetting.User.ProfileInitials;    
	       var vSQL = "select e_mail from sysadm.am0 where titulaire = ('"+vAcheteur+"')";  
	        //[D] GI Zone 
	       var vSQL2 = "select xGI_Zone from sysadm.am0 where titulaire = ('"+vAcheteur+"')";
	       var arrRes2 = top.MyApp._gfctExtReq(vSQL2);
	        //[F] GI Zone         
	       var arrRes = top.MyApp._gfctExtReq(vSQL);
	       var vEmail = arrRes.join(";");
	       if (arrRes.length >= 1){
	          var arrParam = []
	        //[D] GI Zone 
	          //arrParam[0] = "adm10import@gimport10.com"; //From
	              if(arrRes2)
	              {
	               arrParam[0] = arrRes2; //From
	              }else
	              {
	               arrParam[0] = "adm10import@gimport10.com"; //From
	              }
	        //[F] GI Zone 
	          arrParam[1] = vEmail + ";buyworld@ozeol.com"; //To
	          arrParam[2] = top.MyApp.GetItemValue('OppReference',_oCurWnd)+ " - " +top.MyApp.GetItemValue('OppComment',_oCurWnd); //Title
	          arrParam[3] = "Hello, <br /><br />In order to complete this file, could you please answer to the following request :<br /><br />"+top.MyApp.GetItemValue('OppExtInfoMarktListe',_oCurWnd)+"<br />"+top.MyApp.GetItemValue('OppExtInfoMarkt',_oCurWnd)+"<br /><br />We've put the affair in stand-by status and we are looking forward to your reply.<br /><br />Sincerly,<br /><br />Import Admin. Dept. "; //Body
	          var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	          if(str_Ret == true || str_Ret == "True"){
	              top.MyApp.OpenDlg("Alert",["", top.MyApp.arrTranslations["La demande d'information vient d'être envoyée à l'adresse : "] + vEmail]);        
	          }else{
	              top.MyApp.OpenDlg("Alert",["", top.MyApp.arrTranslations["Send Mail Demande info GI : "] + str_Ret]);  
	          }
	       }else{
	          top.MyApp.OpenDlg("Alert",["", top.MyApp.arrTranslations["Il manque l'adresse mail de l'Acheteur."]]);  
	       }
	     }
	}
	var vStatut  = top.MyApp.GetItemValue("OppStatus",_oCurWnd); 
	var strSQLRes= "select COUNT(*) as nbLigne from sysadm.am0 where titulaire = '"+ top.MyApp.GetItemValue("OppExtAcheteur") +"' and team_name = 'GI'"
	var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	if(arrRes == 1 && top.MyApp.GetItemValue('OppExtCommQu') != null){
	     var strSQL ="update sysadm.xdemande_info set reponse='"+ top.MyApp.GetItemValue('OppExtCommQu') +"' where nrid =(select top 1 nrid from sysadm.xdemande_info where do0_nrid = '"+top.MyApp.GetItemValue('OppNRID')+"' order by dmod desc) ";
	     arrRes = top.MyApp._gfctExtReq(strSQL);
	}
	
	/*[F]*/
	}catch(e){
	     alert("Script AfterUpdate Affaire : " + e.message);
	}
		
	/*
	if (top.MyApp.wizardWindow) 
	{
	
	 var vStatut  = top.MyApp.GetItemValue("OppStatus",_oCurWnd);
	
	 if (vStatut == "05. DEPOSE"){
	  PS_Opp_FillWizard_DeposerDossier();
	 top.MyApp.SetItemValue ("OppExtChefproduit", top.MyApp.GetItemValue("OppExtChefproduit",_oCurWnd)); 
	 }
	
	 if (vStatut == "07. SUIVI D'UNE OFFRE"){
	  PS_Opp_FillWizard_Etude();
	 }
	
	 if (vStatut == "01. EN CONSTITUTION"){
	  PS_Opp_FillWizard_DemandeInfo();
	 }
	
	 if (vStatut == "06. SANS SUITE"){
	  PS_Opp_FillWizard_SSsuite();
	 }
	
	 if (top.MyApp.wizardWindow) { 
	     top.MyApp.SetItemValue ("OppStatus", top.MyApp.GetItemValue("OppStatus",_oCurWnd));
	     top.MyApp.SetItemValue ("OppExtNoteAff", top.MyApp.GetItemValue("OppExtNoteAff",_oCurWnd)); 
	 }
	
	}
	*/
	
	if (top.MyApp.wizardWindow) 
	{ 
	  top.MyApp.wizardWindow.fraToolBar.document.getElementById('F_Exit').click()
	  top.MyApp.SetItemValue ("OppStatus", top.MyApp.GetItemValue("OppStatus",_oCurWnd));
	  top.MyApp.SetItemValue ("OppExtNoteAff", top.MyApp.GetItemValue("OppExtNoteAff",_oCurWnd));
	  top.MyApp.SetItemValue ("OppExtInfoMarkt", top.MyApp.GetItemValue("OppExtInfoMarkt",_oCurWnd)); 
	  top.MyApp.SetItemValue ("OppExtChefproduit", top.MyApp.GetItemValue("OppExtChefproduit",_oCurWnd)); 
	
	  top.MyApp.fraMenuBar.Execute("R_Save");
	  top.MyApp.fraMenuBar.Execute("T_Refresh");
	}
}