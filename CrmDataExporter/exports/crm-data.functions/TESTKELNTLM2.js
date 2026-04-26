function __TESTKELNTLM2()
{
	var  myclass = new SPNOZ();
	var res = myclass.CpyToSP("http://srv-crmdev-sell/CR_NOZ.doc", "http://srv-crmprd-bi/crm/affaires/118150/modeletestcr.doc", "adm_selligent", "Masao@2012", "ra_expansion");
	return "Retour : " + res;
}