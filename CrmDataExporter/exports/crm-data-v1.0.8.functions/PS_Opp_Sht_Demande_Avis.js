function()
{
	// Initiales du profil attribué à l'utilisateur courant
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var vProsp = top.MyApp.UserSetting.User.Name;
	var vFamille = top.MyApp.GetItemValue('OppExtFamille');
	
	// top.MyApp.AppSetting.Update=true;
	// Les conditions de passage
	if (vProf != "PROS_SEN" && vProf != "PROS_JUN" && vProf != "MNG_PROS_ZON" && vProf != "MNG_PROS_SEN" && vProf != "MNG_PROS_JUN" && vProf != "LEAD_PROS_JUN" && vProf != "LEAD_PROS_SEN" && vProf != "LEAD_PROS" && vProf != "ADMT") {
	 top.MyApp.OpenDlg("Alert", ["Attention", "Profile " + vProf + " not authorised for this action"]);
	 return false;
	} else {
	 top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	 top.MyApp.Custom_IncompletBtn = true;
	 top.MyApp.SetItemValue('OppStatus', '01.A DEMANDE AVIS');
	 PS_Opp_Header_Status();
	 top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	
	 top.MyApp.SetItemValue("OppExtEmailAvis", "1");
	 top.MyApp.fraMenuBar.Execute("R_Save");
	 top.MyApp.fraMenuBar.Execute("R_Consult");
	 
	 // HAS DEB ACHAT 2020 : Envoyer un mail automatique au group de messagerie de la famille de produit de l'affaire
	 // chercher le l'adresse mail du prospecteur
	 
	 /*
	  // chercher le l'adresse mail du groupe destinataire
	  var vSqlFamil = " SELECT  cast(STUFF (  (SELECT ',' + CAST(label AS VARCHAR(50)) FROM sysadm.cp00 cp1 where sy0_col_logicname = 'OppExtFamille'   FOR XML PATH('') ),1, 1, '') AS varchar(1000)) as Famille  ";
	  var vResFamille = top.MyApp._gfctExtReq(vSqlFamil);
	  top.MyApp.OpenDlg("Alert", ["Attention", "Voici le liste des familles de prosduit des affaires: " + vModeConseille + "."]);
	  var ArrListFamille = [];
	  ArrListFamille = vResFamille.split(",");
	  var count = ArrListFamille.length;
	  
	  if (vResFamille.length > 0) {
	   
	  }
	 */
	 /*
	  // chercher le l'adresse mail du groupe destinataire
	  var vSqlFamil = "select label FROM sysadm.cp00 where sy0_col_logicname = 'OppExtFamille' ";
	  var vRes = top.MyApp._gfctExtReq(vSqlFamil);
	  var vListFamille = "";
	  top.MyApp.OpenDlg("Alert", ["Attention", "Voici le liste des familles de prosduit des affaires: " + vModeConseille + "."]);
	  for (var i = 0; i < vRes.length  ; i++) {
	   vListFamille = vRes[0][i];
	   if (vListFamille == vFamille) {
	    return vFamille;
	   }
	  }
	 */
	 
	
	/* 
	 var vEmailDest = "";
	 switch (vFamille) {
	  case 'Accessoires':
	   vEmailDest = 'Accessoires@ozeol.com';
	   break;
	  case 'Alimentaire - BNA':
	   vEmailDest = 'hassen.bouzouita@ozeol.com';// 'Alimentaire-BNA@ozeol.com';
	   break;
	  case 'Animalerie':
	   vEmailDest = 'Animalerie@ozeol.com';
	   break;
	  case 'Arts de la table':
	   vEmailDest = 'Arts-table@ozeol.com';
	   break;
	  case 'Boissons alcoolisées':
	   vEmailDest = 'Boissons-alcoolisees@ozeol.com';
	   break;
	  case 'Bricolage':
	   vEmailDest = 'Bricolage@ozeol.com';
	   break;
	  case 'Chaussants et chaussettes':
	   vEmailDest = 'Chaussants-chaussettes@ozeol.com';
	   break;
	  case 'Chaussures':
	   vEmailDest = 'Chaussures@ozeol.com';
	   break;
	  case 'Collants':
	   vEmailDest = 'Collants@ozeol.com';
	   break;
	  case 'Confection enfants':
	   vEmailDest = 'Confection-enfants@ozeol.com';
	   break;
	  case 'Confection femmes':
	   vEmailDest = 'Confection-femmes@ozeol.com';
	   break;
	  case 'Confection Hommes':
	   vEmailDest = 'Confection-Hommes@ozeol.com';
	   break;
	  case 'Décoration':
	   vEmailDest = 'Décoration@ozeol.com';
	   break;
	  case 'DPH':
	   vEmailDest = 'DPH@ozeol.com';
	   break;
	  case 'EGP':
	   vEmailDest = 'EGP@ozeol.com';
	   break;
	  case 'Jardin':
	   vEmailDest = 'Jardin@ozeol.com';
	   break;
	  case 'Jouets/ Puériculture':
	   vEmailDest = 'Jouets-Puériculture@ozeol.com';
	   break;
	  case 'Linge de maison':
	   vEmailDest = 'Linge-maison@ozeol.com';
	   break;
	  case 'Lingerie':
	   vEmailDest = 'Lingerie@ozeol.com';
	   break;
	  case 'Lot mixé confection (USA)':
	   vEmailDest = 'Lot-mixe-confection@ozeol.com';
	   break;
	  case 'Maroquinerie':
	   vEmailDest = 'Maroquinerie@ozeol.com';
	   break;
	  case 'Meuble':
	   vEmailDest = 'Meuble@ozeol.com';
	   break;
	  case 'Multi Produits':
	   vEmailDest = 'Multi-Produits@ozeol.com';
	   break;
	  case 'Papeterie/ Librairies':
	   vEmailDest = 'Papeterie-Librairies@ozeol.com';
	   break;
	  case 'PEM / GEM':
	   vEmailDest = 'PEM-GEM@ozeol.com';
	   break;
	  case 'Sport':
	   vEmailDest = 'Sport@ozeol.com';
	   break;
	  default:
	   '';
	 }
	
	 var vSQL = "select e_mail from sysadm.am0 where Template is null and titulaire = '" + vProsp + "' ";
	 var arrRes = top.MyApp._gfctExtReq(vSQL);
	 var vEmail = arrRes.join(";");
	 top.MyApp.OpenDlg("Alert", ["Mail", "Mon adresse mail est : " + vEmail]);
	 if (arrRes.length >= 1) {
	  var arrParam = [];
	  arrParam[0] = vEmail //"selligent@ozeol.com";  //From 
	  arrParam[1] = vEmailDest; //To
	  //arrParam[2] = "Offre " + top.MyApp.GetItemValue('QuoCustReference', _oCurWnd) + " StandBy"; //Title
	  arrParam[2] = "Demande d'avis pour CRV - Affaire :  " + top.MyApp.GetItemValue('OppReference', _oCurWnd); //Title
	  arrParam[3] = "Bonjour, <br /><br />Nous avons besoin de votre validation pour lancer la crétaion su CRV pour affaire" + top.MyApp.GetItemValue('OppReference', _oCurWnd) + "." + "<br /><br />" + "Merci et bonne journée. " + "<br /><br />Cordialement,<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	  var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	  if (str_Ret == true || str_Ret == "True") {
	   top.MyApp.OpenDlg("Alert", ["Notification", "Une notification vient d'être envoyée à l'adresse : " + vEmailDest]);
	   
	  } else {
	   top.MyApp.OpenDlg("Alert", ["Erreur", "Problème envoi mail automatique : " + str_Ret]);
	  }
	 } else {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Il manque l'adresse mail du prospecteur"]);
	 }
	 // HAS FIN ACHAT 2020 : Envoyer un mail automatique au group de messagerie de la famille de produit de l'affaire
	
	*/ 
	}
}