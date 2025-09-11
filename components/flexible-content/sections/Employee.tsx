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
                        alt={emp?.bild?.altText || "Employee image"}
                        quality={85}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
