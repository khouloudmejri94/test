function()
{
	 if(top.MyApp.CurrentSetting.nChapMode == "Open")
	 {
	  var vProf = top.MyApp.UserSetting.User.ProfileInitials
	 
	  if(vProf == 'ADMT' || vProf == 'ADMF' || vProf == 'ADMFT'){
	   var vSth = top.MyApp.FindItem("CpyExtDerogPerm");
	   if(vSth) vSth.disabled = false;
	  }else{
	   var vSth = top.MyApp.FindItem("CpyExtDerogPerm");
	   if(vSth) vSth.disabled = true;
	  }
	 
	  if(vProf == 'ADMT' || vProf == 'ADMF'  || vProf == 'ADMFT' || vProf == 'LTG'){
	   var vSth = top.MyApp.FindItem("CpyExtPasdescompte");
	   if(vSth) vSth.disabled = false;
	  }else{
	   var vSth = top.MyApp.FindItem("CpyExtPasdescompte");
	   if(vSth) vSth.disabled = true;
	  }
	 
	 var vCheck = top.MyApp.FindItem("CpyExtFraisAnnexe");
	 var vText = top.MyApp.FindItem("CpyExtFraisAnnexeText");
	 //20.11.2015 CBA#520
	 if(vProf == 'ADMT' || vProf == 'ADMF' || vProf == 'ADMFT' || vProf == 'LTG')
	 {
	      if(vCheck) vCheck.disabled = false;
	      if(vText) vText.disabled = false;
	      top.MyApp.SetItem("CpyExtFraisAnnexeText", "className","");
	      top.MyApp.SetItem("CpyExtFraisAnnexeText", "style.height","41px");   
	      
	 }else
	 {
	      if(vCheck) vCheck.disabled = true;
	      if(vText) vText.disabled = true;
	 }
	 
	 
	 }
}