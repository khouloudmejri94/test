function AcnSynchroBeforeImport()
{
	if (CurrentChannel.ChapterLN == "Acn") { 
	Selligent.Library.Monitor.Tracer.Write(CurrentItem.Operation);
	//if (CurrentItem.Operation) {
	     //CurrentItem.SetValue("AcnNature", "MAIL");
	     //CurrentItem.SetValue("AcnStatus", "A FAIRE");
	     //CurrentItem.SetValue("AcnType", "RELANCE");
	     //CurrentItem.SetValue("AcnObject", "CLASSIQUE");
	     CurrentItem.SetValue("AcnCreationDate", System.DateTime.Now);
	//}
	}
}