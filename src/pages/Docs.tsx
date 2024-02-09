import { useEffect, useState } from "react";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

const Docs = () => {
  const [docs, setDocs] = useState("");

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const response = await fetch("/docs/README.md"); // Adjust the path based on your file location
        const content = await response.text();
        setDocs(content);
      } catch (error) {
        console.error("Error fetching Markdown content:", error);
      }
    };

    fetchMarkdownContent();
  }, []);
  return (
    <div className="mt-20">
      <MarkdownRenderer markdownContent={docs} />
    </div>
  );
};

export default Docs;
