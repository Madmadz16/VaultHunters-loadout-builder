import type { SavedGearProps } from './GearMaker';
import Separator from './Separator';
import { normalizeSavedAttribute } from '../Services/attributeService';
import { getSavedGearDict } from '../Services/gearStorageService';

interface GearDisplayProps {
	gear: SavedGearProps | null;
}

const GearDisplay = ({ gear }: GearDisplayProps) => {
	if (!gear) {
		return <span>No gear equipped</span>;
	}
	const globalDict: string[] = getSavedGearDict();

	return (
		<div className="">
			<h5>{gear.name}</h5>
			<Separator name="Base Attributes">
				{gear.baseAttributes?.map((attribute) => {
					const [typeName, value] = normalizeSavedAttribute(attribute, globalDict);
					return (
					<>
						{typeName}:{' '}
						{typeof value === 'boolean' ? value.toString() : value}
                        <br/>
					</>
					);
				})}
			</Separator>
			<Separator name="Implicits">
				{gear.implicitAttributes?.map((attribute) => {
					const [typeName, value] = normalizeSavedAttribute(attribute, globalDict);
					return (
					<>
						{typeName}:{' '}
						{typeof value === 'boolean' ? value.toString() : value}
                        <br/>
					</>
					);
				})}
			</Separator>
			<Separator name="Prefixes">
				{gear.prefixAttributes?.map((attribute) => {
					const [typeName, value] = normalizeSavedAttribute(attribute, globalDict);
					return (
					<>
						{typeName}:{' '}
						{typeof value === 'boolean' ? value.toString() : value}
                        <br/>
					</>
					);
				})}
			</Separator>
			<Separator name="Suffixes">
				{gear.suffixAttributes?.map((attribute) => {
					const [typeName, value] = normalizeSavedAttribute(attribute, globalDict);
					return (
					<>
						{typeName}:{' '}
						{typeof value === 'boolean' ? value.toString() : value}
                        <br/>
					</>
					);
				})}
			</Separator>
		</div>
	);
};

export default GearDisplay;
