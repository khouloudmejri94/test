function Global_s_CreationBindVariable(p_logicname,p_value)
{
	var MySession = CreateSelligentObject("Session");
	    MySession.Init(CurrentSessionID);
	    MySession.SetBindValue(p_logicname, p_value);
	    FreeSelligentObject(MySession);
	    MySession.Dispose();
}