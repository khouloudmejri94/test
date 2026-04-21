function()
{
	 
	
	var strSQLRes= "select COUNT(*) as nbLigne from sysadm.xdemande_info where do0_nrid= '"+ top.MyApp.GetItemValue("OppNRID") +"'"
	var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	if (arrRes > 0)
	{
	// SENDMAIL
	
	       var vAcheteur    = top.MyApp.GetItemValue('OppExtAcheteur');
	       var vProfilInit  = top.MyApp.UserSetting.User.ProfileInitials;    
	       var vSQL = "select e_mail from sysadm.am0 where titulaire = ('"+vAcheteur+"')";       
	       var vSQL2 = "select xGI_Zone from sysadm.am0 where titulaire = ('"+vAcheteur+"')"              
	       var arrRes = top.MyApp._gfctExtReq(vSQL);
	       var arrRes2 = top.MyApp._gfctExtReq(vSQL2);
	       var vEmail = arrRes.join(";");
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
	          arrParam[2] = top.MyApp.GetItemValue('OppReference')+ " - " +top.MyApp.GetItemValue('OppComment')+ " - " + arrRes; //Title
	          arrParam[3] = "Hello, <br /><br />Please keep in mind that we need more information concerning this affair. If you do not give us any response, we won’t be able to make an offer and this affair won’t be available anymore.<br /><br />Sincerly,<br /><br />Import Admin. Dept. "; //Body
	          var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	          if(str_Ret == true || str_Ret == "True"){
	              top.MyApp.OpenDlg("Alert",["", "La relance vient d'être envoyée à l'adresse : " + vEmail]);        
	          }else{
	              top.MyApp.OpenDlg("Alert",["", "Send Mail Demande info GI : " + str_Ret]);  
	          }
	       }else{
	          top.MyApp.OpenDlg("Alert",["", "Il manque l'adresse mail de l'Acheteur."]);  
	       }
	     var vVal = top.MyApp.GetItemValue("OppExtCountPush");
	     vVal = parseInt(vVal)+1;
	     top.MyApp.SetItemValue("OppExtCountPush",vVal,top.MyData_View); 
	     var vNow = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE , top.MyApp.SYSTEM_DATE);
	     top.MyApp.SetItemValue("OppExtLastPush",vNow);
	     var vButton = top.MyApp.FindItem("Sht33160707467352"); 
	 
	     top.MyApp.fraMenuBar.Execute("R_Save");
	     vButton.disabled = true;
	 
	}else
	{
	     top.MyApp.OpenDlg("Alert",["", " Pas de relances sans questions posées!"]);  
	}
}