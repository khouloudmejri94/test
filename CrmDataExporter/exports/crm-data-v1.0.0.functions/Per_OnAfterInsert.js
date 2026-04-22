function Per_OnAfterInsert()
{
	if(top.MyApp._gfctGetModeChap() != 'Reset')
	{
	  var oMail = top.MyApp.FindItem("PerCpyEmailAddress");
	  if(oMail)
	  {
	    var vMail = top.MyApp.GetItemValue("PerCpyEmailAddress");
	    if(vMail == '' && vMail == '')
	    {
	      top.MyApp._gfctSetClassName("PerCpyEmailAddress" , "M");
	      top.MyApp.AppSetting.Per.Catalog.PerCpyEmailAddress.Mn = 1;
	    }
	    else if(vMail.toUpperCase() == 'N@N.fr')
	    {
	      top.MyApp._gfctSetClassName("PerCpyDirectFaxNbr" , "M");
	      top.MyApp.AppSetting.Per.Catalog.PerCpyDirectFaxNbr.Mn = 1;
	    }
	    else
	    {
	      top.MyApp._gfctSetClassName("PerCpyDirectFaxNbr" , "B");
	      top.MyApp.AppSetting.Per.Catalog.PerCpyDirectFaxNbr.Mn = -1;
	      top.MyApp._gfctSetClassName("PerCpyEmailAddress" , "B");
	      top.MyApp.AppSetting.Per.Catalog.PerCpyEmailAddress.Mn = -1;
	    }
	    
	    oMail.onchange = function() 
	    {
	      var vMail = top.MyApp.GetItemValue("PerCpyEmailAddress");
	      if(vMail == '' && vMail == '')
	      {
	        top.MyApp._gfctSetClassName("PerCpyEmailAddress" , "M");
	        top.MyApp.AppSetting.Per.Catalog.PerCpyEmailAddress.Mn = 1;
	      }
	      else if(vMail.toUpperCase() == 'N@N.fr')
	      {
	        top.MyApp._gfctSetClassName("PerCpyDirectFaxNbr" , "M");
	        top.MyApp.AppSetting.Per.Catalog.PerCpyDirectFaxNbr.Mn = 1;
	      }
	      else
	      {
	        top.MyApp._gfctSetClassName("PerCpyDirectFaxNbr" , "B");
	        top.MyApp.AppSetting.Per.Catalog.PerCpyDirectFaxNbr.Mn = -1;
	        top.MyApp._gfctSetClassName("PerCpyEmailAddress" , "B");
	        top.MyApp.AppSetting.Per.Catalog.PerCpyEmailAddress.Mn = -1;
	      }
	    }
	  }
	}
		return true;
}