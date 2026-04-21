function(pObjetMetier,pNRID)
{
	try{
	
	     var vProfil = top.MyApp.UserSetting.User.ProfileInitials;
	
	     if(pObjetMetier == undefined || pNRID == undefined || pObjetMetier == ''|| pNRID == ''){
	        //récupération du NRID de la ligne sélectionnée.
	        var strNRID= g_eventSrcElement.parentElement.NRID;
	        if(strNRID == undefined) return true;
	        if(strNRID == "") return true;
	  
	        var vretour = top.MyApp.OpenData_View("Acn",strNRID,"","","","");
	     }else{
	        var vretour = top.MyApp.OpenData_View(pObjetMetier,pNRID,"","","","");
	     }
	     return true;
	}catch(e){
	     alert("TryCatch RequeteOpenBo- " + e.message);
	}
}