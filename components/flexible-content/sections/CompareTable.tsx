import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import type { ServiceProsAndConsBlock } from "@lib/types/service";
import type { ProsAndConsBlock } from "@lib/types/page";

export default function CompareTable({
  data,
}: {
  data: ServiceProsAndConsBlock | ProsAndConsBlock;
}) {
  const { intro, table } = data;
  if (!intro.title || !table?.tbody || !table?.thead) return null;
  return (
    <section className="contain-outer section">
      <div className="">
        <div className="pb-4">
          <h2>{intro.title}</h2>
          {intro.text && <p>{intro.text}</p>}
        </div>

        {/* Bordered/rounded container */}
        <div className="max-w-[calc(39rem+68px)] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <Table className="text-[0.9rem]">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[140px] sticky left-0 z-20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-r border-gray-200">
                  {table.thead.th1}
                </TableHead>
                <TableHead className="text-center bg-[#f8fbff] border-l border-gray-200">
                  {table.thead.th2}
                </TableHead>
                <TableHead className="text-center bg-[#fffaf8] border-l border-gray-200">
                  {table.thead.th3}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {table.tbody.map((invoice) => (
                <TableRow key={invoice.td1} className="odd:bg-gray-50/40">
                  <TableCell className="text-brand-blue font-bold sticky left-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-r border-gray-200">
                    {invoice.td1}
                  </TableCell>
                  <TableCell className="text-[#363636] text-center bg-[#f8fbff] border-l border-gray-200">
                    {invoice.td2.text}
                  </TableCell>
                  <TableCell className="text-[#363636] text-center bg-[#fffaf8] border-l border-gray-200">
                    {invoice.td3.text}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {table.caption && (
            <div className="border-t border-gray-200 bg-gray-50/60 px-3 py-2 text-xs leading-snug text-[#6b7280]">
              {table.caption}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
