function AfterLoad_FP_30142015202848()
{
	if(top.CurrentSetting.nChapMode!="Reset")
	{
	    var arrChampDC = ["ReqExtCodePostal","ReqExtNomFourn","ReqExtVille","ReqExtAdresse1","ReqExtAdresse2","ReqExtPays","ReqExtPays"];
	
	    if(top.MyApp.UserSetting.User.ProfileInitials!="LTG" && top.MyApp.UserSetting.User.ProfileInitials!="ADMF"  && top.MyApp.UserSetting.User.ProfileInitials!="ADMFT" && top.MyApp.UserSetting.User.ProfileInitials!="ADMT")
	    {
	        for(var i=0 ; i<arrChampDC.length; i++)
	        {
	            top.MyApp.CurrentSetting.Catalog[arrChampDC[i]].Ed=-1
	            var objchamp = top.MyApp.FindItem(arrChampDC[i],top.MyData_View);
	            if(objchamp ) objchamp.disabled = true
	            top.MyApp.SetItemAttribute(arrChampDC[i] ,"className","disable" ,top.MyData_View);
	        }
	    }
	    else
	    {
	        for(var i=0 ; i<arrChampDC.length; i++)
	        {
	            top.MyApp.CurrentSetting.Catalog[arrChampDC[i]].Ed=1
	        }
	    } 
	}
}