import { useEffect, useState } from 'react';
import { gearDefinitions } from '../gear_modifiers/gearDefinitions';
import type { GearType, AttributeDefinition, RawModifierGroup } from '../gear_modifiers/gearDefinitions';
import { gearItems, uniques } from '../data/gearData';
import uniqueData from '../gear_modifiers/unique.json';
import uniqueGearData from '../gear_modifiers/unique_gear.json';
import idolBenevolent from '../gear_modifiers/idol_benevolent.json';
import idolMalevolence from '../gear_modifiers/idol_malevolence.json';
import idolOmniscient from '../gear_modifiers/idol_omniscient.json';
import idolTimekeeper from '../gear_modifiers/idol_timekeeper.json';
import BaseAttributes from './BaseAttributes';
import Attributes from './Attributes';
import {
	appendSavedGearItem,
	getOrCreateDictIndex,
	getSavedGearDict,
	setSavedGearDict,
} from '../Services/gearStorageService';
import { getFilterType, getTotalAttributes } from '../Services/gearTypeService';
import { formatSnakeLabel } from '../Services/attributeService';

export type AttributesProps = [number, number | boolean];

export interface SavedGearProps {
	name: string;
	type: string;
	level: number;
	baseAttributes: AttributesProps[];
	implicitAttributes?: AttributesProps[];
	prefixAttributes?: AttributesProps[];
	suffixAttributes?: AttributesProps[];
}

interface GearMakerProps {
	level: number;
	show: boolean;
	type: GearType;
	uniqueLabel?: string | null;
	onClose: () => void;
}

