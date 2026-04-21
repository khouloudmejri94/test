function()
{
	try {
	 var vAcheteur = top.MyApp.GetItemValue('OppExtAcheteur');
	 var vAssComm = top.MyApp.GetItemValue('OppExtAssCom');
	 var vProfilInit = top.MyApp.UserSetting.User.ProfileInitials;
	 var vUser = top.MyApp.UserSetting.User.Name;
	 var vNRID = top.MyApp.GetItemValue('OppNRID');
	 var vSQL = "select e_mail from sysadm.am0 where titulaire in ('" + vAcheteur + "','" + vUser + "')";
	 var arrRes = top.MyApp._gfctExtReq(vSQL);
	 var vEmail = arrRes.join(";");
	 //13.10.2015 CBA => Demande nr. 432 
	 var vSQL2 = "SELECT xSocCAE FROM sysadm.dc0 where XSTATOFF = '05. COMMANDEE' AND do0_nrid = '" + vNRID + "'";
	 var vSocCAE = top.MyApp._gfctExtReq(vSQL2);
	 if (arrRes.length >= 1) {
	  var arrParam = [];
	  arrParam[0] = vEmail;
	  if (vSocCAE[0] == "3501" || vSocCAE[0] == "3502" || vSocCAE[0] == "3503" || vSocCAE[0] == "3504" || vSocCAE[0] == "3505" || vSocCAE[0] == "3506" || vSocCAE[0] == "3507" || vSocCAE[0] == "4000") {
	   arrParam[1] = "apouteau@noz.fr;arobin@noz.fr;supplier@admincae.com;groupe_transport@noz.fr";
	  } else {
	   arrParam[1] = "apouteau@noz.fr;arobin@noz.fr;fournisseurs.admin@noz.fr;groupe_transport@noz.fr";
	  }
	  //13.10.2015 CBA => Demande nr. 432 
	  arrParam[2] = vEmail;
	  arrParam[3] = "Paiement comptant " + top.MyApp.GetItemValue("OppCpyName", top.MyData_View) + " " + top.MyApp.GetItemValue("OppReference", top.MyData_View);
	  arrParam[4] = top.MyApp.GetItemValue("OppReference", top.MyData_View);
	  arrParam[5] = top.MyApp.GetItemValue("OppCpyName", top.MyData_View);
	  arrParam[6] = top.MyApp.GetItemValue("OppExtAchteur", top.MyData_View);
	  var str_Ret = top.MyApp.ExecuteServerScript(31482097663154, arrParam); //SS_Opp_Sht_Send_Mail 
	  
	if (str_Ret === true || str_Ret == "True") {
	   top.MyApp.SetItem("OppExtMailSend", "disabled", false, top.MyData_View);
	   top.MyApp.SetItemAttribute("OppExtMailSend", "className", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtMailSend", "contentEditable", true, top.MyData_View);
	   top.MyApp.SetItemValue("OppExtMailSend", "1");
	   top.MyApp.fraMenuBar.Execute("R_Save");
	   top.MyApp.fraMenuBar.Execute("T_Refresh");
	   top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Le mail à bien été envoyé!"]]);
	  } else {
	   top.MyApp.OpenDlg("Alert", ["", "PS_Opp_Sht_Send_Mail : " + str_Ret]);
	  }
	 } else {
	  top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Il manque au moins une adresse mail dans les expéditeurs (Acheteur ou Aco)."]]);
	 }
	} catch (e) {
	 top.MyApp.OpenDlg("Alert", ["", "PS_Opp_Sht_Send_Mail : " + e.message]);
	}
}