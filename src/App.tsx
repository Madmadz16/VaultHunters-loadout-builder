import { useState } from 'react';
import Button from './components/Button';
import Separator from './components/Separator';
import Slot from './components/Slot';
import Stats from './components/Stats';
import CreateGearMenu from './components/CreateGearMenu';
import SliderControl from './components/Slider';
import GearSelector from './components/GearSelector';
import type { SavedGearProps } from './components/GearMaker';

function App() {
	const [equippedSlotId, setEquippedSlotId] = useState<number | null>(1);
	const [gearMenuOpen, setGearMenuOpen] = useState(false);
	const [gearSelectorVisible, setGearSelectorVisible] = useState(false);
    const [level, setLevel] = useState<number>(0); // State to track the slider value
	const [slots, setSlots] = useState<{ [key: number | string]: SavedGearProps | null }>({
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
    });
	const [selectedSlotId, setSelectedSlotId] = useState<number | string | null>(null);
	const [selectedSlotType, setSelectedSlotType] = useState<string | null>(null); // Track the type of the selected slot

	const handleEquip = (id: number) => {
		setEquippedSlotId((prev) => (prev === id ? null : id));
	};
	const handleSelectSlot = (id: number | string, type: string) => {
        setSelectedSlotId(id); // Track which slot is being selected
		setSelectedSlotType(type); // Track the type of the selected slot
        setGearSelectorVisible(true); // Show GearSelector modal
    };

	const handleSelectGear = (gear: SavedGearProps) => {
	    console.log('Selected Slot ID:', selectedSlotId); // Debugging log
	    console.log('Selected Gear:', gear); // Debugging log
        if (selectedSlotId !== null) {
            setSlots((prevSlots) => ({
                ...prevSlots,
                [selectedSlotId]: gear, // Assign selected gear to the slot
            }));
        }
		
        setGearSelectorVisible(false); // Close the modal
    };

	const calculateStats = (): { name: string; power: string }[] => {
    // Define all possible stats with default values
    const allStats: { [key: string]: number } = {
        'ability power': 0,
        'area of effect': 0,
        'armor': 0,
        'assassin damage': 0,
        'attack damage': 0,
        'attack range': 0,
        'attack speed': 0,
        'block chance': 0,
        'chaining attack': 0,
        'champion damage': 0,
        'cooldown reduction': 0,
        'copiously': 0,
        'crit hit resistance': 0,
        'double damage chance': 0,
        'dungeon damage': 0,
        'durability damage reduction': 0,
        'effect duration': 0,
        'fruit efficiency': 0,
        'healing efficiency': 0,
        'health': 0,
        'heart frag chance': 0,
        'horde damage': 0,
        'item quantity': 0,
        'item rarity': 0,
        'knockback resist': 0,
        'lucky hit chance': 0,
        'mana': 0,
        'mana regen': 0,
        'mining speed': 0,
        'reach': 0,
        'resistance': 0,
        'shacking hit chance': 0,
        'soul quantity': 0,
        'stun attack chance': 0,
        'sweeping hit chance': 0,
        'thorns damage': 0,
        'trap disarm chance': 0,
    };

    // Iterate through all equipped gear and add their stats to the combined stats
    Object.values(slots).forEach((gear) => {
        if (gear) {
            [...gear.baseAttributes, ...(gear.implicitAttributes || []), ...(gear.prefixAttributes || []), ...(gear.suffixAttributes || [])].forEach((attribute) => {
                const normalizedType = attribute.type.toLowerCase(); // Normalize the stat name to lowercase
                if (typeof attribute.value === 'number' && normalizedType in allStats) {
                    allStats[normalizedType] += attribute.value;
                }
            });
        }
    });

    // Convert the stats object into an array of { name, power } for display
    return Object.entries(allStats).map(([name, power]) => ({
        name: name.replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalize the first letter of each word
        power: power.toString(),
    }));
};
	
	const gear = [
	{ label: 'Sword',     	imgSrc: `../public/gear_images/sword.gif` },
    { label: 'Axe',       	imgSrc: `../public/gear_images/axe.gif` },
    { label: 'Shield',    	imgSrc: `../public/gear_images/shield.png` },
    { label: 'Wand',      	imgSrc: `../public/gear_images/wand.png` },
    { label: 'Helmet',    	imgSrc: `../public/gear_images/helmet.gif` },
    { label: 'Chestplate',	imgSrc: `../public/gear_images/chestplate.gif` },
    { label: 'Leggings',  	imgSrc: `../public/gear_images/leggings.gif` },
    { label: 'Boots',     	imgSrc: `../public/gear_images/boots.gif` },
    { label: 'Focus',     	imgSrc: `../public/gear_images/focus.png` },
    { label: 'Magnet',    	imgSrc: `../public/gear_images/magnet.png` },
    { label: 'Void Stone',	imgSrc: `../public/gear_images/void stone.png` },
    { label: 'God Idol',	imgSrc: `../public/gear_images/godcharm.gif` },
  	];

	return (
		<div>
			<Button color='primary' text='Create gear' onClick={() => setGearMenuOpen((prev) => !prev)} />
			
			<SliderControl min={0} max={100} value={0} label='Level' onChange={(newLevel) => setLevel(newLevel)}></SliderControl>

			<CreateGearMenu gear={gear} level={level} show={gearMenuOpen} onClose={() => setGearMenuOpen(false)} />

			<Separator name='Armour'>
					<Slot id='Helmet' gear={slots['Helmet']} onSelected={() => handleSelectSlot('Helmet', 'helmet')} />
					<Slot id='Chestplate' gear={slots['Chestplate']} onSelected={() => handleSelectSlot('Chestplate', 'chestplate')} />
					<Slot id='Leggings' gear={slots['Leggings']} onSelected={() => handleSelectSlot('Leggings', 'leggings')} />
					<Slot id='Boots' gear={slots['Boots']} onSelected={() => handleSelectSlot('Boots', 'boots')} />
					<Slot id='Offhand' gear={slots['Offhand']} onSelected={() => handleSelectSlot('Offhand', 'offhand')} />
			</Separator>

			<Separator name='Curio Slots'>
				<Slot id='God Idol' gear={slots['God Idol']} onSelected={() => handleSelectSlot('God Idol', 'godIdol')} />
				<Slot id='Blue Trinket' gear={slots['Blue Trinket']} onSelected={() => handleSelectSlot('Blue Trinket', 'blueTrinket')} />
				<Slot id='Red Trinket' gear={slots['Red Trinket']} onSelected={() => handleSelectSlot('Red Trinket', 'redTrinket')} />
				<Slot id='Void Stone' gear={slots['Void Stone']} onSelected={() => handleSelectSlot('Void Stone', 'voidStone')} />
				<Slot id='Magnet' gear={slots['Magnet']} onSelected={() => handleSelectSlot('Magnet', 'magnet')} />
			</Separator>

			<Separator name='Hotbar'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
					<Slot id={id} equipped={equippedSlotId === id} gear={slots[id]} onToggleEquip={() => handleEquip(id)} onSelected={() => handleSelectSlot(id, 'hotbar')} />
				))}
			</Separator>

			<GearSelector
                show={gearSelectorVisible}
                onClose={() => setGearSelectorVisible(false)} // Hide GearSelector when closed
				onSelectGear={handleSelectGear}
				type={selectedSlotType}
            />

			<Stats stats={calculateStats()} />
		</div>
	);
}

export default App;
