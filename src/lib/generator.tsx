import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { PdfTemplate } from "../components/PdfTemplate";
import { processHtmlImages } from "./image-processor";

export async function generatePdf(html: string, customCss?: string) {
	const processedHtml = await processHtmlImages(html);
	const blob = await pdf(
		<PdfTemplate htmlContent={processedHtml} customCss={customCss} />,
	).toBlob();
	saveAs(blob, "output.pdf");
}
