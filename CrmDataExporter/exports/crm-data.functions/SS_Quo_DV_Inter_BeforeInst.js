function SS_Quo_DV_Inter_BeforeInst()
{
	CurrentRecord["ExtSoExtValideur"] = CurrentUserName;
	CurrentRecord["ExtSoExtStartDate"]= DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
}