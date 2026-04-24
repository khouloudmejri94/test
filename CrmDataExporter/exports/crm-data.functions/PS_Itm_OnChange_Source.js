function PS_Itm_OnChange_Source()
{
	var vSource = top.MyApp.GetItemValue("ItmExtSource", top.MyData_View);
	console.log("Source de consigne #"+vSource+"#");
	if (vSource == "NEWSLETTER") {
	    top.MyApp.SetItem("ItmExtNewsletter", "style.visibility", "", top.MyData_View);
	    top.MyApp.SetItem("ItmExtNewsletter", "parentElement.previousSibling.style.visibility", "");
	    top.MyApp.SetItem("ItmExtNewsletterBtn", "style.visibility", "", top.MyData_View);
	    top.MyApp._gfctSetClassName("ItmExtNewsletter", "NM");
	} else {
	    top.MyApp.SetItem("ItmExtNewsletter", "style.visibility", "hidden", top.MyData_View);
	    top.MyApp.SetItem("ItmExtNewsletter", "parentElement.previousSibling.style.visibility", "hidden");
	    top.MyApp.SetItem("ItmExtNewsletterBtn", "style.visibility", "hidden", top.MyData_View);
	    top.MyApp._gfctSetClassName("ItmExtNewsletter", "UM");
	}
}