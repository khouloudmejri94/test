function PS_Itm_ProlongationValidite()
{
	var vStatut = top.MyApp.GetItemValue("ItmExtStatut");
	top.MyApp.SetItemValue("ItmExtStatut", "ARENOUVELER");
	
	
	top.MyApp.asyncOpenDlg("Calendar", ["ItmExtDateFin"], top, null, null, null, null, function() {
	
	    var ret = top.MyApp.AppSetting.dlgReturn;
	
	    if (ret.length) {
	
	        var dt = new Date(ret[0]);
	
	        top.MyApp.SetItemValue('ItmExtDateDebProlong', dt);
	
	        var startDateStr = top.MyApp.GetItemValue("ItmExtDateFin");
	
	        var endDateStr = top.MyApp.GetItemValue("ItmExtDateDebProlong");
	
	        // Convertir les chaînes en objets Date
	        var start = new Date(startDateStr.replace(' ', 'T'));
	        var end = new Date(endDateStr.replace(' ', 'T'));
	
	        // Calculer la différence en millisecondes
	        var diffInMs = end - start;
	
	        // Convertir en jours
	        var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
	console.log('diffInDays : ', diffInDays);
	
	        if (diffInDays > 0 && diffInDays <= 14) {
	            //top.MyApp.OpenDlg("Alert", ["Attention", "La différence entre la date de début et la date de fin dépasse 14 jours !"]);
	            top.MyApp.SetItemValue("ItmExtStatut", vStatut);
	            top.MyApp.asyncOpenDlg("Alert", ["Attention", "La différence entre la date de début et la date de fin dépasse 14 jours !"], null, false, null, null, null, function(p) {});
	          
	            return false;
	        } else {
	console.log("a renouveler");
	            top.MyApp.SetItemValue('ItmExtDateFin', dt);
	            var vDate = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE, top.MyApp.SYSTEM_DATE);
	
	            top.MyApp.SetItemValue("ItmExtStatut", "ARENOUVELER");
	            top.MyApp.SetItemValue("ItmExtAuteurARenouveler", top.MyApp.UserSetting.User.Name);
	            top.MyApp.SetItemValue("ItmExtDateARenouveler", vDate);
	
	            top.MyApp.fraMenuBar.Execute("R_Save");
	
	            return true;
	        }
	
	    }
	
	});
}