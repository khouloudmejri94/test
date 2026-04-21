function _gfctExectReqSrvMass(pvRequete)
{
	var objQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var xmlResult = "";
	    var vSepReq = "";
	    var TabReq = pvRequete.split("<_cut_/>");
	
	    try {
	        //xmlResult = TabReq.length;
	        for (var req = 0; req < TabReq.length; req++) {
	            if (TabReq[req] != "") {
	                try {
	                    xmlResult = xmlResult + vSepReq + objQuery.ExecuteSql(TabReq[req]);
	                } catch (e) {
	                    xmlResult = xmlResult + "<ERROR Val=\"" + e.message + "\"></ERROR>";
	                }
	                vSepReq = "<_cutreq_/>";
	            }
	        }
	    } catch (e) {
	        xmlResult = "<ERROR Val=\"" + e.message + "\"></ERROR>";
	    } finally {
	        if (objQuery) {
	            FreeSelligentObject(objQuery);
	            objQuery.Dispose();
	        }
	
	    }
	    return xmlResult;
		return true;
}