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

export default function QuarterlyCompany() {

  const [page, setPage] = useState(1)
  const [compantList, setCompoundList] = useState([])
  const [pageCount, setPageCount] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [audit, setAudit] = useState('Audit')
  const [progress, setProgress] = useState('')

  useEffect(() => {
    postRequest(getlist_v2,
      {
        type_of_report: audit,
        status: progress,
        pageNumber: page,
        pageSize: pageSize
      }).then((response) => {
        console.log(response.data)
        setPageCount(response.data.page)
        setCompoundList(response.data.list_of_companies)
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
            <TableRow>
                <TableCell>
                    list
                </TableCell>
            </TableRow>
          <TableRow>
                <TableCell component="th" scope="row" colSpan={5}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                      <PageSize setPageSize={(val) => { console.log(val); setPageSize(val)}}/>
                      <Pagination count={pageCount} color="primary" page={page} onChange={(_, value) => { setPage(value) }}/>
                    </Box>
              </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}


// {compantList.map((row) => (
//     <TableRow
//       key={row._id}
//       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//     >
//       <TableCell component="th" scope="row">
//         {row.organization_name}
//       </TableCell>
//       <TableCell align="right">{row.pinfl}</TableCell>
//       <TableCell align="right">{row.tin}</TableCell>
//       <TableCell align="right">{row.created_at}</TableCell>
//       <TableCell align="right">{row.updated_at}</TableCell>
//     </TableRow>
//   ))}