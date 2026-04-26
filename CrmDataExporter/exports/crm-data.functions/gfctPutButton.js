function _gfctPutButton(pvLogicalName,pvFunction,pvSize,pbReadOnly,pvLibelle)
{
	// -----------------------------------------------------------------------------------------------------------------
	// Date        :     30/05/2012
	// Auteur      :     CCO
	// Description :     Rajoute un bouton a un champ  avec une fonction et une largeur
	// Paramètres  :     pvLogicalName   -->   nom logique du champ ou l'on ajoute le bouton
	//                   pvFunction      -->   nom de la fonction à appeler sur le click du bouton
	//                   pvSize          -->   Largeur du bouton en %
	//                   pbReadonly      -->   le champ doit il passer en readonly ?
	//                   pvLibelle       -->   libelle du champ
	// -----------------------------------------------------------------------------------------------------------------
		var _oCurWnd;
	if (!top.MyApp.wizardWindow) 
	{
	 _oCurWnd = top.MyData_View; 
	}
	else
	{
	 _oCurWnd = top.MyApp.wizardWindow; 
	}
		if (hndl=top.MyApp.FindItem(pvLogicalName, _oCurWnd))
	{
	 if ( pvLibelle == '' || pvLibelle == undefined ) pvLibelle='...';
	  if (pbReadOnly) hndl.readOnly = true ;
	  Cell=hndl.parentNode;
	  if(top.MyApp.CurrentSetting.bConsultMode  &&   top.MyApp.CurrentSetting.nChapMode == "Open" && _oCurWnd != top.MyApp.wizardWindow ) 
	  {
	     return true;
	  }
	
	  if ( pvSize=='' )
	  {
	     top.MyApp.SetItemAttribute( pvLogicalName , "style.borderRight", "white 17px solid", _oCurWnd);
	     Cell.innerHTML = Cell.innerHTML+'<BUTTON class=inputBtn value="'+pvLibelle+'" onclick="'+pvFunction+'" id="'+pvLogicalName+'Btn" name="'+pvLogicalName+'"Btn >'+pvLibelle+'</BUTTON>';
	  }
	  else
	  {
	     hndl.className='borderRight';
	     hndl.style.width=eval(100-pvSize)+'%';
	     Cell.innerHTML = Cell.innerHTML+'<BUTTON class=ShtsButton value="'+pvLibelle+'"  onclick="'+pvFunction+'" id="'+pvLogicalName+'Btn" name="'+pvLogicalName+'"Btn>'+pvLibelle+'</BUTTON>';
	     top.MyApp.FindItem(pvLogicalName+'Btn', _oCurWnd).style.width=pvSize+'%';
	  }
	}
	else { return false ; }
	
	return true;
		return true;
}