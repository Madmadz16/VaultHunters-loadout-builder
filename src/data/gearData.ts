export interface GearItem {
	label: string;
	imgSrc: string;
	hasUnique?: boolean;
}

export const gearItems: GearItem[] = [
	{ label: 'Sword', imgSrc: '../public/gear_images/sword.gif', hasUnique: true },
	{ label: 'Axe', imgSrc: '../public/gear_images/axe.gif', hasUnique: true },
	{ label: 'Shield', imgSrc: '../public/gear_images/shield.png', hasUnique: true },
	{ label: 'Wand', imgSrc: '../public/gear_images/wand.png', hasUnique: true },
	{ label: 'Helmet', imgSrc: '../public/gear_images/helmet.gif', hasUnique: true },
	{ label: 'Chestplate', imgSrc: '../public/gear_images/chestplate.gif', hasUnique: true },
	{ label: 'Leggings', imgSrc: '../public/gear_images/leggings.gif', hasUnique: true },
	{ label: 'Boots', imgSrc: '../public/gear_images/boots.gif', hasUnique: true },
	{ label: 'Focus', imgSrc: '../public/gear_images/focus.png', hasUnique: true },
	{ label: 'Magnet', imgSrc: '../public/gear_images/magnet.png', hasUnique: true },
	{ label: 'Void Stone', imgSrc: '../public/gear_images/void stone.png', hasUnique: false },
	{ label: 'God Charm', imgSrc: '../public/gear_images/godcharm.gif', hasUnique: false },
];

export const uniqueSword: GearItem[] = [
	{ label: 'crystalblade', imgSrc: '../public/unique_images/sword/crystalblade.png' },
	{ label: 'honey_wand', imgSrc: '../public/unique_images/sword/honey_wand.png' },
	{ label: 'inflatedjustice', imgSrc: '../public/unique_images/sword/inflatedjustice.png' },
	{ label: 'iskallibur_sword', imgSrc: '../public/unique_images/sword/iskallibur_sword.png' },
];
export const uniqueAxe: GearItem[] = [
	{ label: 'butchers_bone_cleaver', imgSrc: '../public/unique_images/axe/butchers_bone_cleaver.png' },
	{ label: 'starforge', imgSrc: '../public/unique_images/axe/starforge.png' },
];
export const uniqueShield: GearItem[] = [
	{ label: 'frostwarden', imgSrc: '../public/unique_images/shield/frostwarden.png' },
	{ label: 'gladiator_buckler', imgSrc: '../public/unique_images/shield/gladiator_buckler.png' },
	{ label: 'glass_flower', imgSrc: '../public/unique_images/shield/glass_flower.png' },
	{ label: 'grim', imgSrc: '../public/unique_images/shield/grim.png' },
	{ label: 'slab', imgSrc: '../public/unique_images/shield/slab.png' },
];
export const uniqueWand: GearItem[] = [
	{ label: 'baguette', imgSrc: '../public/unique_images/wand/baguette.png' },
	{ label: 'chaining_wand', imgSrc: '../public/unique_images/wand/chaining_wand.png' },
	{ label: 'infernos_reach', imgSrc: '../public/unique_images/wand/infernos_reach.png' },
];
export const uniqueHelmet: GearItem[] = [
	{ label: 'jester', imgSrc: '../public/unique_images/helmet/jester.png' },
	{ label: 'spiral_guardian', imgSrc: '../public/unique_images/helmet/spiral_guardian.png' },
	{ label: 'stormcrown', imgSrc: '../public/unique_images/helmet/stormcrown.png' },
];
export const uniqueChestplate: GearItem[] = [
	{ label: 'castle', imgSrc: '../public/unique_images/chestplate/castle.png' },
	{ label: 'crystalplate', imgSrc: '../public/unique_images/chestplate/crystalplate.png' },
	{ label: 'frozen_throne', imgSrc: '../public/unique_images/chestplate/frozen_throne.png' },
	{ label: 'phoenix_chestplate', imgSrc: '../public/unique_images/chestplate/phoenix_chestplate.png' },
	{ label: 'sweetheart', imgSrc: '../public/unique_images/chestplate/sweetheart.png' },
	{ label: 'vitalis', imgSrc: '../public/unique_images/chestplate/vitalis.png' },
];
export const uniqueLeggings: GearItem[] = [
	{ label: 'bee_knight', imgSrc: '../public/unique_images/leggings/bee_knight.png' },
	{ label: 'crashguards', imgSrc: '../public/unique_images/leggings/crashguards.png' },
];
export const uniqueBoots: GearItem[] = [
	{ label: 'frost_guard', imgSrc: '../public/unique_images/boots/frost_guard.png' },
	{ label: 'pacifistsandals', imgSrc: '../public/unique_images/boots/pacifistsandals.png' },
];
export const uniqueFocus: GearItem[] = [
	{ label: 'echoflare', imgSrc: '../public/unique_images/focus/echoflare.png' },
	{ label: 'ender_rings', imgSrc: '../public/unique_images/focus/ender_rings.png' },
	{ label: 'frozenorb', imgSrc: '../public/unique_images/focus/frozenorb.png' },
];
export const uniqueMagnet: GearItem[] = [
	{ label: 'quickstone', imgSrc: '../public/unique_images/magnet/quickstone.png' },
];

export const uniques: Array<Array<GearItem>> = [
	uniqueSword,
	uniqueAxe,
	uniqueShield,
	uniqueWand,
	uniqueHelmet,
	uniqueChestplate,
	uniqueLeggings,
	uniqueBoots,
	uniqueFocus,
	uniqueMagnet,
];
