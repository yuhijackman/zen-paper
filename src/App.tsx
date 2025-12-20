import { useState } from "react";
import "./index.css";
import logo from "./assets/zen-paper-logo.png";
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
		<div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
			<div className="max-w-3xl w-full space-y-8">
				<header className="flex flex-col items-center text-center">
					<img src={logo} alt="ZenPaper Logo" className="w-24 h-24 mb-4 object-contain" />
					<h1 className="text-5xl font-bold text-secondary tracking-tight mb-2">
						ZenPaper
					</h1>
					<p className="text-primary font-medium italic">
						Transform your thoughts into beautiful documents
					</p>
				</header>

				<main className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-accent/20 space-y-8 border border-accent/20">
					<div className="flex justify-center">
						<Toggle mode={mode} onChange={setMode} />
					</div>

					<div className="space-y-4">
						<label
							htmlFor="content"
							className="block text-sm font-semibold text-primary uppercase tracking-wider ml-2"
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
							className="text-primary text-sm font-medium hover:text-secondary transition-colors flex items-center gap-1 ml-2"
						>
							{showCss ? "− Hide Custom Styles" : "+ Add Custom Styles (CSS)"}
						</button>

						{showCss && (
							<TextArea
								value={customCss}
								onChange={setCustomCss}
								placeholder="h1 { color: #47A3DB; } p { font-size: 12px; }"
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
										? "bg-accent/20 text-accent cursor-not-allowed shadow-none"
										: "bg-primary text-white hover:bg-secondary shadow-accent/40"
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

				<footer className="text-center text-accent text-sm font-medium">
					Crafted with love for writers.
				</footer>
			</div>
		</div>
	);
}

export default App;
