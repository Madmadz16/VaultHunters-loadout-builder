interface ButtonProps {
	color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	text: string;
	onClick: () => void;
}

const Button = ({ color = 'primary', text, onClick }: ButtonProps) => {
	return (
		<button type="button" className={`btn btn-${color}`} onClick={() => onClick()}>
			{text}
		</button>
	);
};

export default Button;
