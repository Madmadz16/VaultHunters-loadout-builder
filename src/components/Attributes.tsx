import { useEffect, useState } from 'react';
import SliderControl from './Slider';
import type { AttributeDefinition } from '../gear_modifiers/gearDefinitions';
import { formatAttributeIdentifier, getRangeForLevel } from '../Services/attributeService';

interface AttributesProps {
	title: string;
	attributes: AttributeDefinition[];
	level: number;
	amount?: number;
	disabled?: number;
	exclude?: string[];
	allowGroupDuplicates?: boolean;
	onSelect?: (count: number) => void;
}


const Attributes = ({
	title,
	attributes,
	level,
	amount,
	disabled = 0,
	exclude = [],
	allowGroupDuplicates = false,
	onSelect,
}: AttributesProps) => {
	const available = attributes.filter(
		(attr) => !exclude.includes(attr.identifier) && getRangeForLevel(attr, level) !== null
	);


	const slotCount = amount != null ? Math.min(available.length, amount) : available.length;


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

	
		const dropdownElement = document.querySelector('.dropdown-menu.show');
		if (dropdownElement) {
			dropdownElement.classList.remove('show');
		}
	};


	const usedGroups = selected.filter((a): a is AttributeDefinition => a !== null).map((a) => a.group);
	const usedIdentifiers = selected
		.filter((a): a is AttributeDefinition => a !== null)
		.map((a) => a.identifier);

	return (
		<>
			<b className="ms-2">{title}</b>
			<ul className="list-group list-group-flush">
				{Array.from({ length: slotCount }).map((_, i) => {
					const sel = selected[i];
					const isDisabled = disabled > 0 && i >= slotCount - disabled;
				
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
									{sel ? `${formatAttributeIdentifier(sel.identifier)}` : `+ Add ${title}`}
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
										const identifierAlreadyUsed =
											usedIdentifiers.includes(attr.identifier) && sel?.identifier !== attr.identifier;
										const groupBlocked =
											!allowGroupDuplicates && usedGroups.includes(attr.group) && sel?.group !== attr.group;
										const disabled = identifierAlreadyUsed || groupBlocked;
										return (
											<li key={formatAttributeIdentifier(attr.identifier)}>
												<button
													className="dropdown-item"
													disabled={disabled}
													onClick={() => handleSelect(i, attr)}
												>
													{formatAttributeIdentifier(attr.identifier)}{' '}
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

								{/* Slider */}
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
