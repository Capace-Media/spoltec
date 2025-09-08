import Image from "next/image";

interface EmployeeProps {
  data: IData;
}

interface IData {
  anstalld: IAnstald[];
}

interface IAnstald {
  namn: string;
  titel: string;
  telefon: string;
  email: string;
  bild: IBild;
}

interface IBild {
  altText: string;
  id: string;
  mediaItemUrl: string;
}

const Employee = ({ data }: EmployeeProps) => {
  if (data?.anstalld?.length === 0) return null;
  return (
    <section className="contain-outer">
      <div className="section">
        <div className="contain">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {data?.anstalld?.map((emp) => {
              return (
                <div key={emp?.bild?.id}>
                  {emp?.bild?.mediaItemUrl && (
                    <div className="relative w-full mb-6 lg:h-[500px] md:h-[300px] h-[500px] ">
                      <Image
                        fill
                        style={{
                          objectFit: "cover",
                          borderRadius: "16px",
                        }}
                        src={emp?.bild?.mediaItemUrl}
                        alt={emp?.bild?.altText}
                      />
                    </div>
                  )}
                  <p className="mb-1 font-semibold text-brand-blue">
                    {emp?.namn}
                  </p>
                  <p className="mb-6 italic">{emp?.titel}</p>
                  <p>{emp?.telefon}</p>
                  <p className="font-semibold text-brand-blue">{emp?.email}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Employee;
