function()
{
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) 
	{
	 _oCurWnd = top.MyData_View; 
	}
	else
	{
	 _oCurWnd = top.MyApp.wizardWindow; 
	}
	// SC OZEOL DEBUT: 15/01/2018 : Une affaire n'est plus modifiable une fois en statut << 07. DEMANDE D'UNE OFFRE >>
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var statut = top.MyApp.GetItemValue("OppStatus").substr(0, 2);
	var vListProfilsValides = "ADMT;ADMF;ACH_TER;MAN_HA_TER;ASS_ACH";
	
	     if ( statut == '07') 
	       {
	          if (vProf =='ADMT' || vProf =='ADMF' || vProf =='ADMFT')
	          {
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	          }
	          else 
	          {
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	          }
	       }
	     else if ( statut > '04' && statut != '09'){
	   if (statut == '08'){
	    if (vListProfilsValides.indexOf(vProf) == -1) {
	     top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	    }
	   } 
	  else if (vProf =='ASS_CO' || vProf =='MAN_HA_ASS'){
	      top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	     }
	    }
	 else if (vProf =='ASS_CO') {
	  var BtnIncomplet = top.MyApp.FindItem("Sht34399519667014", top.MyData_View);
	  if (BtnIncomplet) BtnIncomplet.disabled = true;
	 }
	    
	// SC FIN
	 
		
	 PS_Opp_Header_Status(); 
		var typeHnd = top.MyApp.FindItem("OppExtConcLot", _oCurWnd);
	if (typeHnd )
	{
	  top.MyApp.fctRemoveEvent(typeHnd, "change",  PS_Opp_Header_Status);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Opp_Header_Status);
	}
		var typeHnd = top.MyApp.FindItem("OppExtUrg", _oCurWnd);
	if (typeHnd )
	{
	  top.MyApp.fctRemoveEvent(typeHnd, "change",  PS_Opp_Header_Status);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Opp_Header_Status);
	}
		var typeHnd = top.MyApp.FindItem("OppExtMagasinsinterdits", _oCurWnd);
	if (typeHnd )
	{
	  top.MyApp.fctRemoveEvent(typeHnd, "change",  PS_Opp_Header_Status);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Opp_Header_Status);
	}
		var typeHnd = top.MyApp.FindItem("OppExtInfoMarkt", _oCurWnd);
	if (typeHnd )
	{
	  top.MyApp.fctRemoveEvent(typeHnd, "change",  PS_Opp_Header_Status);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Opp_Header_Status);
	}
		if(top.MyApp.CurrentSetting.nChapMode == "Open"){
	 top.MyApp._gfctPutButtonGauche('OppExtProbLot', "top.MyApp._gfctAfficheInfos('"+top.MyApp.GetItemValue("OppNRID")+"','do0','xproblot')", '', false, '?');
	 top.MyApp._gfctPutButtonGauche('OppExtSiOui', "top.MyApp._gfctAfficheInfos('"+top.MyApp.GetItemValue("OppNRID")+"','do0','xsioui')", '', false, '?');
	 top.MyApp._gfctPutButtonGauche('OppExtInfoMarkt', "top.MyApp._gfctAfficheInfos('"+top.MyApp.GetItemValue("OppNRID")+"','do0','XINFOMARKT')", '', false, '?');
	 top.MyApp._gfctPutButtonGauche('OppExtCommQu', "top.MyApp._gfctAfficheInfos('"+top.MyApp.GetItemValue("OppNRID")+"','do0','XCOMMQU')", '', false, '?');
	}
		top.MyApp._gfctPutButton('OppExtConsigne', "top.MyApp.PS_RempliChamp('OppExtConsigne')", '', false, '...');
}