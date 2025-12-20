interface ToggleProps {
	mode: "markdown" | "html";
	onChange: (mode: "markdown" | "html") => void;
}

export const Toggle = ({ mode, onChange }: ToggleProps) => {
	return (
		<div className="flex bg-orange-50 p-1 rounded-full w-fit">
			<button
				type="button"
				onClick={() => onChange("markdown")}
				className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
					mode === "markdown"
						? "bg-white text-orange-600 shadow-sm"
						: "text-orange-400 hover:text-orange-500"
				}`}
			>
				Markdown
			</button>
			<button
				type="button"
				onClick={() => onChange("html")}
				className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
					mode === "html"
						? "bg-white text-orange-600 shadow-sm"
						: "text-orange-400 hover:text-orange-500"
				}`}
			>
				HTML
			</button>
		</div>
	);
};
