import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import type { ServiceProsAndConsBlock } from "@lib/types/service";

export default function CompareTable({
  data,
}: {
  data: ServiceProsAndConsBlock;
}) {
  const { intro, table } = data;
  return (
    <section className="contain-outer section">
      <div className="contain">
        <div className="pb-4">
          <h2>{intro.title}</h2>
          {intro.text && <p>{intro.text}</p>}
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>{table.caption}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">{table.thead.th1}</TableHead>
                <TableHead>{table.thead.th2}</TableHead>

                <TableHead className="text-right">{table.thead.th3}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.tbody.map((invoice) => (
                <TableRow key={invoice.td1}>
                  <TableCell className=" text-brand-blue font-bold">
                    {invoice.td1}
                  </TableCell>
                  <TableCell className="text-[#363636] text-[0.8rem]">
                    {invoice.td2}
                  </TableCell>

                  <TableCell className="text-[#363636] text-[0.8rem] text-right">
                    {invoice.td3}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
