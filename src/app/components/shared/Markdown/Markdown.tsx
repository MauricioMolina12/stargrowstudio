'use client';

import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

type MarkdownProps = {
    content: string;
};

const markdownComponents: Components = {
    
    // Encabezados
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-5 mb-2" {...props} />,
    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,

    // Listas
    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
    li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,

    // Código
    code({ inline, className, children, ...props }: any) {
        if (inline) {
            return <code className="bg-gray-100 px-1 rounded" {...props}>{children}</code>;
        }
        return (
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto" {...props}>
                <code className={className}>{children}</code>
            </pre>
        );
    },

    // Bloques de citas
    blockquote: ({ node, ...props }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />
    ),

    // Enlaces
    a: ({ node, ...props }) => (
        <a className="text-blue-600 underline hover:text-blue-800" {...props} />
    )
};

export default function Markdown({ content }: MarkdownProps) {
    return (
        <div className="prose prose-lg prose-gray max-w-none">
            <ReactMarkdown
                children={content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
                components={markdownComponents}
            />
        </div>
    );
}