const GearMaker = ({ level, type, show = false, uniqueLabel = null, onClose }: GearMakerProps) => {
	const [gearName, setGearName] = useState<string>(type);
	const [selectedPrefixes, setSelectedPrefixes] = useState<number>(0);
	const [selectedSuffixes, setSelectedSuffixes] = useState<number>(0);
	const [prefixesDisabled, setPrefixesDisabled] = useState<number>(0);
	const [suffixesDisabled, setSuffixesDisabled] = useState<number>(0);
	type IdolVariant = 'Velara' | 'Idona' | 'Tenos' | 'Wendarr';
	const [selectedIdol, setSelectedIdol] = useState<IdolVariant>('Velara');

	useEffect(() => {
		if (type === 'God Idol') {
			setSelectedPrefixes(0);
		}
	}, [selectedIdol, type]);

	useEffect(() => {
		if (uniqueLabel) {
			setGearName(formatSnakeLabel(uniqueLabel));
			return;
		}
		setGearName(type);
	}, [type, uniqueLabel]);

	const handleSave = () => {
		const dict: string[] = getSavedGearDict();
		const savedBase: AttributesProps[] = [];
		const savedImplicits: AttributesProps[] = [];
		const savedPrefixes: AttributesProps[] = [];
		const savedSuffixes: AttributesProps[] = [];

		document.querySelectorAll('.attribute-base').forEach((element, index) => {
			const sliderOrCheckbox = document.querySelector(`#attribute-base-${index}`) as HTMLInputElement;
			const value =
				sliderOrCheckbox.type === 'checkbox'
					? sliderOrCheckbox.checked
					: parseInt(sliderOrCheckbox?.value || '0', 10);

			const attribute: string = element.textContent?.trim().replace(/\d+$/, '') || '';
			const attrIndex: number = getOrCreateDictIndex(dict, attribute);
			savedBase.push([attrIndex, value]);
		});

		document.querySelectorAll('.attribute-Implicits').forEach((element, index) => {
			const slider = document.querySelector(`#slider-Implicits-${index}`) as HTMLInputElement;

			const attribute: string = element.textContent?.trim() || '';
			const attrIndex: number = getOrCreateDictIndex(dict, attribute);
			savedImplicits.push([attrIndex, parseFloat(slider?.value || '0')]);
		});

		document.querySelectorAll('.attribute-Prefixes').forEach((element, index) => {
			const slider = document.querySelector(`#slider-Prefixes-${index}`) as HTMLInputElement;
			const attribute: string = element.textContent?.trim() || '';
			const attrIndex: number = getOrCreateDictIndex(dict, attribute);
			savedPrefixes.push([attrIndex, parseFloat(slider?.value || '0')]);
		});

		document.querySelectorAll('.attribute-Suffixes').forEach((element, index) => {
			console.log(element);
			const slider = document.querySelector(`#slider-Suffixes-${index}`) as HTMLInputElement;
			console.log('slider:', slider);
			if (!slider) return;
			const attribute: string = element.textContent?.trim() || '';
			const attrIndex: number = getOrCreateDictIndex(dict, attribute);
			savedSuffixes.push([attrIndex, parseFloat(slider.value || '0')]);
		});

		const filterType = getFilterType(type);

		const savedItem: SavedGearProps = {
			name: gearName,
			type: filterType,
			level,
			baseAttributes: savedBase,
			implicitAttributes: savedImplicits,
			prefixAttributes: savedPrefixes,
			suffixAttributes: savedSuffixes,
		};

		appendSavedGearItem(savedItem);
		setSavedGearDict(dict);

		console.log('Saved Item:', savedItem);
		onClose();
	};

	const totalAttributes = getTotalAttributes(type);
	const maxPerCategory = Math.ceil(totalAttributes / 2);
	useEffect(() => {
		const newPrefixesDisabled = Math.max(0, selectedSuffixes - maxPerCategory);
		const newSuffixesDisabled = Math.max(0, selectedPrefixes - maxPerCategory);

		setPrefixesDisabled(newPrefixesDisabled);
		setSuffixesDisabled(newSuffixesDisabled);
	}, [selectedPrefixes, selectedSuffixes, maxPerCategory]);

	const handleAttributeSelect = (type: 'prefix' | 'suffix', count: number) => {
		if (type === 'prefix') {
			setSelectedPrefixes(count);
		} else {
			setSelectedSuffixes(count);
		}
	};

	if (!show) return null;
	const idolVariants = ['Velara', 'Idona', 'Tenos', 'Wendarr'] as const;

	const normalizeGroup = (group: Partial<RawModifierGroup>): RawModifierGroup => ({
		BASE_ATTRIBUTES: group.BASE_ATTRIBUTES ?? [],
		IMPLICIT: group.IMPLICIT ?? [],
		PREFIX: group.PREFIX ?? [],
		SUFFIX: group.SUFFIX ?? [],
		CRAFTED_PREFIX: group.CRAFTED_PREFIX ?? [],
		CRAFTED_SUFFIX: group.CRAFTED_SUFFIX ?? [],
		CORRUPTED_IMPLICIT: group.CORRUPTED_IMPLICIT ?? [],
	});

	const idolVariantGroups: Record<IdolVariant, RawModifierGroup> = {
		Velara: normalizeGroup(idolBenevolent.modifierGroup),
		Idona: normalizeGroup(idolMalevolence.modifierGroup),
		Tenos: normalizeGroup(idolOmniscient.modifierGroup),
		Wendarr: normalizeGroup(idolTimekeeper.modifierGroup),
	};

	const getUniqueModifierGroup = (label: string): RawModifierGroup | null => {
		type UniqueEntry = {
			name?: string;
			models?: Array<{ value?: string }>;
			modifierIdentifiers?: {
				BASE_ATTRIBUTE?: string[];
				IMPLICIT?: string[];
				PREFIX?: string[];
				SUFFIX?: string[];
			};
		};

		const registry = (uniqueGearData as { registry?: Record<string, UniqueEntry> }).registry ?? {};
		const entries = Object.values(registry);

		const match = entries.find((entry) => {
			const models = entry.models ?? [];
			return models.some((model) => {
				const value = model.value;
				if (!value || !value.includes(':')) return false;
				const [, modelPath] = value.split(':', 2);
				return modelPath.endsWith(`/${label}`) || modelPath.includes(`/${label}/`);
			});
		});

		if (!match?.modifierIdentifiers) return null;

		const sourceGroup = (uniqueData as { modifierGroup?: RawModifierGroup }).modifierGroup;
		if (!sourceGroup) return null;

		const allAttributes: AttributeDefinition[] = [
			...(sourceGroup.BASE_ATTRIBUTES ?? []),
			...(sourceGroup.IMPLICIT ?? []),
			...(sourceGroup.PREFIX ?? []),
			...(sourceGroup.SUFFIX ?? []),
		];

		const byIdentifier = new Map<string, AttributeDefinition>();
		for (const attr of allAttributes) {
			if (!byIdentifier.has(attr.identifier)) {
				byIdentifier.set(attr.identifier, attr);
			}
		}

		const pick = (ids?: string[]) =>
			(ids ?? [])
				.map((id) => byIdentifier.get(id))
				.filter((attr): attr is AttributeDefinition => Boolean(attr));

		return {
			BASE_ATTRIBUTES: pick(match.modifierIdentifiers.BASE_ATTRIBUTE),
			IMPLICIT: pick(match.modifierIdentifiers.IMPLICIT),
			PREFIX: pick(match.modifierIdentifiers.PREFIX),
			SUFFIX: pick(match.modifierIdentifiers.SUFFIX),
			CRAFTED_PREFIX: [],
			CRAFTED_SUFFIX: [],
			CORRUPTED_IMPLICIT: [],
		};
	};

	const { ext, modifierGroup, variants } = gearDefinitions[type];
	const uniqueModifierGroup = uniqueLabel ? getUniqueModifierGroup(uniqueLabel) : null;
	const activeModifierGroup = uniqueModifierGroup
		? uniqueModifierGroup
		: type === 'God Idol'
			? idolVariantGroups[selectedIdol]
			: modifierGroup;
	const attributeKeyPrefix = uniqueLabel
		? `${type}-${uniqueLabel}`
		: type === 'God Idol'
			? selectedIdol
			: type;
	const allowGroupDuplicates = Boolean(uniqueLabel) || type === 'God Idol';

	console.log('Active Modifier Group:', activeModifierGroup);
	console.log(ext, modifierGroup, variants);

	console.log(`uniqueLabel: ${uniqueLabel}`);

	const getImageSource = (): string => {
		if (uniqueLabel) {
			for (const uniqueArray of uniques) {
				const match = uniqueArray.find((item) => item.label === uniqueLabel);
				if (match) return match.imgSrc;
			}
		}
		const gearItem = gearItems.find((item) => item.label === type);
		return gearItem?.imgSrc || '';
	};

	const imgSource = getImageSource();

	return (
		<>
			<div className="modal-backdrop fade show" />

			<div
				className="modal d-block fade show d-flex justify-content-center gear-modal-overlay"
				tabIndex={-1}
				role="dialog"
			>
				<div className="modal-dialog gear-modal-dialog-custom" role="document">
					<div className="modal-content">
						<div className="card">
							<img
								src={imgSource}
								className="card-img-top"
								alt={type}
								style={{
									maxWidth: '160px',
									maxHeight: '160px',
									display: 'block',
									margin: '0 auto',
								}}
							/>
							<div className="card-body">
								<h5 className="card-title d-flex align-items-center justify-content-center">
									<b className="me-2">
										{uniqueLabel ? `${type} (${formatSnakeLabel(uniqueLabel)})` : type}
									</b>
								</h5>
								<div className="d-flex justify-content-center align-items-center mt-3 me">
									<label htmlFor="gear-name" className="me-2">
										{uniqueLabel ? formatSnakeLabel(uniqueLabel) : type} Name:
									</label>
									<input
										className="text-center"
										type="text"
										id="gear-name"
										value={gearName}
										placeholder={type}
										onChange={(e) => setGearName(e.target.value)}
									/>
								</div>
								<p className="card-text text-center">
									Add your desired modifiers to your {type.toLowerCase()}
								</p>
								{type === 'God Idol' && (
									<div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
										{idolVariants.map((idol) => (
											<button
												key={idol}
												type="button"
												className={`btn btn-sm ${selectedIdol === idol ? 'btn-primary' : 'btn-outline-primary'}`}
												onClick={() => setSelectedIdol(idol)}
											>
												{idol}
											</button>
										))}
									</div>
								)}
							</div>
							<BaseAttributes
								key={`${attributeKeyPrefix}-base`}
								attributes={activeModifierGroup.BASE_ATTRIBUTES}
								level={level}
							/>
							<Attributes
								key={`${attributeKeyPrefix}-implicits`}
								title="Implicits"
								attributes={activeModifierGroup.IMPLICIT ?? []}
								level={level}
							/>
							<Attributes
								key={`${attributeKeyPrefix}-prefixes`}
								title="Prefixes"
								attributes={activeModifierGroup.PREFIX ?? []}
								level={level}
								amount={maxPerCategory}
								disabled={prefixesDisabled}
								exclude={['the_vault:hithearts']}
								allowGroupDuplicates={allowGroupDuplicates}
								onSelect={(count) => handleAttributeSelect('prefix', count)}
							/>
							<Attributes
								key={`${attributeKeyPrefix}-suffixes`}
								title="Suffixes"
								attributes={activeModifierGroup.SUFFIX ?? []}
								level={level}
								amount={maxPerCategory}
								disabled={suffixesDisabled}
								exclude={['the_vault:hithearts']}
								allowGroupDuplicates={allowGroupDuplicates}
								onSelect={(count) => handleAttributeSelect('suffix', count)}
							/>
							<div>
								<button type="button" className={`btn btn-danger`} onClick={onClose}>
									Discard
								</button>
								<button
									type="button"
									className={`btn btn-success`}
									onClick={() => handleSave()}
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GearMaker;
