import type { SavedGearProps } from './GearMaker';
import Separator from './Separator';

interface GearDisplayProps {
	gear: SavedGearProps | null; // The gear to display
}

const GearDisplay = ({ gear }: GearDisplayProps) => {
	if (!gear) {
		return <span>No gear equipped</span>; // Display a fallback message if no gear is equipped
	}

	return (
		<div className="">
			<h5>{gear.name}</h5> {/* Display gear name */}
			<Separator name="Base Attributes">
				{gear.baseAttributes?.map((attribute) => (
					<>
						{attribute.type}:{' '}
						{typeof attribute.value === 'boolean' ? attribute.value.toString() : attribute.value}
                        <br/>
					</>
				))}
			</Separator>
			<Separator name="Implicits">
				{gear.implicitAttributes?.map((attribute) => (
					<>
						{attribute.type}:{' '}
						{typeof attribute.value === 'boolean' ? attribute.value.toString() : attribute.value}
                        <br/>
					</>
				))}
			</Separator>
			<Separator name="Prefixes">
				{gear.prefixAttributes?.map((attribute) => (
					<>
						{attribute.type}:{' '}
						{typeof attribute.value === 'boolean' ? attribute.value.toString() : attribute.value}
                        <br/>
					</>
				))}
			</Separator>
			<Separator name="Suffixes">
				{gear.suffixAttributes?.map((attribute) => (
					<>
						{attribute.type}:{' '}
						{typeof attribute.value === 'boolean' ? attribute.value.toString() : attribute.value}
                        <br/>
					</>
				))}
			</Separator>
		</div>
	);
};

export default GearDisplay;
