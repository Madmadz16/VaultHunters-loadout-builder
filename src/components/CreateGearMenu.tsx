interface GearProp {
	label: string;
	imgSrc: string;
	onClick: () => void;
}

interface CreateGearModalProps {
    gear: GearProp[];
	show: boolean;
	onClose: () => void;
}

const CreateGearMenu = ({ gear, show, onClose }: CreateGearModalProps) => {
	if (!show) return null;

	return (
		<>
			{/* backdrop */}
			<div className="modal-backdrop fade show" onClick={onClose} />

			{/* modal dialog */}
			<div
				className="modal fade show d-block"
				tabIndex={-1}
				role="dialog"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Create Gear</h5>
							<button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
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
														opt.onClick();
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

export default CreateGearMenu;
