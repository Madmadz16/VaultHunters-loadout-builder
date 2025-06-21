import React, { useState } from 'react';
import { gearDefinitions } from '../gear_modifiers/gearDefinitions';
import type { GearType } from '../gear_modifiers/gearDefinitions';
import BaseAttributes from './BaseAttributes';
import Attributes from './attributes';

interface Rarities {
	rarity: 'scrappy' | 'common' | 'rare' | 'epic' | 'omega';
}

interface GearMakerProps {
	rarity: Rarities['rarity']
	level: number;
	show: boolean;
	type: GearType;
	onClose: () => void;
}

const GearMaker = ({ rarity: initialRarity, level, type, show = false, onClose }: GearMakerProps) => {
	const [rarity, setRarity] = useState<Rarities['rarity']>(initialRarity)
	if (show) return null;

	const onClick = (event: React.MouseEvent<HTMLAnchorElement>, newR: Rarities['rarity']) => {
		event.preventDefault()
		setRarity(newR)
		console.log(newR)
	}
	const { ext, modifierGroup } = gearDefinitions[type];

	return (
		<>
			{/* backdrop */}
			<div className="modal-backdrop fade show" onClick={onClose} />

			{/* modal dialog */}
			<div
				className="modal d-block fade show d-flex justify-content-center gear-modal-overlay"
				tabIndex={-1}
				role="dialog"
			>
				<div className="modal-dialog gear-modal-dialog-custom" role="document">
					<div className="modal-content">
						<div className="card">
							<img src={`./src/assets/gear_images/${type}.${ext}`} className="card-img-top" alt={type} />
							<div className="card-body">
								<h5 className="card-title d-flex align-items-center justify-content-center">
									<b className="me-2">{type}</b>
									<div className="dropdown">
										<button className={`btn btn-secondary dropdown-toggle ${rarity}`} type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
											{rarity}
										</button>
										<ul className="dropdown-menu">
											{(['scrappy','common','rare','epic','omega'] as Rarities['rarity'][]).map((r) => (
												<li key={r}>
												  <a
													className={`dropdown-item ${r}`}
													onClick={(event) => onClick(event, r)}
												>
												{r}
												</a>
											</li>
											))}
										</ul>
									</div>
								</h5>
								<p className="card-text text-center">
									Add your desired modifiers to your {type.toLowerCase()}
								</p>
							</div>
							<BaseAttributes attributes={modifierGroup.BASE_ATTRIBUTES} level={level} />
							<Attributes title='Implicits' attributes={modifierGroup.IMPLICIT ?? []} level={level} />
							<Attributes title='Prefixes' attributes={modifierGroup.PREFIX ?? []} level={level} amount={3} exclude={['the_vault:hithearts']} />
							<Attributes title='Suffixes' attributes={modifierGroup.SUFFIX ?? []} level={level} amount={3} exclude={['the_vault:hithearts']} />
							{/* <b>Implicits</b>
							<ul className="list-group list-group-flush">
								<li className="list-group-item">An item</li>
								<li className="list-group-item">A second item</li>
								<li className="list-group-item">A third item</li>
							</ul> */}
							{/* <b>Prefixes</b>
							<ul className="list-group list-group-flush">
								<li className="list-group-item">An item</li>
								<li className="list-group-item">A second item</li>
								<li className="list-group-item">A third item</li>
							</ul>
							<b>Suffixes</b>
							<ul className="list-group list-group-flush">
								<li className="list-group-item">An item</li>
								<li className="list-group-item">A second item</li>
								<li className="list-group-item">A third item</li>
							</ul> */}
							<div>
								<button type="button" className={`btn btn-danger`}>
									Discard
								</button>
								<button type="button" className={`btn btn-success`}>
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
