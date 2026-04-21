function()
{
	/*
	14437: [Offre] - RG2.42 : Onglet Paiement Déposit - Détail de la demande déposit
	lors du clic sur le bouton demande de déposit :
	   1- Date de la demande de déposit prend la date système 
	   2- détail de la demande est un champ obligatoire à renseigner , Saisie par l'acheteur
	si la Date de la demande de déposit n'est pas vide rentre détail de la demande obligatoire
	le bouton demande déposit est désactivé si la date de la demande de déposte n'est pas vide
	*/
	var vPremDemDep = top.MyApp.GetItemValue("QuoExtDateDemDeposit");
	var vDernDemDep = top.MyApp.GetItemValue("QuoExtDateDemDepositDer");
	top.MyApp.FindItem("QuoExtDateDemDeposit").disabled = false;
	top.MyApp.CurrentSetting.Catalog.QuoExtDateDemDeposit.Ed = 1;
	top.MyApp.FindItem("QuoExtDateDemDepositDer").disabled = false;
	top.MyApp.CurrentSetting.Catalog.QuoExtDateDemDepositDer.Ed = 1;
	if(vPremDemDep == '' || vPremDemDep == null || vPremDemDep == undefined ){
	  top.MyApp.SetItemValue('QuoExtDateDemDeposit',new Date());
	}else {
	  top.MyApp.SetItemValue('QuoExtDateDemDepositDer',new Date());
	}
	//top.MyApp.SetItemValue('QuoExtDateDemDeposit',new Date());
	
	top.MyApp.FindItem("QuoExtDateDemDeposit").disabled = true;
	top.MyApp.CurrentSetting.Catalog.QuoExtDateDemDeposit.Ed = 0;
	top.MyApp.FindItem("QuoExtDateDemDepositDer").disabled = true;
	top.MyApp.CurrentSetting.Catalog.QuoExtDateDemDepositDer.Ed = 0;
	// HAS DEB - 25/03/2019 : purger le champ visuellement pour un autre commentaire
	top.MyApp.SetItemValue('QuoExtDetailsDem','');
	// HAS DEB - 25/03/2019 : desactiver le bouton demande
	top.MyApp.SetItemValue('QuoExtAppelDeposit','1');
	// HAS DEB - 25/03/2019 : vider le case champ envoyé
	top.MyApp.FindItem("QuoExtDepositEnvoye").disabled = false;
	top.MyApp.CurrentSetting.Catalog.QuoExtDepositEnvoye.Ed = 1;
	top.MyApp.SetItemValue('QuoExtDepositEnvoye','0');
	top.MyApp.FindItem("QuoExtDepositEnvoye").disabled = true;
	top.MyApp.CurrentSetting.Catalog.QuoExtDepositEnvoye.Ed = 0;
}