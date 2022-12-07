import parse, {domToReact} from 'html-react-parser'
import Image from 'next/image';

export default function handleParse(content) {
    return (
        <div className='parsed'>{content && parse(content, {
            replace: (domNode) => {
                if(domNode.name === 'a'){
                    if(!domNode?.attribs?.href?.includes(process.env.NEXT_PUBLIC_MY_WEBSITE) && domNode?.attribs.href?.charAt(0) !== '/'){
                        domNode.attribs.target = '_blank';
                    }
                }
                if (domNode?.children?.find(child => child.name === 'img')) {
                    const a = domNode?.children?.find(child => child.name === 'img')

                    a.attribs.decoding = 'defer'

                    return (
                        <div>
                            {domToReact(domNode.children)}
                        </div>
                    )
                }
            }
        })}</div>
    );
}
