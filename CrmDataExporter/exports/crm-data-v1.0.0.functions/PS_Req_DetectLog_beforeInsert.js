function PS_Req_DetectLog_beforeInsert()
{
	if(top.MyApp.GetItemValue("ReqExtDateEvtLog") != "")
	    top.MyApp.SetItemValue("ReqExtDateEvtLog", DateTime.Now.ToString("dd/MM/yyyy"));
}