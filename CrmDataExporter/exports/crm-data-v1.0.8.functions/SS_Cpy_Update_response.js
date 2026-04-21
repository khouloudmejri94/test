function(nCpyNrid,response)
{
	try{
	    var MyObj = CreateSelligentObject("Company" , CurrentSessionID , false);
	    MyObj.Open(vNrid);
	    var mySelectionRow = new SelectionRow();
	    mySelectionRow.Fields["ExtSpplrAccssResponse"] = response;
	    MyObj.SetAndSave(mySelectionRow);
	    return res;
	
	}catch(e){
	    return e.message;
	}
}