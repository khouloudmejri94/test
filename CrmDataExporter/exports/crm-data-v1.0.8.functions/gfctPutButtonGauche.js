function(pvLogicalName,pvFunction,pvSize,pbReadOnly,pvLibelle)
{
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) 
	{
	 _oCurWnd = top.MyData_View; 
	}
	else
	{
	 _oCurWnd = top.MyApp.wizardWindow; 
	}
		try{
	 if(top.MyApp.CurrentSetting.nChapMode == "Open"){
	  if (hndl=top.MyApp.FindItem(pvLogicalName, _oCurWnd)){
	    if ( pvLibelle == '' || pvLibelle == undefined ) pvLibelle='...';
	    if (pbReadOnly) hndl.readOnly = true;
	    Cell=hndl.parentNode;
	
	
	    if(top.MyApp.CurrentSetting.bConsultMode || hndl.disabled == true){
	        Cell.innerHTML = '<BUTTON class=inputBtn value="'+pvLibelle+'"  onclick="'+pvFunction+'" id="'+pvLogicalName+'Btn" name="'+pvLogicalName+'"Btn>'+pvLibelle+'</BUTTON>'+Cell.innerHTML;
	        top.MyApp.SetItemAttribute( pvLogicalName+'Btn', "style.marginLeft", "10px", _oCurWnd);
	    }
	  }
	 }
	}catch(e){
	     alert(e.message);
	}
}