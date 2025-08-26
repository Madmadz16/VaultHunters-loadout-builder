import GearDisplay from './GearDisplay';
import type { SavedGearProps } from './GearMaker';

interface CreateGearModalProps {
	show: boolean;
	onClose: () => void;
    onSelectGear: (gear: SavedGearProps) => void
	type: string | null
}

const getSavedItems = () => {
	const savedItems = JSON.parse(localStorage.getItem('savedGearItems') || '[]');
	console.log('Retrieved Saved Items:', savedItems);
	return savedItems;
};

const GearSelector = ({ show = false, type, onClose, onSelectGear }: CreateGearModalProps) => {
	if (!show) return null;

	const savedGear = getSavedItems();
	const filteredGear = savedGear.filter((gear: SavedGearProps) => gear.type.toLowerCase() === type?.toLowerCase());

	return (
		<>
			{/* backdrop */}
			<div className="modal-backdrop fade show" />

			{/* modal dialog */}
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
														<GearDisplay gear={gear}/>
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
