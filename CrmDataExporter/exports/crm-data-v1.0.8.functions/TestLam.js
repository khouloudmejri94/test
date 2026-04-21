function()
{
	
	//if(top.MyApp.CurrentSetting.nChapMode != 'Open') return false;
	top.MyApp.OpenDlg("Browse", ["C:\\"]);
	var chemain = top.MyApp.AppSetting.dlgReturn[0];
	
	   var vSalon = top.MyApp.GetItemValue("OSaNRID");
	
	debugger;
	   
	if(chemain)
	{
	
	    var nrid = top.MyApp.GetItemValue("OppNRID");
	     var parts = chemain.split(".");
	     var extention = parts[(parts.length-1)];
	     var extention = extention.toUpperCase();
	     if( extention !="XLS" &&  extention !="XLSX")
	     {
	          top.MyApp.OpenDlg("Alert", ["Fichier", "Le fichier des exposants doit être au format Excel."]);
	          return false;
	     }
	   var objExcel = new ActiveXObject("Excel.Application");
	   var objBook = objExcel.Workbooks.Open(chemain);
	   var objSheet=objBook.Worksheets.Item(1); 
	   var arrVal = [];
	   for (var i=2;i>0;i++)
	   {
	    arrVal[i-2] = [];
	    for (var j=1;j<2;j++)
	    {
	     if(objSheet.Cells(i,j).Value) 
	     { 
	          arrVal[i-2][j-1] = objSheet.Cells(i,j).Value;
	     }
	     else
	     {
	          arrVal[i-2][j-1] ="";
	     }
	    }
	    if (!objSheet.Cells(i+1,1).Value) i = -1; 
	   }
	   var strSql ="";
	   for (var i=0;i<arrVal.length;i++)
	   {
	      if(strSql != '') strSql+="<_cut_/>";
	      strSql += "INSERT INTO sysadm.xsalon_exposants";
	      strSql +="(exposant,cosa0_nrid)"
	      strSql +=" VALUES ('"+arrVal[i][0]+"',"+vSalon +")";
	   }
	   ///alert(strSql )
	 
	   var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [strSql],'','',true);
	
	
	   strSql  = "update SYSADM.xsalon_exposants set xsalon_exposants.so0_nrid  =  soTest.nrid from sysadm.xsalon_exposants as xsalon_exposants inner join sysadm.soTest as soTest  on lower(xsalon_exposants.exposant) = lower(soTest.societe)  and xsalon_exposants.cosa0_nrid ="+vSalon ;
	   //var strResultat = top.MyApp._gfctExtReq(strSql);
	   var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [strSql],'','',true);
	alert(strResultat )
	   top.MyApp.fraMenuBar.Execute("T_Refresh");
	   //Liberation de la mémoire
	   objExcel.application.quit();
	   objExcel.quit();
	   delete objExcel;
	   delete objBook;
	   delete objSheet;
	}
	 
		return true;
}