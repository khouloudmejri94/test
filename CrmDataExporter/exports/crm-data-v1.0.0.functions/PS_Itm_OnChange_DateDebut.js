function PS_Itm_OnChange_DateDebut()
{
	
	var vDateDeb = top.MyApp.GetItemValue('ItmExtDateDeb');
	
	// Convertir le format en un format valide pour le constructeur Date
	const formattedDateStr = vDateDeb.replace(' ', 'T'); // '2025-07-01T00:00:007'
	
	const date = new Date(formattedDateStr);
	
	
	// Ajouter 14 jours
	date.setDate(date.getDate() + 15);
	
	// Obtenir la nouvelle date au format ISO
	const vDateFin = date.toISOString();
	
	
	
	top.MyApp.SetItemValue('ItmExtDateFin',vDateFin);
}