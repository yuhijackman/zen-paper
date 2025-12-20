interface TextAreaProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	id?: string;
}

export const TextArea = ({
	value,
	onChange,
	placeholder,
	className = "",
	id,
}: TextAreaProps) => {
	return (
		<textarea
			id={id}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className={`w-full h-64 p-4 rounded-2xl border-2 border-orange-100 bg-white shadow-sm focus:border-orange-200 focus:ring-0 transition-all resize-none text-gray-700 placeholder-gray-300 ${className}`}
		/>
	);
};
