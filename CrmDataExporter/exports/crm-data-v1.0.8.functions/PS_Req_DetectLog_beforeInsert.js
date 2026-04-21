function()
{
	if(top.MyApp.GetItemValue("ReqExtDateEvtLog") != "")
	    top.MyApp.SetItemValue("ReqExtDateEvtLog", DateTime.Now.ToString("dd/MM/yyyy"));
}