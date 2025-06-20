import { gearDefinitions } from "../gear_modifiers/gearDefinitions";
import type { GearType } from "../gear_modifiers/gearDefinitions";

interface GearMakerProps {
	rarity: 'scrappy' | 'common' | 'rare' | 'epic' | 'omega';
	level: number;
	show: boolean;
	type: GearType;
	onClose: () => void;
}

const GearMaker = ({ rarity, level, type, show = false, onClose }: GearMakerProps) => {
	if (show) return null;

	const { ext, modifiers } = gearDefinitions[type];
	console.log(modifiers);
	
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
							<img
								src={`./src/assets/gear_images/${type}.${ext}`}
								className="card-img-top"
								alt={type}
							/>
							<div className="card-body">
								<h5 className="card-title text-center">{type}</h5>
								<p className="card-text">
									Add your desired modifiers to your {type.toLowerCase()}
								</p>
							</div>
							<b>Implicits</b>
							<ul className="list-group list-group-flush">
								
								<li className="list-group-item">An item</li>
								<li className="list-group-item">A second item</li>
								<li className="list-group-item">A third item</li>
							</ul>
							<b>Prefixes</b>
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
							</ul>
							<div>
								<button type="button" className={`btn btn-danger`}>Discard</button>
								<button type="button" className={`btn btn-success`}>Save</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GearMaker;
