import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { PdfTemplate } from "../components/PdfTemplate";

export async function generatePdf(html: string, customCss?: string) {
	const blob = await pdf(
		<PdfTemplate htmlContent={html} customCss={customCss} />,
	).toBlob();
	saveAs(blob, "output.pdf");
}
