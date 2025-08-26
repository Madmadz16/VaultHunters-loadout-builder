import GearMaker from './GearMaker';
import { useState } from 'react';
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
	const [selectedGearLabel, setSelectedGearLabel] = useState<GearType | null>(null);

	if (!show && !gearMakerVisible) return null;

	return (
		<>
			{/* backdrop */}
			<div className="modal-backdrop fade show" />

			{/* modal dialog */}
			<div className="modal fade show d-block" tabIndex={-1} role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Create Gear</h5>
							<button type="button" className="btn-close" aria-label="Close" onClick={() => onClose()}/>
						</div>
						<div className="modal-body">
							<div className="row">
								{gear.map((opt, index) => (
									<div key={index} className="col-3 mb-3">
										<div className="card h-100 text-center">
											<img
												src={opt.imgSrc}
												className="card-img-top"
												alt={opt.label}
												style={{ objectFit: 'cover', height: 100 }}
											/>
											<div className="card-body p-2">
												<p className="card-text mb-2">{opt.label}</p>
												<button
													className="btn btn-outline-primary btn-sm"
													onClick={() => {
														setSelectedGearLabel(opt.label as GearType); // Set the selected gear type
														setGearMakerVisible(true); // Show GearMaker modal
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
			{/* GearMaker modal */}
			{gearMakerVisible && selectedGearLabel && (
				<GearMaker 
				level={level} 
				type={selectedGearLabel as GearType} 
				show={gearMakerVisible} 
				onClose={() => setGearMakerVisible(false)} />
			)}
		</>
	);
};

export default CreateGearMenu;
