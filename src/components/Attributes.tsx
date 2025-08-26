import { useEffect, useState } from 'react';
import SliderControl from './Slider';
import type { AttributeDefinition, AbilityChangeValue, EffectChanceValue, PotionEffectValue, RangeValue } from '../gear_modifiers/gearDefinitions';

interface AttributesProps {
	title: string;
	attributes: AttributeDefinition[];
	level: number; // still here in case you want sliders, etc.
	amount?: number; // max number of slots
	disabled?: number;
	exclude?: string[];
	onSelect?: (count: number) => void;
}

const romanToNumber = (roman: string): number => {
	const romanMap: { [key: string]: number } = {
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
	return romanMap[roman] || 1; // Default to level 1 if no Roman numeral is found
};

const getRangeForLevel = (attr: AttributeDefinition, level: number) => {
	// pick all tiers that include this level
	const applicable = attr.tiers.filter(
		(t) => t.minLevel <= level && (t.maxLevel === -1 || t.maxLevel >= level)
	);

	const numericTiers = applicable
		.filter((t) => 'min' in t.value && 'max' in t.value && 'step' in t.value)
		.map((t) => t.value as RangeValue);

	if (numericTiers.length > 0) {
		const { min, max, step } = numericTiers[0];
		return { min: min, max: max, step: step };
	}

	// Handle PotionEffectValue tiers
	const potionEffectTiers = applicable
		.filter((t) => 'tooltipDisplayName' in t.value && 'potion' in t.value)
		.map((t) => t.value as PotionEffectValue);

	if (potionEffectTiers.length > 0) {
		// Parse the Roman numeral from tooltipDisplayName to determine the level
		const parsedPotionEffects = potionEffectTiers.map((tier) => {
			const match = tier.tooltipDisplayName.match(/(?:\s|^)([IVXLCDM]+)$/); // Match Roman numeral at the end
			const parsedLevel = match ? romanToNumber(match[1]) : 1; // Default to level 1 if no numeral is found
			return parsedLevel;
		});
		
		// Find the highest and lowest values in the array
		const highest = Math.max(...parsedPotionEffects);
		const lowest = Math.min(...parsedPotionEffects);		

		// Return the highest and lowest values
		return { max: highest, min: lowest, step: 1 };
	}

	// Handle AbilityChangeValue tiers
	const abilityTiers = applicable
		.filter((t) => 'abilityKey' in t.value && 'levelChange' in t.value)
		.map((t) => t.value as AbilityChangeValue);
		
	if (abilityTiers.length > 0) {
		// Parse the Roman numeral from tooltipDisplayName to determine the level
		const parsedAbilityTiers = abilityTiers.map((tier) => 
			tier.levelChange
		);		
		
		// Find the highest and lowest values in the array
		const highest = Math.max(...parsedAbilityTiers);
		const lowest = Math.min(...parsedAbilityTiers);		

		// Return the highest and lowest values
		return { max: highest, min: lowest, step: 1 };
	}
	
	// Handle EffectChanceValue tiers
	const effectChanceTiers = applicable
		.filter((t) => 'minChance' in t.value && 'maxChance' in t.value && 'step' in t.value)
		.map((t) => t.value as EffectChanceValue);
	
	if (effectChanceTiers.length > 0) {
		// Find the highest and lowest values in the array by mapping to numeric properties
		const highest = Math.max(...effectChanceTiers.map(v => v.maxChance));
		const lowest = Math.min(...effectChanceTiers.map(v => v.minChance));		

		// Return the highest and lowest values
		return { max: highest, min: lowest, step: effectChanceTiers[0].step };
	}
	

	return null;
};

const formatLabel = (identifier: string) => {
	// strip any leading "mod_"
	let label = identifier.replace(/^the_vault:(?:mod_|base_)/, '');

	// replace underscores with spaces
	label = label.replace(/_/g, ' ');
	// if it contains "damage", remove it and append at end
	if (/damage/i.test(label)) {
		label = label.replace(/damage/gi, '').trim();
		label = `${label} Damage`;
	}
	// uppercase first character
	return label.charAt(0).toUpperCase() + label.slice(1);
};

const Attributes = ({
	title,
	attributes,
	level,
	amount,
	disabled = 0,
	exclude = [],
	onSelect,
}: AttributesProps) => {
	const available = attributes.filter((attr) => !exclude.includes(attr.identifier));

	// decide how many slots (LIs) to render
	const slotCount = amount != null ? Math.min(available.length, amount) : available.length;

	// track what was selected in each slot
	const [selected, setSelected] = useState<(AttributeDefinition | null)[]>(() =>
		Array(slotCount).fill(null)
	);

	useEffect(() => {
		if (onSelect) {
			onSelect(selected.filter((a) => a !== null).length);
		}
	}, [selected, onSelect]);

	if (available.length === 0) return null;

	const handleSelect = (slotIndex: number, attr: AttributeDefinition | null) => {
		setSelected((prev) => {
			const next = [...prev];
			next[slotIndex] = attr;
			return next;
		});

		// Collapse the dropdown manually
		const dropdownElement = document.querySelector('.dropdown-menu.show');
		if (dropdownElement) {
			dropdownElement.classList.remove('show');
		}
	};

	// collect which groups are already used (to disable duplicates)
	const usedGroups = selected.filter((a): a is AttributeDefinition => a !== null).map((a) => a.group);

	return (
		<>
			<b className="ms-2">{title}</b>
			<ul className="list-group list-group-flush">
				{Array.from({ length: slotCount }).map((_, i) => {
					const sel = selected[i];
					const isDisabled = disabled > 0 && i >= slotCount - disabled; // Disable last `disabled` dropdowns
					// console.log(`Disabled prop for ${title}:`, disabled, `Slot index: ${i}, Is Disabled: ${isDisabled}`);
					return (
						<li key={i} className="list-group-item d-flex align-items-center">
							<div className="dropdown w-100">
								{/* Dropdown button */}
								<button
									className={`btn btn-outline-secondary w-100 text-start dropdown-toggle ${
										sel ? `attribute-${title}` : ''
									}`}
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									disabled={isDisabled}
								>
									{sel ? `${formatLabel(sel.identifier)}` : `+ Add ${title}`}
								</button>

								{/* Dropdown menu */}
								<ul className="dropdown-menu w-100">
									{/* Reset option */}
									<li>
										<button
											className="dropdown-item text-danger"
											onClick={() => handleSelect(i, null)}
										>
											+ Add {title}
										</button>
									</li>
									{available.map((attr) => {
										const disabled =
											usedGroups.includes(attr.group) && sel?.group !== attr.group;
										return (
											<li key={formatLabel(attr.identifier)}>
												<button
													className="dropdown-item"
													disabled={disabled}
													onClick={() => handleSelect(i, attr)}
												>
													{formatLabel(attr.identifier)}{' '}
													<span className="text-muted">
														{`${getRangeForLevel(attr, level)?.min}-${
															getRangeForLevel(attr, level)?.max
														}`}
													</span>
												</button>
											</li>
										);
									})}
								</ul>

								{/* Slider below the dropdown button */}
								{sel && (
									<div className={`mt-2 d-flex justify-content-center align-items-center`}>
										<SliderControl
											min={getRangeForLevel(sel, level)?.min || 0}
											max={getRangeForLevel(sel, level)?.max || 100}
											step={getRangeForLevel(sel, level)?.step || 1}
											value={getRangeForLevel(sel, level)?.max || 0}
											id={`slider-${title}-${i}`}
										/>
									</div>
								)}
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default Attributes;
