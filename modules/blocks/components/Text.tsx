import parse from 'html-react-parser';
import handleParse from '../../../lib/utils/parse'
interface TextProps {
  data: any;
}

const Text = ({ data }: TextProps) => {
  return (
    <section className='contain section'>
      <div className='max-w-2xl'>
        <h2>{data.rubrik}</h2>
        {/* <div className='parsed'>{data?.text && parse(data.text)}</div> */}
        {handleParse(data?.text)}
      </div>
    </section>
  );
};

export default Text;
