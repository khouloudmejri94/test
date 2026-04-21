function()
{
	//DEBUT FTC@MASAO - MANTIS 14414 - 12/01/2018
	
	var vFunction = top.MyApp.UserSetting.User.Function;
	
	var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	
	
	
	top.MyApp.SetItem("QuoExtAppelCmd", "style.visibility", 'Hidden');
	
	top.MyApp.SetItem("QuoExtAppelCmd", "parentElement.style.visibility", "hidden");
	
	if (top.MyApp.CurrentSetting.nChapMode == 'Open' && top.MyApp.CurrentSetting.bConsultMode != true) {
	
	 var btnRaisonSBcmd = top.MyApp.FindItem("QuoMcl36320991637407Btn", top.MyData_View);
	
	 if (btnRaisonSBcmd) {
	
	  btnRaisonSBcmd.disabled = true;
	
	 }
	
	 top.MyApp.FindItem('QuoExtDateDemande').readOnly = true;
	
	 top.MyApp.FindItem('QuoExtHeureDemande').readOnly = true;
	
	 top.MyApp.FindItem('QuoExtDateDemPassDer').readOnly = true;
	
	 top.MyApp.FindItem('QuoExtHeureDemPassDer').readOnly = true;
	
	 var vHeureDemande = top.MyApp.FindItem("QuoExtHeureDemande", top.MyData_View);
	
	 var vDateDemande = top.MyApp.FindItem("QuoExtDateDemande", top.MyData_View);
	
	 if (vDateDemande) {
	
	  if (top.MyApp.GetItemValue("QuoExtDateDemande") != "") {
	
	   var btnDemandePassage = top.MyApp.FindItem("Sht34598083433118", top.MyData_View);
	
	   if (btnDemandePassage) btnDemandePassage.disabled = true;
	
	   //top.MyApp.SetItemAttribute("QuoExtDetailDemande", "className", "Mandatory");
	
	   //top.MyApp.CurrentSetting.Catalog["QuoExtDetailDemande"].Mn = 1;
	
	   top.MyApp._gfctSetClassName("QuoExtDetailDemande", "NM");
	
	   top.MyApp.FindItem("Sht34598083433118").disabled = true;
	
	  } else {
	
	   top.MyApp.SetItemAttribute("QuoExtDetailDemande", "className", "");
	
	   top.MyApp.CurrentSetting.Catalog["QuoExtDetailDemande"].Mn = -1;
	
	   top.MyApp.FindItem("Sht34598083433118").disabled = false;
	
	  }
	
	  vDateDemande.onchange = function() {
	
	   if (top.MyApp.GetItemValue("QuoExtDateDemande") != '') {
	
	    //top.MyApp.SetItemAttribute("QuoExtDetailDemande", "className", "Mandatory");
	
	    top.MyApp.FindItem("Sht34598083433118").disabled = true;
	
	    //top.MyApp.CurrentSetting.Catalog["QuoExtDetailDemande"].Mn = 1;
	
	    top.MyApp._gfctSetClassName("QuoExtDetailDemande", "NM");
	
	   } else {
	
	    top.MyApp.SetItemAttribute("QuoExtDetailDemande", "className", "");
	
	    top.MyApp.FindItem("Sht34598083433118").disabled = false;
	
	    top.MyApp.CurrentSetting.Catalog["QuoExtDetailDemande"].Mn = -1;
	
	   }
	
	  }
	
	  if (top.MyApp.GetItemValue("QuoExtAppelCmd") == '0' || top.MyApp.GetItemValue("QuoExtAppelCmd") == null) {
	
	   top.MyApp.FindItem("Sht34598083433118").disabled = false;
	
	   //top.MyApp.FindItem("QuoExtDetailDemande").disabled = false;
	
	   top.MyApp.CurrentSetting.Catalog["QuoExtDetailDemande"].Ed = 1;
	
	  } else {
	
	   top.MyApp.FindItem("Sht34598083433118").disabled = true;
	
	   //top.MyApp.FindItem("QuoExtDetailDemande").disabled = true;
	
	   top.MyApp.CurrentSetting.Catalog["QuoExtDetailDemande"].Ed = -1;
	
	  }
	
	 }
	
	}
	
	if (top.MyApp.CurrentSetting.nChapMode == 'Reset') {
	
	 var btnDemandePassage = top.MyApp.FindItem("Sht34598083433118", top.MyData_View);
	
	 if (btnDemandePassage) btnDemandePassage.disabled = true;
	
	}
	
	if (top.MyApp.CurrentSetting.nChapMode == 'Open' && top.MyApp.CurrentSetting.bConsultMode == true) {
	
	 var btnDemandePassage = top.MyApp.FindItem("Sht34598083433118", top.MyData_View);
	
	 if (btnDemandePassage) {
	
	  btnDemandePassage.disabled = true;
	
	 }
	
	}
	
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	
	 top.MyApp.SetItem("QuoMcl36320991637407", "style.visibility", "hidden", top.MyData_View);
	
	 top.MyApp.SetItem("QuoMcl36320991637407", "parentElement.previousSibling.style.visibility", "hidden");
	
	 top.MyApp.SetItem("QuoMcl36320991637407Lst", "style.visibility", "hidden", top.MyData_View);
	
	 top.MyApp.SetItem("QuoMcl36320991637407Btn", "style.visibility", "hidden", top.MyData_View);
	
	}
	
	// HAS DEB : 30/11/2023 : add visibility for check box exception for rule number of non payed solde orders
	
	if (vFunction != 'Directeur operations' && vProfiluser != 'ADMT') {
	
	  top.MyApp.SetItem("QuoException", "style.visibility", "hidden", top.MyData_View);
	
	  top.MyApp.SetItem("QuoException", "parentElement.style.visibility", "hidden");
	
	}
	
	// HAS END : 30/11/2023 : add visibility for check box exception for rule number of non payed solde orders
	
	/*
	
	// HAS DEB : remplissage tableau des raison de mise en standby commande
	
	var vNrid = top.MyApp.GetItemValue("QuoNRID");
	
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	
	  //top.MyApp.OpenDlg("Alert", ["Attention", "Le NRID courant est: "+vNrid+"."]);
	
	  var strSql = " select ap01_name from  dc6 where dc0_nrid = :nDocNRID ";
	
	  var arrRes =  top.MyApp._gfctExtReq(strSql);
	
	  var vlenght = arrRes.length;
	
	  //top.MyApp.OpenDlg("Alert", ["Attention", "Le nombre de motif est est "+vlenght+"."]);
	
	  if (vlenght > 0 && arrRes[0] != ''  && arrRes[0] != null  && arrRes[0] != undefined) {
	
	  var strTableau = ' <table border="1" height="10" font size="0" id=\"reponse_Table\"><tr><th>StandBy Reason</th></tr>  ';
	
	    //var vMotif = "";
	
	    for (var i = 0; i < vlenght; i++) {
	
	      var vMotif = arrRes [i];
	
	      
	
	      var TranSql = " select lang_en from  sysadm.trans0 where lang_fr = '"+vMotif+"' ";
	
	      var TransRes =  top.MyApp._gfctExtReq(TranSql);
	
	      //top.MyApp.OpenDlg("Alert", ["Attention", "Le ...... est "+TransRes+"."]);
	
	      //top.MyApp.OpenDlg("Alert", ["Attention", "Le ...... est "+vMotif+"."]);
	
	      strTableau += "<tr>";
	
	      strTableau += "<td height=10>";
	
	      strTableau += "<h6>";
	
	      strTableau += TransRes[0][0]; // arrRes[i];
	
	      strTableau += "</h6>";
	
	      strTableau += "</td>";quo
	
	      strTableau += "</tr>";
	
	    }
	
	    strTableau += "</table>";
	
	  top.MyApp.ModifyLayout(top.MyApp.fraData_View.ifrView2.fraData.document.getElementById("tblMain"),11,4,3,1,strTableau,false);
	
	//top.MyApp.fraData_View.document.getElementById("ifrView2").style.height = "auto"
	
	  }
	
	}
	
	// HAS END : remplissage tableau des raison de mise en standby commande
	
	*/
		//AfterLoad_FP_34768183421915
	//SAI DEB : 16-03-2026  : ADD CONDITION FOR REQUEST SECOND ORDER////
	var vFunction   = top.MyApp.UserSetting.User.Function;
	var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	var vMode       = top.MyApp.CurrentSetting.nChapMode;
	
	//alert("vMode : " + vMode + "\n" + "vFunction : " + vFunction + "\n" + "vProfiluser : " + vProfiluser);
	
	var btnDemande2ndReq = top.MyApp.FindItem("Sht43600557650138", top.MyData_View);
	var btnOpenHistory = top.MyApp.FindItem("Sht43840357177142", top.MyData_View);
	
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	    
	    top.MyApp._gfctSetClassName("QuoExtSRTLComment", "UM");
	    top.MyApp._gfctSetClassName("QuoExtSRReqComment", "UM");
	    top.MyApp._gfctSetClassName("QuoExtSRDIRComment", "UM");
	
	    // -- ADMT ? Everything open, nothing disabled ---------------------
	    if (vProfiluser == 'ADMT') {
	        //top.MyApp.FindItem("QuoExtSRReqReason").disabled    = false;
	        top.MyApp.FindItem("QuoExtSRReqComment").disabled   = false;
	        top.MyApp.FindItem("QuoExtSRTLStatus").disabled     = false;
	        top.MyApp.FindItem("QuoExtSRTLComment").disabled    = false;
	        top.MyApp.FindItem("QuoExtSRDIRStatus").disabled    = false;
	        top.MyApp.FindItem("QuoExtSRDIRComment").disabled   = false;
	
	    // -- Buyer (NEG_SEN) ? Only ReqReason + ReqComment editable ------
	    } else if (vProfiluser == 'NEG_SEN') {
	        // ReqReason ? editable always
	        //top.MyApp.FindItem("QuoExtSRReqReason").disabled    = false;
	        // ReqComment ? editable always
	        top.MyApp.FindItem("QuoExtSRReqComment").disabled   = false;     
	        // TL + DIR ? all disabled
	        top.MyApp.FindItem("QuoExtSRTLStatus").disabled     = true;
	        top.MyApp.FindItem("QuoExtSRTLComment").disabled    = true;
	        top.MyApp.FindItem("QuoExtSRDIRStatus").disabled    = true;
	        top.MyApp.FindItem("QuoExtSRDIRComment").disabled   = true;
	
	    // -- NEG TL / Manager Zone / BUM ? ReqReason,ReqComment,TLStatus,TLComment editable --
	    } else if (vProfiluser == 'LEAD_NEG' || vFunction == 'MANAGER ACHAT OPERATIONNEL' ) {
	        // ReqReason ? editable always
	        //top.MyApp.FindItem("QuoExtSRReqReason").disabled    = false;
	        // ReqComment ? editable always
	        top.MyApp.FindItem("QuoExtSRReqComment").disabled   = false;
	        // TLStatus ? editable always
	        top.MyApp.FindItem("QuoExtSRTLStatus").disabled     = false;
	        // TLComment ? editable always
	        top.MyApp.FindItem("QuoExtSRTLComment").disabled    = false;
	        // DIR ? all disabled
	        top.MyApp.FindItem("QuoExtSRDIRStatus").disabled    = true;
	        top.MyApp.FindItem("QuoExtSRDIRComment").disabled   = true;
	
	    // -- Regional Director / Director Operation ? DIRStatus + DIRComment editable --
	    } else if (vFunction == 'Directeur Back Office' || vFunction == 'Directeur Operation') {
	        // REQ ? all disabled
	        //top.MyApp.FindItem("QuoExtSRReqReason").disabled    = false;
	        top.MyApp.FindItem("QuoExtSRReqComment").disabled   = false;
	        // TL ? all disabled
	        top.MyApp.FindItem("QuoExtSRTLStatus").disabled     = true;
	        top.MyApp.FindItem("QuoExtSRTLComment").disabled    = true;
	        // DIRStatus ? editable always
	        top.MyApp.FindItem("QuoExtSRDIRStatus").disabled    = false;
	        top.MyApp.FindItem("QuoExtSRDIRComment").disabled   = false;
	    } else {
	        //top.MyApp.FindItem("QuoExtSRReqReason").disabled    = true;
	        top.MyApp.FindItem("QuoExtSRReqComment").disabled   = true;
	        top.MyApp.FindItem("QuoExtSRTLStatus").disabled     = true;
	        top.MyApp.FindItem("QuoExtSRTLComment").disabled    = true;
	        top.MyApp.FindItem("QuoExtSRDIRStatus").disabled    = true;
	        top.MyApp.FindItem("QuoExtSRDIRComment").disabled   = true;
	    }
	
	    // -- onchange handlers --------------------------------------------
	    //var fReqReason = top.MyApp.FindItem("QuoExtSRReqReason", top.MyData_View);
	    var fTLStatus  = top.MyApp.FindItem("QuoExtSRTLStatus",  top.MyData_View);
	    var fDIRStatus = top.MyApp.FindItem("QuoExtSRDIRStatus", top.MyData_View);
	    var fReqCom = top.MyApp.FindItem("QuoExtSRReqComment", top.MyData_View);
	    if (fTLStatus) {
	        fTLStatus.onchange = function() {
	            var vTLStatus    = top.MyApp.GetItemValue("QuoExtSRTLStatus");
	            if (fTLStatus.value && vTLStatus == "Non approuvé") {
	                top.MyApp._gfctSetClassName("QuoExtSRTLComment", "NM");
	            } else {
	                top.MyApp._gfctSetClassName("QuoExtSRTLComment", "UM");
	            }
	        }
	    }
	
	    if (fDIRStatus) {
	        fDIRStatus.onchange = function() {
	            var vDIRStatus   = top.MyApp.GetItemValue("QuoExtSRDIRStatus");
	            if (fDIRStatus.value && vDIRStatus == "Non approuvé" ) {
	                top.MyApp._gfctSetClassName("QuoExtSRDIRComment", "NM");
	            } else {
	                top.MyApp._gfctSetClassName("QuoExtSRDIRComment", "UM");
	            }
	        }
	    }
	
	    if (fReqCom) {
	        if (top.MyApp.GetItemValue("QuoExtSRReqComment") != '' ){
	        if (btnDemande2ndReq) btnDemande2ndReq.disabled = true;
	        top.MyApp.FindItem("QuoExtSRReqComment").disabled   = true;
	        }
	        }
	
	
	}else { 
	    
	    
	    if (btnDemande2ndReq) btnDemande2ndReq.disabled = true;
	    if (btnOpenHistory ) btnOpenHistory .disabled = true;
	
	}
	
	
	
	//SAI END : 16-03-2026  : ADD CONDITION FOR REQUEST SECOND ORDER
}