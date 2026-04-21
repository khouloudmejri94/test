//[Start - 34208178357413 - START]
function()
{
//[Start - 34208178357413 - END]
//[Code - 35971567310810 - START]
	
	 /************************************************************************************************************************************/
	 // Nom script                          : PS_Opp_BtnNonSuivi
	 // NRID                                : 34218178357413 
	 // Infos Paramètres                    :  
	 // Auteur                              : MASAO                             
	 // Chapitre concerné                   : Opp
	 // Date de création                    : 13/12/2017
	 // Modifié par                         : OZEOL                                               
	 // Date de modification                : 18/01/2018
	 // Commentaires                        : Passage de l'affaire au statut 'NON SUIVI' 
	 /************************************************************************************************************************************/
	//[Code - 35971567310810 - END]
//[Code - 35911567310810 - START]
	
	// Initiales du profil attribué à l'utilisateur courant
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var vProfPros = "LEAD_PROS_SEN;LEAD_PROS_JUN;MNG_PROS_SEN;MNG_PROS_ZON;PROS_JUN;PROS_SEN;MNG_PROS_JUN;LEAD_PROS";
	var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	// Liste des profils qui ont le droit d'appyer sur le bouton 'Non Suivi'
	var vListProfilsValides = "ADMT;ADMF;ASS_CO;MAN_HA_ASS;ACH_TER;MAN_HA_TER;ASS_ACH";
	if (vProfPros.indexOf(vProf) != -1 || vProfNeg.indexOf(vProf) != -1 ||vListProfilsValides.indexOf(vProf) != -1  || vProf == 'MNG_ACH_OPR') {
	    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	    top.MyApp.Custom_NonSuiviBtn = true;
	    top.MyApp.SetItemValue('OppStatus', '02. NON SUIVI');
	    PS_Opp_Header_Status();
	    top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	    top.MyApp.fraMenuBar.Execute("R_Save");
	    //top.MyApp.fraMenuBar.Execute("R_Consult");
	} else {
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0017"]]);
	    return false;
	}
	 
	//[Code - 35911567310810 - END]
}