import type { ReactNode } from 'react';

interface AlertProps {
	extraClasses?: string;
	children: ReactNode; 
  onClose: () => void;
}

const Alert = ({ extraClasses, children, onClose }: AlertProps) => {
	return (
		<div className={`alert alert-primary ${extraClasses}`}>
			{children}
			<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
		</div>
	);
};

export default Alert;
