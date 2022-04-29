import handleParse from '@lib/utils/parse';
import Image from 'next/image';
import { Arrow } from "../../../components/icons"

interface ListProps {
  data: any
}

const List = ({ data }: ListProps) => {
  
  return (
    <section className='contain-outer'>
      <div
        className='flex flex-col items-center justify-center px-20 bg-section'
      >
       <div className='mb-10'>
         {handleParse(data?.text)}
       </div>
       <div className='w-full mb-10'>
         <ul className=' lg:columns-3 md:columns-2 columns-1 gap-7'>
           {data?.punkter?.map((li: any) => {
             return (
               <li key={li?.text} className='flex mb-10 space-x-4 break-inside-avoid'>
                 <div className='mt-[5px]'>
                    <Arrow />
                 </div>
                 {handleParse(li?.text)}
               </li>
             )
           })}
         </ul>
       </div>
       <div>
         {handleParse(data?.avslut)}
       </div>
      </div>
    </section>
  );
};

export default List;
