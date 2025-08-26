import { useEffect,useState } from 'react';
import { gearDefinitions } from '../gear_modifiers/gearDefinitions';
import type { GearType } from '../gear_modifiers/gearDefinitions';
import BaseAttributes from './BaseAttributes';
import Attributes from './Attributes';

interface AttributesProps {
	type: string;
	value: number | boolean;
}

export interface SavedGearProps {
	name: string;
	type: string;
	level: number;
	baseAttributes: AttributesProps[]
	implicitAttributes?: AttributesProps[]
	prefixAttributes?: AttributesProps[]
	suffixAttributes?: AttributesProps[]
}

interface GearMakerProps {
	level: number;
	show: boolean;
	type: GearType;
	onClose: () => void;
}

const GearMaker = ({ level, type, show = false, onClose }: GearMakerProps) => {
	const [gearName, setGearName] = useState<string>(type); // State for gear name
    const [selectedPrefixes, setSelectedPrefixes] = useState<number>(0);
    const [selectedSuffixes, setSelectedSuffixes] = useState<number>(0);
	const [prefixesDisabled, setPrefixesDisabled] = useState<number>(0);
    const [suffixesDisabled, setSuffixesDisabled] = useState<number>(0);
    const [selectedIdol, setSelectedIdol] = useState<string>('Velara');

    // Clear attributes whenever the selected idol changes
    useEffect(() => {
        if (type === 'God Idol') {
            setSelectedPrefixes(0);
            setSelectedSuffixes(0);
        }
    }, [selectedIdol, type]);

	const getFilterType = (type: GearType): string => {
    const hotbarTypes = ['sword', 'axe']; // Add other weapon types here
    const offhandTypes = ['shield', 'wand', 'magnet', 'focus']; // Add other offhand types here

    if (hotbarTypes.includes(type.toLowerCase())) {
        return 'hotbar';
    } else if (offhandTypes.includes(type.toLowerCase())) {
        return 'offhand';
    }

    return type; // Default type for items that don't match
};

 // Function to handle saving the item
    const handleSave = () => {
		const savedBase: AttributesProps[] = [];
		const savedImplicits: AttributesProps[] = [];
		const savedPrefixes: AttributesProps[] = [];
		const savedSuffixes: AttributesProps[] = [];
	
		// Get dropdown values for base
		document.querySelectorAll('.attribute-base').forEach((element, index) => {			
			// console.log(element);
			const sliderOrCheckbox = document.querySelector(`#attribute-base-${index}`) as HTMLInputElement;
			// Determine if the element is a checkbox or a slider
			const value = sliderOrCheckbox.type === 'checkbox' ? sliderOrCheckbox.checked : parseInt(sliderOrCheckbox?.value || '0', 10);
			// console.log('value:', value);
			savedBase.push({
				type: element.textContent?.trim().replace(/\d+$/, '') || '',
				value,
			});
		})
	
		
		// Get dropdown values for implicits
		document.querySelectorAll('.attribute-Implicits').forEach((element, index) => {
			// console.log(element);
			const slider = document.querySelector(`#slider-Implicits-${index}`) as HTMLInputElement;
			// console.log('slider:', slider);
			
			savedImplicits.push({
				type: element.textContent?.trim() || '',
				value: parseFloat(slider?.value || '0'),
			});
		});
		
		// Get dropdown values for prefixes
		document.querySelectorAll('.attribute-Prefixes').forEach((element, index) => {
			// console.log(element);
			const slider = document.querySelector(`#slider-Prefixes-${index}`) as HTMLInputElement;
			// console.log('slider:', slider);
			savedPrefixes.push({
				type: element.textContent?.trim() || '',
				value: parseFloat(slider?.value || '0'),
			});
		});
		
		// Get dropdown values for suffixes
		document.querySelectorAll('.attribute-Suffixes').forEach((element, index) => {
			console.log(element);
			const slider = document.querySelector(`#slider-Suffixes-${index}`) as HTMLInputElement;
			// console.log(`slider: \nvalue: ${slider.value} \n${slider}`);
			console.log('slider:', slider);
			if (!slider) return
			savedSuffixes.push({
				type: element.textContent?.trim() || '',
				value: parseFloat(slider?.value || '0'),
			});
		});

		const filterType = getFilterType(type)
		
		const savedItem: SavedGearProps = {
			name: gearName,
        	type: filterType,
        	level,
        	baseAttributes: savedBase,
        	implicitAttributes: savedImplicits,
        	prefixAttributes: savedPrefixes,
        	suffixAttributes: savedSuffixes,
		};

		const existingItems = JSON.parse(localStorage.getItem('savedGearItems') || '[]');
    	existingItems.push(savedItem);
    	localStorage.setItem('savedGearItems', JSON.stringify(existingItems));

        console.log('Saved Item:', savedItem); // Replace this with actual save logic (e.g., API call or state update)
        onClose(); // Close the modal after saving
    };

	const getTotalAttributes = (type: GearType): number => {
		const baseAttributes = 6; // Default number of attributes
        // Offhand items have one less attribute per rarity
        const isOffhand = ['shield', 'wand', 'magnet', 'focus'].includes(type);
		
        return baseAttributes - (isOffhand ? 1 : 0);
    };

	const totalAttributes = getTotalAttributes(type);
    const maxPerCategory = Math.ceil(totalAttributes / 2); // Maximum per category (rounded up)

	useEffect(() => {
		const newPrefixesDisabled = Math.max(0, (selectedSuffixes - maxPerCategory) );
		const newSuffixesDisabled = Math.max(0, (selectedPrefixes - maxPerCategory) );
	
		setPrefixesDisabled(newPrefixesDisabled);
		setSuffixesDisabled(newSuffixesDisabled);
		}, [selectedPrefixes, selectedSuffixes, maxPerCategory]);
	
    	// Handle attribute selection
    	const handleAttributeSelect = (type: 'prefix' | 'suffix', count: number) => {
        if (type === 'prefix') {
            setSelectedPrefixes(count);
        } else {
            setSelectedSuffixes(count);
        }
    };

	if (!show) return null;

	const { ext, modifierGroup, variants } = gearDefinitions[type];
	 // Determine the correct modifier group to use
    const activeModifierGroup =
        type === 'God Idol' && variants
            ? variants[selectedIdol] // Use the selected idol's variant
            : modifierGroup; // Use the default modifier group for other gear types

    // Log the active modifier group for debugging
    console.log('Active Modifier Group:', activeModifierGroup);
	console.log(ext, modifierGroup, variants);
	
	
	return (
		<>
			{/* backdrop */}
			<div className="modal-backdrop fade show"  />

			{/* modal dialog */}
			<div
				className="modal d-block fade show d-flex justify-content-center gear-modal-overlay"
				tabIndex={-1}
				role="dialog"
			>
				<div className="modal-dialog gear-modal-dialog-custom" role="document">
					<div className="modal-content">
						<div className="card">
							<img src={`./src/assets/gear_images/${type.toLowerCase()}.${ext}`} className="card-img-top" alt={type} />
							<div className="card-body">
								<h5 className="card-title d-flex align-items-center justify-content-center">
									<b className="me-2">{type}</b>
								</h5>
								<div className="d-flex justify-content-center align-items-center mt-3 me">
									<label htmlFor="gear-name" className="me-2">{gearName} Name:</label>
									<input className="text-center" type="text" id="gear-name" value={gearName} placeholder={type} onChange={(e) => setGearName(e.target.value)} />
								</div>
								<p className="card-text text-center">
									Add your desired modifiers to your {type.toLowerCase()}
								</p>

								{/* Idol selector: shown only for idols */}
                                {type.toLowerCase().includes('idol') && (
                                    <div className="d-flex justify-content-center align-items-center mb-3">
										 <span
                                            aria-hidden
                                            className={`${selectedIdol.toLowerCase()} me-2`}
                                            style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 6, border: '1px solid rgba(0,0,0,0.15)' }}
                                        />
                                        <label htmlFor="idol-type" className="me-2">Idol Type:</label>
                                        <select
                                            id="idol-type"
                                            className={`form-select w-auto ${selectedIdol.toLowerCase()}`}
                                            value={selectedIdol}
                                            onChange={(e) => setSelectedIdol(e.target.value)}
                                        >
                                            <option>Velara</option>
                                            <option>Idona</option>
                                            <option>Tenos</option>
                                            <option>Wendarr</option>
                                        </select>
                                    </div>
                                )}
							</div>
							<BaseAttributes key={selectedIdol} attributes={activeModifierGroup.BASE_ATTRIBUTES} level={level} />
							<Attributes key={`${selectedIdol}-implicits`} title='Implicits' attributes={activeModifierGroup.IMPLICIT ?? []} level={level} />
							<Attributes key={`${selectedIdol}-prefixes`} title='Prefixes' attributes={activeModifierGroup.PREFIX ?? []} level={level} amount={maxPerCategory} disabled={prefixesDisabled} exclude={['the_vault:hithearts']} onSelect={(count) => handleAttributeSelect('prefix', count)} />
							<Attributes key={`${selectedIdol}-suffixes`} title='Suffixes' attributes={activeModifierGroup.SUFFIX ?? []} level={level} amount={maxPerCategory} disabled={suffixesDisabled} exclude={['the_vault:hithearts']} onSelect={(count) => handleAttributeSelect('suffix', count)} />
							<div>
								<button type="button" className={`btn btn-danger`} onClick={onClose}>
									Discard
								</button>
								<button type="button" className={`btn btn-success`} onClick={() => handleSave()}>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GearMaker;