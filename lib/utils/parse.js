import parse from 'html-react-parser'

export default function handleParse(content) {
    return (
        <div className='parsed'>{content && parse(content, {
            replace: (domNode) => {
                if(domNode.name === 'a'){
                    if(!domNode?.attribs?.href?.includes(process.env.NEXT_PUBLIC_MY_WEBSITE) && domNode?.attribs.href?.charAt(0) !== '/'){
                        domNode.attribs.target = '_blank';
                    }
                }
            }
        })}</div>
    );
}
