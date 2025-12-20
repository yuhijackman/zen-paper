import type { Element, Root } from "hast";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { type Plugin, unified } from "unified";
import { visit } from "unist-util-visit";

const rehypeUnwrapCode: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, "element", (node: Element) => {
			if (node.tagName === "pre") {
				const codeElement = node.children.find(
					(child): child is Element =>
						child.type === "element" && child.tagName === "code",
				);

				if (codeElement) {
					node.children = codeElement.children;
				}
			}
		});
	};
};

export async function parseMarkdown(markdown: string): Promise<string> {
	const result = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeUnwrapCode)
		.use(rehypeStringify)
		.process(markdown);

	return result.toString();
}
