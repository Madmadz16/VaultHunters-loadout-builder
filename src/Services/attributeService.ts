import type {
	AbilityChangeValue,
	AttributeDefinition,
	EffectChanceValue,
	PotionEffectValue,
	RangeValue,
} from '../gear_modifiers/gearDefinitions';
import type { SavedGearProps } from '../components/GearMaker';

const romanMap: Record<string, number> = {
	I: 1,
	II: 2,
	III: 3,
	IV: 4,
	V: 5,
	VI: 6,
	VII: 7,
	VIII: 8,
	IX: 9,
	X: 10,
};

export function romanToNumber(roman: string): number {
	return romanMap[roman] || 1;
}

export function getRangeForLevel(attr: AttributeDefinition, level: number) {
	const applicable = attr.tiers.filter(
		(t) => t.minLevel <= level && (t.maxLevel === -1 || t.maxLevel >= level)
	);

	const numericTiers = applicable
		.filter((t) => 'min' in t.value && 'max' in t.value && 'step' in t.value)
		.map((t) => t.value as RangeValue);

	if (numericTiers.length > 0) {
		const { min, max, step } = numericTiers[0];
		return { min, max, step };
	}

	const potionEffectTiers = applicable
		.filter((t) => 'tooltipDisplayName' in t.value && 'potion' in t.value)
		.map((t) => t.value as PotionEffectValue);

	if (potionEffectTiers.length > 0) {
		const parsedPotionEffects = potionEffectTiers.map((tier) => {
			const match = tier.tooltipDisplayName.match(/(?:\s|^)([IVXLCDM]+)$/);
			return match ? romanToNumber(match[1]) : 1;
		});

		return {
			max: Math.max(...parsedPotionEffects),
			min: Math.min(...parsedPotionEffects),
			step: 1,
		};
	}

	const abilityTiers = applicable
		.filter((t) => 'abilityKey' in t.value && 'levelChange' in t.value)
		.map((t) => t.value as AbilityChangeValue);

	if (abilityTiers.length > 0) {
		const parsedAbilityTiers = abilityTiers.map((tier) => tier.levelChange);
		return {
			max: Math.max(...parsedAbilityTiers),
			min: Math.min(...parsedAbilityTiers),
			step: 1,
		};
	}

	const effectChanceTiers = applicable
		.filter((t) => 'minChance' in t.value && 'maxChance' in t.value && 'step' in t.value)
		.map((t) => t.value as EffectChanceValue);

	if (effectChanceTiers.length > 0) {
		return {
			max: Math.max(...effectChanceTiers.map((v) => v.maxChance)),
			min: Math.min(...effectChanceTiers.map((v) => v.minChance)),
			step: effectChanceTiers[0].step,
		};
	}

	return null;
}

export function formatAttributeIdentifier(identifier: string): string {
	let label = identifier.replace(/^the_vault:(?:mod_|base_|u_)/, '').replace(/^u_/, '');
	label = label.replace(/_/g, ' ');
	if (/damage/i.test(label)) {
		label = label.replace(/damage/gi, '').trim();
		label = `${label} Damage`;
	}
	return label
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function formatSnakeLabel(label: string): string {
	return label
		.replace(/_/g, ' ')
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function normalizeSavedAttribute(
	attribute: SavedGearProps['baseAttributes'][number],
	dict: string[] = []
) {
	const [typeIndex, value] = attribute;
	return [dict[typeIndex] ?? String(typeIndex), value] as const;
}
