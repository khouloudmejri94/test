function PS_Req_Sht_RelanceDirMKT()
{
	var vAcheteur    = top.MyApp.GetItemValue("ReqExtAcheteur") ;
	var vLitige      = top.MyApp.GetItemValue("ReqExtRefInterne") ;
	var vFourn       = top.MyApp.GetItemValue("ReqCpyName") ;
	var vFrom,vTo,vCC,vCCI,vSubject,vBody,vPJ;
	
	vFrom = "litiges@noz.fr";
	vTo = "edanion@noz.fr";     //to be replaced: edanion@noz.fr
	vCCI= '';
	
	vSubject = "Dernière Relance Litige à valider MKT";
	vBody = "Bonjour,";
	vBody += "\n\n";
	vBody += "Ce mail est la dernière relance. LA DECLARATION DE LITIGE doit être faite dans la journée.";
	vBody += "\n\n";
	vBody += "Merci de compléter au plus vite :";
	vBody += "\n\n";
	vBody += "Informations manquantes";
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
	vBody += "Merci de transmettre votre réponse à <a href='mailto:litiges@noz.fr?Subject=Dernière%20Relance%20Litiges%20à%20valider%20MKT' target='_top'>litiges@noz.fr</a>.";
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
	  top.MyApp.OpenDlg('sendMail', "HIDEDOC<_cut_/> " + vFrom + "<_cut_/>" + vTo + "<_cut_/>" + vCC + "<_cut_/>"+vCCI +"<_cut_/>" + vSubject + "<_cut_/>" + vBody + "<_cut_/>2<_cut_/>" + vPJ);
	  top.MyApp.UserSetting.UserMisc.MailType=vMailTypeOrg
	
	          var vNow = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE , top.MyApp.SYSTEM_DATE);
	          top.MyApp.SetItemValue("ReqExtDateRelanceDirMKT",vNow);
	          top.MyApp.fraMenuBar.Execute("R_Save");
	          var vButton = top.MyApp.FindItem("Sht33628186404552");
	          vButton.disabled = true;
}