function PS_Res_Header_Status()
{
	// ====================================================================
	// GI - Lot 2  #459
	// CBA - 11/01/2016
	// Check if the TeamName is 'GI' and make the GI Zone mandatory
	// ====================================================================
	
	var vTeam = top.MyApp.GetItemValue("ResTeamName");
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 top.MyApp.SetItem("ResExtGIZone", "parentElement.style.visibility", "visible", top.MyData_View);
	 top.MyApp.SetItem("ResExtGIZone", "parentElement.previousSibling.style.visibility", "visible", top.MyData_View);
	 if (vTeam == 'GI') {
	  //top.MyApp.SetItemAttribute("ResExtGIZone", "className", "Mandatory");
	  //top.MyApp.CurrentSetting.Catalog["ResExtGIZone"].Mn = 1;
	  top.MyApp._gfctSetClassName("ResExtGIZone", "NM");
	 } else {
	  top.MyApp.SetItemAttribute("ResExtGIZone", "className", "");
	  top.MyApp.CurrentSetting.Catalog["ResExtGIZone"].Mn = 0;
	 }
	}
}