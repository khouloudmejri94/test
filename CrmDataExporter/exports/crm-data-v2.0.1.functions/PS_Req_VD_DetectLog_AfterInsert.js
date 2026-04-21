function PS_Req_VD_DetectLog_AfterInsert()
{
	var res = top.MyApp.GetItemValue("ReqExtStatutSuivi");
	var vChampLitige;
	var nReqNRID;
	if(res == "")
	{
	    nReqNRID = top.MyApp.GetItemValue("ReqNRID");
	    if(nReqNRID)
	    {
	        vChampLitige = "ReqExtStatutSuivi<_cut1_/>A faire";
	        top.MyApp.ExecuteServerScript(30939617252556, [nReqNRID,vChampLitige]);
	        top.MyApp.fraMenuBar.Execute("T_Refresh");
	    }
	}
}