import React, { useState, useEffect } from 'react';

interface SliderControlProps {
	min: number;
	max: number;
	step?: number;
	value: number;
	label?: string;
}

const SliderControl = ({ min, max, step = 1, value, label }: SliderControlProps) => {
	const [internal, setInternal] = useState<number>(value);

	// sync internal if parent value changes
	useEffect(() => {
		setInternal(value);
	}, [value]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = Number(e.target.value);
		if (!isNaN(val)) {
			setInternal(val);
		}
	};

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = Number(e.target.value);
		setInternal(val);
	};
	return (
		<>
			{/* label and number input side by side */}
			<div className="d-flex align-items-center mb-2">
				{label && <label className="form-label me-2 mb-0">{label}</label>}
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
			<input
				type="range"
				className="form-range"
				style={{ maxWidth: 200, margin: '0 auto' }}
				value={internal}
				min={min}
				max={max}
				step={step}
				onChange={handleSliderChange}
			/>
		</>
	);
};

export default SliderControl;
