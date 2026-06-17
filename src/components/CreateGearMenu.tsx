import GearMaker from './GearMaker';
import GearCard from './GearCard';
import { useEffect, useMemo, useState } from 'react';
import {
	uniqueAxe,
	uniqueBoots,
	uniqueChestplate,
	uniqueFocus,
	uniqueHelmet,
	uniqueLeggings,
	uniqueMagnet,
	uniqueShield,
	uniqueSword,
	uniqueWand,
} from '../data/gearData';
import type { GearType } from '../gear_modifiers/gearDefinitions';

interface GearProp {
	label: string;
	imgSrc: string;
}

interface CreateGearModalProps {
	gear: GearProp[];
	show: boolean;
	level: number;
	onClose: () => void;
}

const CreateGearMenu = ({ gear, show, level, onClose }: CreateGearModalProps) => {
	const [gearMakerVisible, setGearMakerVisible] = useState(false);
	const [selectedGearType, setSelectedGearType] = useState<GearType | null>(null);
	const [selectedUniqueLabel, setSelectedUniqueLabel] = useState<string | null>(null);
	const [uniquesEnabled, setUniquesEnabled] = useState(false);
	const [activeUniqueOptions, setActiveUniqueOptions] = useState<GearProp[] | null>(null);

	const noUniques: Array<string> = ['Void Stone', 'God Charm'];
	const uniqueByGearType: Partial<Record<GearType, GearProp[]>> = useMemo(
		() => ({
			Sword: uniqueSword,
			Axe: uniqueAxe,
			Shield: uniqueShield,
			Wand: uniqueWand,
			Helmet: uniqueHelmet,
			Chestplate: uniqueChestplate,
			Leggings: uniqueLeggings,
			Boots: uniqueBoots,
			Focus: uniqueFocus,
			Magnet: uniqueMagnet,
		}),
		[]
	);

	useEffect(() => {
		if (!show && !gearMakerVisible) {
			setActiveUniqueOptions(null);
			setSelectedUniqueLabel(null);
		}
	}, [show, gearMakerVisible]);

	const showingUniquePicker = uniquesEnabled && activeUniqueOptions !== null;
	const displayedGear = showingUniquePicker
		? activeUniqueOptions
		: gear.filter((opt) => (uniquesEnabled ? !noUniques.includes(opt.label) : true));

	const resolveGearType = (label: string): GearType | null => {
		if (label === 'God Charm') return 'God Idol';
		if (label === 'Void Stone') return 'Void Stone';

		const validTypes: GearType[] = [
			'Sword',
			'Axe',
			'Shield',
			'Focus',
			'Wand',
			'Magnet',
			'Helmet',
			'Chestplate',
			'Leggings',
			'Boots',
			'God Idol',
			'Void Stone',
		];

		return validTypes.includes(label as GearType) ? (label as GearType) : null;
	};

	const handleSelectGear = (label: string) => {
		if (uniquesEnabled && !showingUniquePicker) {
			const baseType = resolveGearType(label);
			if (!baseType) return;
			const uniqueOptions = uniqueByGearType[baseType];
			if (uniqueOptions && uniqueOptions.length > 0) {
				setSelectedGearType(baseType);
				setSelectedUniqueLabel(null);
				setActiveUniqueOptions(uniqueOptions);
				return;
			}
		}

		if (!showingUniquePicker) {
			const baseType = resolveGearType(label);
			if (!baseType) return;
			setSelectedGearType(baseType);
			setSelectedUniqueLabel(null);
		} else {
			setSelectedUniqueLabel(label);
		}

		setGearMakerVisible(true);
		onClose();
	};

	if (!show && !gearMakerVisible) return null;

	return (
		<>
			{/* backdrop */}
			<div className="modal-backdrop fade show" />

			{/* modal dialog */}
			<div className="modal fade show d-block" tabIndex={-1} role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header d-block">
							<div className="d-flex align-items-center justify-content-between">
								<h5 className="modal-title mb-0">
									{showingUniquePicker ? `Create Unique ${selectedGearType ?? ''}` : 'Create Gear'}
								</h5>
								<button
									type="button"
									className="btn-close"
									aria-label="Close"
									onClick={() => onClose()}
								/>
							</div>
							<div className="d-flex align-items-center gap-2 mt-2">
								<label htmlFor="toggle-uniques" className="mb-0">
									Toggle uniques
								</label>
								<div className="form-check form-switch mb-0">
									<input
										id="toggle-uniques"
										className="form-check-input"
										type="checkbox"
										checked={uniquesEnabled}
										onChange={(event) => {
											setUniquesEnabled(event.target.checked);
											setActiveUniqueOptions(null);
											setSelectedUniqueLabel(null);
										}}
									/>
								</div>
							</div>
							{showingUniquePicker && (
								<button
									type="button"
									className="btn btn-link p-0 mt-2"
									onClick={() => {
										setActiveUniqueOptions(null);
										setSelectedUniqueLabel(null);
									}}
								>
									Back to gear types
								</button>
							)}
						</div>
						<div className="modal-body">
							<div className="row">
								{displayedGear.map((opt, index) => (
										<GearCard
											key={index}
											gear={opt}
											onSelect={handleSelectGear}
										/>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* GearMaker modal */}
			{gearMakerVisible && selectedGearType && (
				<GearMaker
					level={level}
					type={selectedGearType}
					uniqueLabel={selectedUniqueLabel}
					show={gearMakerVisible}
					onClose={() => {
						setGearMakerVisible(false);
						setSelectedUniqueLabel(null);
					}}
				/>
			)}
		</>
	);
};

export default CreateGearMenu;
