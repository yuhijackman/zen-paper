import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import Html from "react-pdf-html";

interface PdfTemplateProps {
	htmlContent: string;
	customCss?: string;
}

const styles = StyleSheet.create({
	page: {
		padding: 20,
	},
});

const defaultCss = `
	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 10px;
		border: 1px solid #e5e7eb;
	}
	th, td {
		border: 1px solid #e5e7eb;
		padding: 5px;
		text-align: left;
		font-size: 10px;
	}
	th {
		background-color: #f9fafb;
		font-weight: bold;
	}
	pre {
		background-color: #f3f4f6;
		padding: 10px;
		border-radius: 4px;
		margin-bottom: 10px;
		font-family: Courier;
	}
	code {
		font-family: Courier;
		background-color: #f3f4f6;
		padding: 2px 4px;
		border-radius: 4px;
	}
	blockquote {
		border-left: 4px solid #d1d5db;
		padding-left: 10px;
		margin-left: 0;
		color: #4b5563;
	}
`;

export const PdfTemplate = ({ htmlContent, customCss }: PdfTemplateProps) => (
	<Document>
		<Page style={styles.page}>
			<Html>
				{`<style>${defaultCss}${customCss || ""}</style>${htmlContent}`}
			</Html>
		</Page>
	</Document>
);
