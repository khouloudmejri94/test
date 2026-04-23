function Get_Session_Info()
{
	try {
	    var vDBName=CurrentDatabase
	    var SessionObj = CreateSelligentObject("Login", CurrentSessionID);
	    var SessionInfo = SessionObj.Login(vDBName, "$WS", "", "");
	
	    return SessionInfo;
	
	    } catch (ex) {
	
	        vRetour = "ERROR|" + ex.toString();
	        Selligent.Library.Monitor.Tracer.Write(vRetour);
	
	    }
}