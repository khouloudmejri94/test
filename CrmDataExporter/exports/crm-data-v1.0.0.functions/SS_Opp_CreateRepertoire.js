function SS_Opp_CreateRepertoire(pRef)
{
	try
	{
	     var vRepertoireSP=Session["SHAREPOINT_DIR"];
	     //var vPath = "\\\\srv-data-cpt01.noz.local\\"+CurrentDatabase+"\\"+pRef;
	     var vPath = vRepertoireSP+"\\"+CurrentDatabase+"\\"+pRef;
	     System.IO.Directory.CreateDirectory(vPath );
	     return vPath ;
	}
	catch(e)
	{
	      //throw "   " +e.description;
	     //return e;
	}
}