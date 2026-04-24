function PS_Itm_loadiflsname()
{
	var aLibIfls = [];
	var vunivers = top.MyApp.GetItemValue("ItmExtUnivers", top.MyData_View);
	var vfamille = top.MyApp.GetItemValue("ItmExtFam", top.MyData_View);
	var vsousfam = top.MyApp.GetItemValue("ItmExtSousFam", top.MyData_View);
	
	var strSql = "select distinct LIB_IFLS as LibIfls from sysadm.x_ifls_param";
	strSql += " where LIB_GROUPE_IFLS = '" + vunivers.replace(/'/g, "''") + "' and LIB_FAMILLE_IFLS = '" + vfamille.replace(/'/g, "''") + "' and LIB_SOUS_FAMILLE_IFLS = '" + vsousfam.replace(/'/g, "''") + "' order by 1";
	
	var sQueryRes = top.MyApp.fctGetQryResult(strSql, false, 0, 100);
	var fullcount = top.MyApp.GetItemAttributeFromXML(sQueryRes, "Result", "FullCount");
	//console.log('count result TFLS : '+fullcount );
	
	if (fullcount > 0) {
	    for (var i = 1; i <= fullcount; i++) {
	
	        aLibIfls.push(top.MyApp.GetItemAttributeFromXML(sQueryRes, "ExtIFLSPrmLIBIFLS", "Val", "../id", i));
	        //console.log('ifls '+ i + ' : ' +top.MyApp.GetItemAttributeFromXML(sQueryRes, "ExtIFLSPrmLIBIFLS", "Val", "../id", i));
	    }
	}
	
	//Créer le champ <select multiple>
	const select = document.createElement('select');
	select.id = 'ItmExtLstLibIFLS';
	select.name = 'ItmExtLstLibIFLS';
	select.multiple = true;
	select.style.minWidth = '228px';
	select.style.maxWidth = '623px';
	select.style.width = '100%';  // s’adapte au parent dans cette limite
	select.style.height = '75px';
	//select.style.marginLeft = '20px';
	
	//Remplir le <select> avec les valeurs SQL
	aLibIfls.forEach(lib => {
	    const option = document.createElement('option');
	    option.value = lib;
	    option.textContent = top.MyApp.arrTranslations[lib] || lib;
	    select.appendChild(option);
	});
	
	
	// ?? Trouver l’ancien champ
	const input =  top.MyApp.FindItem("Label42091480416060", top.MyData_View) || top.MyApp.FindItem("ItmExtLstLibIFLS", top.MyData_View);
	
	//Remplacer l’ancien champ
	if(input){
	   input.parentNode.replaceChild(select, input);
	}
	
	//Gérer les sélections
	select.addEventListener('change', () => {
	    const selectedValues = Array.from(select.selectedOptions).map(opt => opt.value);
	
	    top.MyApp.SetItemValue('ItmExtLibIFLS', selectedValues.join(','));
	    
	});
	
	if (top.MyApp.CurrentSetting.nChapMode == 'Open') {
	        // Exemple de valeur par défaut
	        //const defaultValues = top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "ItmExtLibIFLS", "Val"); 
	        const defaultValues = top.MyApp.GetItemValue("ItmExtLibIFLS", top.MyData_View);
	        // Séparation des valeurs par une virgule
	        const valuesArray = defaultValues.split(',');
	        // Récupération du select
	        const select = top.MyApp.FindItem("ItmExtLstLibIFLS", top.MyData_View);
	        // Préselection des options
	        for (let option of select.options) {
	            if (valuesArray.includes(option.value)) {
	                option.selected = true;
	            }
	        }
	    }
}