function()
{
	
	var vStatus = top.MyApp.GetItemValue("ReqStatus");
	if(vStatus == 'Clos'){
	     top.MyApp.SetItemValue("ReqStatus",'Ouvert');
	
	     top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	     top.MyApp.fraMenuBar.Execute("R_Edit");
	     top.MyApp.fraMenuBar.Execute("R_Save");
	     top.MyApp.fraMenuBar.Execute("T_Refresh");
	}
}