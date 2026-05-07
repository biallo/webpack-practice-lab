import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("yaml", yaml);

const languageAliases = {
  html: "xml",
  js: "javascript"
};

export function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function highlightCode(code, language) {
  const normalizedLanguage = languageAliases[language] ?? language;

  if (!hljs.getLanguage(normalizedLanguage)) {
    return escapeHtml(code);
  }

  return hljs.highlight(code, { language: normalizedLanguage }).value;
}
