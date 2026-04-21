function _gfctMiseAJourCelluleExcel(Excel,CoordonneLettreChiffre,Valeur)
{
	Excel.Range(CoordonneLettreChiffre).Select;
	Excel.ActiveCell.FormulaR1C1 = Valeur ;
	return true;
}