function PS_App_FicheSalon_MNG()
{
	try
	  {
	   top.MyApp.OpenDlg("41678393427760",'','',true,'','resizable:yes; titlebar:no; status:no; help:no; minimize:yes');
	   top.MyApp.OpenData_View("Cpy");
	  } catch(e) {
	   alert(e.desciption);
	  }
}