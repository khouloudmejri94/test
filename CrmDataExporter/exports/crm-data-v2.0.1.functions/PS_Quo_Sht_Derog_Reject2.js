function PS_Quo_Sht_Derog_Reject2()
{
	    //PS_Quo_Sht_Derog_Reject2
	    //var vNRID = top.MyApp.GetItemValue("QuoNRID");
	    var vTypeDerog = top.MyApp.GetItemValue("QuoExtTypeDerog");
	    switch (vTypeDerog) {
	        case 'Controle qualité':
	            vTypeDerog = 'CQ'
	            break;
	        case 'Emballage et stickers':
	            vTypeDerog = 'ES'
	            break;
	        case 'Rapport de test':
	            vTypeDerog = 'RT'
	            break;
	        case 'Transport':
	            vTypeDerog = 'TR'
	            break;
	        default:
	            vTypeDerog = ''
	    }
	    top.MyApp.CurrentSetting.Catalog["QuoExtStatDerog2"].Ed = 1;
	    if (vTypeDerog == 'CQ') {
	        top.MyApp.SetItemValue('QuoExtStatDerog2', 'Non approuvé');
	    } else if (vTypeDerog == 'ES' || vTypeDerog == 'RT' || vTypeDerog == 'TR') {
	        top.MyApp.SetItemValue('QuoExtStatDerog2', 'Refusé');   
	    }
	    top.MyApp.CurrentSetting.Catalog["QuoExtStatDerog2"].Ed = 0;
	    top.MyApp.fraMenuBar.Execute("R_Save");
}