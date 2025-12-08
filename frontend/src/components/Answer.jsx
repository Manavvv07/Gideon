import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Answer = ({ text }) => {
  return (
    <div className='answer-container'>
      <div className='answer'>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={dracula}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                  customStyle={{ borderRadius: "5px", margin: "10px 0" }} 
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} style={{background: "#333", padding: "2px 5px", borderRadius: "3px"}} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Answer;