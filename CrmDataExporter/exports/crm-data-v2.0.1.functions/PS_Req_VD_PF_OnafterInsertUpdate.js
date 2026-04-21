function PS_Req_VD_PF_OnafterInsertUpdate()
{
	var dtCreation   = top.MyApp.GetItemValue("ReqExtDateEvtLog");
	var vChampLitige = ""
	var Madate       = new Date()
	var DateJour     = top.MyApp.fctFormatDate(Madate, top.MyApp.SYSTEM_DATE , top.MyApp.USER_DATE , "DATE" );
	var nReqNRID     = top.MyApp.GetItemValue("ReqNRID");
	if(dtCreation =="")
	{
	 vChampLitige = "ReqExtDateEvtLog<_cut1_/>"+DateJour;
	}
	else
	{
	 vChampLitige = "ReqExtDateDerModifLog<_cut1_/>"+DateJour;
	}
	var res = top.MyApp.GetItemValue("ReqExtStatutSuivi");
	if(res == "")
	{
	    if(nReqNRID)
	    {
	        vChampLitige = "<_cut_/>ReqExtStatutSuivi<_cut1_/>A faire";
	    }
	}
	var res      = top.MyApp.ExecuteServerScript( 30939617252556, [nReqNRID,vChampLitige]);
	top.MyApp.fraMenuBar.Execute("T_Refresh");
}