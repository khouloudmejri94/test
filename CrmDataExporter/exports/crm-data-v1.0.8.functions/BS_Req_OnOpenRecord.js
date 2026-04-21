function()
{
	// Récupération de l'ensemble des plateformes liées au Litige
	var objList = CreateSelligentObject("SelectionList", CurrentSessionID);
	var vSQL = "select ptf from sysadm.xdetection_logistique where template is null and cal0_nrid = " + CurrentRecord['ReqNRID'] + " order by ptf";
	objList.Open(0, -1, vSQL);
	var MyXml = objList.GetXml("AllFields");
	var MyXmlDoc = InitXml(MyXml);
	var MyNodes = FindItem("Flds", MyXmlDoc, true); 
	var arrPtf = [];
	// Stockage de l'ensemble des plateformes liées dans le tableau arrPtf
	if(MyNodes.Count > 0)
	{
	  for (var i = 0; i < MyNodes.Count; i++) 
	  {
	    arrPtf.push(GetItemValue("ExtDtctnLgstqPtf", MyNodes[i]));
	  }
	}
	// Mise à jour du champ masqué xplateforme utilisé dans la fusion de documents avec l'ensemble des plateformes liées concaténées
	var vPtf = arrPtf.join(' - ');
	if(arrPtf.length > 0 && CurrentRecord['ReqExtPlateforme'] != vPtf)
	{
	  CurrentRecord['ReqExtPlateforme'] = vPtf;
	}
		return true;
}