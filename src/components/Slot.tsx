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
								<div
									className="d-flex justify-content-between align-items-center"
									style={{ cursor: 'pointer' }}
									onClick={onToggleEquip}
								>
								<div>
									<span className="badge bg-secondary me-2">{id}</span>
									{name}
								</div>
									{onToggleEquip && (
                                        equipped ? (
                                            <span className="badge bg-success">Equipped</span>
                                        ) : (
                                            <span className="badge bg-secondary">Equip</span>
                                        )
                                    )}								
								</div>
							</th>
						}
					</tr>
				</thead>
				<tbody>
					<tr>
					<td key={id} className="py-4" style={{ cursor: 'pointer' }} onClick={onSelected}>
                            {/* Conditionally render gear details or text */}
                            {gear ? (
                                <GearDisplay gear={gear}></GearDisplay>
                            ) : (
                                <span>{text}</span> // Display text if no gear is equipped
                            )}
                        </td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Slot;
