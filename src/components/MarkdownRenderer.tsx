import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";

interface MarkdownRendererProps {
  markdownContent: string;
}

export const MarkdownRenderer = ({
  markdownContent,
}: MarkdownRendererProps) => {
  const renderHeading = (level: number, children: React.ReactNode) => {
    const headingStyles = {
      marginTop: "1em", // Add spacing above the heading
      marginBottom: "0.5em", // Add spacing below the heading
      fontSize: "1.5em",
    };
    const headingText = React.Children.toArray(children)
      .join("")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\./g, "")
      .replace(/[()+]/g, "");

    const headingId = `${headingText}`;
    return React.createElement(
      `h${level}`,
      { id: headingId, style: headingStyles },
      children
    );
  };

  const renderParagraph = (props: any) => {
    // Add margin-bottom to paragraphs
    const paragraphStyles = {
      marginBottom: "2.5em", // Adjust as needed
    };

    return <p style={paragraphStyles}>{props.children}</p>;
  };

  const generateCustomTableOfContents = (markdownContent: string) => {
    const tocLines: string[] = [];
    const lines = markdownContent.split("\n");
    let currentIndent = 0;

    for (const line of lines) {
      const match = /^(#+)\s+(.*)$/.exec(line);

      if (match) {
        const headingLevel = match[1].length;
        const headingText = match[2];
        const indent = headingLevel - 1;

        if (indent > currentIndent) {
          // Increase the indentation for subsections in the table of contents
          tocLines.push(
            `${" ".repeat(currentIndent * 2)}1.${" ".repeat(
              (indent - currentIndent) * 2
            )} [${headingText}](#${headingText
              .toLowerCase()
              .replace(/\s/g, "-")})`
          );
        } else {
          // Reset or decrease the indentation
          tocLines.push(
            `${" ".repeat(indent * 2)}1. [${headingText}](#${headingText
              .toLowerCase()
              .replace(/\s/g, "-")})`
          );
        }

        currentIndent = indent;
      }
    }

    return tocLines.join("\n");
  };

  const customTableOfContents = generateCustomTableOfContents(markdownContent);

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[rehypeSlug, remarkToc]}
        components={{
          a: ({ node, ...props }) => <a {...props} />,
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                ref={null} // Just to make typescript happy
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={materialOceanic}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
          h1: ({ node, ...props }) => renderHeading(1, props.children),
          h2: ({ node, ...props }) => renderHeading(2, props.children),
          h3: ({ node, ...props }) => renderHeading(3, props.children),
          p: renderParagraph, //  custom rendering for paragraphs
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

//         components={{
//           a: ({ node, ...props }) => <a {...props} />, // Make sure links are clickable
//           code: ({ node, inline, className, children, ...props }: any) => {
//             const match = /language-(\w+)/.exec(className || "");
//             return !inline && match ? (
//               <SyntaxHighlighter
//                 style={materialOceanic}
//                 language={match[1]}
//                 PreTag="div"
//                 children={String(children).replace(/\n$/, "")}
//                 {...props}
//               />
//             ) : (
//               <code className={className} {...props}>
//                 {children}
//               </code>
//             );
//           },
//         }}
//       >
//         {markdownContent}
//       </ReactMarkdown>
//     </div>
//   );
// };
