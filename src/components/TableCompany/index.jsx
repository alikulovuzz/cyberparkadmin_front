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
import { getRequest } from '../../utils/resquests';
import { company_list } from '../../utils/API_urls';
import { headerConfig } from '../../utils/baseUrl';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableExample() {

  const [page, setPage] = useState(1)

  useEffect(() => {
    getRequest(company_list,
      {
        headers: headerConfig(),
        body: {
          pageNumber: 1,
          pageSize: 10
        }
      }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
          <TableRow>
                <TableCell component="th" scope="row" colSpan={5}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                      <PageSize/>
                      <Pagination count={10} color="primary" page={page} onChange={(_, value) => { setPage(value) }}/>
                    </Box>
              </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}