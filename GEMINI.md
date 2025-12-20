Technical Specification: Client-Side HTML/Markdown to PDF Converter1. Executive SummaryA lightweight Single Page Application (SPA) designed to convert user-provided Markdown or HTML/CSS into a formatted, high-quality PDF. The system runs entirely in the browser (client-side) to ensure data privacy and low latency. The primary use case is generating e-books, requiring that all text in the output PDF remains selectable, searchable, and accessible.2. Technology StackComponentTechnologyRationaleFrameworkReact (Vite build tool)Efficient state management for the live preview/editor.Markdown EngineUnified (Remark/Rehype)Industry standard for AST-based Markdown transformation.PDF Core@react-pdf/rendererRenders native PDFs with a layout engine (Yoga) inside the browser. Ensures selectable text.HTML Bridgereact-pdf-htmlConverts HTML strings into @react-pdf primitives (<View>, <Text>).CSS Parsercss-to-react-native (or custom helper)Converts raw CSS strings into style objects compatible with the PDF renderer.Input UICodeMirror (or simple textarea)Better UX for editing code than a standard textarea.3. Architecture & Data FlowThe Revised 4-Step ProcessWe have optimized the process to eliminate the "HTML → SVG" bottleneck.Input: User inputs raw Markdown or HTML + CSS.Normalization (Unified):If Markdown: Parse MD to AST → Compile to HTML String.If HTML: Sanitize and prepare HTML String.PDF Primitive Mapping (The Engine):The HTML string is parsed by react-pdf-html.DOM nodes (div, p, h1) are mapped to PDF primitives (View, Text).User CSS is parsed and applied to these primitives.Generation & IO:@react-pdf/renderer calculates layout (line breaks, page wraps) in a Web Worker or Main Thread.A binary Blob is generated.Browser triggers saveAs.4. Functional Requirements4.1. User InterfaceMode Toggler: A switch to toggle between "Markdown Mode" and "HTML/CSS Mode".Editor Pane:Markdown Mode: Single text area.HTML Mode: Two text areas (one for HTML structure, one for CSS).Action Button: "Generate PDF" button (disabled if input is empty).Preview (Optional but Recommended): A live HTML preview to see what the content looks like before conversion.4.2. Core Processing LogicA. Markdown Transformation (Using Unified)The system must convert Markdown to valid HTML before PDF generation.Input: Markdown String.Pipeline: remark-parse → remark-rehype → rehype-stringify.Output: HTML String.B. CSS HandlingSince @react-pdf does not support the full CSS standard (it uses a Flexbox subset), the system must handle user CSS carefully.Requirement: Parse the user's CSS string.Constraint: Support standard typography (font-size, color, weight) and layout (margin, padding, flex).Implementation: Pass the parsed CSS object into the react-pdf-html stylesheet prop.C. PDF RenderingPage Size: Default to A4 (configurable to A5 for e-books if needed).Margins: Fixed padding (e.g., 20mm) to ensure e-book readability.Font: Standard PDF fonts (Helvetica/Times) or embed a Google Font (e.g., Roboto) to support special characters.5. Implementation Specification5.1. Data Models (TypeScript Interfaces)TypeScripttype ConvertMode = 'markdown' | 'html';

interface PdfRequest {
  mode: ConvertMode;
  content: string; // Markdown or HTML
  css?: string;    // Only used in HTML mode
}

interface PdfConfig {
  pageSize: 'A4' | 'LETTER';
  orientation: 'portrait' | 'landscape';
}
5.2. Component StructurePlaintextsrc/
├── components/
│   ├── Editor.tsx          // Input text areas
│   ├── Preview.tsx         // Simple HTML preview
│   └── PdfDocument.tsx     // The @react-pdf component definition
├── lib/
│   ├── markdownProcessor.ts // Unified/Remark logic
│   └── pdfGenerator.ts      // Orchestrator
└── App.tsx
5.3. Key Code SnippetsA. markdownProcessor.tsJavaScriptimport { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export async function processMarkdown(md) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return String(file);
}
B. PdfDocument.tsx (The Layout Engine)JavaScriptimport React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import Html from 'react-pdf-html';

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica' }
});

export const MyDoc = ({ htmlContent, userStylesheet }) => (
  <Document>
    <Page style={styles.page}>
      <Html stylesheet={userStylesheet}>
        {htmlContent}
      </Html>
    </Page>
  </Document>
);
C. Trigger Logic (App level)JavaScriptimport { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { MyDoc } from './components/PdfDocument';

const handleDownload = async () => {
  // 1. Convert logic (MD -> HTML if needed)
  const finalHtml = mode === 'markdown' 
    ? await processMarkdown(input) 
    : input;

  // 2. Generate Blob
  // Note: userStyles needs to be a valid stylesheet object 
  // or use inline <style> inside the HTML string.
  const blob = await pdf(
    <MyDoc htmlContent={finalHtml} />
  ).toBlob();

  // 3. Save
  saveAs(blob, 'ebook.pdf');
};
6. Constraints & LimitationsCSS Support: @react-pdf supports Flexbox. It does not support CSS Grid or Floats. Users must be warned that complex web layouts (Grid) will not convert 1:1.Images: Images linked in the HTML must be publicly accessible URLs or Base64 data strings to render in the PDF.Performance: Generating very large e-books (>50 pages) client-side may cause a momentary UI freeze. (Mitigation: Use a Web Worker for the pdf() function).7. Development RoadmapPhase 1: Setup React + Unified. Ensure Markdown converts to HTML string in console.Phase 2: Setup @react-pdf/renderer. Hardcode a string and make the button download a PDF.Phase 3: Integrate react-pdf-html. Feed the HTML string into the PDF generator.Phase 4: Polish. Add CSS inputs and styling controls.