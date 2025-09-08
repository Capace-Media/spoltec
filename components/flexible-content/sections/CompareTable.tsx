import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@components/ui/table";
import type { ServiceProsAndConsBlock } from "@lib/types/service";
import type { ProsAndConsBlock } from "@lib/types/page";
import { CheckCircle2 } from "lucide-react";

export default function CompareTable({
  data,
}: {
  data: ServiceProsAndConsBlock | ProsAndConsBlock;
}) {
  const { intro, table } = data;
  if (!intro.title || !table?.tbody || !table?.thead) return null;
  return (
    <section className="contain-outer section" id="jamforelsetabell">
      <div className="">
        <div className="pb-4">
          <h2>{intro.title}</h2>
          {intro.text && <p className="text-[#4b5563]">{intro.text}</p>}
        </div>

        {/* Bordered/rounded container */}
        <div className="max-w-[calc(53rem+68px)] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <Table
            className="text-[0.9rem]"
            aria-label={`Jämförelsetabell: ${table.thead.th2} jämfört med ${table.thead.th3}`}
          >
            <TableHeader>
              <TableRow className="bg-gradient-to-b from-gray-50 to-gray-100/60">
                <TableHead
                  scope="col"
                  className="w-[140px] sticky left-0 z-20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-r border-gray-200"
                >
                  {table.thead.th1}
                </TableHead>
                <TableHead
                  scope="col"
                  className="text-center bg-[#f8fbff] border-l border-gray-200"
                >
                  {table.thead.th2}
                </TableHead>
                <TableHead
                  scope="col"
                  className="text-center bg-[#fffaf8] border-l border-gray-200"
                >
                  {table.thead.th3}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {table.tbody.map((invoice) => {
                const td2Best = !!invoice.td2?.truefalse;
                const td3Best = !!invoice.td3?.truefalse;

                return (
                  <TableRow key={invoice.td1} className="odd:bg-gray-50/40">
                    <TableHead
                      scope="row"
                      className="text-brand-blue font-bold sticky left-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-r border-gray-200"
                    >
                      {invoice.td1}
                    </TableHead>

                    <TableCell
                      className={`text-[#363636] text-center border-l border-gray-200 ${
                        td2Best
                          ? "bg-emerald-50/80 text-emerald-900 font-semibold ring-1 ring-inset ring-emerald-200"
                          : "bg-[#f8fbff]"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {td2Best && (
                          <>
                            <CheckCircle2
                              className="h-4 w-4 text-emerald-600"
                              aria-hidden="true"
                              focusable="false"
                            />
                            <span className="sr-only">Bättre alternativ</span>
                          </>
                        )}
                        <span>{invoice.td2?.text}</span>
                      </div>
                    </TableCell>

                    <TableCell
                      className={`text-[#363636] text-center border-l border-gray-200 ${
                        td3Best
                          ? "bg-emerald-50/80 text-emerald-900 font-semibold ring-1 ring-inset ring-emerald-200"
                          : "bg-[#fffaf8]"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {td3Best && (
                          <>
                            <CheckCircle2
                              className="h-4 w-4 text-emerald-600"
                              aria-hidden="true"
                              focusable="false"
                            />
                            <span className="sr-only">Bättre alternativ</span>
                          </>
                        )}
                        <span>{invoice.td3?.text}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

            {table.caption && (
              <TableCaption className="text-[#6b7280] border-t border-gray-200 mt-0 p-2 text-left">
                {table.caption}
              </TableCaption>
            )}
          </Table>
        </div>
      </div>
    </section>
  );
}
