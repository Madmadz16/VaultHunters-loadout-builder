import sword from './sword.json';
import axe from './axe.json';
import shield from './shield.json';
import focus from './focus.json';
import wand from './wand.json';
import magnet from './magnet.json';
import voidStone from './void_stone.json';
import helmet from './helmet.json';
import chestplate from './chestplate.json';
import leggings from './leggings.json';
import boots from './boots.json';
import velara from './idol_benevolent.json';
import idona from './idol_malevolence.json';
import tenos from './idol_omniscient.json';
import wendarr from './idol_timekeeper.json';

export type GearType =
	| 'Sword'
	| 'Axe'
	| 'Shield'
	| 'Focus'
	| 'Wand'
	| 'Magnet'
	| 'Void Stone'
	| 'Helmet'
	| 'Chestplate'
	| 'Leggings'
	| 'Boots'
	| 'God Idol';

export interface ModifierGroup {
	implicits: string[];
	prefixes: string[];
	suffixes: string[];
}

export interface RangeValue {
	min: number;
	max: number;
	step: number;
}

export interface FlagValue {
	flag: boolean;
}

export interface AbilityChangeValue {
	abilityKey: string;
	levelChange: number;
}

export interface PotionEffectValue {
	tooltipDisplayName: string;
	potion: string;
	additionalEffects: {
		effect: string;
		duration: number;
		amplifier: number;
		showParticles: boolean;
		showIcon: boolean;
	}[];
	duration: number;
	radius: number;
	color: number;
	affectsOwner: boolean;
	triggerChance: number;
}
export interface EffectChanceValue {
	effectKeys?: string[];
	effectKey?: string;
	name?: string;
	minChance: number;
	maxChance: number;
	step: number;
}

export type TierValue = RangeValue | FlagValue | AbilityChangeValue | PotionEffectValue | EffectChanceValue;

export interface Tier {
	minLevel: number;
	maxLevel: number;
	weight: number;
	value: TierValue;
}

export interface AttributeDefinition {
	attribute: string;
	group: string;
	identifier: string;
	tags?: string[];
	tiers: Tier[];
}

export interface RawModifierGroup {
	BASE_ATTRIBUTES: AttributeDefinition[];
	IMPLICIT?: AttributeDefinition[];
	PREFIX?: AttributeDefinition[];
	SUFFIX?: AttributeDefinition[];
	CRAFTED_PREFIX?: AttributeDefinition[];
	CRAFTED_SUFFIX?: AttributeDefinition[];
	CORRUPTED_IMPLICIT?: AttributeDefinition[];
}

export interface GearDefinition {
	ext: 'gif' | 'png';
	modifierGroup: RawModifierGroup;
	variants?: Record<string, RawModifierGroup>;
}

export interface RawModifierGroup {
	BASE_ATTRIBUTES: AttributeDefinition[];
	IMPLICIT?: AttributeDefinition[];
	PREFIX?: AttributeDefinition[];
	SUFFIX?: AttributeDefinition[];
	CRAFTED_PREFIX?: AttributeDefinition[];
	CRAFTED_SUFFIX?: AttributeDefinition[];
	CORRUPTED_IMPLICIT?: AttributeDefinition[];
}
function normalizeGroup(g: Partial<RawModifierGroup>): RawModifierGroup {
	return {
		BASE_ATTRIBUTES: g.BASE_ATTRIBUTES ?? [],
		IMPLICIT: g.IMPLICIT ?? [],
		PREFIX: g.PREFIX ?? [],
		SUFFIX: g.SUFFIX ?? [],
		CRAFTED_PREFIX: g.CRAFTED_PREFIX ?? [],
		CRAFTED_SUFFIX: g.CRAFTED_SUFFIX ?? [],
		CORRUPTED_IMPLICIT: g.CORRUPTED_IMPLICIT ?? [],
	};
}

export const gearDefinitions: Record<GearType, GearDefinition> = {
	Sword: { ext: 'gif', modifierGroup: normalizeGroup(sword.modifierGroup) },
	Axe: { ext: 'gif', modifierGroup: normalizeGroup(axe.modifierGroup) },
	Shield: { ext: 'png', modifierGroup: normalizeGroup(shield.modifierGroup) },
	Focus: { ext: 'png', modifierGroup: normalizeGroup(focus.modifierGroup) },
	Wand: { ext: 'png', modifierGroup: normalizeGroup(wand.modifierGroup) },
	Magnet: { ext: 'png', modifierGroup: normalizeGroup(magnet.modifierGroup) },
	'Void Stone': { ext: 'png', modifierGroup: normalizeGroup(voidStone.modifierGroup) },
	Helmet: { ext: 'gif', modifierGroup: normalizeGroup(helmet.modifierGroup) },
	Chestplate: { ext: 'gif', modifierGroup: normalizeGroup(chestplate.modifierGroup) },
	Leggings: { ext: 'gif', modifierGroup: normalizeGroup(leggings.modifierGroup) },
	Boots: { ext: 'gif', modifierGroup: normalizeGroup(boots.modifierGroup) },
	'God Idol': {
		ext: 'png',
		modifierGroup: normalizeGroup({
			BASE_ATTRIBUTES: [],
			IMPLICIT: [],
			PREFIX: [],
			SUFFIX: [],
			CRAFTED_PREFIX: [],
			CRAFTED_SUFFIX: [],
			CORRUPTED_IMPLICIT: [],
		}),
		variants: {
			Velara: normalizeGroup({
				...velara.modifierGroup,
				CRAFTED_PREFIX: [],
				CRAFTED_SUFFIX: [],
				CORRUPTED_IMPLICIT: [],
			}),
			Idona: normalizeGroup({
				...idona.modifierGroup,
				CRAFTED_PREFIX: [],
				CRAFTED_SUFFIX: [],
				CORRUPTED_IMPLICIT: [],
			}),
			Tenos: normalizeGroup({
				...tenos.modifierGroup,
				CRAFTED_PREFIX: [],
				CRAFTED_SUFFIX: [],
				CORRUPTED_IMPLICIT: [],
			}),
			Wendarr: normalizeGroup({
				...wendarr.modifierGroup,
				CRAFTED_PREFIX: [],
				CRAFTED_SUFFIX: [],
				CORRUPTED_IMPLICIT: [],
			}),
		},
	},
};
