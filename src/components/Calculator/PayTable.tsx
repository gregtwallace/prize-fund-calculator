import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import type { dataPoint } from './results.ts';

interface props {
  data: dataPoint[];
}

const PayTable = (props: props) => {
  const { data } = props;

  return (
    <Container component={Paper} maxWidth='xs'>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell align='right'>Percentage</TableCell>
            <TableCell align='right'>Payout</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.position}>
              <TableCell component='th' scope='row'>
                {row.position}
              </TableCell>
              <TableCell align='right'>
                {row.fundsPerecentage.toLocaleString(navigator.language, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell align='right'>
                $ {row.fundsAbsoluteRounded.toLocaleString(navigator.language)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PayTable;
