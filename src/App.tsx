import { useState } from "react";
import "./index.css";
import { TextArea } from "./components/TextArea";
import { Toggle } from "./components/Toggle";
import { generatePdf } from "./lib/generator";
import { parseMarkdown } from "./lib/markdown";

function App() {
	const [input, setInput] = useState("");
	const [customCss, setCustomCss] = useState("");
	const [mode, setMode] = useState<"markdown" | "html">("markdown");
	const [isGenerating, setIsGenerating] = useState(false);
	const [showCss, setShowCss] = useState(false);

	const handleGenerate = async () => {
		if (!input.trim()) return;

		setIsGenerating(true);
		try {
			let html = input;
			if (mode === "markdown") {
				html = await parseMarkdown(input);
			}
			await generatePdf(html, customCss);
		} catch (error) {
			console.error("Failed to generate PDF:", error);
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#fcf9f7]">
			<div className="max-w-3xl w-full space-y-8">
				<header className="text-center">
					<h1 className="text-5xl font-bold text-orange-900 tracking-tight mb-2">
						ZenPaper
					</h1>
					<p className="text-orange-600 font-medium italic">
						Transform your thoughts into beautiful documents
					</p>
				</header>

				<main className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-orange-100/50 space-y-8 border border-orange-50">
					<div className="flex justify-center">
						<Toggle mode={mode} onChange={setMode} />
					</div>

					<div className="space-y-4">
						<label
							htmlFor="content"
							className="block text-sm font-semibold text-orange-400 uppercase tracking-wider ml-2"
						>
							Content
						</label>
						<TextArea
							id="content"
							value={input}
							onChange={setInput}
							placeholder={
								mode === "markdown"
									? `Type your markdown here... 

# My Story
Once upon a time...`
									: `Type your HTML here... 

<h1>My Story</h1>
<p>Once upon a time...</p>`
							}
						/>
					</div>

					<div className="space-y-4">
						<button
							type="button"
							onClick={() => setShowCss(!showCss)}
							className="text-orange-400 text-sm font-medium hover:text-orange-500 transition-colors flex items-center gap-1 ml-2"
						>
							{showCss ? "− Hide Custom Styles" : "+ Add Custom Styles (CSS)"}
						</button>

						{showCss && (
							<TextArea
								value={customCss}
								onChange={setCustomCss}
								placeholder="h1 { color: #c2410c; } p { font-size: 12px; }"
								className="h-32 text-sm font-mono border-dashed"
							/>
						)}
					</div>

					<div className="flex justify-center pt-4">
						<button
							type="button"
							onClick={handleGenerate}
							disabled={isGenerating || !input.trim()}
							className={`
                px-12 py-5 rounded-full text-xl font-bold shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]
                ${
									isGenerating || !input.trim()
										? "bg-orange-100 text-orange-300 cursor-not-allowed shadow-none"
										: "bg-orange-400 text-white hover:bg-orange-500 shadow-orange-200"
								}
              `}
						>
							{isGenerating ? (
								<span className="flex items-center gap-2">
									<svg
										className="animate-spin h-6 w-6 text-white"
										viewBox="0 0 24 24"
										aria-label="Loading"
										role="img"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
											fill="none"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Crafting...
								</span>
							) : (
								"Generate PDF"
							)}
						</button>
					</div>
				</main>

				<footer className="text-center text-orange-200 text-sm font-medium">
					Crafted with love for writers.
				</footer>
			</div>
		</div>
	);
}

export default App;
