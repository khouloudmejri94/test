function PS_Quo_Sht_Btn_DemandePassage()
{
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "Result", "blnModified") == "true") {
	    top.MyApp.OpenDlg("Alert", ["Attention", "Please save modifications before requesting to place order."]);
	    return false;
	}
		//DemPassCmd
	//PS_Quo_Verif_MDP();
	var vNridExp = top.MyApp.GetItemValue('QuoExtFrsExpNrid');
	var vException = top.MyApp.GetItemValue('QuoException');
	var nMaxOrder = 3;
	if (vException != '1') {
	 // if (vNridExp == '' || vNridExp == null || vNridExp == undefined) {
	 var strSQLRes = "SELECT count (distinct (vst.no_dossier)) ";
	 strSQLRes += " FROM dbo.V_StatutOffre vst ";
	 strSQLRes += " inner join V_DC0 d on d.vos_ref = vst.vos_ref ";
	 strSQLRes += " where ";
	 strSQLRes += " (YEAR(vst.DATE_DEMANDE_BOOKING) >= 2020 OR vst.DATE_DEMANDE_BOOKING is null) ";
	 strSQLRes += " and (vst.STATUT_SOLDE != 'Solde envoyé' OR vst.STATUT_SOLDE IS NULL) ";
	 strSQLRes += " and ( vst.so0_nrid =  :nDocSocNRID OR  vst.xFrsExpNrid =  :nDocSocNRID) ";
	 strSQLRes += " and vst.XSTATOFF  = '5. Commandée' ";
	 strSQLRes += " and d.XBCFOURN is not null ";
	 //strSQLRes += " and (d.xFrsExport is null or  d.xFrsExport = '') ";
	 //  strSQLRes += " group by vst.so0_nrid";
	 var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	 var vNbrSolde = arrRes[0][0];
	 alert(arrRes);
	 alert(vNbrSolde);
	 if (parseInt(vNbrSolde) >= nMaxOrder) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "SUPP - Request cancelled because you have more than "+nMaxOrder+" orders without balance payed."]);
	  return false;
	 }
	 //}
	 //} else {
	 if (vNridExp != '' && vNridExp != null && vNridExp != undefined) {
	  var strSQLRes = "SELECT count (distinct (vst.no_dossier))";
	  strSQLRes += " FROM dbo.V_StatutOffre vst";
	  strSQLRes += " inner join sysadm.v_dc0 d on d.vos_ref = vst.vos_ref";
	  strSQLRes += " where";
	  strSQLRes += " (YEAR(vst.DATE_DEMANDE_BOOKING) >= 2020 OR vst.DATE_DEMANDE_BOOKING is null) ";
	  strSQLRes += " and (vst.STATUT_SOLDE != 'Solde envoyé' OR vst.STATUT_SOLDE IS NULL) ";
	  strSQLRes += " and ( vst.xFrsExpNrid = '" + vNridExp + "' OR vst.so0_nrid = '" + vNridExp + "')  ";
	  strSQLRes += " and vst.XSTATOFF  = '5. Commandée' ";
	  strSQLRes += " and d.XBCFOURN is not null ";
	
	  // strSQLRes += " group by d.xFrsExpNrid ";
	
	  //alert(strSQLRes);
	  var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	  var vNbrSolde = arrRes[0][0];
	  alert(arrRes);
	  alert(vNbrSolde);
	  if (parseInt(vNbrSolde) >= nMaxOrder) {
	   top.MyApp.OpenDlg("Alert", ["Attention", "EXP - Request cancelled because you have more than "+nMaxOrder+" orders without balance payed."]);
	   return false;
	  }
	 }
	 //}
	}
	//HAS DEB - 02/10/2019 : Ajouter un controle sur les commande avec au moin un article phytosanitaire
	var Sql1 = "select top 1 xPPE1 from sysadm.so0 inner join sysadm.dc0 on dc0.so0_nrid = so0.nrid inner join sysadm.xdc2 on xdc2.DC0_NRID = dc0.nrid   " +
	 "where DC0_NRID ='" + top.MyApp.GetItemValue('QuoNRID') + "' ";
	var arrRes1 = top.MyApp._gfctExtReq(Sql1);
	var vPasseportFrs = arrRes1[0][0];
	//top.MyApp.OpenDlg("Alert", ["Attention", "Le passeport du fournisseur est:" + vPasseportFrs + "."]);
	//return false;
	// HAS : si echantillon validé et statut différenbt de commande et de accepté alors permettre la  demande passage commande
	var Sql = "select ( select TOP 1 STATUS_ECHANTILLON as Echt from sysadm.x_echantillon where template is null and RESPONSABLE_ECH is not null and STATUS_ECHANTILLON != 'Annulé'  " +
	 "and DC0_NRID ='" + top.MyApp.GetItemValue('QuoNRID') + "' order by NO_ECHANTILLON desc), (select count(nrid) as phyto from sysadm.xdc2 where TEMPLATE is null and DC0_NRID = '" + top.MyApp.GetItemValue('QuoNRID') + "' and xPhyto_Sanitaire is not null)  ";
	var arrRes = top.MyApp._gfctExtReq(Sql);
	var statOff = top.MyApp.GetItemValue('QuoExtStatOff');
	var statut = statOff.substr(0, 1);
	var taquetVA = top.MyApp.GetItemValue('QuoExtValeurAchat1');
	var taquetCountry = top.MyApp.GetItemValue('QuoExtPaysMarchandises');
	var vPortCh = top.MyApp.GetItemValue('QuoExtPort');
	var vRapTest = top.MyApp.GetItemValue('QuoExtRapTest');
	var vIncoterm = top.MyApp.GetItemValue('QuoExtIncotermAchat');
	var vLieuCQ = top.MyApp.GetItemValue('QuoExtLieuCQ');
	var vListStatutValid = "SansEchantillon;Sans échantillon;Validé sous condition;valide_sous_condition;Validé;valide; Confirmé sans échantillon;Confirmé commande avant échant";
	var vStatEchat = arrRes[0][0];
	var vPasseport = arrRes[0][1];
	if (vPasseport > 0) {
	 var countPPE = 1;
	 //top.MyApp.OpenDlg("Alert", ["Attention", "il ya des articles PPE " + countPPE + "."]);
	} else {
	 countPPE = 0;
	}
	//HAS DEB 23/11/2020 : MAJ : Si port de chargelent est Ningbo alors
	// rapport de test obligatoire à renseigner
	// et si INCOTERM in(FCA , EXW) alors Lieu CQ est obligatoire
	//top.MyApp.OpenDlg("Alert", ["Attention", "The loading port is : " + vPortCh.substr(0, 6) + "."]);
	if (vPortCh.substr(0, 6) == 'NINGBO') {
	 if (vRapTest == '' || vRapTest == null || vRapTest == undefined) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "The test report information is missing when the loading port is NINGBO \nRequest Cancelled "]);
	  return false;
	 }
	 if (vIncoterm == 'FCA' || vIncoterm == 'EXW') {
	  if (vLieuCQ == '' || vLieuCQ == null || vLieuCQ == undefined) {
	   top.MyApp.OpenDlg("Alert", ["Attention", "The CQ Place is mandatoy when the loading port is NINGBO and Incoterm is " + vIncoterm + "\nRequest Cancelled "]);
	   return false;
	  }
	 }
	}
	//HAS END 23/11/2020 : MAJ : Si port de chargelent est Ningbo alors............
	//HAS DEB 23/11/2020 : si demande stock prior en cours alors attendre
	var vPriority = top.MyApp.GetItemValue("QuoExtStockPrior");
	var vValStockPrior = top.MyApp.GetItemValue("QuoExtValidStockPrior");
	if (vPriority == '1' && (vValStockPrior == '' || vValStockPrior == null || vValStockPrior == undefined)) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "Your Request for stock priority is not validated yet.\n Please wait until validation."]);
	 return false;
	}
	//HAS END 23/11/2020 : si demande stock prior en cours alors attendre
	//top.MyApp.OpenDlg("Alert", ["Attention", "Voici le dernier statut Echt non annulé:  " + vStatEchat + "."]);
	//return false;
	//top.MyApp.OpenDlg("Alert", ["Attention", "Voici le nombre des articles phyto:  " + vPasseport + "."]);
	//return false;
	if (vPasseport > 0) {
	 if (vPasseportFrs == '' || vPasseportFrs == null || vPasseportFrs == undefined) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Your order contains PPE products.\n The PPE code is missing on the supplier details.\n Order request cancelled."]);
	  return false;
	 }
	}
	// HAS DEB 17/06/2020 : controle sur le champ Mode de paiement 
	var vDateDemPC = top.MyApp.GetItemValue("QuoExtDateDemande");
	var vPaymTerm = top.MyApp.GetItemValue("QuoExtDelPai");
	var vValTlDerogMdp = top.MyApp.GetItemValue("QuoExtValTlDerogMdp");
	var vValBumDerogMdp = top.MyApp.GetItemValue("QuoExtValAchDerogMdp");
	var vValMngzDerogMdp = top.MyApp.GetItemValue("QuoExtValMngzDerogMdp");
	var vValDirDerogMdp = top.MyApp.GetItemValue("QuoExtValDirDerogMdp");
	var vDepMdp = top.MyApp.GetItemValue("QuoExtDepMdp");
	var vTypeDerogMdp = top.MyApp.GetItemValue("QuoExtTypeDerogMdp");
	var nTypeDerogMdp = vTypeDerogMdp.substr(0, 1);
	var nValidMdp = 0;
	//if (vDateDemPC != '' && vDateDemPC != null && vDateDemPC != undefined) {
	if (vPaymTerm != '' && vPaymTerm != null && vPaymTerm != undefined) {
	 if (vTypeDerogMdp != '' && vTypeDerogMdp != null && vTypeDerogMdp != undefined) {
	  if (parseInt(nTypeDerogMdp) > 0) {
	   if (nTypeDerogMdp == '4') {
	    if (!(vValDirDerogMdp == 'Approuvé')) {
	     top.MyApp.OpenDlg("Alert", ["Attention", "The Payment terms Require validation \n Order request cancelled."]);
	     return false;
	    }
	   } else if (nTypeDerogMdp == '3') {
	    if (!(vValDirDerogMdp == 'Approuvé' || vValMngzDerogMdp == 'Approuvé')) {
	     top.MyApp.OpenDlg("Alert", ["Attention", "The Payment terms Require validation \n Order request cancelled."]);
	     return false;
	    }
	   } else if (nTypeDerogMdp == '2') {
	    if (!(vValDirDerogMdp == 'Approuvé' || vValMngzDerogMdp == 'Approuvé' || vValBumDerogMdp == 'Approuvé')) {
	     top.MyApp.OpenDlg("Alert", ["Attention", "The Payment terms Require validation \n Order request cancelled."]);
	     return false;
	    }
	   } else if (nTypeDerogMdp == '1') {
	    if (!(vValDirDerogMdp == 'Approuvé' || vValMngzDerogMdp == 'Approuvé' || vValBumDerogMdp == 'Approuvé' || vValTlDerogMdp == 'Approuvé')) {
	     top.MyApp.OpenDlg("Alert", ["Attention", "The Payment terms Require validation \n Order request cancelled."]);
	     return false;
	    }
	   }
	  }
	 }
	} else {
	 top.MyApp.OpenDlg("Alert", ["Attention", "The Payment terms is Mandatory to make order request\n Please chose from the list.\n Order request cancelled."]);
	 return false;
	}
	//}
	// HAS END 17/06/2020 : controle sur le champ Mode de paiement
	var Isvalid = vListStatutValid.indexOf(vStatEchat);
	var sentPI = top.MyApp.GetItemValue("QuoExtSentPI");
	//top.MyApp.OpenDlg("Alert", ["Attention", "Est ce que le statut echt est valide ou pas:  " + Isvalid + "."]);
	//return false;
	if (vStatEchat != '' && vStatEchat != null && vStatEchat != undefined && Isvalid != -1 && statOff != "5. Commandée" && statOff != "4. Acceptée" && statut >= 2 && taquetVA != null && taquetVA != "" && taquetCountry != null && taquetCountry != "" && sentPI == '1') {
	 try {
	  var timeTEMP = new Date();
	  var h = timeTEMP.getHours();
	  if (h < 10) {
	   h = "0" + h
	  }
	  var m = timeTEMP.getMinutes();
	  if (m < 10) {
	   m = "0" + m
	  }
	  var s = timeTEMP.getSeconds();
	  if (s < 10) {
	   s = "0" + s
	  }
	  var strHeure = h + ":" + m + ":" + s;
	  //top.MyApp.OpenDlg("Alert", ["Attention", "Heure de demande de passage commande :  "+strHeure]);
	  //top.MyApp.SetItemValue("QuoExtHeureDemande", strHeure);
	 } catch (e) {
	  alert(e.message);
	 }
	 var vHeurePremDem = top.MyApp.GetItemValue("QuoExtHeureDemande", top.MyData_View);
	 var vDatePremDem = top.MyApp.GetItemValue("QuoExtDateDemande", top.MyData_View);
	 var vHeureDerDem = top.MyApp.GetItemValue("QuoExtHeureDemPassDer", top.MyData_View);
	 var vDateDerDem = top.MyApp.GetItemValue("QuoExtDateDemPassDer", top.MyData_View);
	 if (vDatePremDem == '' || vDatePremDem == null || vDatePremDem == undefined) {
	  top.MyApp.SetItemValue("QuoExtHeureDemande", strHeure);
	  top.MyApp.SetItemValue('QuoExtDateDemande', new Date());
	 } else {
	  top.MyApp.SetItemValue("QuoExtHeureDemPassDer", strHeure);
	  top.MyApp.SetItemValue('QuoExtDateDemPassDer', new Date());
	 }
	 top.MyApp.SetItemValue('QuoExtAppelCmd', '1');
	 // HAS DEB - 14/08/2019 : purger le champ visuellement pour un autre commentaire
	 top.MyApp.SetItemValue('QuoExtDetailDemande', '');
	 top.MyApp.CurrentSetting.Catalog["QuoExtStatOff"].Ed = 1;
	 top.MyApp.SetItemValue('QuoExtStatOff', '2. Négocié');
	 top.MyApp.CurrentSetting.Catalog["QuoExtStatOff"].Ed = 1;
	 return true;
	} else {
	 top.MyApp.OpenDlg("Alert", ["Attention", "Your request for order requires:\n -The Offer Status: Negotiated or StandBy.\n -Taquet file loaded.\n -Sample validated.\n - PI File Sent."]);
	 return false;
	}
}