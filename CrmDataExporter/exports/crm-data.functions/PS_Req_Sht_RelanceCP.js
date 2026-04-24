function PS_Req_Sht_RelanceCP()
{
	var vAcheteur    = top.MyApp.GetItemValue("ReqExtAcheteur") ;
	var vLitige      = top.MyApp.GetItemValue("ReqExtRefInterne") ;
	var vFourn       = top.MyApp.GetItemValue("ReqCpyName") ;
	var vFrom,vTo,vCC,vCCI,vSubject,vBody,vPJ;
	
	vFrom = "litiges@noz.fr";
	vTo = '';
	vCCI= '';
	vSubject = "1ère Relance Litiges à valider MKT";
	vBody = "Bonjour,";
	vBody += "\n\n";
	vBody += "Vous avez dépassé le délai de 5 jours pour la validation de la déclaration de litige dans le CRM.";
	vBody += "\n\n";
	vBody += "Attention, ce mail est la première relance à <q>J+6</q>.";
	vBody += "\n";
	vBody += "J+7: Copie Chef de Marché";
	vBody += "\n";
	vBody += "J+8: Copie Eric Danion";
	vBody += "\n\n";
	vBody += "N° de litige :<b>"+vLitige;
	vBody += "</b>";
	vBody += "\n\n";
	vBody += "Fournisseur :<b>"+vFourn;
	vBody += "</b>";
	vBody += "\n\n";
	vBody += "Nom de l'acheteur :<b>"+vAcheteur;
	vBody += "</b>";
	vBody += "\n\n";
	vBody += "Pour une demande d'annulation, informez votre manager pour qu'il confirme par mail son accord.";
	vBody += "\n\n";
	vBody += "Merci de transmettre votre réponse à <a href='mailto:litiges@noz.fr?Subject=1ère%20Relance%20Litiges%20à%20valider%20MKT' target='_top'>litiges@noz.fr</a>.";
	vBody += "\n\n";
	vBody += "Cordialement,";
	vBody += "\n";
	var vSQL = "select e_mail from sysadm.am0 where titulaire ='"+vAcheteur+"'";             
	var arrRes = top.MyApp._gfctExtReq(vSQL);
	vCC = arrRes.join(";");
	vCC += ";litiges@noz.fr";
	
	//Ouverture écran envoi email standard Selligent
	  var vMailTypeOrg = top.MyApp.UserSetting.UserMisc.MailType;
	  top.MyApp.UserSetting.UserMisc.MailType="MAPI"
	  top.MyApp.OpenDlg('sendMail', "HIDEDOC<_cut_/> " + vFrom + "<_cut_/>" + vTo + "<_cut_/>" + vCC + "<_cut_/>"+vCCI +"<_cut_/>" + vSubject + "<_cut_/>" + vBody + "<_cut_/>2<_cut_/>");
	  top.MyApp.UserSetting.UserMisc.MailType=vMailTypeOrg
	
	          var vNow = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE , top.MyApp.SYSTEM_DATE);
	          top.MyApp.SetItemValue("ReqExtDateRelanceCP",vNow);
	          top.MyApp.fraMenuBar.Execute("R_Save");
	          var vButton = top.MyApp.FindItem("Sht33588781501846");
	          vButton.disabled = true;
}