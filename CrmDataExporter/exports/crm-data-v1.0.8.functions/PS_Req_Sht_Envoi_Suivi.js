function()
{
	function( d,b,c,u,r,q,x ) {
	        b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	        for(r=q=x="";c=d.charAt(x++);~c&&(u=q%4?u*64+c:c,q++%4)?r+=String.fromCharCode(255&u>>(-2*q&6)):0) c=b.indexOf(c);
	        return r;
	};
	if(top.CurrentSetting.nChapMode !="Open" ) return false;
	top.MyApp.fraMenuBar.Execute("R_Save");
	// L'utilisateur sélectionne le type souhaité
	top.MyApp.fctExecuteQry("select version, language, title, memo as HIDDEN, title as HIDDEN from sysadm.dm0 where key_words='CorpMailEnvoiLitige' ");// and ntype=21")
	if(!top.MyApp.AppSetting.dlgReturn){return false}
	var vType = top.MyApp.AppSetting.dlgReturn.DocVersion;
	var bMajStatut = false;
	if(vType != undefined){
	  
	  var vPJ = '';
	  var vFrom, vTo, vCC, vSubject, vBody, vReqMail, tabReqMail,vCCI ;  
	  //Gestion contenu du corps du mail
	  var vContentMail64 = top.MyApp.AppSetting.dlgReturn.DocContent;
	  if(!vContentMail64){vContentMail64 =""}
	  vBody = base64_decode(vContentMail64.substring(4));
	  //Gestion sujet du mail
	  vSubject = top.MyApp.AppSetting.dlgReturn.DocTitle;
	  if(vSubject)
	  {
	    var expRegFusion = /\[[^\]]*\]/g;
	    var tabToReplace = vSubject.match(expRegFusion );
	    var vTmpObj, vTmpLn, vTmpVal
	   if(tabToReplace)
	   {
	    for(var i =0; i<tabToReplace.length; i++)
	    {
	  vTmpObj = tabToReplace[i]
	  vTmpLn = vTmpObj.replace(/\[/, "").replace(/\]/, "")
	  vTmpVal = top.MyApp.GetItemValue(vTmpLn, top.MyData_View)
	  vSubject = vSubject.replace(vTmpObj, vTmpVal)
	    }
	   }
	  }
	  
	  switch(vType)
	  {
	    case 'Comptable':
	    if(top.MyApp.AppSetting.DBName=="DEV")
	    {
	  vFrom = "smtp@noz.fr"
	    }
	    else
	    {
	     ////16.09.2015CBA/////
	     var dlg = top.MyApp.OpenDlg ("32381613457942"); 
	     vFrom = top.MyApp.CustomSetting.EmailAddress;
	     ////16.09.2015CBA/////
	
	  //vFrom = "fournisseurs.admin@noz.fr";
	
	    }
	    vCCI =  vFrom ;
	    vTo = top.MyApp.GetItemValue('ReqExtEmail', top.MyData_View);
	    vCC = '';
	   
	    // Récupération email Acheteur
	    var vAcheteur = top.MyApp.GetItemValue('ReqExtAcheteur', top.MyData_View);
	    if(vAcheteur != '')
	    {
	  var vSQL = "select e_mail from sysadm.am0 where titulaire = '" + vAcheteur.replace(/'/g, "''") + "'";
	  var arrEmail = top.MyApp._gfctExtReq(vSQL);
	  if(arrEmail.length > 0)
	  {
	   vCC = arrEmail[0];
	  }
	    }
	    break;
	    case 'Physique':
	    vReqMail = " SELECT ( SELECT e_mail + ';' FROM sysadm.am0 p2 where titulaire = 'MASAO1' ORDER BY e_mail FOR XML PATH( '') ) Acheteur, "
	    + " ( SELECT  xref0.LIBELLE + ';' FROM sysadm.xref0 xref0 inner join sysadm.xdetection_logistique xdl on xdl.ptf=xref0.CODE "
	    + " WHERE xref0.template is null and xdl.template is null and xref0.filtre = 'REQ - PTF' and xdl.cal0_nrid=0 "
	    + " ORDER BY xref0.LIBELLE FOR XML PATH( '') ) AS PTF ";
	    tabReqMail = top.MyApp._gfctExtReq(vReqMail);
	    if(top.MyApp.AppSetting.DBName=="DEV")
	    {
	  vFrom = "smtp@noz.fr"
	    }
	    else
	    {
	     ////16.09.2015CBA/////
	     var dlg = top.MyApp.OpenDlg ("32381613457942"); 
	     vFrom = top.MyApp.CustomSetting.EmailAddress;
	     ////16.09.2015CBA/////
	
	
	 // vFrom = "fournisseurs.admin@noz.fr";
	
	    }
	
	    vTo = tabReqMail[0][1];
	    vCC = tabReqMail[0][0];
	    vCCI =  vFrom ;
	    break;
	  }
	  
	  //Ouverture écran envoi email standard Selligent
	  var vMailTypeOrg = top.MyApp.UserSetting.UserMisc.MailType;
	  top.MyApp.UserSetting.UserMisc.MailType="SMTP"
	  top.MyApp.OpenDlg('sendMail', "HIDEDOC<_cut_/> " + vFrom + "<_cut_/>" + vTo + "<_cut_/>" + vCC + "<_cut_/>"+vCCI +"<_cut_/>" + vSubject + "<_cut_/>" + vBody + "<_cut_/>2<_cut_/>" + vPJ);
	  top.MyApp.UserSetting.UserMisc.MailType=vMailTypeOrg
	  if(top.MyApp.AppSetting.dlgReturn){ 
	    bMajStatut = true
	    try{
	      var vNow = new Date();
	     //Premiere demande
	     if(top.MyApp.GetItemValue("ReqExtPremieredem") =="A signer") { 
	      top.MyApp._gfctExtReq("INSERT INTO xenvoi_histo(cal0_nrid,xDateEnvoi,xTypeCourrier) VALUES("+top.MyApp.GetItemValue("ReqNRID", top.MyData_View)+",getdate(),'Demande avoir') ");
	     }
	     //Courrier MAD
	     if(top.MyApp.GetItemValue("ReqExtCourMAD") =="A signer") { 
	      top.MyApp._gfctExtReq("INSERT INTO xenvoi_histo(cal0_nrid,xDateEnvoi,xTypeCourrier) VALUES("+top.MyApp.GetItemValue("ReqNRID", top.MyData_View)+",getdate(),'Courrier MAD') ");
	     }
	     //Relance
	     if(top.MyApp.GetItemValue("ReqExtRelance") =="A signer") { 
	      top.MyApp._gfctExtReq("INSERT INTO xenvoi_histo(cal0_nrid,xDateEnvoi,xTypeCourrier) VALUES("+top.MyApp.GetItemValue("ReqNRID", top.MyData_View)+",getdate(),'Relance') ");
	     }
	     //Mise en demeure
	     if(top.MyApp.GetItemValue("ReqExtMiseDemeure") =="A signer") { 
	      top.MyApp._gfctExtReq("INSERT INTO xenvoi_histo(cal0_nrid,xDateEnvoi,xTypeCourrier) VALUES("+top.MyApp.GetItemValue("ReqNRID", top.MyData_View)+",getdate(),'Mise en demeure') ");
	     }
	     //Autre Courrier
	     if(top.MyApp.GetItemValue("ReqExtAutreCourrier") =="A signer") { 
	      top.MyApp._gfctExtReq("INSERT INTO xenvoi_histo(cal0_nrid,xDateEnvoi,xTypeCourrier) VALUES("+top.MyApp.GetItemValue("ReqNRID", top.MyData_View)+",getdate(),'Autre courrier') ");
	     }
	
	    }catch(e){
	      alert(e.message);
	    }
	  }
	}
	 
	if(!bMajStatut)
	{
	  return false
	}
	 
			var vTypeToUpd = "Envoi";
	PS_Req_MajStatutLitige(vTypeToUpd);
	return true;
}