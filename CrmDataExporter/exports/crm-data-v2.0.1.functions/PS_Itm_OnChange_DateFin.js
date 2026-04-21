function PS_Itm_OnChange_DateFin()
{
	
	console.log(top.MyApp.GetItemValue('ItmExtStatut'));
	if (top.MyApp.GetItemValue('ItmExtStatut') != 'ARENOUVELER') {
	    var startDateStr = top.MyApp.GetItemValue('ItmExtDateDeb');
	    var endDateStr = top.MyApp.GetItemValue('ItmExtDateFin');
	
	    // Convertir les chaînes en objets Date
	    var start = new Date(startDateStr.replace(' ', 'T'));
	    var end = new Date(endDateStr.replace(' ', 'T'));
	
	    // Calculer la différence en millisecondes
	    var diffInMs = end - start;
	
	    // Convertir en jours
	    var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
	
	    if (diffInDays > 0 && diffInDays <= 14) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "La différence entre la date de début et la date de fin dépasse 14 jours !"]);
	        return false;
	    } else {
	        console.log("Différence correcte :", diffInDays, "jour(s)");
	        return true;
	    }
	}
}