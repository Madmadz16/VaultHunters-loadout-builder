import React, { useState, useEffect } from 'react';

interface SliderControlProps {
	min: number;
	max: number;
	step?: number;
	value: number;
	label?: string;
	id?: string
	onChange?: (level: number) => void;
}

const SliderControl = ({ min, max, step = 1, value, label, id, onChange }: SliderControlProps) => {
	const [internal, setInternal] = useState<number>(value);

	useEffect(() => {
		setInternal(value);
	}, [value]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = Number(e.target.value);
		if (!isNaN(val)) {
			setInternal(val);
		}
		if (onChange) onChange(Number(e.target.value));
	};

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = Number(e.target.value);
		setInternal(val);
		if (onChange) onChange(Number(e.target.value));
	};
	return (
		<>
			{label && <label className="form-label me-2 mb-0">{label}</label>}
			<div className="d-flex align-items-center mb-2">
				<input
					type="number"
					className="form-control text-center"
					style={{ width: 80 }}
					value={internal}
					min={min}
					max={max}
					step={step}
					onChange={handleInputChange}
				/>
			</div>
			{min && <label className={`form-label me-2 mb-0 `}>{min}</label>}
			<input
				type="range"
				className={`form-range`}
				id={id}
				style={{ maxWidth: 200, margin: '0 auto' }}
				value={internal}
				min={min}
				max={max}
				step={step}
				onChange={handleSliderChange}
			/>
			{max && <label className="form-label me-2 mb-0">{max}</label>}
		</>
	);
};

export default SliderControl;
