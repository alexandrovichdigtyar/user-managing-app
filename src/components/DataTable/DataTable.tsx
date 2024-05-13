import { orderByAtom } from "@/state/store";
import { ActionColumn, Column, UserData } from "@/types/types";
import { TableBody, TableCell, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import { useAtom } from "jotai";
import { sortBy } from "lodash";
import { useMemo } from "react";
import styled from "styled-components";
import Button from "../Button/Button";

interface DataTableProps {
    columns: Column[]
    data: UserData[];
    actionColumns: ActionColumn[];
}

const DataTable = ({ columns, data, actionColumns }: DataTableProps) => {
    const [orderBy, setOrderBy] = useAtom(orderByAtom);

    const handleSort = (column: string) => {
        if (orderBy === column) {
            setOrderBy("");
        } else {
            setOrderBy(column);
        }
    };

    const sortedRows = useMemo(() => {
        return orderBy ? sortBy(data, orderBy) : data;
    }, [data, orderBy]);

    return (
        <Container>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <THead>
                    <TRow>
                        {columns.map((column, i) => (
                            <TableCell key={i}>
                                {column.sortable ? (
                                    <TableSortLabel

                                        active={orderBy === column.field}
                                        onClick={() => handleSort(column.field)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                ) :
                                    column.label
                                }
                            </TableCell>
                        ))}
                    </TRow>
                </THead>
                <TableBody>
                    {sortedRows.map((row, rowIndex) => (
                        <TRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {columns.map((column, colIndex) => (
                                <TCell key={colIndex} align="left" >
                                    <StyledTypography style={{ width: `${column.width}px` }}>
                                        {row[column.field]}
                                    </StyledTypography>
                                </TCell>
                            ))}
                            {actionColumns && (
                                actionColumns.map((column, colIndex) => (
                                    <TCell key={colIndex} align="left">
                                        <Button variant="contained" title={column.label} onClick={() => column.onClick(row.id)} />
                                    </TCell>
                                ))
                            )}
                        </TRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}

const Container = styled("div")`
    width: 100%;
    background-color: white;
    overflow: auto;
`

const TCell = styled(TableCell)`
`;

const THead = styled(TableHead)`
`;

const TRow = styled(TableRow)`
`

const StyledTypography = styled(Typography)`
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
`

export default DataTable;
