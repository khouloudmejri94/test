function SQLReportServer(contextParam)
{
	var MySession = CreateSelligentObject("Session"); 
	MySession.Init(CurrentSessionID); 
	return MySession.SetBindValue("UdvReportBuilderParam",contextParam); 
	}