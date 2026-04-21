function PS_Osa_MAJ_FichesABC()
{
	try
	{
	
	     var vSalon = top.MyApp.GetItemValue("OSaExtCodeEdit",top.MyData_View);
	     var vSQL = "select xliste_salon , SUM(case when hi0.xnote = 'A' then 1 else 0 end) as FichesA , SUM(case when hi0.xnote = 'B' then 1 else 0 end) as FichesB , SUM(case when hi0.xnote = 'C' then 1 else 0 end) as FichesC  from sysadm.hi0 where xliste_salon ='"+vSalon+"' and hi0.ref != 'PROPO' and hi0.template is null  group by xliste_salon";
	     var arrRes = top.MyApp._gfctExtReq(vSQL);
	
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbreFichesA"].Ed=1;
	     top.MyApp.SetItemValue("OSaExtNbreFichesA",arrRes[0][1]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbreFichesA"].Ed=0;
	
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbreFichesB"].Ed=1;
	     top.MyApp.SetItemValue("OSaExtNbreFichesB",arrRes[0][2]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbreFichesB"].Ed=0;
	
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbreFichesC"].Ed=1;
	     top.MyApp.SetItemValue("OSaExtNbreFichesC",arrRes[0][3]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbreFichesC"].Ed=0;
	
	     var vSQL2 = "SELECT count(1) from SYSADM.DO0 where xDateDemValorisation is not null and xsalon = '"+vSalon+"'  and template is null";
	     var arrRes2 = top.MyApp._gfctExtReq(vSQL2);
	
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbrAffaires"].Ed=1;
	     top.MyApp.SetItemValue("OSaExtNbrAffaires",arrRes2[0][0]);
	     top.MyApp.CurrentSetting.Catalog["OSaExtNbrAffaires"].Ed=0;
	
	}
	catch(e)
	{
	   alert("Catch : " + e.message);
	}
}