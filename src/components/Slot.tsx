import GearDisplay from "./GearDisplay";
import type { SavedGearProps } from "./GearMaker";

interface SlotProps {
	id: number | string;
	name?: string;
	equipped?: boolean;
	text?: string;
	gear?: SavedGearProps | null;
	onToggleEquip?: () => void;
	onSelected: () => void;
}

const Slot = ({ id, name, equipped = false, text = 'Select Gear', gear, onToggleEquip, onSelected }: SlotProps) => {
	return (
		<div className="mt-4">
			<table className="table table-bordered text-white border-secondary">
				<thead>
					<tr>
						{
							<th key={id} className="align-middle">
								gear: SavedGearProps | null; The gear to display return{' '}
								<span>No gear equipped</span>; Display a fallback message if no gear is
								equipped								<div
									className="d-flex justify-content-between align-items-center"
									style={{ cursor: 'pointer' }}
									onClick={onToggleEquip}
								>
									<div>
										<span className="badge bg-secondary me-2">{id}</span>
										{name}
									</div>
									{onToggleEquip &&
										(equipped ? (
											<span className="badge bg-success">Equipped</span>
										) : (
											<span className="badge bg-secondary">Equip</span>
										))}
								</div>
							</th>
						}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td key={id} className="py-4" style={{ cursor: 'pointer' }} onClick={onSelected}>
							{gear ? (
								<GearDisplay gear={gear}></GearDisplay>
							) : (
								<span>{text}</span>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Slot;
