function Menu_O_A_TasksPanel(){	
	top.MyApp.$("#divTasks", top.MyApp.fraData_View.fraData.document).show("fast", function(){
	        top.MyApp.fraData_View.fraData.CustomAccordion(document.getElementById("LabelTasks"), true);        
	        top.MyApp.$("#LabelTasks", top.MyApp.fraData_View.fraData.document).trigger("click");
	        top.MyApp.fctRemoveWorkspaceItem("Org_HideTasksPanel");
	    });
}