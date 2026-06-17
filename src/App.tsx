import { useCallback, useEffect, useState } from 'react';
import Button from './components/Button';
import Separator from './components/Separator';
import Slot from './components/Slot';
import Stats from './components/Stats';
import CreateGearMenu from './components/CreateGearMenu';
import SliderControl from './components/Slider';
import GearSelector from './components/GearSelector';
import type { SavedGearProps } from './components/GearMaker';
import { gearItems } from './data/gearData';
import { buildShareToken, importBuild } from './Services/gearShareService';
import { calculateStatsForSlots } from './Services/statsService';

const defaultSlots = {
	1: null,
	2: null,
	3: null,
	4: null,
	5: null,
	6: null,
	7: null,
	8: null,
	9: null,
	Helmet: null,
	Chestplate: null,
	Leggings: null,
	Boots: null,
	Offhand: null,
	godIdol: null,
	blueTrinket: null,
	redTrinket: null,
	voidStone: null,
	magnet: null,
};

function App() {
	const [equippedSlotId, setEquippedSlotId] = useState<number | null>(1);
	const [gearMenuOpen, setGearMenuOpen] = useState(false);
	const [gearSelectorVisible, setGearSelectorVisible] = useState(false);
	const [level, setLevel] = useState<number>(0); 
	const [slots, setSlots] = useState<{ [key: number | string]: SavedGearProps | null }>(defaultSlots);
	const [selectedSlotId, setSelectedSlotId] = useState<number | string | null>(null);
	const [selectedSlotType, setSelectedSlotType] = useState<string | null>(null); 

	const [compressed, setCompressed] = useState<string>('');

	const handleEquip = (id: number) => {
		setEquippedSlotId((prev) => (prev === id ? null : id));
	};
	const handleSelectSlot = (id: number | string, type: string) => {
		setSelectedSlotId(id); 
		setSelectedSlotType(type); 
		setGearSelectorVisible(true); 
	};

	const handleSelectGear = (gear: SavedGearProps) => {
		console.log('Selected Slot ID:', selectedSlotId); 
		console.log('Selected Gear:', gear); 
		if (selectedSlotId !== null) {
			setSlots((prevSlots) => ({
				...prevSlots,
				[selectedSlotId]: gear, 
			}));
		}

		setGearSelectorVisible(false); 
	};

	const getEquippedGear = useCallback(async () => {
		const dict: string[] = JSON.parse(localStorage.getItem('savedGearDict') || '[]');
		return buildShareToken(slots, dict);
	}, [slots]);

	useEffect(() => {
		let isMounted = true;

		async function getEncrypt() {
			const token = await getEquippedGear();
			if (isMounted) {
				setCompressed(token);
			}
		}

		getEncrypt();

		return () => {
			isMounted = false;
		};
	}, [getEquippedGear]);

	const copyCode = async () => {
		await navigator.clipboard.writeText(compressed)
	}

	const importGear = async () =>  {
		const code: string | null = window.prompt('Build code:')
		if (!code) return;
		const restoredSlots = await importBuild(code);
		setSlots({
			...defaultSlots,
			...restoredSlots,
		});
	}

	const gear = gearItems;
	const globalDict: string[] = JSON.parse(localStorage.getItem('savedGearDict') || '[]');

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Button color="primary" text="Create gear" onClick={() => setGearMenuOpen((prev) => !prev)} />
				<div style={{ display: 'flex', gap: '8px' }}>
					<textarea name="shareCode" readOnly={true} value={compressed} />
					<Button
						color="secondary"
						text="Copy"
						onClick={() => {
							copyCode();
						}}
					/>
					<Button color="secondary" text="Import build" onClick={() => importGear()} />
				</div>
			</div>

			<SliderControl
				min={0}
				max={100}
				value={0}
				label="Level"
				onChange={(newLevel) => setLevel(newLevel)}
			></SliderControl>

			<CreateGearMenu
				gear={gear}
				level={level}
				show={gearMenuOpen}
				onClose={() => setGearMenuOpen(false)}
			/>

			<Separator name="Armour">
				<Slot
					id="Helmet"
					gear={slots['Helmet']}
					onSelected={() => handleSelectSlot('Helmet', 'helmet')}
				/>
				<Slot
					id="Chestplate"
					gear={slots['Chestplate']}
					onSelected={() => handleSelectSlot('Chestplate', 'chestplate')}
				/>
				<Slot
					id="Leggings"
					gear={slots['Leggings']}
					onSelected={() => handleSelectSlot('Leggings', 'leggings')}
				/>
				<Slot
					id="Boots"
					gear={slots['Boots']}
					onSelected={() => handleSelectSlot('Boots', 'boots')}
				/>
			</Separator>

			<Separator name="Curio Slots">
				<Slot
					id="God Idol"
					gear={slots['God Idol']}
					onSelected={() => handleSelectSlot('God Idol', 'godIdol')}
				/>
				<Slot
					id="Blue Trinket"
					gear={slots['Blue Trinket']}
					onSelected={() => handleSelectSlot('Blue Trinket', 'blueTrinket')}
				/>
				<Slot
					id="Red Trinket"
					gear={slots['Red Trinket']}
					onSelected={() => handleSelectSlot('Red Trinket', 'redTrinket')}
				/>
				<Slot
					id="Void Stone"
					gear={slots['Void Stone']}
					onSelected={() => handleSelectSlot('Void Stone', 'voidStone')}
				/>
				<Slot
					id="Magnet"
					gear={slots['Magnet']}
					onSelected={() => handleSelectSlot('Magnet', 'magnet')}
				/>
			</Separator>

			<Separator name="Hotbar">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
					<Slot
						id={id}
						equipped={equippedSlotId === id}
						gear={slots[id]}
						onToggleEquip={() => handleEquip(id)}
						onSelected={() => handleSelectSlot(id, 'hotbar')}
					/>
				))}
				<Slot
					id="Offhand"
					gear={slots['Offhand']}
					onSelected={() => handleSelectSlot('Offhand', 'offhand')}
				/>
			</Separator>

			<GearSelector
				show={gearSelectorVisible}
				onClose={() => setGearSelectorVisible(false)} 
				onSelectGear={handleSelectGear}
				type={selectedSlotType}
			/>

			<Stats stats={calculateStatsForSlots(slots, equippedSlotId, globalDict)} />
		</div>
	);
}

export default App;