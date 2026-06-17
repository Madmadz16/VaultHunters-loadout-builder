import GearDisplay from './GearDisplay';
import type { SavedGearProps } from './GearMaker';
import { filterSavedGearByType } from '../Services/gearStorageService';

interface CreateGearModalProps {
	show: boolean;
	onClose: () => void;
	onSelectGear: (gear: SavedGearProps) => void;
	type: string | null;
}

const GearSelector = ({ show = false, type, onClose, onSelectGear }: CreateGearModalProps) => {
	if (!show) return null;

	const hotbarAlways = [
		{ name: 'Blocks', imgSrc: `./public/gear_images/vaultstone.jpeg`, type: `Hotbar`, level: 0, baseAttributes: [] },
		{ name: 'Health Potion', imgSrc: `./public/gear_images/brew.png`, type: `Hotbar`, level: 0, baseAttributes: [] },
		{ name: 'Vault Fruit', imgSrc: `./public/gear_images/fruit.gif`, type: `Hotbar`, level: 0, baseAttributes: [] },
		{ name: 'Food', imgSrc: `./public/gear_images/steak.jpeg`, type: `Hotbar`, level: 0, baseAttributes: [] },
		{ name: 'Water Bucket', imgSrc: `./public/gear_images/waterbucket.jpeg`, type: `Hotbar`, level: 0, baseAttributes: [] },
	];

	const filteredGear = filterSavedGearByType(type);

	return (
		<>
			<div className="modal-backdrop fade show" />

			<div className="modal fade show d-block" tabIndex={-1} role="dialog">
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Saved Gear</h5>
							<button
								type="button"
								className="btn-close"
								aria-label="Close"
								onClick={() => onClose()}
							/>
						</div>
						<div className="modal-body">
							<div className="row">
								{filteredGear.map((gear: SavedGearProps, index: number) => (
									<div key={index} className="col-4 mb-3 ">
										<div className="card h-100 text-center">
											<div className="card-body p-2">
												<img
													src={`./public/gear_images/${gear.name.toLowerCase()}.gif`}
													alt={gear.name}
													className="img-fluid mb-2"
													style={{ maxHeight: '100px' }}
												/>

												<p className="card-text mb-2">{gear.name}</p>

												<button
													className="btn btn-primary"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target={`#statsMenu-${index}`}
													aria-expanded="false"
													aria-controls={`statsMenu-${index}`}
												>
													Stats
												</button>
												<div className="collapse" id={`statsMenu-${index}`}>
													<div className="card card-body">
														<GearDisplay gear={gear} />
													</div>
												</div>

												<button
													className="btn btn-outline-primary btn-sm"
													onClick={() => {
														onSelectGear(gear);
														onClose();
													}}
												>
													Select
												</button>
											</div>
										</div>
									</div>
								))}
								{type === 'hotbar' && hotbarAlways.map((gear, index: number) => (
									<div key={index} className="col-4 mb-3 ">
										<div className="card h-100 text-center">
											<div className="card-body p-2">
												<img
													src={gear.imgSrc}
													alt={gear.name}
													className="img-fluid mb-2"
													style={{ maxHeight: '100px' }}
												/>

												<p className="card-text mb-2">{gear.name}</p>
												<div className="collapse" id={`statsMenu-${index}`}>
													<div className="card card-body">
														<GearDisplay gear={gear} />
													</div>
												</div>

												<button
													className="btn btn-outline-primary btn-sm"
													onClick={() => {
														onSelectGear(gear);
														onClose();
													}}
												>
													Select
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GearSelector;
