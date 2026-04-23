function Get_Session_Info()
{
	try {
	    var vDBName=CurrentDatabase
	    var SessionObj = CreateSelligentObject("Selligent");
	    if (SessionObj) {
	        Selligent.Library.Monitor.Tracer.Write("SessionObj Created");
	    }
	    //var SessionInfo = SessionObj.Login(vDBName, "hich", "Inf$77$oz", "");
	    var SessionInfo = SessionObj.Login();
	
	    return SessionInfo;
	
	    } catch (ex) {
	         
	        var vRetour = "ERROR|" + ex.toString();
	        Selligent.Library.Monitor.Tracer.Write(vRetour);
	        return vRetour;
	
	    }
}