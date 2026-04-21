function PS_Opp_Sht_Sans_Suite()
{
	/*
	Création : RLM/MOH 28.01.2014 - 24.10.2014
	Attention Bidouille en commentaire (save/reload) !
	*/
	try{
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	var vListProfilMKT  = "CH_PRO;DIR_MKT;ASS_MKT;MAN_POLE;CH_MAR";
	var vStatut  = top.MyApp.GetItemValue("OppStatus"); 
	var vOppNRID = top.MyApp.GetItemValue ("OppNRID");
	var vRaison = top.MyApp.GetItemValue("OppExtRaisonSS");
	var vComment = top.MyApp.GetItemValue("OppExtRaisonSS1");
	var vAcheteur    = top.MyApp.GetItemValue('OppExtAcheteur');
	var vProfilInit  = top.MyApp.UserSetting.User.ProfileInitials;    
	var vSQL = "select e_mail from sysadm.am0 where titulaire = ('"+vAcheteur+"')";       
	var vSQL2 = "select xGI_Zone from sysadm.am0 where titulaire = ('"+vAcheteur+"')";
	if(vListProfilMKT.indexOf(vProf) == -1 && vProf !='ADMT' && vProf !='ADMF' && vProf !='ADMFT')
	{
	     top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé à utiliser cette fonctionnalité!!"]]);
	     return false;
	}
	if(top.MyApp.CurrentSetting.nChapMode != "Open")  return true;
	 
	if ((vAcheteur.substring(0, 2) == "GI") && (!isNaN(vAcheteur.substring(2, 3))))
	{
	 if((vRaison == null || vRaison =="")||(vComment == null || vComment =="")){
	  top.MyApp.OpenDlg("33112007657540");
	 }else{
	  
	  var arrRes = top.MyApp._gfctExtReq(vSQL);
	  var arrRes2 = top.MyApp._gfctExtReq(vSQL2);
	  var vEmail = arrRes.join(";");
	  vEmail +=";mhamadaine@ra-expansion.fr";
	  
	  if (arrRes.length >= 1){
	          var arrParam = [];
	    
	     if(arrRes2)
	              {
	               arrParam[0] = arrRes2; //From
	              }else
	              {
	               arrParam[0] = "adm10import@gimport10.com"; //From
	              }
	     
	     arrParam[1] = vEmail; //To
	     arrParam[2] = top.MyApp.GetItemValue('OppReference')+ " - " +top.MyApp.GetItemValue('OppComment'); //Title
	     arrParam[3] = "Hello, <br /><br />We inform you that " +top.MyApp.GetItemValue('OppExtChefproduit')+ ", in charge of your file won’t make any offer for the following reasons:<br /><br /> - "+ vRaison +"<br /> - "+ vComment  +"<br />Sincerly,<br /><br />Import Admin. Dept. "; //Body
	     
	     var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	    if(str_Ret == true || str_Ret == "True")
	    {
	     top.MyApp.fraMenuBar.Execute("R_Edit"); 
	  //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	     top.MyApp.SetItemValue("OppStatus","08. SANS SUITE");
	  //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	     top.MyApp.fraMenuBar.Execute("R_Save");
	     top.MyApp.fraMenuBar.Execute("R_Consult"); 
	               
	    }
	     
	    
	  }else{
	   top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Il manque l'adresse mail de l'Acheteur"]]);
	  }
	  
	 }
	 
	}else{
	 top.MyApp.OpenDlg("33112007657540");
	}
	
	}catch(e){
	 alert(e.message)
	}
	 
	
	/*
	try{
	
	 top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	 top.MyApp.fraMenuBar.Execute("R_Edit");
	 var vProf = top.MyApp.UserSetting.User.ProfileInitials
	 var vListProfilMKT  = "CH_PRO;DIR_MKT;ASS_MKT;MAN_POLE;CH_MAR";
	 var vStatut  = top.MyApp.GetItemValue("OppStatus"); 
	if(vListProfilMKT.indexOf(vProf) == -1 && vProf !='ADMT' && vProf !='ADMF')
	{
	     top.MyApp.OpenDlg("Alert", ["Attention", "Vous n’êtes pas autorisé à utiliser cette fonctionnalité  !!"]);
	     return false;
	}
	 top.MyApp.OpenDlg("Alert", ["Attention", "Voulez vraiment passer en 06. SANS SUITE ?", "YesNo"]);
	 if(!top.MyApp.AppSetting.dlgReturn[0]){
	      return false;
	 }
	
	 top.MyApp.SetItemValue("OppStatus","06. SANS SUITE"); 
	 
	 top.MyApp.CurrentSetting.Catalog["OppExtNoteAff"].Ed=1;
	 top.MyApp.SetItemValue("OppExtNoteAff","00. Refusé,sans intérêt");
	 top.MyApp.CurrentSetting.Catalog["OppExtNoteAff"].Ed=0;
	
	 top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	 top.MyApp.fraMenuBar.Execute("R_Save");
	 top.MyApp.fraMenuBar.Execute("R_Consult");
	 top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	 
	}catch(e){
	 alert(e.message);
	}
	*/
}