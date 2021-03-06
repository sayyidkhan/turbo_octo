import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import './Accounts.css';

interface AccountColumn {
    id: 'e_nric' | 'firstname' | 'lastname' | 'admintype';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
  
const columns: AccountColumn[] = [
    { id: 'e_nric', label: 'NRIC', minWidth: 150 },
    { id: 'firstname', label: 'First Name', minWidth: 150 },
    { id: 'lastname', label: 'Last Name', minWidth: 150 },
    { id: 'admintype', label: 'User Type', minWidth: 150 },
];

function createData(parameters: { e_nric: string, firstname: string, lastname: string, admintype: string}) {
    let {e_nric, firstname, lastname, admintype} = parameters;
    return { e_nric, firstname, lastname, admintype};
}

export default function AccountsTablePaginationComponent(props : any) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createRows() : { e_nric: string, firstname: string, lastname: string, admintype: string }[] {
    const searchUser = props.searchUser.length === 0 ? "" : props.searchUser;
    var rows : any[] = searchUser === "" ? props.dataRows : searchUser;
    var result = rows.map(data => createData(data));
    return (rows.length !== 0) ? result : [];
  }

  // ----------------- handle select button -----------------
  const [selected, setSelected] = React.useState<string>();
  const isSelected = (e_nric: string) => selected === e_nric;

  const handleClick = (event: React.MouseEvent<unknown>, e_nric: string) => {
    setSelected(e_nric);
    props.selected_nric(e_nric);
    sessionStorage.setItem('clickedAccount', 'yes');
  };
  // ----------------- end of handling select button -----------------

  return (
    <Paper className="accounts-table-paper">
      <TableContainer className="account-table-container">
        <Table stickyHeader aria-label="sticky table">

          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align={'left'} style={{ minWidth: 80}}>
                Edit User
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {createRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

              const isItemSelected = isSelected(row.e_nric);
              
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.e_nric)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.e_nric}
                  selected={isItemSelected}
                >

                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}

                <TableCell>
                  <button className="selectBtn">Select</button>
                </TableCell>

                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        count={createRows().length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}