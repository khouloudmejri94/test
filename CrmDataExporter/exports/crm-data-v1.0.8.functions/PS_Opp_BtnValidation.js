function()
{
	/************************************************************************************************************************************/
	// Nom script                          : PS_Opp_BtnValidation
	// NRID                                : 34170378148608 
	// Infos Paramètres                    :  
	// Crée par                            : MASAO                             
	// Chapitre concerné                   : Opp
	// Date de création                    : 19/12/2017
	// Modifié par                         : OZEOL                                            
	// Date de modification                : 29/05/2018 
	// Commentaires                        : Passage de l'affaire aux statuts 'Validation' ( 04. COMPLET / 07. DEMANDE D'UNE OFFRE )
	/************************************************************************************************************************************/
	
	
	
	
	 
	
		var vStatus = top.MyApp.GetItemValue("OppStatus");
	
	var v_Type = top.MyApp.GetItemValue("OppStatus").substr(0, 2);
	
	// Initiales du profil attribué à l'utilisateur courant
	
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	
	var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN";
	
	var vProfPros = "LEAD_PROS_SEN;LEAD_PROS_JUN;MNG_PROS_SEN;MNG_PROS_ZON;PROS_JUN;PROS_SEN;MNG_PROS_JUN;LEAD_PROS";
	
	var vProfNeg1 = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	
	var LotAtyp = top.MyApp.GetItemValue("OppExtAtypique");
	
	var vEtape = top.MyApp.GetItemValue("OppExtEtape");
	
	var vOutSrc = top.MyApp.GetItemValue('OppExtOutSrc');
	
	// Les conditions de passage au statut 04. COMPLET
	
	//if (vProf == "MAN_HA_ASS" || vProf == "LEAD_PROS" || ((vProf == "MAN_HA_TER" || vProf == "ADMT" || vProf == "MNG_ACH_OPR" ) && v_Type == '03')) {
	
	if ((top.MyApp.CustomSetting.ValidAffair == '1' || vProf == "ADMT" || vProf == "MNG_ACH_OPR" || vProfNeg1.indexOf(vProf) != -1) && top.MyApp.GetItemValue("OppStatus").substr(0, 4) == "01.B") {
	
	    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	
	    top.MyApp.Custom_ValidationBtn = true;
	
	    top.MyApp.SetItemValue("OppStatus", "01.C OK POUR CRV");
	
	    PS_Opp_Header_Status();
	
	    top.MyApp.SetItemValue("OppExtEmailAvis", "0");
	
	    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	
	    top.MyApp.fraMenuBar.Execute("R_Save");
	
	    // top.MyApp.fraMenuBar.Execute("R_Consult")
	
	} else if (vProf == "MAN_HA_ASS" || vProf == "LEAD_PROS" || vProf == "MAN_HA_TER" || ((vProf == "LEAD_NEG" || vProf == "ADMT" || vProf == "MNG_ACH_OPR") && v_Type != '06')) {
	
	    if (LotAtyp == '1' && vEtape == '1. Demande envoi') {
	
	        top.MyApp.CurrentSetting.Catalog["OppExtEtape"].Ed = 1;
	
	        top.MyApp.SetItemValue('OppExtEtape', '2. Envoyé');
	
	        top.MyApp.CurrentSetting.Catalog["OppExtEtape"].Ed = 0;
	
	        //PS_Opp_Header_Status();
	
	        //alert( top.MyApp.ExecuteServerScript(38460161719144,[]) );
	
	        var nAffaire = top.MyApp.GetItemValue("OppReference");
	
	        var arrParam = [];
	
	        arrParam[0] = nAffaire;
	
	        arrParam[1] = 'Lot';
	
	        //var result = top.MyApp.ExecuteServerScript( 38460161719144 , arrParam) ;
	
	        alert(top.MyApp.ExecuteServerScript(38460161719144, arrParam));
	
	        top.MyApp.fraMenuBar.Execute("R_Save");
	
	    }
	
	    if ((vProf == "MAN_HA_ASS" || vProf == "LEAD_PROS" || vProf == "MAN_HA_TER" || (vProf == "LEAD_NEG" && top.MyApp.CustomSetting.ValidAffPros == '1') || vProf == "ADMT" || vProf == "MNG_ACH_OPR") && v_Type == '03') {
	
	        if (vOutSrc == '1') {
	
	            //top.MyApp.SetItemValue("OppStatus", "04. COMPLET");
	
	            //PS_Opp_Send_DA11();
	
	            // Vérification de présnce des lignes de CRV dans la table xda11
	
	            var vSQL = "select count(*) from sysadm.xda11 where do0_nrid='" + top.MyApp.GetItemValue("OppNRID") + "'";
	
	            var vSQL2 = "select [OppStatus] from sysadm.do0 where nrid='" + top.MyApp.GetItemValue("OppNRID") + "'";
	
	            var arrRes = top.MyApp._gfctExtReq(vSQL);
	
	            var arrRes2 = top.MyApp._gfctExtReq(vSQL2);
	
	            // Le message "Vous devez charger le listing achat" si le crv n'est pas chargé
	
	            if (arrRes[0][0] == 0) {
	
	                var msgStatus = top.MyApp.arrTranslations["MSG_OPPSTATUS_0005"];
	
	                top.MyApp.SetItemValue("OppStatus", arrRes2[0][0]);
	
	                top.MyApp.OpenDlg("Alert", ["", msgStatus]);
	
	                //HASHUB top.MyApp.fraMenuBar.Execute("T_Refresh");
	
	                return false;
	
	            } else {
	
	                top.MyApp.SetItemValue("OppStatus", "04. COMPLET");
	
	                PS_Opp_Header_Status();
	
	                PS_Opp_Send_DA11();
	
	            }
	
	        } else {
	
	            top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	
	            top.MyApp.Custom_ValidationBtn = true;
	
	            top.MyApp.SetItemValue("OppStatus", "04. COMPLET");
	
	            PS_Opp_Header_Status();
	
	            top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	
	            top.MyApp.fraMenuBar.Execute("R_Save");
	
	            //top.MyApp.fraMenuBar.Execute("R_Consult");
	
	        }
	
	    }
	
	    //} else if ((vProf == "MAN_HA_TER" || vProf == "LEAD_NEG" || vProf == "MNG_ACH_OPR" || vProf == "ADMT") && v_Type == '06') {
	
	} else if (v_Type == '12' || ((vProf == "MAN_HA_TER" || vProf == "MNG_ACH_OPR" || ((vProf == "LEAD_NEG" || vProf == "NEG_SEN") && top.MyApp.CustomSetting.ValidAffair == '1') || vProf == "ADMT") && v_Type == '06')) {
	
	    if (LotAtyp == '1' && vEtape == '1. Demande envoi') {
	
	        top.MyApp.CurrentSetting.Catalog["OppExtEtape"].Ed = 1;
	
	        top.MyApp.SetItemValue('OppExtEtape', '2. Envoyé');
	
	        top.MyApp.CurrentSetting.Catalog["OppExtEtape"].Ed = 0;
	
	        //PS_Opp_Header_Status();
	
	        //alert( top.MyApp.ExecuteServerScript(38460161719144,[]) );
	
	        var nAffaire = top.MyApp.GetItemValue("OppReference");
	
	        var arrParam = [];
	
	        arrParam[0] = nAffaire;
	
	        arrParam[1] = 'Lot';
	
	        //var result = top.MyApp.ExecuteServerScript( 38460161719144 , arrParam) ;
	
	        alert(top.MyApp.ExecuteServerScript(38460161719144, arrParam));
	
	        top.MyApp.fraMenuBar.Execute("R_Save");
	
	    } else {
	
	        // Les conditions de passage au statut 07. DEMANDE D'UNE OFFRE seulement pour les profils (MAN_HA_TER (Manager Achat, ACO), ADMT )
	
	        // Vérification de présnce des lignes de CRV dans la table xda11
	
	        var vSQL = "select count(*) from sysadm.xda11 where do0_nrid='" + top.MyApp.GetItemValue("OppNRID") + "'";
	
	        var vSQL2 = "select [OppStatus] from sysadm.do0 where nrid='" + top.MyApp.GetItemValue("OppNRID") + "'";
	
	        var arrRes = top.MyApp._gfctExtReq(vSQL);
	
	        var arrRes2 = top.MyApp._gfctExtReq(vSQL2);
	
	        // Le message "Vous devez charger le listing achat" si le crv n'est pas chargé
	
	        if (arrRes[0][0] == 0) {
	
	            var msgStatus = top.MyApp.arrTranslations["MSG_OPPSTATUS_0005"];
	
	            top.MyApp.SetItemValue("OppStatus", arrRes2[0][0]);
	
	            top.MyApp.OpenDlg("Alert", ["", msgStatus]);
	
	            //HASHUB top.MyApp.fraMenuBar.Execute("T_Refresh");
	
	            return false;
	
	        } else { // SIR : le code ci-dessous est coupé vers le script PS_Opp_Send_DA11
	
	            /* top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed=1; */
	
	            top.MyApp.Custom_ValidationBtn = true;
	
	            top.MyApp.SetItemValue("OppStatus", "07. DEMANDE D'UNE OFFRE");
	
	            /*
	
	            PS_Opp_Header_Status();
	
	            top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	
	            var MyReturn = top.MyApp.fraMenuBar.Execute("R_Save");
	
	            top.MyApp.fraMenuBar.Execute("R_Consult");
	
	            */
	
	            //Envoi de flux de demande d'une offre au client
	
	            PS_Opp_Send_DA11(); // MA0014633
	
	        }
	
	    }
	
	} else {
	
	    top.MyApp.OpenDlg("Alert", ["Attention", "You cannot validate an affaire"]);
	
	    return false;
	
	}
}