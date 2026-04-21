function()
{
	 /*************************************************************/
	  // Société                                : MASAO
	  // Nom script                             : AfterLoad_Header_1000078
	  // Infos Paramètres                       : 
	  // Auteur                                 : CCO                                          
	  // Chapitre concerné                      : Fournisseur  
	  // Date de création                       : 29/05/2012
	  // Modifié par                            :                                             
	  // Date de modification                   :  
	  // Commentaires                           : RG
	  /*************************************************************/
	//alert ('Hello World!');
	
	
	
	
	
	
	
	
		//5 creation limits
	
	var vMode = top.MyApp.CurrentSetting.nChapMode;
	var vTeam = top.MyApp.CustomSetting.Equipe;
	var vPlateau = top.MyApp.CustomSetting.Plateau;
	var strProfileInitials = top.MyApp.UserSetting.User.ProfileInitials;
	var vListTeamValid = "PROSSPORTTUNISIE;NEGSPORTTUNISIE;PROSJOUETTUNISIE;NEGJOUETTUNISIE;PROSADTTUNISIE;NEGADTTUNISIE;PROSLMTUNISIE;NEGLMTUNISIE";
	
	
	
	
	// Vérification pour le mode "New", profil != SRC et team Sport ou Jouet
	//if (vListTeamValid.indexOf(vTeam) != -1) {
	if (vPlateau == "Tunisie") {
	    if (vMode == "New" && strProfileInitials != "SRC" ) {
	        // Requête SQL pour compter les créations du mois courant pour l'utilisateur
	        var vQuery = "SELECT COUNT(*) AS CreationCount " +
	                        "FROM sysadm.so0 " +
	                        "WHERE xdate_creat > GETDATE()-35 " +
	                        "AND xcreateur = '" + top.MyApp.UserSetting.User.Name + "' " +
	                        "AND YEAR(xdate_creat) = YEAR(GETDATE()) " +
	                        "AND MONTH(xdate_creat) = MONTH(GETDATE())"+
	                        "AND origine != 'Tradshows' And xdetailsource != 'Tradeshow' and  ( xSalon is null or xSalon = '' )";                   
	                        
	        
	        // Exécuter la requête
	        var oRes_count = top.MyApp._gfctExtReq(vQuery);
	
	        
	        var creationCount = 0;
	        creationCount = oRes_count[0][0];
	        
	        // Vérifier si la limite de 5 créations est atteinte
	        if (creationCount >= 5) {
	            top.MyApp.OpenDlg("Alert", ["", "You have reached the limit of 5 creations this month !!"]);
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'Di');
	        }
	    }
	}
	
	
		// HAS DEB - 15/06/2023 - Bouton planning sourcing
	try {
	    var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	    var vInitials = top.MyApp.UserSetting.User.Initials;
	    var vUserName = top.MyApp.UserSetting.User.Name;
	    var vFunction = top.MyApp.UserSetting.User.Function;
	    var vItemPlan = top.MyApp.FindItem("Label40878169317754");
	    var oDateStartSrc = top.MyApp.FindItem("CpyExtDateStartSrc");
	    var oDateEndSrc = top.MyApp.FindItem("CpyExtDateEndSrc");
	    var oSourceSrc = top.MyApp.FindItem("CpyExtSourceSrc");
	    //top.MyApp.ModifyLayout(top.MyApp.fraData_View.ifrView1.fraData.document.getElementById("tblMain"),7,4,5,1,"<img src='../../UICache/DynaScreen/" + top.MyApp.DBName + "/Img/Cpy/icon-plan1.png' title='Check profit' height=40 width=40></div><div style='text-align:right;' width=40 height=40></a>",false);
	
	    if (vProfiluser != 'ADMT' && vProfiluser != 'LEAD_SRC' && vProfiluser != 'MNG_ACH_OPR' && vProfiluser != 'LEAD_ASS_ACH') {
	        if (vItemPlan)  top.MyApp.SetItem("Label40878169317754", "style.visibility",  "hidden", top.MyData_View);
	    } else {
	        if (vItemPlan)  top.MyApp.SetItem("Label40878169317754", "style.visibility",  "", top.MyData_View);
	    }
	    if (vProfiluser != 'SRC' && vProfiluser != 'ADMT') {
	        if (oDateStartSrc){
	            top.MyApp.SetItem("CpyExtDateStartSrc", "style.visibility", "hidden", top.MyData_View);
	            top.MyApp.SetItem("CpyExtDateStartSrc", "parentElement.previousSibling.style.visibility", "hidden");
	        }
	        if (oDateEndSrc){
	            top.MyApp.SetItem("CpyExtDateEndSrc", "style.visibility", "hidden", top.MyData_View);
	        }
	        if (oSourceSrc){
	            top.MyApp.SetItem("CpyExtSourceSrc", "style.visibility", "hidden", top.MyData_View);
	            top.MyApp.SetItem("CpyExtSourceSrc", "parentElement.previousSibling.style.visibility", "hidden");
	        }
	    } else {
	        if (oDateStartSrc){
	            top.MyApp.SetItem("CpyExtDateStartSrc", "style.visibility", "", top.MyData_View);
	            top.MyApp.SetItem("CpyExtDateStartSrc", "parentElement.previousSibling.style.visibility", "");
	            top.MyApp.SetItemAttribute("CpyExtDateStartSrc", "style.backgroundColor", "#FFEFB6");
	        }
	        if (oDateEndSrc){
	            top.MyApp.SetItem("CpyExtDateEndSrc", "style.visibility", "", top.MyData_View);
	            top.MyApp.SetItemAttribute("CpyExtDateEndSrc", "style.backgroundColor", "#FFB6B8");
	        }
	        if (oSourceSrc){
	            top.MyApp.SetItem("CpyExtSourceSrc", "style.visibility", "", top.MyData_View);
	        }
	    }
	    if (vItemPlan) {
	        if (vProfiluser == 'ADMT' || vProfiluser == 'LEAD_SRC' || vProfiluser == 'MNG_ACH_OPR' || vProfiluser == 'LEAD_ASS_ACH') {
	            vItemPlan.innerHTML = "<a id='Label40878169317754' ><img src='../../UICache/DynaScreen/" + top.MyApp.DBName + "/Img/Cpy/icon-plan2.png' title='Src Planing' height=25 width=100></a> ";
	            vItemPlan.onclick = function() {
	                PS_Cpy_Btn_WDS_SrcPlan();
	                //alert('je suis ' + vInitials);
	            }
	        }
	    }
	} catch (e) {
	    alert("AfterLoad Dérogation - Test Planning : " + e.message);
	}
	// HAS DEB - 15/06/2023 - Bouton planning sourcing
	
	
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var nAffect = top.MyApp.GetItemValue("CpyExtFlagAffect");
	var vCreator = top.MyApp.GetItemValue("CpyExtCreateur");
	var vCurrentUser = top.MyApp.UserSetting.User.Name;
	
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	    //if (nAffect == '1' && vProf == "SRC" && vOwner == vCurrentUser) {
	    if (vProf == "SRC") {
	        if (nAffect == '1' && vCreator == vCurrentUser) {
	            top.MyApp.fraMenuBar.UpdateMenuItem("R_Save", 'Di');
	        } else {
	            top.MyApp.fraMenuBar.UpdateMenuItem("R_Save", 'E');
	        }
	    }
	    if (vProf != "ADMT" && vProf != "SRC") {
	        top.MyApp.FindItem("CpyExtPropAffectSrcBtn", top.MyData_View).disabled = true;
	    }
	}
	//if( top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML,"Result","blnModified") == "true" ){}
	
	//SAI DEB :  28/03/2025 - disable the expagent checkbox after exp approve
	var valid_Exporter = top.MyApp.GetItemValue("CpyExtFlgExpValid");
	if (vProfiluser != 'ADMT' && valid_Exporter == '1') {
	       if (top.MyApp.FindItem("CpyExtIsExporter", top.MyData_View)) top.MyApp.FindItem("CpyExtIsExporter", top.MyData_View).disabled = true;
	}
	//SAI END :  28/03/2025 - disable the expagent checkbox after exp approve
	
		var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	var vUserName = top.MyApp.UserSetting.User.Name;
	var portefeuille = top.MyApp.GetItemValue("CpyExtEtatPepite");
	var vAcheteur = top.MyApp.GetItemValue("CpyExtAcht");
	var vProsp = top.MyApp.GetItemValue("CpyExtProsp");
	var vSrc = top.MyApp.GetItemValue("CpyExtSrc");
	var vFunction = top.MyApp.UserSetting.User.Function;
	var vOwner = top.MyApp.GetItemValue("CpyOwner");
	var vLogicName = '';
	if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	 var strSQLRes = "select top 1 bactive from sysadm.am0 where titulaire = '" + vOwner + "' ";
	 var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	 //alert('The owner active code is' + arrRes);
	 if (arrRes[0][0] == 0) {
	  if (vOwner == vSrc) {
	   vLogicName = 'CpyExtSrc';
	  } else if (vOwner == vProsp) {
	   vLogicName = 'CpyExtProsp';
	  } else if (vOwner == vAcheteur) {
	   vLogicName = 'CpyExtAcht'
	  }
	  top.MyApp.FindItem(vLogicName, top.MyData_View).style.backgroundColor = 'red';
	 }
	}
	/* if (top.MyApp.CurrentSetting.nChapMode == "Reset" && vProfiluser == "CH_PRO") {
	     top.MyApp.SetItemValue('CpyExtCp',vUserName); 
	 }*/
	
	/////// TEST
	// DEBUT HAS : Si ADMT ou ADMF ou interlocuteur pour fiche non validée alors activer la modification
	var compsecteur = top.MyApp.GetItemValue("CpyExtSecteur");
	var vUserName = top.MyApp.UserSetting.User.Name;
	var titulaire = top.MyApp.GetItemValue("CpyOwner");
	/*
	var strSQLRes = "select count (*)  from sysadm.res_liees where vue_equipe = '"+ compsecteur +"' and '"+ vUserName +"' = personne";
	var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	if(((arrRes[0][0] > 0 || vUserName == titulaire) &&  portefeuille != 'PEPITE') || vProfiluser =='ADMF' || vProfiluser == 'ADMT' )
	{ 
	     if(top.MyApp.CurrentSetting.bConsultMode == true) 
	    {
	      top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	     // top.MyApp.fraMenuBar.Execute("R_Edit");
	    }
	} 
	else
	{
	     if( top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML,"Result","blnModified") != "true" )
	       { 
	        if(top.MyApp.CurrentSetting.bConsultMode == false || top.MyApp.CurrentSetting.bConsultMode == undefined )
	          {
	              top.MyApp.fraMenuBar.Execute("R_Consult");
	          }
	              top.MyApp.fraMenuBar.UpdateMenuItem("R_Edit", 'Di');
	       }  a
	}
	*/
	// END HAS 
	
	
	if (top.MyApp.CurrentSetting.nChapMode != "Reset" && vProfiluser != 'ADMF' && vProfiluser != 'ADMT') {
	 // if ( top.MyApp.FindItem("CpyIsSupplier",top.MyData_View))        top.MyApp.SetItem('CpyIsSupplier', "disabled", true, top.MyData_View);
	 // if ( top.MyApp.FindItem("CpyExtTdm",top.MyData_View))        top.MyApp.SetItem('CpyExtTdm', "disabled", true, top.MyData_View);
	 // if ( top.MyApp.FindItem("CpyExtNozBout",top.MyData_View))        top.MyApp.SetItem('CpyExtNozBout', "disabled", true, top.MyData_View);
	 // if ( top.MyApp.FindItem("CpyExtAchtBtn",top.MyData_View))        top.MyApp.SetItem('CpyExtAchtBtn', "disabled", true, top.MyData_View);
	 // if ( top.MyApp.FindItem("CpyExtProspBtn",top.MyData_View))       top.MyApp.SetItem('CpyExtProspBtn', "disabled", true, top.MyData_View);
	 // if ( top.MyApp.FindItem("CpyExtFournStrat",top.MyData_View))        top.MyApp.SetItem('CpyExtFournStrat', "disabled", true, top.MyData_View);
	 if (top.MyApp.FindItem("CpyExtAcht", top.MyData_View)) top.MyApp.FindItem("CpyExtAcht", top.MyData_View).disabled = true;
	 if (top.MyApp.FindItem("CpyExtProsp", top.MyData_View)) top.MyApp.FindItem("CpyExtProsp", top.MyData_View).disabled = true;
	}
	
	
	/* if (top.MyApp.CurrentSetting.nChapMode != "Reset" && vProfiluser == 'MAN_HA_TER' ) {
	  // top.MyApp.SetItem('CpyExtAchtBtn', "disabled", false, top.MyData_View);
	  //   top.MyApp._gfctPutButton('CpyExtAchtBtn',  "top.MyApp.PS_RempliChamp('CpyExtAcht')", '', true, '...');
	   //  top.MyApp.FindItem("CpyExtAchtBtn",top.MyData_View).disabled = false;
	
	
	if ( top.MyApp.FindItem("CpyExtAchtBtn",top.MyData_View))      top.MyApp.FindItem('CpyExtAchtBtn', top.MyData_View).disabled = false;
	 }*/
	
	
	if (top.MyApp.CurrentSetting.nChapMode != "Reset" && vProfiluser != 'ADMF' && vProfiluser != 'ADMT' && vProfiluser != 'LTG' && vFunction != 'Directeur support') {
	 if (top.MyApp.FindItem("CpyIsBlackList", top.MyData_View)) top.MyApp.SetItem('CpyIsBlackList', "disabled", true, top.MyData_View);
	 if (top.MyApp.FindItem("CpyExtLitige", top.MyData_View)) top.MyApp.SetItem('CpyExtLitige', "disabled", true, top.MyData_View);
	}
	
	
	if (vProfiluser != 'ADMF' && vProfiluser != 'ADMT' && vProfiluser != 'ADMFT' && vProfiluser != 'MNG_ACH_OPR') {
	 if (top.MyApp.FindItem("CpyExtAchtBtn", top.MyData_View)) top.MyApp.FindItem("CpyExtAchtBtn", top.MyData_View).disabled = true;
	 if (top.MyApp.FindItem("CpyExtProspBtn", top.MyData_View)) top.MyApp.FindItem("CpyExtProspBtn", top.MyData_View).disabled = true;
	}
	// HAS DEB : Enlever bouton changement de titulaire pour le manager et assitante... seul le BO peut faire cette action
	/*
	if(vProfiluser == 'MAN_HA_TER'){
	   if(top.MyApp.FindItem("CpyExtAchtBtn", top.MyData_View))  top.MyApp.FindItem("CpyExtAchtBtn", top.MyData_View).disabled = false;
	}
	*/
	if ((vProfiluser == 'MAN_HA_TER' || vProfiluser == 'ASS_ACH' || vProfiluser == 'LEAD_NEG') && (compsecteur == '' || compsecteur == null || compsecteur == undefined)) {
	 if (top.MyApp.FindItem("CpyExtAchtBtn", top.MyData_View)) top.MyApp.FindItem("CpyExtAchtBtn", top.MyData_View).disabled = false;
	}
	
	
	// HAS DEB : Enlever bouton changement de titulaire pour le manager et assitante... seul le BO peut faire cette action
	
	
	/*
	  if (top.MyApp.CurrentSetting.nChapMode != "Reset" && vProfiluser != 'CH_PRO' && vProfiluser != 'CH_MAR' && vProfiluser != 'ADMF' && vProfiluser != 'ADMT' && vUserName != 'Aurelie LETORT') {
	      top.MyApp.SetItem('CpyExtTdm', "disabled", true, top.MyData_View);
	  }
	  if (top.MyApp.CurrentSetting.nChapMode != "Open") {
	      // top.MyApp._gfctPutButton('CpyExtCp', "top.MyApp.PS_RempliChamp('CpyExtCp')", '', true, '...');
	  }
	  if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	      // top.MyApp.FindItem('CpyExtCp', top.MyData_View).readOnly = true;
	  } else {
	      // top.MyApp.FindItem('CpyExtCp', top.MyData_View).readOnly = false;
	  }
	*/
	if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	 var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	 var vUserName = top.MyApp.UserSetting.User.Name;
	 //var vChefdeProduit = top.MyApp.GetItemValue("CpyExtCp");
	 var vRespCompte = top.MyApp.GetItemValue("CpyOwner");
	 var ValidSAS = top.MyApp.GetItemValue("CpyExtValidSas");
	 // Cpy - Coloration de la RS selon Portefeuille
	 if (ValidSAS == 'METTRE EN POUBELLE' || portefeuille == 'POUBELLE') {
	  top.MyApp.FindItem("CpyName", top.MyData_View).style.color = 'white';
	  top.MyApp.FindItem("CpyName", top.MyData_View).style.textDecorationUnderline = false;
	  top.MyApp.FindItem("CpyName", top.MyData_View).style.backgroundColor = 'red';
	 }
	
	
	
	 /* 
	      if(vChefdeProduit != "" )
	      {
	        top.MyApp._gfctPutButton('CpyExtCp', "", '', true, '...');
	        top.MyApp.FindItem("CpyExtCpBtn",top.MyData_View).disabled=true;
	      }
	      else
	      {
	        top.MyApp._gfctPutButton('CpyExtCp', "top.MyApp.PS_RempliChamp('CpyExtCp')", '', true, '...');
	        top.MyApp.FindItem("CpyExtCpBtn",top.MyData_View).disabled=false;
	      } 
	  
	        if (vProfiluser == 'ADMF' || vProfiluser == 'ADMT' || vProfiluser == 'MAN_HA_ASS') {
	            //  top.MyApp._gfctPutButton('CpyExtCp', "top.MyApp.PS_RempliChamp('CpyExtCp')", '', true, '...');
	        }
	
	
	     // HAS : Mise a jour du bouton de selecteur de source avec le nouveau champ créé pour l'acheteur
	        if (vRespCompte != "" && vProfiluser != 'ADMF' && vProfiluser != 'ADMT' && vProfiluser != 'MAN_HA_SED_VEO') {
	      top.MyApp._gfctPutButton('CpyExtAchtBtn', "top.MyApp.PS_RempliChamp('CpyExtAcht')", '', true, '...');
	            top.MyApp.FindItem("CpyExtAchtBtn", top.MyData_View).disabled = true;
	      
	        } else {
	      top.MyApp._gfctPutButton('CpyExtAchtBtn', "top.MyApp.PS_RempliChamp('CpyExtAcht')", '', true, '...');
	            top.MyApp.FindItem("CpyExtAchtBtn", top.MyData_View).disabled = false;
	        }
	     // END HAS
	  */
	}
	
	///////  CODE BIZARREEEEE
	/*if (vProfiluser != 'ADMF' && vProfiluser != 'ADMT') {
	    if (top.MyApp.FindItem("CpyExtCommRefusCP", top.MyData_View)) top.MyApp.FindItem("CpyExtCommRefusCP", top.MyData_View).disabled = true;
	    if (top.MyApp.FindItem("CpyExtCmmntrRfsAdmn", top.MyData_View)) top.MyApp.FindItem("CpyExtCmmntrRfsAdmn", top.MyData_View).disabled = true;
	    if (top.MyApp.FindItem("CpyExtValidtransprosp", top.MyData_View)) top.MyApp.FindItem("CpyExtValidtransprosp", top.MyData_View).disabled = true;
	    //if ( top.MyApp.FindItem("CpyExtProspBtn",top.MyData_View))            top.MyApp.FindItem("CpyExtProspBtn", top.MyData_View).disabled = true;
	    //if ( top.MyApp.FindItem("CpyExtAchtBtn",top.MyData_View))      top.MyApp.FindItem("CpyExtAchtBtn", top.MyData_View).disabled = true; 
	    if (top.MyApp.FindItem("CpyExtDdeTransfertACH", top.MyData_View)) top.MyApp.FindItem("CpyExtDdeTransfertACH", top.MyData_View).disabled = true;
	    if (top.MyApp.FindItem("CpyExtPourach", top.MyData_View)) top.MyApp.FindItem("CpyExtPourach", top.MyData_View).disabled = true;
	    if (top.MyApp.FindItem("CpyExtVldtndtrnsfrt", top.MyData_View)) top.MyApp.FindItem("CpyExtVldtndtrnsfrt", top.MyData_View).disabled = true;
	    if (top.MyApp.FindItem("CpyExtCmmntrRfsTrnsfrt", top.MyData_View)) top.MyApp.FindItem("CpyExtCmmntrRfsTrnsfrt", top.MyData_View).disabled = true;
	    if (top.MyApp.FindItem("CpyExtDdeTransfertCP", top.MyData_View)) top.MyApp.FindItem("CpyExtDdeTransfertCP", top.MyData_View).disabled = true;
	    if (top.MyApp.FindItem("CpyExtPourcp", top.MyData_View)) top.MyApp.FindItem("CpyExtPourcp", top.MyData_View).disabled = true;
	    if (top.MyApp.FindItem("CpyExtValidAdm", top.MyData_View)) top.MyApp.FindItem("CpyExtValidAdm", top.MyData_View).disabled = false;
	}*/
	
	
	/*
	  if ((vProfiluser != 'ADMF') || (vProfiluser != 'ADMT') || (vProfiluser != 'MAN_HA_TER')) {
	     
	     var achbtn = top.MyApp.FindItem("CpyExtAchtBtn");
	         if (achbtn) achbtn.disabled = true;
	 
	     } else {
	      var achbtn = top.MyApp.FindItem("CpyExtAchtBtn");
	         if (achbtn) achbtn.disabled = false;
	    }
	 */
	
	
	/*
	  if ((vProfiluser == 'ADMF') || (vProfiluser == 'ADMT') || (vProfiluser == 'MAN_HA_TER') || (vProfiluser == 'MAN_HA_ASS')) {
	     
	     var validMng=top.MyApp.FindItem("CpyExtValidationManager", top.MyData_View);
	         if (validMng) validMng.disabled = false;
	 
	     } else {
	      var validMng=top.MyApp.FindItem("CpyExtValidationManager", top.MyData_View);
	         if (validMng) validMng.disabled = true;
	    }
	*/
	
	
	
	/*
	//HAS : INTERDIT la modification aux fiches poubelle
	
	
	 if( portefeuille != "POUBELLE" || vProfiluser =='ADMF' || vProfiluser == 'ADMT')
	{
	     if(top.MyApp.CurrentSetting.bConsultMode == true) 
	                 {
	                   top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	                   top.MyApp.fraMenuBar.Execute("R_Edit");
	                }
	}
	else
	{
	                if( top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML,"Result","blnModified") != "true" )
	                   { 
	                    if(top.MyApp.CurrentSetting.bConsultMode == false || top.MyApp.CurrentSetting.bConsultMode == undefined )
	                     {
	                            top.MyApp.fraMenuBar.Execute("R_Consult");
	                     }
	                      top.MyApp.fraMenuBar.UpdateMenuItem ("R_Edit", 'Di');
	                    }   
	}
	 
	*/
	
	
	/*
	    if(top.MyApp.CurrentSetting.nChapMode == "Open" && vProfiluser =="PROS_VEO")
	    {
	        var vProsp = top.MyApp.GetItemValue("CpyExtProsp");
	        if( vProsp != vUserName)
	     {
	       if(top.MyApp.CurrentSetting.bConsultMode == true) 
	       {
	       top.MyApp.fraMenuBar.UpdateMenuItem ("R_Edit", 'Di');
	       }
	       else
	       {
	         if(top.MyApp.CurrentSetting.bConsultMode == false || top.MyApp.CurrentSetting.bConsultMode == undefined )
	            {
	              top.MyApp.fraMenuBar.Execute("R_Consult");
	              top.MyApp.fraMenuBar.UpdateMenuItem ("R_Edit", 'Di');
	         }
	       }   
	     }   
	    }
	   
	    */
	
	
	//// #936 - Classement Risqué Litige - CBA 12.10.2016
	/*
	    if(top.MyApp.CurrentSetting.nChapMode == "Reset"){
	         top.MyApp.FindItem("CpyExtRisque",top.MyData_View).style.display = 'none';
	    }else{
	         if(top.MyApp.GetItemValue("CpyExtClassFourn")== 'Risqué'){
	              top.CurrentSetting.Catalog.CpyExtRisque.Ed = 1;
	                   if(top.MyApp.GetItemValue("CpyExtRisque") != 'RISQUE'){
	                        top.MyApp.SetItemValue("CpyExtRisque",'RISQUE');
	                   }
	              top.CurrentSetting.Catalog.CpyExtRisque.Ed = 0;
	              top.MyApp.FindItem("CpyExtRisque",top.MyData_View).style.display = 'inline';
	              top.MyApp.FindItem("CpyExtRisque",top.MyData_View).style.color = 'white';
	              top.MyApp.FindItem("CpyExtRisque",top.MyData_View).style.backgroundColor ='red';
	              top.MyApp.FindItem("CpyExtRisque",top.MyData_View).style.border ='0px';
	              top.MyApp.FindItem("CpyExtRisque",top.MyData_View).style.fontWeight='bold';
	              top.MyApp.FindItem("CpyExtRisque",top.MyData_View).style.textAlign='center';
	         }else{
	              top.MyApp.FindItem("CpyExtRisque",top.MyData_View).style.display = 'none';
	         }
	   
	    }
	    */
	
	
	if (top.MyApp.GetItemValue("CpyIsBlackList") == 1) {
	 top.MyApp.SetItemAttribute("CpyIsBlackList", "style.backgroundColor", "red");
	}
	// HAS FIN : Achat 2020 : champs non obligatoires pour le SRC
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 // HAS DEB : Achat 2020 : champs non obligatoires pour le SRC 
	 var nMail = top.MyApp.FindItem("CpyEmailAddress", top.MyData_View);
	 var vMail = top.MyApp.GetItemValue("CpyEmailAddress");
	 if (vProfiluser != 'SRC' && vProfiluser != 'MNG_SRC' && vProfiluser != 'LEAD_SRC' && vProfiluser != 'LEAD_PROS') {
	  if (nMail) {
	   top.MyApp.SetItemAttribute("CpyEmailAddress", "className", "Mandatory");
	   //top.MyApp.CurrentSetting.Catalog["CpyEmailAddress"].Mn = 1;
	   top.MyApp._gfctSetClassName("CpyEmailAddress", "NM");
	  }
	 } else {
	  if (nMail) {
	   top.MyApp.SetItemAttribute("CpyEmailAddress", "className", "");
	   top.MyApp.CurrentSetting.Catalog["CpyEmailAddress"].Mn = -1;
	  }
	 }
	 // HAS DEB - champ obligatoire téléphone ou Mobile
	 var nPhone = top.MyApp.FindItem("CpyPhoneNbr", top.MyData_View);
	 var vPhone = top.MyApp.GetItemValue("CpyPhoneNbr");
	 var nMobile = top.MyApp.FindItem("CpyExtMobile", top.MyData_View);
	 var vMobile = top.MyApp.GetItemValue("CpyExtMobile");
	
	
	 /*if (vPhone == '' && vMobile == '') {
	  top.MyApp.SetItemAttribute("CpyPhoneNbr", "className", "Mandatory");
	  top.MyApp.CurrentSetting.Catalog["CpyPhoneNbr"].Mn = 1;
	  top.MyApp.SetItemAttribute("CpyExtMobile", "className", "Mandatory");
	  top.MyApp.CurrentSetting.Catalog["CpyExtMobile"].Mn = 1;
	 }*/
	 /*
	  if (nMobile) {
	   if (vMobile != '' && vMobile != null && vMobile != undefined) {
	    top.MyApp.SetItemAttribute("CpyPhoneNbr", "className", "");
	    top.MyApp.CurrentSetting.Catalog["CpyPhoneNbr"].Mn = -1;
	   } else {
	    top.MyApp.SetItemAttribute("CpyPhoneNbr", "className", "Mandatory");
	    top.MyApp.CurrentSetting.Catalog["CpyPhoneNbr"].Mn = 1;
	   }
	   nMobile.onchange = function () {
	    if (vMobile != '') {
	     top.MyApp.SetItemAttribute("CpyPhoneNbr", "className", "");
	     top.MyApp.CurrentSetting.Catalog["CpyPhoneNbr"].Mn = -1;
	    } else {
	     top.MyApp.SetItemAttribute("CpyPhoneNbr", "className", "Mandatory");
	     top.MyApp.CurrentSetting.Catalog["CpyPhoneNbr"].Mn = 1;
	    }
	   };
	  }
	 */
	 /*
	   if (nPhone) {
	    if (vPhone != '') {
	     top.MyApp.SetItemAttribute("CpyExtMobile", "className", "");
	     top.MyApp.CurrentSetting.Catalog["CpyExtMobile"].Mn = -1;
	    } else {
	     top.MyApp.SetItemAttribute("CpyExtMobile", "className", "Mandatory");
	     top.MyApp.CurrentSetting.Catalog["CpyExtMobile"].Mn = 1;
	    }
	    nPhone.onchange = function () {
	     if (vPhone != '') {
	      top.MyApp.SetItemAttribute("CpyExtMobile", "className", "");
	      top.MyApp.CurrentSetting.Catalog["CpyExtMobile"].Mn = -1;
	     } else {
	      top.MyApp.SetItemAttribute("CpyExtMobile", "className", "Mandatory");
	      top.MyApp.CurrentSetting.Catalog["CpyExtMobile"].Mn = 1;
	     }
	    };
	   }*/
	
	
	}
	
	
	PS_Cpy_Header_Status();
	var typeHnd = top.MyApp.FindItem("CpyExtMobile", top.MyData_View);
	if (typeHnd) {
	 top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Cpy_Header_Status);
	 top.MyApp.fctAddEvent(typeHnd, "change", PS_Cpy_Header_Status);
	}
	var typeHnd = top.MyApp.FindItem("CpyPhoneNbr", top.MyData_View);
	if (typeHnd) {
	 top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Cpy_Header_Status);
	 top.MyApp.fctAddEvent(typeHnd, "change", PS_Cpy_Header_Status);
	}
	//if (top.MyApp.AppSetting.Cpy.Catalog.CpyPhoneNbr.Sc == "") alert ('Phone changed');
		 //[D]CTI RO
	 /*try {
	     var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	     var vUserName = top.MyApp.UserSetting.User.Name;
	     var vItemTelRO = top.MyApp.FindItem("CpyExtTelRo");
	     var vItemPrefix = top.MyApp.GetItemValue("CpyIntPrefix");
	     var vItemTel = top.MyApp.GetItemValue("CpyPhoneNbr");
	     if (vItemTel == '' || (vProfiluser != 'ADMT' && vProfiluser != 'ACH_SED_VEO' && vProfiluser != 'ASS_CO_VEO' && vProfiluser != 'MAN_HA_SED_VEO' && vProfiluser != 'MAN_PROS_VEO' && vProfiluser != 'PROS_VEO' && vProfiluser != 'PROS_VEO_INT' && vProfiluser != 'GRP_ACH')) {
	         if (vItemTelRO) {
	             vItemTelRO.parentNode.previousSibling.innerHTML = ""
	             vItemTelRO.parentNode.innerHTML = ""
	         }
	     } else {
	         if (vItemTelRO) {
	             vItemTelRO.parentNode.innerHTML = "<a id='CpyExtTelRo' href='tel:" + vItemPrefix + vItemTel + "'>" + vItemPrefix + vItemTel + "</a> ";
	         }
	     }
	 
	
	 } catch (e) {
	     alert("AfterLoad En-tete Cpy CTI RO: " + e.message)
	 }
	 //[F]
	*/
		//[D]Communik PROD
	try {
	  var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	  var vInitials = top.MyApp.UserSetting.User.Initials;
	  var vUserName = top.MyApp.UserSetting.User.Name;
	  var vItemLblCnK = top.MyApp.FindItem("Label37249487709614");
	  var vItemTel = top.MyApp.GetItemValue("CpyPhoneNbr");
	  var vPortfolio = top.MyApp.GetItemValue("CpyExtEtatPepite");
	  var vTeam = top.MyApp.CustomSetting.Equipe;
	  var vListTeamValid = "LESGRYFFONDORS1;LESGRYFFONDORS2;LESGRYFFONDORS3;NESTINGGRYFFONDORS1;HISPAMTEAM;PROSZAD1;PROSZAD2;PROSZAD3;PROSZAD4;PROSZAD5;PROSZAD6;TAIWANTEAM;FULLIDLE;NEGADTTUNISIE;NEGBRICOLAGEJARDINANIMALERIETUNISIE;NEGCHAUSSURETUNISIE;NEGCONFLINGERIECHOSSETTETUNISIE;NEGDPHTUNISIE;NEGEGPPEMTUNISIE;NEGFULLIDLE;NEGJOUETTUNISIE;NEGLMTUNISIE;NEGMAROACCESSTUNISIE;NEGMEUBLEDECOTUNISIE;NEGPAPETERIETUNISIE;NEGPUERICULTURETUNISIE;NEGSPORTTUNISIE;NEGTUNISIEMARSEILLE;PROSADTTUNISIE;PROSBRICOLAGEJARDINANIMALERIETUNISIE;PROSCHAUSSURETUNISIE;PROSCONFLINGERIECHAUSSETTESTUNISIE;PROSDPHTUNISIE;PROSEGPEPMTUNISIE;PROSFULLIDLE;PROSJOUETTUNISIE;PROSLMTUNISIE;PROSMAROACCESSTUNISIE;PROSMEUBLEDECOTUNISIE;PROSPAPETERIETUNISIE;PROSPEPINIERETUNISIE;PROSPUERICULTURETUNISIE;PROSSPORTTUNISIE;PROSTUNISIEMARSEILLE;NEGMARSEILLE;PROSMARSEILLE;PROSE-COMMERCE;NEGE-COMMERCE;PROSTUNISIE;NEGTUNISIE";
	
	 
	  //if ((vProfiluser == 'ADMT' || vProfiluser == 'ADMF' || vProfiluser == 'ACH_TER' || vProfiluser == 'MAN_HA_TER' || vProfiluser == 'ASS_CO' || vProfiluser == 'MAN_HA_ASS') && vItemTel != '') {
	      if (vItemLblCnK) {
	          vItemLblCnK.innerHTML = "<a id='Label37249487709614' ><img src='../../UICache/DynaScreen/" + top.MyApp.DBName + "/Img/Cpy/icon-tel-1_2.png' height=20 width=20></div><div style='text-align:center;' width=20 height=20></a> ";
	          
	          if ((vProfiluser == 'ADMT' || vListTeamValid.indexOf(vTeam) != -1)) {
	            vItemLblCnK.onclick = function () {
	              PS_Cpy_AppelComunik();
	              //alert('je suis ' + vInitials);
	            }
	          }
	          //onclick='top.MyApp.PS_Cpy_AppelComunik();'
	      }
	  /*} else {
	      if (vItemLblCnK) {
	          vItemLblCnK.innerHTML = "";
	      }
	  }*/
	} catch (e) {
	  alert("AfterLoad En-tete Cpy - Communik : " + e.message);
	}
	//[F]Communik PROD
	
	
	
	
	 
		    var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	  var vProfPros2020 = "LAED_PROS_SEN;LEAD_PROS_JUN;MNG_PROS_SEN;MNG_PROS_ZON;PROS_JUN;PROS_SEN;MNG_PROS_JUN";
	  var vProfNeg2020 = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	  var BtnAffect = top.MyApp.FindItem("Sht37700551396211", top.MyData_View);
	  if (vProfPros2020.indexOf(vProf) == -1 && vProfNeg2020.indexOf(vProf) == -1 && vProf != 'ADMT') {
	   if (BtnAffect)  top.MyApp.SetItem("Sht37700551396211", "style.visibility",  "hidden", top.MyData_View);
	  }
		var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var oPropAffectSrcBtn = top.MyApp.FindItem("CpyExtPropAffectSrcBtn");
	if (top.MyApp.CurrentSetting.nChapMode != "Reset"){
	    if(oPropAffectSrcBtn){
	        if (vProf != "ADMT" && vProf != "ADMF" && vProf != "ADMFT" && vProf != "SRC") {
	            oPropAffectSrcBtn.disabled = true;
	        } else {
	            oPropAffectSrcBtn.disabled = false;
	        }
	    }
	}
		// HICH DEB: If File to be activated = 1 so show message else nothing
	var vActivation = top.MyApp.GetItemValue("CpyExtActivation");
	var oActivation = top.MyApp.FindItem("Label42220273709344");
	if (oActivation) {
	 if (vActivation == '1') {
	  oActivation.innerHTML = "<a id='DisplayPhoto'>File To Be Activated</a>";
	  oActivation.style = "cursor:pointer";
	  oActivation.style.fontWeight = 'bold';
	  oActivation.style.color = '#228B22';
	  oActivation.style.backgroundColor = 'white';
	  oActivation.style.border = '10px';
	  oActivation.style.textAlign = 'center';
	  oActivation.style.textDecorationUnderline = true;
	oActivation.style.fontSize = '16px';
	 } else {
	  oActivation.innerHTML = "";
	 }
	}
		var vConsigne = top.MyApp.GetItemValue("CpyExtConsigne");
	var vMode = top.MyApp.CurrentSetting.nChapMode;
	var field = top.MyApp.FindItem("CpyExtConsigne", top.MyData_View);
	if (vMode == "New") {
	       top.MyApp.FindItem("CpyExtConsigne", top.MyData_View).style.backgroundColor = 'pink';
		}else{
	if (field) {
		var isEmpty = !vConsigne || vConsigne === "" ||
			(typeof vConsigne === "string" && vConsigne.trim() === "");
	
		if (isEmpty) {
			field.style.backgroundColor = '';
		} else if (vConsigne === "SANS CONSIGNE") {
			field.style.backgroundColor = 'orange';
		} else {
			field.style.backgroundColor = 'green';
		}
	}
	}
		
	
	top.MyApp._gfctPutButton('CpyExtConsigne', "top.MyApp.PS_RempliChamp('CpyExtConsigne')", '', false, '...');
	
		return true;
}