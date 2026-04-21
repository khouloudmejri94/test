//[Start - 34068878168408 - START]
function PS_Opp_BtnIncomplet()
{
//[Start - 34068878168408 - END]
//[Code - 34058878168408 - START]
	/************************************************************************************************************************************/
	// Société                             : MASAO
	// Nom script                          : PS_Opp_BtnIncomplet
	// NRID                                : 34078878168408 
	// Infos Paramètres                    :  
	// Auteur                              : FNA                             
	// Chapitre concerné                   : Opp
	// Date de création                    : 18/12/2017
	// Modifié par                         :                                                   
	// Date de modification                : 
	// Commentaires                        : Passage de l'affare aux statuts 'INCOMPLET' 
	/************************************************************************************************************************************/
	//[Code - 34058878168408 - END]
//[Code - 40312044615250 - START]
	
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var v_Type = top.MyApp.GetItemValue("OppStatus").substr(0, 2);
	var vProfPros = "LEAD_PROS_SEN;LEAD_PROS_JUN;MNG_PROS_SEN;MNG_PROS_ZON;PROS_JUN;PROS_SEN;MNG_PROS_JUN;LEAD_PROS";
	var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	// HAS : Conditions nécessaires à la mise en Incomplet
	if ((vProf == "MAN_HA_ASS" || vProf == "LEAD_PROS" || (vProfNeg.indexOf(vProf) != -1) && top.MyApp.GetItemValue("OppStatus").substr(0, 4) == "01.A") || ((vProf == "ACH_TER" || vProf == "ASS_ACH" || vProf == "MAN_HA_TER") && (v_Type == "03" || v_Type == "04")) || (vProf == "ADMT" && (v_Type == "03" || v_Type == "04"))) {
	    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	    top.MyApp.Custom_IncompletBtn = true;
	    top.MyApp.SetItemValue('OppStatus', '09. INCOMPLET PROS');
	    PS_Opp_Header_Status();
	    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	    top.MyApp.fraMenuBar.Execute("R_Save");
	    //top.MyApp.fraMenuBar.Execute("R_Consult");
	} else if (vProf == "MAN_HA_TER" || vProf == "ADMT" || vProf == "LEAD_NEG" || vProf == "NEG_EXP" || vProf == "NEG_SEN" || vProf == "MNG_ACH_OPR") {
	    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	    top.MyApp.Custom_IncompletBtn = true;
	    top.MyApp.SetItemValue('OppStatus', '10. INCOMPLET ACH');
	    PS_Opp_Header_Status();
	    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	    top.MyApp.fraMenuBar.Execute("R_Save");
	} else if (vProf == "ADMF") {
	    top.MyApp.Custom_IncompletBtn = true;
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0008"]]);
	    return false;
	} else {
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0007"]]);
	    return false;
	}
	//[Code - 40312044615250 - END]
}