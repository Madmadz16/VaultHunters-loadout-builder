interface GearProp {
	label: string;
	imgSrc: string;
}

interface GearCardProps {
	gear: GearProp;
	onSelect: (label: string) => void;
}

function GearCard({ gear, onSelect }: GearCardProps) {
	return (
		<div className="col-3 mb-3">
			<div className="card h-100 text-center">
				<img
					src={gear.imgSrc}
					className="card-img-top"
					alt={gear.label}
					style={{ objectFit: 'cover', height: 100 }}
				/>
				<div className="card-body p-2">
					<p className="card-text mb-2">{gear.label}</p>
					<button
						className="btn btn-outline-primary btn-sm"
						onClick={() => onSelect(gear.label)}
					>
						Select
					</button>
				</div>
			</div>
		</div>
	);
}

export default GearCard;