function(pSo0_nrid,pOffer,pAcces_Status,pDate_Req_Exp,pDate_Val_Dir,pDate_Valid_BO,pUser_Req_Exp,pUser_Val_Dir,pUser_Valid_BO,pValid_GiZone,pVal_Dir,pRemark)
{
	//SS_Cpy_InstUpdt_Access_Agexp
	//NRID : 42101748424248
	//Param : pSo0_nrid,pDc0_nrid,pOffer,pAcces_Status,pDate_Req_Exp,pDate_Val_Dir,pDate_Valid_BO,pUser_Req_Exp,pUser_Val_Dir,pUser_Valid_BO,pValid_GiZone,pVal_Dir,pRemark
	//HAS DEB  - 2025-02-11 : insert or update access request for an export agent
	try {
	    var WSretour = "";
	    var objReq = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    
	    var vSQL = "select top 1 nrid from dc0 where template is null and vos_ref= '" + pOffer + "' ";
	    var MyResults = objReq.ExecuteSql(vSQL);
	    var oXmlRes = InitXml(MyResults);
	    var oNodes = FindItem("Flds", oXmlRes, true);
	    if (oNodes.Count > 0) {
	        var pdc0_nrid = GetItemValue("QuoNRID", oNodes[0]);
	    }
	
	    var Part_Req_Exp = pDate_Req_Exp.substring(0,10).split("/");
	    var fDate_Req_Exp = Part_Req_Exp[2] + "-" + Part_Req_Exp[1] + "-" + Part_Req_Exp[0];
	
	    var Part_Val_Dir = pDate_Val_Dir.substring(0,10).split("/");
	    var fDate_Val_Dir = Part_Val_Dir[2] + "-" + Part_Val_Dir[1] + "-" + Part_Val_Dir[0];
	
	    var Part_Valid_BO = pDate_Valid_BO.substring(0,10).split("/");
	    var fDate_Valid_BO = Part_Valid_BO[2] + "-" + Part_Valid_BO[1] + "-" + Part_Valid_BO[0];
	
	    //Insert new row on table x_access_agexp
	    var strSQL = "INSERT INTO sysadm.x_access_agexp " +
	    "(Acces_Status " +
	    ",Date_Req_Exp " +
	    ",Date_Val_Dir " +
	    ",Date_Valid_BO " +
	    ",dc0_nrid " +
	    ",Offer " +
	    ",so0_nrid " +
	    ",User_Req_Exp " +
	    ",User_Val_Dir " +
	    ",User_Valid_BO " +
	    ",Valid_GiZone " +
	    ",ValDirExport " +
	    ",Remarque " +
	    ") " +
	    " VALUES " +
	    "('" + pAcces_Status + "' " +
	    ",'" + fDate_Req_Exp + "' " +
	    ",'" + fDate_Val_Dir + "' " + 
	    ",'" + fDate_Valid_BO + "' " +
	    ",'" + pdc0_nrid + "' " +
	    ",'" + pOffer + "' " +
	    ",'" + pSo0_nrid + "' " +
	    ",'" + pUser_Req_Exp + "' " +
	    ",'" + pUser_Val_Dir + "' " +
	    ",'" + pUser_Valid_BO + "' " +
	    ",'" + pValid_GiZone + "' " +
	    ",'" + pVal_Dir + "' " +
	    ",'" + pRemark + "' " +
	    ") "
	    WSretour = objReq.ExecuteSql(strSQL);
	    return WSretour;
	} catch (e) {
	    WSretour = "HAS - Error inserting Export Agent access request - " + e;
	} finally {
	    objReq.Dispose();
	    FreeSelligentObject(objReq);
	    return WSretour;
	}
}