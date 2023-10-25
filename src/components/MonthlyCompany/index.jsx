import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Pagination } from '@mui/material';
import PageSize from '../PageSize';
import { postRequest } from '../../utils/resquests';
import { getlist_v2 } from '../../utils/API_urls';

export default function MonthlyCompany() {

    const [page, setPage] = useState(1)
    const [compantList, setCompoundList] = useState([])
    const [pageCount, setPageCount] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [audit, setAudit] = useState('Choraklik')
    const [progress, setProgress] = useState('')

    useEffect(() => {
        postRequest(getlist_v2,
            {
                type_of_report: audit,
                status: progress,
                pageNumber: page,
                pageSize: pageSize
            }).then((response) => {
                console.log(response.data.reports)
                setPageCount(response.data.page)
                setCompoundList(response.data.reports)
            }).catch((error) => {
                console.log(error);
            })
    }, [page, pageSize])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>organization_name</TableCell>
                        <TableCell align="right">pinfl</TableCell>
                        <TableCell align="right">tin</TableCell>
                        <TableCell align="right">created_at</TableCell>
                        <TableCell align="right">updated_at</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {compantList.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {console.log(row)}
                            <TableCell component="th" scope="row">
                                {row.name_of_report}
                            </TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">{row.year}</TableCell>
                            <TableCell align="right">{row.createdAt}</TableCell>
                            <TableCell align="right">{row.updatedAt}</TableCell>
                        </TableRow>
                    ))}
                    {/* <TableRow>
                        <TableCell component="th" scope="row" colSpan={5}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <PageSize setPageSize={(val) => { console.log(val); setPageSize(val) }} />
                                <Pagination count={pageCount} color="primary" page={page} onChange={(_, value) => { setPage(value) }} />
                            </Box>
                        </TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
        </TableContainer>
    );
}