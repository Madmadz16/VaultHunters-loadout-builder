import { compress, decompress } from 'brotli-compress';
import type { AttributesProps, SavedGearProps } from '../components/GearMaker';

type RawAttribute = [number, number | boolean];
type Dict = string[];

interface RawGear {
	n: string;
	t: string;
	l: number;
	ba?: RawAttribute[];
	ia?: RawAttribute[];
	pa?: RawAttribute[];
	sa?: RawAttribute[];
}

interface RawToken {
	d: string[];
	[slotId: string]: RawGear | string[];
}

const attributeMap: Record<string, string> = {
	name: 'n',
	type: 't',
	level: 'l',
	baseAttributes: 'ba',
	implicitAttributes: 'ia',
	prefixAttributes: 'pa',
	suffixAttributes: 'sa',
	dict: 'd',
};

type SlotsState = { [key: number | string]: SavedGearProps | null };

const toBase64Url = (bytes: Uint8Array): string => {
	let binary = '';
	for (const b of bytes) {
		binary += String.fromCharCode(b);
	}
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const fromBase64Url = (str: string): Uint8Array => {
	const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
	const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
	const binary = atob(padded);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes;
};

async function parseShareToken<T = object>(token: string): Promise<T> {
	const prefix = 'br1.';
	if (!token.startsWith(prefix)) {
		throw new Error(`Invalid token format: expected prefix "${prefix}"`);
	}
	const encoded = token.slice(prefix.length);
	const compressed = fromBase64Url(encoded);
	const decompressed = await decompress(compressed);
	const jsonString = new TextDecoder().decode(decompressed);
	return JSON.parse(jsonString) as T;
}

const remapIndexes = (attrs: AttributesProps[], indexMap: Map<number, number>) => {
	for (const pair of attrs) {
		const nextIndex = indexMap.get(pair[0]);
		if (nextIndex !== undefined) pair[0] = nextIndex;
	}
};

export async function buildShareToken(slots: SlotsState, dict: string[]): Promise<string> {
	const mapKey = (key: string) => attributeMap[key] ?? key;

	const mappedSlots = Object.fromEntries(
		Object.entries(slots)
			.filter(([, gear]) => Boolean(gear))
			.map(([slotId, gear]) => {
				const safeGear = gear as SavedGearProps;
				const mappedGear = {
					[mapKey('name')]: safeGear.name,
					[mapKey('type')]: safeGear.type,
					[mapKey('level')]: safeGear.level,
					[mapKey('baseAttributes')]: safeGear.baseAttributes,
					[mapKey('implicitAttributes')]: safeGear.implicitAttributes ?? [],
					[mapKey('prefixAttributes')]: safeGear.prefixAttributes ?? [],
					[mapKey('suffixAttributes')]: safeGear.suffixAttributes ?? [],
				};
				const compactGear = Object.fromEntries(
					Object.entries(mappedGear).filter(
						([, value]) => !(Array.isArray(value) && value.length === 0),
					),
				);

				return [slotId, compactGear];
			}),
	);

	const payload = {
		[mapKey('dict')]: dict,
		...mappedSlots,
	};
	const stringedPayload: string = JSON.stringify(payload);
	const payloadBytes = new TextEncoder().encode(stringedPayload);
	const compressed = await compress(payloadBytes);
	return `br1.${toBase64Url(compressed)}`;
}

export async function importBuild(code: string): Promise<Record<string, SavedGearProps>> {
	const data: RawToken = await parseShareToken(code);

	const mappedSlots = Object.fromEntries(
		Object.entries(data)
			.filter((entry): entry is [string, RawGear] => entry[0] !== 'd')
			.map(([slotId, gear]) => {
				const mapAttributes = (attrs: RawAttribute[] = []) =>
					attrs.map(([index, value]) => [index, value] as RawAttribute);

				const restoredGear: SavedGearProps = {
					name: gear['n'],
					type: gear['t'],
					level: gear['l'],
					baseAttributes: mapAttributes(gear['ba']),
					implicitAttributes: mapAttributes(gear['ia']),
					prefixAttributes: mapAttributes(gear['pa']),
					suffixAttributes: mapAttributes(gear['sa']),
				};

				return [slotId, restoredGear];
			}),
	);
	const savedGearDict: Dict = JSON.parse(window.localStorage.getItem('savedGearDict') ?? '[]');

	const dict: Dict = data.d;
	for (const entry of dict) {
		if (!savedGearDict.includes(entry)) savedGearDict.push(entry);
	}

	const indexMap = new Map<number, number>();
	dict.forEach((entry, oldIndex) => {
		const newIndex = savedGearDict.indexOf(entry);
		if (newIndex !== oldIndex) indexMap.set(oldIndex, newIndex);
	});

	Object.values(mappedSlots).forEach((slot) => {
		const attrArrays = [
			slot.baseAttributes,
			slot.implicitAttributes,
			slot.prefixAttributes,
			slot.suffixAttributes,
		];

		for (const attrs of attrArrays) {
			if (attrs) remapIndexes(attrs, indexMap);
		}
	});

	window.localStorage.setItem('savedGearDict', JSON.stringify(savedGearDict));
	const existingItems = JSON.parse(window.localStorage.getItem('savedGearItems') ?? '[]') as SavedGearProps[];
	existingItems.push(...Object.values(mappedSlots));
	window.localStorage.setItem('savedGearItems', JSON.stringify(existingItems));

	return mappedSlots;	
}