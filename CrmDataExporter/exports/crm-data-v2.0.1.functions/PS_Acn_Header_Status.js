function PS_Acn_Header_Status()
{
	/// HAS DEB 15/08/2023 - si POPO annulée alors champ motif annulation obligatoire
	//if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	    var vNature = top.MyApp.GetItemValue("AcnNature");
	    var vStatut = top.MyApp.GetItemValue("AcnStatus");
	
	    if (vNature == 'PROPO' && vStatut == 'ANNULE') {
	        top.MyApp._gfctSetClassName("AcnExtRaisdes", "NM");
	    } else {
	        top.MyApp._gfctSetClassName("AcnExtRaisdes", "UM");
	    }
	//}
	/// HAS DEB 15/08/2023 - si POPO annulée alors champ motif annulation obligatoire
}