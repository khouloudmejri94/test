//[Start - 38242153497748 - START]
function()
{
//[Start - 38242153497748 - END]
//[Code - 38232153497748 - START]
	//PS_Cpy_General_AddEvent
	//HAS DEB 25/12/2020 : gestion des champs oblogatoires pour la fiche fournisseur Agent Export
	try {
	      var oIsExport = top.MyApp.FindItem("CpyExtIsExporter", top.MyData_View);
	      var oIsDestock = top.MyApp.FindItem("CpyExtIsDestock", top.MyData_View);
	      var vIsExport = top.MyApp.GetItemValue("CpyExtIsExporter");
	      var vIsDestock = top.MyApp.GetItemValue("CpyExtIsDestock");
	      var vTypeActiv = top.MyApp.GetItemValue("CpyExtTypeActiv");
	      var vPays = top.MyApp.GetItemValue("CpyAddr1Country");
	      var oApprSrc = top.MyApp.FindItem("CpyExtValidSrc", top.MyData_View);
	      var vApprSrc = top.MyApp.GetItemValue("CpyExtValidSrc");
	  
	  //top.MyApp._gfctSetClassName("CpyExtCommVlSrc", "NM");
	      if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {  
	          if (oIsExport) {
	              if ((vIsDestock == null || vIsDestock == null || vIsDestock == undefined || vIsDestock == '0') && vIsExport == '1') {
	                  //Sourcing
	                  top.MyApp.SetItemAttribute("CpySource", "className", "");
	                  top.MyApp.CurrentSetting.Catalog["CpySource"].Mn = -1;
	                  top.MyApp._gfctSetClassName("CpySource", "UM");
	                  //Famille de Produits
	                  top.MyApp.SetItemAttribute("CpyExtFamilleProd", "className", "");
	                  top.MyApp.CurrentSetting.Catalog["CpyExtFamilleProd"].Mn = -1;
	                  top.MyApp._gfctSetClassName("CpyExtFamilleProd", "UM");
	                  //Nature des Produits
	                  top.MyApp.SetItemAttribute("CpyAddr1Department", "className", "");
	                  top.MyApp.CurrentSetting.Catalog["CpyAddr1Department"].Mn = -1;
	                  top.MyApp._gfctSetClassName("CpyAddr1Department", "UM");
	                  //Web
	                  //top.MyApp.SetItemAttribute("CpyWebAddress", "className", "");
	                  //top.MyApp.CurrentSetting.Catalog["CpyWebAddress"].Mn = -1;
	                  if (vTypeActiv == '' || vTypeActiv == null || vTypeActiv == undefined) {
	                      top.MyApp.SetItemValue("CpyExtTypeActiv", "12-Exportateur");
	                  }
	              } else {
	                  //Sourcing
	                  top.MyApp.SetItemAttribute("CpySource", "className", "Mandatory");
	                  top.MyApp.CurrentSetting.Catalog["CpySource"].Mn = 1;
	                  top.MyApp._gfctSetClassName("CpySource", "NM");
	                  //Famille de Produits
	                  top.MyApp.SetItemAttribute("CpyExtFamilleProd", "className", "Mandatory");
	                  top.MyApp.CurrentSetting.Catalog["CpyExtFamilleProd"].Mn = 1;
	                  top.MyApp._gfctSetClassName("CpyExtFamilleProd", "NM");
	                  //Nature des Produits
	                  top.MyApp.SetItemAttribute("CpyAddr1Department", "className", "Mandatory");
	                  top.MyApp.CurrentSetting.Catalog["CpyAddr1Department"].Mn = 1;
	                  top.MyApp._gfctSetClassName("CpyAddr1Department", "NM");
	                  //Web
	                  //top.MyApp.SetItemAttribute("CpyWebAddress", "className", "Mandatory");
	                  //top.MyApp.CurrentSetting.Catalog["CpyWebAddress"].Mn = 1;
	              }
	          }
	      }
	  } catch (e) {
	      alert(e.message);
	  }
	  
	  
	  //HAS DEB 25/12/2020 : gestion des champs oblogatoires pour la fiche fournisseur Agent Export
	
	
	//[Code - 38232153497748 - END]
//[End - 40918965498144 - START]
	return ;
//[End - 40918965498144 - END]
}