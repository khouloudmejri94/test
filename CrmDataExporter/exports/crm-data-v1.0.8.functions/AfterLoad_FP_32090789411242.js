function()
{
	
	if(top.MyApp.CurrentSetting.nChapMode == "Open")
	{
	     top.MyApp.SetItem("ReqExtCommentaireSuivi", "className",""); 
	     top.MyApp.SetItem("ReqExtCommentaireSuivi", "style.height","154px");   
	    
	        if((top.MyApp.GetItemValue("ReqStatus"))=="Clos")
	          {
	             var vSQL = "SELECT XCOMMENTAIRE_SUIVI FROM sysadm.cal0  where nrid = '"+top.MyApp.GetItemValue("ReqNRID")+"' ";
	             var arrRes = top.MyApp._gfctExtReq(vSQL);
	             top.MyApp.SetItemValue("ReqExtCommentaireSuivi",arrRes); 
	          }
	
	     if(top.MyApp.UserSetting.User.ProfileInitials=="LTG" || top.MyApp.UserSetting.User.ProfileInitials=="ADMF" || top.MyApp.UserSetting.User.ProfileInitials=="ADMT")
	     {
	         var vField = top.MyApp.FindItem("ReqExtCommentaireSuivi");
	          vField.readOnly = false;
	     }else
	     {
	          var vField = top.MyApp.FindItem("ReqExtCommentaireSuivi");
	          vField.readOnly = true;
	     }
	
	}
}