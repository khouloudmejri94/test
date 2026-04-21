function WS_Cpy_Frs_Exclude(p_XML)
{
	var objReq = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    try {
	        var vRetour = "";
	        var WSretour = "";
	        var MyXmlDoc = InitXml(p_XML);
	        var MyRows: System.Xml.XmlNodeList = FindItem("ZST_FRN_EXCL", MyXmlDoc, true);
	        var NbrOfRows = MyRows.Count;
	        if (NbrOfRows == 0) {
	            return "XML Error: HAS - No Supplier to be inserted.";
	        } else {
	            for (var i = 0; i < NbrOfRows; i++) {
	                var vZNRID = MyRows[i].SelectNodes("NRID")[0].InnerText;
	                var vZPAYS = MyRows[i].SelectNodes("PAYS")[0].InnerText;
	                var vZSIRET = MyRows[i].SelectNodes("NSIRET")[0].InnerText;
	                // vérifier le frs dans la base fournisseur
	                var vSQL = "select count(nrid) Fcount from sysadm.v_so0 where template is null and xsiret = '" + vZSIRET + "' and xsiret != '' and pays = 'FR- FRANCE'";
	                var MyResults = objReq.ExecuteSql(vSQL);
	                var oXmlRes = InitXml(MyResults);
	                var oRows = FindItem("Flds", oXmlRes, true);
	                var NbRows = oRows.Count;
	                if (oRows.Count > 0) {
	                    var vcount = GetItemValue("Fcount", oRows[0]);
	                    if (vcount > 0) {
	                        vRetour += vZNRID + "E";
	                    } else {
	                        var vSQL = "SELECT top 1 foreign_nrid as FNRID, siret as FSIRET from x_frs_exclude where foreign_nrid = '" + vZNRID + "'";
	                        var MyResults = objReq.ExecuteSql(vSQL);
	                        var oXmlRes = InitXml(MyResults);
	                        var oRows = FindItem("Flds", oXmlRes, true);
	                        if (oRows.Count > 0) {
	                            var vFNRID = GetItemValue("FNRID", oRows[0]);
	                            var vFSIRET = GetItemValue("FSIRET", oRows[0]);
	                            if (vZSIRET != vFSIRET) {
	                                var strSQL = "UPDATE x_frs_exclude set Siret = '" + vZSIRET + "' where foreign_NRID = '" + vZNRID + "'";
	                                objReq.ExecuteSql(strSQL);
	                            }
	                        } else {
	                            var strSQL = "INSERT INTO x_frs_exclude (foreign_NRID, Siret, Pays)" +
	                                " VALUES ('" + vZNRID + "','" + vZSIRET + "','" + vZPAYS + "')";
	                            objReq.ExecuteSql(strSQL);
	                        }
	                        vRetour += vZNRID + "S";
	                    }
	                }
	            }
	            WSretour += "WS_OK" + vRetour.substring(0, 1000);
	        }
	        var vReqInsertLog = "insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('ZcrmFrsExclude', '" + NbrOfRows + "' + ' suppliers to be inserted', '" + WSretour.replace(/'/g, "''") + "', '" + p_XML + "' , getdate()) ";
	        objReq.ExecuteSql(vReqInsertLog);
	    } catch (e) {
	        return strSQL + e.description;
	    } finally {
	        FreeSelligentObject(objReq);
	        objReq.Dispose();
	    }
	    return WSretour;
}