import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
    a: ({ href, children, ...props }) => (
        <a href={href} {...props} rel={href?.startsWith("https://") ? "noreferrer" : undefined}>
            {children}
        </a>
    ),
};

export function useMDXComponents(): MDXComponents {
    return components;
}
