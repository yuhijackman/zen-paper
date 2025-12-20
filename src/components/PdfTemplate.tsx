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

export const PdfTemplate = ({ htmlContent, customCss }: PdfTemplateProps) => (
	<Document>
		<Page style={styles.page}>
			<Html>
				{customCss ? `<style>${customCss}</style>${htmlContent}` : htmlContent}
			</Html>
		</Page>
	</Document>
);
