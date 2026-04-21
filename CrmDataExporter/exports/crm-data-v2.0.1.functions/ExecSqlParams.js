function ExecSqlParams(vQuery,vParams)
{
	//ExecSqlParams
	//var vQuery = "SELECT so0.nrid as CpyNRID from sysadm.v_so0 so0 where template is null and societe like '" + nrFrn + "'  ";
	var vSqlParams = [];
	    for (var i = 0; i < vParams.length; i++) {
	        var vSqlParamObj = new System.Data.SqlClient.SqlParameter(vParams[i][0], vParams[i][1]);
	        vSqlParamObj.Direction = System.Data.ParameterDirection.Input;
	        vSqlParams.push(vSqlParamObj);
	    }
	    return Selligent.Application.Data.QueryHelper.ExecuteDataTable(System.Data.CommandType.Text, vQuery, vSqlParams);
	
	//return "Hello ExecSqlParams vQuery is : " + vQuery + " -- AND first on vParams is : " + vParams[0][1];
	
	//return "Hello ExecSqlParams vQuery is : " + vQuery;
}