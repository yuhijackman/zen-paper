interface ToggleProps {
	mode: "markdown" | "html";
	onChange: (mode: "markdown" | "html") => void;
}

export const Toggle = ({ mode, onChange }: ToggleProps) => {
	return (
		<div className="flex gap-3 p-1 rounded-full w-fit">
			<button
				type="button"
				onClick={() => onChange("markdown")}
				className={`px-6 py-2 rounded-full text-sm font-bold transition-all border-2 ${
					mode === "markdown"
						? "bg-primary text-white border-primary shadow-md"
						: "bg-white text-primary border-primary hover:bg-primary/5"
				}`}
			>
				Markdown
			</button>
			<button
				type="button"
				onClick={() => onChange("html")}
				className={`px-6 py-2 rounded-full text-sm font-bold transition-all border-2 ${
					mode === "html"
						? "bg-primary text-white border-primary shadow-md"
						: "bg-white text-primary border-primary hover:bg-primary/5"
				}`}
			>
				HTML
			</button>
		</div>
	);
};
