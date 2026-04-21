function PS_Quo_Derog_Status()
{
	var vTypeDerog = top.MyApp.GetItemValue("QuoExtTypeDerog");
	if (vTypeDerog == 'Controle qualité' ) {
	    top.MyApp.SetItem ("Sht38550477348164", "style.visibility",'Hidden');//Sht Approuvé
	    top.MyApp.SetItem ("Sht38098277358164", "style.visibility",'Hidden');//Sht non approuvé
	    top.MyApp.SetItem ("QuoExtDateValDerog3", "style.visibility",'Hidden');
	    top.MyApp.SetItem ("QuoExtDateValDerog3Btn", "style.visibility",'Hidden');
	    top.MyApp.SetItem("QuoExtDateValDerog3","parentElement.previousSibling.style.visibility","hidden");
	    top.MyApp.SetItem ("QuoExtStatDerog3", "style.visibility",'Hidden');
	    top.MyApp.SetItem ("QuoExtStatDerog3Btn", "style.visibility",'Hidden');
	    top.MyApp.SetItem("QuoExtStatDerog3","parentElement.previousSibling.style.visibility","hidden");
	    top.MyApp.SetItem ("QuoExtUserValDerog3", "style.visibility",'Hidden');
	    top.MyApp.SetItem("QuoExtUserValDerog3","parentElement.previousSibling.style.visibility","hidden");
	    top.MyApp.SetItem ("QuoExtDetailValDerog3", "style.visibility",'Hidden');
	} else {
	 top.MyApp.SetItem ("Sht38550477348164", "style.visibility",'');//Sht Approuvé
	    top.MyApp.SetItem ("Sht38098277358164", "style.visibility",'');//Sht non approuvé
	    top.MyApp.SetItem ("QuoExtDateValDerog3", "style.visibility",'');
	    top.MyApp.SetItem ("QuoExtDateValDerog3Btn", "style.visibility",'');
	    top.MyApp.SetItem("QuoExtDateValDerog3","parentElement.previousSibling.style.visibility","");
	    top.MyApp.SetItem ("QuoExtStatDerog3", "style.visibility",'');
	    top.MyApp.SetItem ("QuoExtStatDerog3Btn", "style.visibility",'');
	    top.MyApp.SetItem("QuoExtStatDerog3","parentElement.previousSibling.style.visibility","");
	    top.MyApp.SetItem ("QuoExtUserValDerog3", "style.visibility",'');
	    top.MyApp.SetItem("QuoExtUserValDerog3","parentElement.previousSibling.style.visibility","");
	    top.MyApp.SetItem ("QuoExtDetailValDerog3", "style.visibility",'');
	}
		var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	var vInitials = top.MyApp.UserSetting.User.Initials;
	var vUserName = top.MyApp.UserSetting.User.Name;
	var vFunction = top.MyApp.UserSetting.User.Function;
	var vTypeDerog = top.MyApp.GetItemValue("QuoExtTypeDerog");
	var FlagDepass = top.MyApp.GetItemValue("QuoExtFlagDepassDerog");
	var vAppelDerog = top.MyApp.GetItemValue("QuoExtAppelDerog");
	var vMntAnego = top.MyApp.GetItemValue("QuoExtMntDerogAnego");
	var vMntDerog = top.MyApp.GetItemValue("QuoExtValDepassDerog");
	var vStatDerog1 = top.MyApp.GetItemValue("QuoExtUserValDerog1");
	var vStatDerog2 = top.MyApp.GetItemValue("QuoExtUserValDerog2");
	//Objet des boutons
	var oDepose = top.MyApp.FindItem("Sht34301073347711");
	var oApprouve1 = top.MyApp.FindItem("Sht34731078370415");
	var oApprouve2 = top.MyApp.FindItem("Sht38317977338164");
	var oApprouve3 = top.MyApp.FindItem("Sht38550477348164");
	var oReqnext1 = top.MyApp.FindItem("Sht35501951662504");
	var oReqnext2 = top.MyApp.FindItem("Sht38910877338164");
	var oNotApprv = top.MyApp.FindItem("Sht38098277358164");
	var oCancel1 = top.MyApp.FindItem("Sht38098294217860");
	var oCancel2 = top.MyApp.FindItem("Sht38050089185156");
	
	
	 var vMode = top.MyApp.CustomSetting.AdmFonction;
	
	
	if (top.MyApp.CurrentSetting.nChapMode == 'Reset' || (vTypeDerog == '' || vTypeDerog == null || vTypeDerog == undefined)) {
	    oDepose.disabled = true;
	    oApprouve1.disabled = true;
	    oApprouve2.disabled = true;
	    oApprouve3.disabled = true;
	    oReqnext1.disabled = true;
	    oReqnext2.disabled = true;
	    oNotApprv.disabled = true;
	    oCancel1.disabled = true;
	    oCancel2.disabled = true;
	}
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	    switch (vTypeDerog) {
	        case 'Controle qualité':
	            vTypeDerog = 'CQ'
	            break;
	        case 'Emballage et stickers':
	            vTypeDerog = 'ES'
	            break;
	        case 'Rapport de test':
	            vTypeDerog = 'RT'
	            break;
	        case 'Transport':
	            vTypeDerog = 'TR'
	            break;
	        default:
	            vTypeDerog = ''
	    }
	    if (vTypeDerog == 'RT' || vTypeDerog == 'ES' || vTypeDerog == 'TR') {
	        if (vProfiluser == 'ADMT' || vProfiluser == 'LEAD_NEG') {
	            if (vStatDerog1 != '' && vStatDerog1 != null && vStatDerog1 != undefined) {
	                oCancel1.disabled = true;
	                oReqnext1.disabled = true;
	            } else {
	                oCancel1.disabled = false;
	                oReqnext1.disabled = false;
	            }
	            if (vStatDerog2 != '' && vStatDerog2 != null && vStatDerog2 != undefined) {
	                oCancel2.disabled = true;
	                oReqnext2.disabled = true;
	            } else {
	                oCancel2.disabled = false;
	                oReqnext2.disabled = false;
	            }
	            if (top.MyApp.FindItem("QuoExtMntDerogNego")) top.MyApp.FindItem("QuoExtMntDerogNego").disabled = false;
	            if (vAppelDerog != '1') {
	                if (FlagDepass == '1') {
	                    oApprouve1.disabled = true;
	                } else if (FlagDepass == '0') {
	                    oReqnext1.disabled = true;
	                } else {
	                    oApprouve1.disabled = true;
	                    oReqnext1.disabled = true;
	                }
	            }
	        } else {
	            if (top.MyApp.FindItem("QuoExtMntDerogNego")) top.MyApp.FindItem("QuoExtMntDerogNego").disabled = true;
	            oApprouve1.disabled = true;
	            oCancel1.disabled = true;
	            oCancel2.disabled = true;
	            oReqnext2.disabled = true;
	            oReqnext1.disabled = true;
	        }
	        if (vProfiluser == 'ADMT' || vProfiluser == 'MNG_ACH_OPR') {
	            if (vMntAnego == '' || vMntAnego == null || vMntAnego == undefined) {
	                oApprouve2.disabled = true;
	                oReqnext2.disabled = true;
	                oCancel2.disabled = true;
	            } else if (vMntAnego == '0' || vMntAnego == '0 ') {
	                oReqnext2.disabled = true;
	                oCancel2.disabled = false;
	            } else {
	                oApprouve2.disabled = true;
	                oReqnext2.disabled = false;
	                oCancel2.disabled = false;
	            }
	        } else {
	            oApprouve2.disabled = true;
	            oReqnext2.disabled = true;
	            oCancel2.disabled = true;
	        }
	    }
	    if (vTypeDerog == 'CQ') {
	        oReqnext2.disabled = true;
	        if (vProfiluser == 'ADMT' || vFunction == 'Manager support' ) {
	            if (vStatDerog1 != '' && vStatDerog1 != null && vStatDerog1 != undefined) {
	                oCancel1.disabled = true;
	                oReqnext1.disabled = true;
	            } else {
	                oCancel1.disabled = false;
	                oReqnext1.disabled = false;
	            }
	            if (vStatDerog2 != '' && vStatDerog2 != null && vStatDerog2 != undefined) {
	                oCancel2.disabled = true;
	            } else {
	                oCancel2.disabled = false;
	            }
	            if (top.MyApp.FindItem("QuoExtMntDerogNego")) top.MyApp.FindItem("QuoExtMntDerogNego").disabled = false;
	        } else {
	            oReqnext1.disabled = true;
	            oCancel2.disabled = true;
	            oCancel1.disabled = true;
	            if (top.MyApp.FindItem("QuoExtMntDerogNego")) top.MyApp.FindItem("QuoExtMntDerogNego").disabled = true;
	        }
	        if ((vProfiluser == 'ADMT' || vFunction == 'Manager support') && vAppelDerog != '1') {
	            if (FlagDepass == '1') {
	                oApprouve1.disabled = true;
	            } else if (FlagDepass == '0') {
	                oReqnext1.disabled = true;
	            } else {
	                oApprouve1.disabled = true;
	                oReqnext1.disabled = true;
	            }
	        } else {
	            oApprouve1.disabled = true;
	            oReqnext1.disabled = true;
	        }
	        if (vProfiluser == 'ADMT' || vFunction == 'Directeur support') {
	            if (vMntAnego == '' || vMntAnego == null || vMntAnego == undefined) {
	                oApprouve2.disabled = true;
	                oCancel2.disabled = true;
	            } else if (vMntAnego == '0' || vMntAnego == '0 ') {
	                oApprouve2.disabled = false;
	                oCancel2.disabled = false;
	            } else {
	                oApprouve2.disabled = false;
	                oCancel2.disabled = false;
	            }
	        } else {
	            oApprouve2.disabled = true;
	            oCancel2.disabled = true;
	        }
	    }
	    if (vTypeDerog == 'RT' || vTypeDerog == 'ES') {
	        if (vProfiluser != 'ADMT' && vFunction != 'Directeur operations') {
	            oApprouve3.disabled = true;
	            oNotApprv.disabled = true;
	        } else {
	            oApprouve3.disabled = false;
	            oNotApprv.disabled = false;
	        }
	    }
	    if (vTypeDerog == 'TR') {
	        if (vProfiluser != 'ADMT' && vFunction != 'Directeur support') {
	            oApprouve3.disabled = true;
	            oNotApprv.disabled = true;
	        } else {
	            oApprouve3.disabled = false;
	            oNotApprv.disabled = false;
	        }
	    }
	    if (FlagDepass != '' && FlagDepass != null) {
	        oDepose.disabled = true;
	        top.MyApp.CurrentSetting.Catalog.QuoExtValDepassDerog.Ed = -1
	        top.MyApp.FindItem("QuoExtDeviseDepassDerog").disabled = true;
	        top.MyApp.FindItem("QuoExtTypeDerog").disabled = true;
	    } else {
	        if (vTypeDerog != '' && vTypeDerog != null && vTypeDerog != undefined) {
	            if (vTypeDerog == 'RT') {
	                if (vProfiluser != 'ADMT' && vProfiluser != 'NOR') {
	                    top.MyApp.CurrentSetting.Catalog.QuoExtValDepassDerog.Ed = -1;
	                    top.MyApp.FindItem("QuoExtDeviseDepassDerog").disabled = true;
	                    top.MyApp.FindItem("QuoExtTypeDerog").disabled = true;
	                } else {
	                    top.MyApp.CurrentSetting.Catalog.QuoExtValDepassDerog.Ed = 1;
	                    top.MyApp.FindItem("QuoExtDeviseDepassDerog").disabled = false;
	                    top.MyApp.FindItem("QuoExtTypeDerog").disabled = false;
	                }
	            } else if (vTypeDerog == 'ES') {
	                if (vProfiluser != 'ADMT' && vProfiluser != 'NOR' && vFunction != 'Quality' && vFunction != 'Manager support') {
	                    top.MyApp.CurrentSetting.Catalog.QuoExtValDepassDerog.Ed = -1;
	                    top.MyApp.FindItem("QuoExtDeviseDepassDerog").disabled = true;
	                    top.MyApp.FindItem("QuoExtTypeDerog").disabled = true;
	                } else {
	                    top.MyApp.CurrentSetting.Catalog.QuoExtValDepassDerog.Ed = 1;
	                    top.MyApp.FindItem("QuoExtDeviseDepassDerog").disabled = false;
	                    top.MyApp.FindItem("QuoExtTypeDerog").disabled = false;
	                }
	            } else if (vTypeDerog == 'CQ') {
	                if (vProfiluser != 'ADMT' && vFunction != 'Quality' && vMode != 'hybrid'  ) {
	                    top.MyApp.CurrentSetting.Catalog.QuoExtValDepassDerog.Ed = -1;
	                    top.MyApp.FindItem("QuoExtDeviseDepassDerog").disabled = true;
	                    top.MyApp.FindItem("QuoExtTypeDerog").disabled = true;
	                } else {
	                    top.MyApp.CurrentSetting.Catalog.QuoExtValDepassDerog.Ed = 1;
	                    top.MyApp.FindItem("QuoExtDeviseDepassDerog").disabled = false;
	                    top.MyApp.FindItem("QuoExtTypeDerog").disabled = false;
	                }
	            } else if (vTypeDerog == 'TR') {
	                if (vProfiluser != 'ADMT' && vFunction != 'Logistique') {
	                    top.MyApp.CurrentSetting.Catalog.QuoExtValDepassDerog.Ed = -1;
	                    top.MyApp.FindItem("QuoExtDeviseDepassDerog").disabled = true;
	                    top.MyApp.FindItem("QuoExtTypeDerog").disabled = true;
	                } else {
	                    top.MyApp.CurrentSetting.Catalog.QuoExtValDepassDerog.Ed = 1;
	                    top.MyApp.FindItem("QuoExtDeviseDepassDerog").disabled = false;
	                    top.MyApp.FindItem("QuoExtTypeDerog").disabled = false;
	                }
	            } else {
	                top.MyApp.CurrentSetting.Catalog.QuoExtValDepassDerog.Ed = -1;
	                top.MyApp.FindItem("QuoExtDeviseDepassDerog").disabled = true;
	                top.MyApp.FindItem("QuoExtTypeDerog").disabled = true;
	            }
	        }
	    }
	    if (vProfiluser != 'ADMT') {
	        if ((vTypeDerog == 'RT' || vTypeDerog == 'TR' || vTypeDerog == 'ES') && vProfiluser != 'NEG_SEN' && vProfiluser != 'LEAD_NEG' && vFunction != 'Manager support') {
	            oDepose.disabled = true;
	        } else {
	            oDepose.disabled = false;
	        }
	        if (vTypeDerog == 'CQ' && vFunction != 'Quality' && vFunction != 'Manager support' && vMode != 'hybrid' ) {
	            oDepose.disabled = true;
	        } else {
	            oDepose.disabled = false;
	        }
	    }
	}
}