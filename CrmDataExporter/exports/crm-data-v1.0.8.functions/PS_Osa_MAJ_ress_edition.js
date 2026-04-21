function()
{
	try
	{
	
	
	
	
	      
	     var vSalonNRID = top.MyApp.GetItemValue("OSaNRID",top.MyData_View);
	     var vSQL = "SELECT     SUM(CASE WHEN equipe LIKE 'MKT%' AND fonction = 'Chef Produit' THEN 1 ELSE 0 END) AS CPNB,     SUM(CASE WHEN equipe LIKE 'MKT%' AND fonction = 'Assistant Marketing' THEN 1 ELSE 0 END) AS AMNB,    SUM(CASE WHEN fonction = 'CM' THEN 1 ELSE 0 END) AS CMNB,    SUM(CASE WHEN fonction = 'Prospecteur' THEN 1 ELSE 0 END) AS NBPROS,    SUM(CASE WHEN fonction = 'Negociateur' THEN 1 ELSE 0 END) AS NBNEG,    SUM(CASE WHEN fonction LIKE 'Team Leader%' THEN 1 ELSE 0 END) AS NBTL,    SUM(CASE WHEN fonction = 'Manager Achat Opérationnel' THEN 1 ELSE 0 END) AS NBBUM,    SUM(CASE WHEN fonction = 'Manager Achat Opérationnel' AND s.titre = 'Manager Zone' THEN 1 ELSE 0 END) AS NBZM FROM     sysadm.xsalon_ressources xr LEFT JOIN     sysadm.set_us1 s ON xr.NOM = s.nom WHERE     xr.cosa0_nrid = '"+vSalonNRID+"'";
	     var arrRes = top.MyApp._gfctExtReq(vSQL);
	
	
	
	
	     
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbCpBilan"].Ed=1;
	     top.MyApp.SetItemValue("OSaExtNbCpBilan",arrRes[0][0]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbCpBilan"].Ed=0;
	      
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbAmBilan"].Ed=1;
	     top.MyApp.SetItemValue("OSaExtNbAmBilan",arrRes[0][1]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbAmBilan"].Ed=0;
	    
	
	
	
	
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbCmBilan"].Ed=1;
	     top.MyApp.SetItemValue("OSaExtNbCmBilan",arrRes[0][2]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbCmBilan"].Ed=0;
	   
	
	//----------
	
	//PROS
	
	
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbPROSBilan"].Ed=1;
	     top.MyApp.SetItemValue("OSaExtNbPROSBilan",arrRes[0][3]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbPROSBilan"].Ed=0;
	     
	
	//NEG
	
	
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbNEGBilan"].Ed=1;
	     top.MyApp.SetItemValue("OSaExtNbNEGBilan",arrRes[0][4]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbNEGBilan"].Ed=0;
	   
	
	//TL
	
	
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbAcMktBilan"].Ed=1;       
	     top.MyApp.SetItemValue("OSaExtNbAcMktBilan",arrRes[0][5]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbAcMktBilan"].Ed=0;
	
	//BUM
	
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbAcTerBilan"].Ed=1;
	     top.MyApp.SetItemValue("OSaExtNbAcTerBilan",arrRes[0][6]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbAcTerBilan"].Ed=0;
	
	//ZM
	
	
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbAcGiBilan"].Ed=1;
	     top.MyApp.SetItemValue("OSaExtNbAcGiBilan",arrRes[0][7]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbAcGiBilan"].Ed=0;
	
	
	
	     
	     top.MyApp.fraMenuBar.Execute("R_Save");
	     top.MyApp.fraMenuBar.Execute("T_Refresh");          
	
	
	
	
	   
	}
	catch(e)
	{
	   alert("Catch : " + e.message);
	}
}