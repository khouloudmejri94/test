function()
{
	//PS_Quo_2ndOrderReq
	//SAI DEB : 27-03-2026  : ADD CONDITION FOR REQUEST SECOND ORDER////
	
	var vMode       = top.MyApp.CurrentSetting.nChapMode;
	
	if (vMode != 'Reset') {
	    console.log("Button Clicked:", top.MyApp.FindItem("Sht43600557650138"));
	                top.MyApp._gfctSetClassName("QuoExtSRReqComment", "NM");
	
	}
}