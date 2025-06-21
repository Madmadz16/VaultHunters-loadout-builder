import React, { useState } from 'react';
import type { AttributeDefinition } from '../gear_modifiers/gearDefinitions';

interface AttributesProps {
	title: string;
	attributes: AttributeDefinition[];
	level: number; // still here in case you want sliders, etc.
	amount?: number; // max number of slots
	exclude?: string[];
}

const formatLabel = (identifier: string) => {
  // strip any leading "mod_"
  let label = identifier.replace(/^the_vault:(?:mod_|base_)/, '')
  
  // replace underscores with spaces
  label = label.replace(/_/g, ' ')
  // if it contains "damage", remove it and append at end
  if (/damage/i.test(label)) {
    label = label.replace(/damage/gi, '').trim()
    label = `${label} Damage`
  }
  // uppercase first character
  return label.charAt(0).toUpperCase() + label.slice(1)
}

const Attributes = ({ title, attributes, level, amount, exclude = [] }: AttributesProps) => {
	const available = attributes.filter((attr) => !exclude.includes(attr.identifier));

	// decide how many slots (LIs) to render
	const slotCount = amount != null ? Math.min(available.length, amount) : available.length;

	// track what was selected in each slot
	const [selected, setSelected] = useState<(AttributeDefinition | null)[]>(() => Array(slotCount).fill(null));
	if (available.length === 0) return null;

	const handleSelect = (slotIndex: number, attr: AttributeDefinition) => {
		setSelected((prev) => {
			const next = [...prev];
			next[slotIndex] = attr;
			return next;
		});
	};

	// collect which groups are already used (to disable duplicates)
	const usedGroups = selected.filter((a): a is AttributeDefinition => a !== null).map((a) => a.group);

	return (
		<>
			<b className="ms-2">{title}</b>
			<ul className="list-group list-group-flush">
				{Array.from({ length: slotCount }).map((_, i) => {
					const sel = selected[i];
					return (
						<li key={i} className="list-group-item d-flex align-items-center">
							<div className="dropdown w-100">
								<button
									className={`btn btn-outline-secondary w-100 text-start ${sel ? '' : 'text-muted'}`}
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{sel
                    ? formatLabel(sel.identifier)
                    : `+ Add ${title}`}
								</button>
								<ul className="dropdown-menu w-100">
									{available.map((attr) => {
										const disabled = usedGroups.includes(attr.group) && sel?.group !== attr.group;
										return (
											<li key={formatLabel(attr.identifier)}>
												<button
													className="dropdown-item"
													disabled={disabled}
													onClick={() => handleSelect(i, attr)}
												>
													{formatLabel(attr.identifier)}
												</button>
											</li>
										);
									})}
								</ul>
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default Attributes;
