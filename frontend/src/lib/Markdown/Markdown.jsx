import React, { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Markdown = React.memo(({ linkStopPropagation, ...props }) => {
  const handleLinkClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const linkRenderer = useCallback(
    ({ node, ...linkProps }) => <a {...linkProps} onClick={handleLinkClick} />,
    [handleLinkClick],
  );

  let renderers;

  if (linkStopPropagation) {
    renderers = {
      link: linkRenderer,
    };
  }

  return <ReactMarkdown {...props} remarkPlugins={[remarkGfm]} components={renderers} />;
});

export default Markdown;
