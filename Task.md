Phase 1: Core Logic Implementation (No UI)
This phase builds the invisible machine that takes text and produces a PDF file.

Task 1: Project Initialization & Dependency Installation
Goal: Set up a blank React environment (Vite) and install the critical libraries for the 3-step pipeline.

Action Items:

[x] Initialize project: npm create vite@latest pdf-converter -- --template react-ts

[x] Install Markdown processor: npm install unified remark-parse remark-rehype rehype-stringify

[x] Install PDF Engine: npm install @react-pdf/renderer

[x] Install HTML-to-PDF Bridge: npm install react-pdf-html

[x] Install File Saver helper: npm install file-saver @types/file-saver

Task 2: Build the Markdown-to-HTML Service
Goal: Create a standalone TypeScript function that takes a Markdown string and returns a clean HTML string.

File: src/lib/markdown.ts

Action Items:

[x] Create a function parseMarkdown(markdown: string): Promise<string>.

[x] Implement the unified pipeline (markdown -> remark -> rehype -> html).

[x] Verification: Call this function with console.log(await parseMarkdown('# Hello')) in App.tsx and check the console ensures it outputs <h1>Hello</h1>.

Task 3: Build the PDF Document Component
Goal: Create the React component that defines the structure of the PDF (Page, View, Text). This is not the file, but the template.

File: src/components/PdfTemplate.tsx

Action Items:

[x] Create a component PdfTemplate that accepts htmlContent as a prop.

[x] Import Document, Page from @react-pdf/renderer.

[x] Import Html from react-pdf-html.

[x] Return a <Document><Page><Html>{htmlContent}</Html></Page></Document> structure.

[x] Add basic stylesheet (padding: 20px) to the <Page> to prevent text clipping.

Task 4: Build the PDF Generator Function
Goal: Create the "Trigger" function that orchestrates the conversion and forces the browser to download the file.

File: src/lib/generator.ts

Action Items:

[x] Import pdf from @react-pdf/renderer.

[x] Import your PdfTemplate component.

[x] Create function generatePdf(html: string).

[x] Implement logic: const blob = await pdf(<PdfTemplate htmlContent={html} />).toBlob().

[x] Implement save logic using file-saver: saveAs(blob, 'output.pdf').

Task 5: End-to-End "Headless" Test
Goal: Verify the whole pipeline works without a UI input form.

File: App.tsx

Action Items:

[x] Hardcode a test string in App.tsx (e.g., const testMd = "# Test Title\n\nThis is a paragraph.").

[x] Create a single temporary <button> that runs the pipeline:

Calls parseMarkdown(testMd).

Passes result to generatePdf().

[x] Success Criteria: Clicking the button downloads a valid PDF where you can select/highlight the text "Test Title".

Phase 2: UI Implementation (Wiring it up)
Once Phase 1 is verified, the UI simply replaces the hardcoded variables.

Task 6: Create Input Components
Goal: specific UI for the user to type content.

Action Items:

[x] Create TextArea component for Markdown input.

[x] Create a Toggle Switch (Markdown Mode vs. HTML Mode).

Task 7: State Management
Goal: Manage the data flow.

Action Items:

[x] Create React state const [input, setInput] to hold the user's text.

[x] Connect the Generate PDF button to the function created in Task 4.

Task 8: (Optional) CSS Customization Support
Goal: Allow users to define font sizes or colors.

Action Items:

[x] Add a second text area for "Custom CSS".

[x] Pass this CSS string into the <Html stylesheet={...}> prop in PdfTemplate.tsx.