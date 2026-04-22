function PS_Opp_Btn_Demande_Avis()
{
	//PS_Opp_Btn_Demande_Avis
	// Initiales du profil attribué à l'utilisateur courant
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var vProsp = top.MyApp.UserSetting.User.Name;
	var vFamille = top.MyApp.GetItemValue('OppExtFamille');
	var vOutSrc = top.MyApp.GetItemValue('OppExtOutSrc');
	var vAcht = top.MyApp.GetItemValue('OppExtAcheteur');
	// top.MyApp.AppSetting.Update=true;
	// Les conditions de passage
	if (vProf != "PROS_SEN" && vProf != "PROS_JUN" && vProf != "MNG_PROS_ZON" && vProf != "MNG_PROS_SEN" && vProf != "MNG_PROS_JUN" && vProf != "LEAD_PROS_JUN" && vProf != "LEAD_PROS_SEN" && vProf != "LEAD_PROS" && vProf != "ADMT") {
	    top.MyApp.OpenDlg("Alert", ["Attention", "Profile " + vProf + " not authorised for this action"]);
	    return false;
	} else {
	    if (vOutSrc == '1') {
	        //HAS DEB 04/06/2022 : les champs obligatoires pour envoyer un lot sous traitance
	        if (vFamille == '' || vFamille == null || vFamille == undefined) {
	            top.MyApp.OpenDlg("Alert", ["Attention", "please complete the Product range to send the opinion request"]);
	            return false;
	        } else if (vAcht == '' || vAcht == null || vAcht == undefined) {
	            top.MyApp.OpenDlg("Alert", ["Attention", "The buyer is mandatory to send the opinion request"]);
	            return false;
	        } else {
	            PS_Opp_Opinion_Req();
	        }
	        //HAS END 04/06/2022 : les champs obligatoires pour envoyer un lot sous traitance
	    } else {
	        if (vFamille == '' || vFamille == null || vFamille == undefined) {
	            top.MyApp.OpenDlg("Alert", ["Attention", "please complete the Product range to send the opinion request"]);
	            return false;
	        }else if ( vProsp != '' && vProsp != null && vProsp != undefined) {
	
	            var vReqPairing = "select top 1 titulaire_ref2 as LibBuyer from x_pairs_pros_neg where template is null and titulaire_ref1 = '" + vProsp + "' and End_date >= getdate() order by dmod desc";
	            var vPairing = top.MyApp._gfctExtReq(vReqPairing);
	            if (vPairing.length == 1) {
	                vAcht = vPairing[0][0];
	                top.MyApp.SetItemValue("OppExtAcheteur", vAcht);
	            }
	
	            var vReqDest = "select remark from sysadm.am6 inner join sysadm.am0 on am0.nrid = am6.am0_nrid where am0.template is null and am0.bactive = 1 and ap00_name = 'Famille de produit' and ap01_name = '" + vFamille + "' and am0.titulaire = '" + vProsp + "' ";
	            var arrResDest = top.MyApp._gfctExtReq(vReqDest);
	                if (arrResDest.length == 1) {
	                    var vEmailDest = arrResDest[0][0];
	                    var vReqUserDest = "select top 1 titulaire from sysadm.am0 where am0.template is null and bactive = '1' and am0.fonction like '%negocia%' and e_mail = '" + vEmailDest + "' ";
	                    var arrUserDest = top.MyApp._gfctExtReq(vReqUserDest);
	                    if (arrUserDest.length == 1) {
	                            vAchDest = arrUserDest[0][0];
	                            
	                            
	                            // Condition 1 et 2 :Si vAcht est rempli OU vEmailDest est non vide
	                            if ((vEmailDest != '' && vEmailDest != null && vEmailDest != undefined)||(vAcht != '' && vAcht != null && vAcht != undefined)) {
	                                
	                                // Si vAcht est vide mais vEmailDest non vide, on assigne vAchDest
	                                if (vAcht == '' || vAcht == null || vAcht == undefined) {
	                                    top.MyApp.SetItemValue("OppExtAcheteur", vAchDest);
	                                    }
	                                top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	                                top.MyApp.Custom_IncompletBtn = true;
	                                top.MyApp.SetItemValue('OppStatus', '01.A DEMANDE AVIS');
	                                PS_Opp_Header_Status();
	                                top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	                                top.MyApp.SetItemValue("OppExtEmailAvis", "1");
	                                // top.MyApp.fraMenuBar.Execute("R_Consult");
	                                top.MyApp.fraMenuBar.Execute("R_Save");
	                                
	                            } else { // Condition 3 : Si vEmailDest et vAcht sont vides
	                                    /*
	                                    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	                                    top.MyApp.Custom_IncompletBtn = true;
	                                    top.MyApp.SetItemValue('OppStatus', '01.0 BINOME MANQUANT');
	                                    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	                                    top.MyApp.SetItemValue("OppExtEmailAvis", "1");
	                                    // top.MyApp.fraMenuBar.Execute("R_Consult");
	                                    top.MyApp.fraMenuBar.Execute("R_Save");      
	                                    */   
	                                    top.MyApp.OpenDlg("Alert", ["Attention", "You Don't have a paired buyer to send the opinion request"]);
	                                    return false;                                              
	
	                                }
	                        }
	                } 
	        }
	    }
	}
}