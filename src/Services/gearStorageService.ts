import type { SavedGearProps } from '../components/GearMaker';

const SAVED_GEAR_ITEMS_KEY = 'savedGearItems';
const SAVED_GEAR_DICT_KEY = 'savedGearDict';

export function getSavedGearItems(): SavedGearProps[] {
	return JSON.parse(localStorage.getItem(SAVED_GEAR_ITEMS_KEY) || '[]');
}

export function setSavedGearItems(items: SavedGearProps[]): void {
	localStorage.setItem(SAVED_GEAR_ITEMS_KEY, JSON.stringify(items));
}

export function getSavedGearDict(): string[] {
	return JSON.parse(localStorage.getItem(SAVED_GEAR_DICT_KEY) || '[]');
}

export function setSavedGearDict(dict: string[]): void {
	localStorage.setItem(SAVED_GEAR_DICT_KEY, JSON.stringify(dict));
}

export function appendSavedGearItem(item: SavedGearProps): void {
	const existingItems = getSavedGearItems();
	existingItems.push(item);
	setSavedGearItems(existingItems);
}

export function getOrCreateDictIndex(dict: string[], attributeName: string): number {
	const existingIndex = dict.findIndex((item) => item === attributeName);
	if (existingIndex !== -1) return existingIndex;
	dict.push(attributeName);
	return dict.length - 1;
}

export function filterSavedGearByType(type: string | null): SavedGearProps[] {
	if (!type) return [];
	return getSavedGearItems().filter((gear) => gear.type.toLowerCase() === type.toLowerCase());
}
