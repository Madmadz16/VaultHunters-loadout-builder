import type { SavedGearProps } from '../components/GearMaker';

type SlotsState = { [key: number | string]: SavedGearProps | null };

const defaultStats: Record<string, number> = {
	'ability power': 0,
	'area of effect': 0,
	armor: 0,
	'assassin damage': 0,
	'attack damage': 0,
	'attack range': 0,
	'attack speed': 0,
	'block chance': 0,
	'chaining attack': 0,
	'champion damage': 0,
	'cooldown reduction': 0,
	copiously: 0,
	'crit hit resistance': 0,
	'double damage chance': 0,
	'dungeon damage': 0,
	'durability damage reduction': 0,
	'effect duration': 0,
	'fruit efficiency': 0,
	'healing efficiency': 0,
	health: 0,
	'heart frag chance': 0,
	'horde damage': 0,
	'item quantity': 0,
	'item rarity': 0,
	'knockback resist': 0,
	'lucky hit chance': 0,
	mana: 0,
	'mana regen': 0,
	'mining speed': 0,
	reach: 0,
	resistance: 0,
	'shacking hit chance': 0,
	'soul quantity': 0,
	'stun attack chance': 0,
	'sweeping hit chance': 0,
	'thorns damage': 0,
	'trap disarm chance': 0,
};

const normalizeAttribute = (attribute: SavedGearProps['baseAttributes'][number], dict: string[]) => {
	const [typeIndex, value] = attribute;
	return [dict[typeIndex] ?? String(typeIndex), value] as const;
};

export function calculateStatsForSlots(
	slots: SlotsState,
	equippedSlotId: number | null,
	globalDict: string[]
): { name: string; power: string }[] {
	const allStats: Record<string, number> = { ...defaultStats };

	Object.entries(slots).forEach(([slotKey, gear]) => {
		if (!gear) return;

		const isHotbarSlot = /^\d+$/.test(slotKey);
		if (isHotbarSlot && (equippedSlotId === null || Number(slotKey) !== equippedSlotId)) return;

		[
			...gear.baseAttributes,
			...(gear.implicitAttributes || []),
			...(gear.prefixAttributes || []),
			...(gear.suffixAttributes || []),
		].forEach((attribute) => {
			const [typeName, value] = normalizeAttribute(attribute, globalDict);
			const normalizedType = typeName.toLowerCase();
			if (typeof value === 'number' && normalizedType in allStats) {
				allStats[normalizedType] += value;
			}
		});
	});

	return Object.entries(allStats).map(([name, power]) => ({
		name: name.replace(/\b\w/g, (char) => char.toUpperCase()),
		power: power.toString(),
	}));
}
