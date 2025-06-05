import { useState } from "react";
import VERBS from "../../data/irr-verbs.json";
import css from "./DictionaryTable.module.css";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<SingleVerb>[] = [
    {
        accessorKey: "base_form",
        header: "infinitive",
        cell: (props: {getValue: () => any}) => <p>{props.getValue()?.name}</p>
    },
    {
        accessorKey: "past_simple",
        header: "past simple",
        cell: (props: {getValue: () => any}) => <p>{props.getValue()?.name}</p>
    },
    {
        accessorKey: "past_participle",
        header: "past participle",
        cell: (props: {getValue: () => any}) => <p>{props.getValue()?.name}</p>
    }
]

interface SingleVerb {
    base_form: string,
    past_simple: string,
    past_participle: string
  }

// interface Verbs {
//     easy: SingleVerb[],
//     medium: SingleVerb[],
//     hard: SingleVerb[],
// }



const DictionaryTable = () => {
    const [verbs, setVerbs] = useState<SingleVerb[]>(VERBS.easy);

    const table = useReactTable({
        data: verbs,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),

    })
  return <div className={css.div}>
<div className={css.table}>
{table.getHeaderGroups().map(headerGroup => <div className={css.tr} key={headerGroup.id}>
{headerGroup.headers.map(header => <div className={css.th} key={header.id}>
    {header.column.columnDef.header}
</div> )}
</div> )}
{table.getRowModel().rows.map(row => <div className={css.tr} key={row.id}>
    {row.getVisibleCells().map(cell => <div className={css.td} key={cell.id}>
        {
            flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
            )
        }
    </div> )}
</div> )}
</div>
  </div>;
};

export default DictionaryTable;