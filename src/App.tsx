import { useState } from 'react';
import Button from './components/Button';
import Separator from './components/Separator';
import Slot from './components/Slot';
import Stats from './components/Stats';
import CreateGearMenu from './components/CreateGearMenu';
import SliderControl from './components/Slider';
import GearMaker from './components/GearMaker';

function App() {
	const [equippedSlotId, setEquippedSlotId] = useState<number | null>(1);
	const [gearMenuOpen, setGearMenuOpen] = useState(false);
	const [gearMaker, setGearMaker] = useState(false);

	const handleEquip = (id: number) => {
		setEquippedSlotId((prev) => (prev === id ? null : id));
	};
	const stats = [
		{ name: 'Ability Power', power: '0' },
		{ name: 'Area of Effect', power: '0' },
		{ name: 'Armor', power: '0' },
		{ name: 'Assassin Damage', power: '0' },
		{ name: 'Attack Damage', power: '0' },
		{ name: 'Attack Range', power: '0' },
		{ name: 'Attack Speed', power: '0' },
		{ name: 'Block Chance', power: '0' },
		{ name: 'Chaining Attack', power: '0' },
		{ name: 'Champion Damage', power: '0' },
		{ name: 'Cooldown Reduction', power: '0' },
		{ name: 'Copiously', power: '0' },
		{ name: 'Crit Hit Resistance', power: '0' },
		{ name: 'Double Damage Chance', power: '0' },
		{ name: 'Dungeon Damage', power: '0' },
		{ name: 'Durability Damage Reduction', power: '0' },
		{ name: 'Effect Duration', power: '0' },
		{ name: 'Fruit Efficiency', power: '0' },
		{ name: 'Healing Efficiency', power: '0' },
		{ name: 'Health', power: '0' },
		{ name: 'Heart Frag Chance', power: '0' },
		{ name: 'Horde Damage', power: '0' },
		{ name: 'Item Quantity', power: '0' },
		{ name: 'Item Rarity', power: '0' },
		{ name: 'Knockback Resist', power: '0' },
		{ name: 'Lucky Hit Chance', power: '0' },
		{ name: 'Mana', power: '0' },
		{ name: 'Mana Regen', power: '0' },
		{ name: 'Mining Speed', power: '0' },
		{ name: 'Reach', power: '0' },
		{ name: 'Resistance', power: '0' },
		{ name: 'Shacking Hit Chance', power: '0' },
		{ name: 'Soul Quantity', power: '0' },
		{ name: 'Stun Attack Chance', power: '0' },
		{ name: 'Sweeping Hit Chance', power: '0' },
		{ name: 'Thorns Damage', power: '0' },
		{ name: 'Trap Disarm Chance', power: '0' },
	];
	const gear = [
	{ label: 'Sword',     	imgSrc: `../public/gear_images/sword.gif`,     	onClick: () => console.log('Create Sword') },
    { label: 'Axe',       	imgSrc: `../public/gear_images/axe.gif`,       	onClick: () => console.log('Create Axe') },
    { label: 'Shield',    	imgSrc: `../public/gear_images/shield.png`,    	onClick: () => console.log('Create Shield') },
    { label: 'Wand',      	imgSrc: `../public/gear_images/wand.png`,      	onClick: () => console.log('Create Wand') },
    { label: 'Helmet',    	imgSrc: `../public/gear_images/helmet.gif`,    	onClick: () => console.log('Create Helmet') },
    { label: 'Chestplate',	imgSrc: `../public/gear_images/chestplate.gif`,	onClick: () => console.log('Create Chestplate') },
    { label: 'Leggings',  	imgSrc: `../public/gear_images/leggings.gif`,  	onClick: () => console.log('Create Leggings') },
    { label: 'Boots',     	imgSrc: `../public/gear_images/boots.gif`,     	onClick: () => console.log('Create Boots') },
    { label: 'Focus',     	imgSrc: `../public/gear_images/focus.png`,     	onClick: () => console.log('Create Focus') },
    { label: 'Magnet',    	imgSrc: `../public/gear_images/magnet.png`,    	onClick: () => console.log('Create Magnet') },
    { label: 'Void Stone',	imgSrc: `../public/gear_images/void stone.png`,	onClick: () => console.log('Create Void Stone') },
  	];

	return (
		<div>
			<Button color="primary" text="Create gear" onClick={() => setGearMenuOpen((prev) => !prev)} />
			
			<SliderControl min={0} max={100} value={0} label='Level'></SliderControl>
			<CreateGearMenu gear={gear} show={gearMenuOpen} onClose={() => setGearMenuOpen(false)} />
			<GearMaker rarity='epic' level={100} type="Sword" show={gearMaker} onClose={() => setGearMaker(false)}/>

			<Separator name="Hotbar">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
					<Slot key={id} id={id} equipped={equippedSlotId === id} onToggleEquip={() => handleEquip(id)} />
				))}
			</Separator>

			<Stats stats={stats} />
		</div>
	);
}

export default App;
