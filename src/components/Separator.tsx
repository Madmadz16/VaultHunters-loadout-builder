import type { ReactNode } from 'react';

interface SeparatorProps {
	name: string;
	children: ReactNode;
}

const Separator = ({ name, children }: SeparatorProps) => {
	return (
		<div className="container my-4">
			<div className="text-left fw-bold mb-2">{name}</div>
			<hr className="border-black" />
			<div className="d-flex gap-3">{children}</div>
		</div>
	);
};

export default Separator;
