function PS_App_Fiche_Salon()
{
	try
	  {
	   top.MyApp.OpenDlg("41242164544440",'','',true,'','resizable:yes; titlebar:no; status:no; help:no; minimize:yes');
	   top.MyApp.OpenData_View("Cpy");
	  } catch(e) {
	   alert(e.desciption);
	  }
}