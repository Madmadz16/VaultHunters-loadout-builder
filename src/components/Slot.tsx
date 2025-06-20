interface SlotProps {
	id: number;
	name?: string;
	equipped?: boolean;
	text?: string;
	onToggleEquip: () => void;
}

const Slot = ({ id, name, equipped = false, text = 'Select Gear', onToggleEquip }: SlotProps) => {
	return (
		<div className="mt-4">
			<table className="table table-bordered text-white border-secondary">
				<thead>
					<tr>
						{
							<th key={id} className="align-middle">
								<div
									className="d-flex justify-content-between align-items-center"
									style={{ cursor: 'pointer' }}
									onClick={onToggleEquip}
								>
									<div>
										<span className="badge bg-secondary me-2">{id}</span>
										{name}
									</div>
									{equipped && <span className="badge bg-success">Equipped</span>}
									{!equipped && <span className="badge bg-secondary">Equip</span>}
								</div>
							</th>
						}
					</tr>
				</thead>
				<tbody>
					<tr>
						{
							<td key={id} className="py-4">
								<span>{text}</span>
							</td>
						}
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Slot;
