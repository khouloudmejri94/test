function(pUser,pFamille,pCountry)
{
	//SS_Cpy_Check_Pln_Mng
	// NRID : 42798853598940
	// Param : pUser,pFamille,pCountry
	
	try {
	  var vToday = DateTime.Now.ToString("dd/MM/yyyy");
	  //var vPRange = CurrentRecord["CpyExtFamilleProd"];
	  //var vCountry = CurrentRecord["CpyAddr1Country"];
	  var isOkPr, isOkCn;
	  var vControl = 0;
	  var MySql = CreateSelligentObject("SqlHelper", CurrentSessionID);
	  var strSQL = "SELECT pl.date_start as dStart, pl.date_end dEnd, p_range as pRange, country as country ";
	  strSQL += " from sysadm.x_mng_src pl where ";
	  strSQL += " pl.users = '" + pUser + "' ";
	  strSQL += " and cast(getdate() as date) BETWEEN pl.date_start and pl.date_end ";
	
	  var res = MySql.ExecuteSql(strSQL);
	
	  var MyXmlDoc = InitXml(res);
	  var MyRows = FindItem("Flds", MyXmlDoc, true);
	  for (var i = 0; i < MyRows.Count; i++) {
	    var pStart = GetItemValue("dStart", MyRows[i]);
	    var pEnd = GetItemValue("dEnd", MyRows[i]);
	    var pPRange = GetItemValue("pRange", MyRows[i]);
	    var pCountry = GetItemValue("country", MyRows[i]);
	
	    if (pPRange != 'ND') {
	      if (pPRange == pFamille) {
	        isOkPr = 1;
	      } else {
	        isOkPr = 0;
	      }
	    } else {
	      isOkPr = 2;
	    }
	
	    if (pCountry != 'ND') {
	      if (pCountry == pCountry) {
	        isOkCn = 1;
	      } else {
	        isOkCn = 0;
	      }
	    } else {
	      isOkCn = 2;
	    }
	
	    if (vToday >= pStart || vToday <= pEnd) {
	      if ((isOkPr == 1 || isOkPr == 2) && (isOkCn == 1 || isOkCn == 2)) {
	        vControl += 1;
	      }
	    }
	  }
	  /* if (vControl > 0) {
	    CurrentRecord["CpyExtValidSrc"] = 'Initial';
	  } */
	  return vControl;
	} catch (e) {
	  return "HAS - Error on SS_Cpy_Check_Pln_Mng Initial : " + e;
	} finally{
	  MySql.Dispose();
	  FreeSelligentObject(MySql);
	  return vControl;
	}
}