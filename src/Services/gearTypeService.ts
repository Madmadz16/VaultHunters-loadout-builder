import type { GearType } from '../gear_modifiers/gearDefinitions';

const hotbarTypes = ['sword', 'axe'];
const offhandTypes = ['shield', 'wand', 'magnet', 'focus'];

export function getFilterType(type: GearType): string {
	const normalizedType = type.toLowerCase();
	if (hotbarTypes.includes(normalizedType)) return 'hotbar';
	if (offhandTypes.includes(normalizedType)) return 'offhand';
	return type;
}

export function getTotalAttributes(type: GearType): number {
	const baseAttributes = 6;
	const isOffhand = offhandTypes.includes(type.toLowerCase());
	return baseAttributes - (isOffhand ? 1 : 0);
}
