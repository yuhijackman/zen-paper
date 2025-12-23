export async function processHtmlImages(html: string): Promise<string> {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const images = Array.from(doc.querySelectorAll("img"));

	await Promise.all(
		images.map(async (img) => {
			const src = img.getAttribute("src");
			if (!src) return;

			try {
				const response = await fetch(src);
				const blob = await response.blob();
				const base64 = await new Promise<string>((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result as string);
					reader.onerror = reject;
					reader.readAsDataURL(blob);
				});
				img.setAttribute("src", base64);
			} catch (error) {
				console.error(`Failed to load image: ${src}`, error);
			}
		}),
	);

	return doc.body.innerHTML;
}
