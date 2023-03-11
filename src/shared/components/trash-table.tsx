import React, { Component } from 'react';
import { withStyles, TablePagination, TableRow, TableFooter, TableBody, TableHead, Table, TableContainer, IconButton, TableCell, createStyles, Theme, Paper } from '@material-ui/core';
import ConfirmDialog from './confirm-dialog/confirm-dialog';
import { IMyTable, ColumnTable } from '../../models/table-model';
import { GridSetting } from '../../models/common.model';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { MESSAGE_CONFIRM } from '../../constants/message.constants';
import RestoreIcon from '@material-ui/icons/Restore';
import { green } from '@material-ui/core/colors';
interface IMyTableState {
    columns: ColumnTable[];
    gridSetting: GridSetting;
    openDialog: boolean;
    idDelete: string;
}

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 12,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);
class TrashTable extends Component<IMyTable, IMyTableState>{
    constructor(props: IMyTable) {
        super(props);
        this.state = {
            columns: this.props.tableConfig.columns.map(s => ({ ...s, isSort: false, isDisplay: false })),
            gridSetting: new GridSetting(),
            openDialog: false,
            idDelete: ''
        }
    }

    componentWillReceiveProps(props: IMyTable) {
        if (this.props.tableConfig.columns !== props.tableConfig.columns) {
            this.setState({
                columns: props.tableConfig.columns.map(s => ({ ...s, isSort: false, isDisplay: false })),
            })
        }
    }
    // hàm sắp xếp 
    onSort = (column: ColumnTable) => {
        let sortOrder = false;
        const columns = this.state.columns.map(s => {
            if (column.value === s.value) {
                s.isSort = !s.isSort;
                s.isDisplay = true;
                sortOrder = s.isSort;
            } else {
                s.isSort = false;
                s.isDisplay = false;
            }
            return s;
        });

        this.setState({
            columns: columns,
            gridSetting: {
                ...this.state.gridSetting,
                SortColumn: column.value,
                SortOrder: sortOrder ? 'Descending' : 'Ascending',
            }
        }, () => this.props.sort(this.state.gridSetting));
    }

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            gridSetting: {
                ...this.state.gridSetting,
                PageSize: parseInt(event.target.value),
                PageIndex: 0,
            }
        }, () => this.props.sort(this.state.gridSetting));
    }

    handleChangePage = (event: unknown, newPage: number) => {
        this.setState({
            gridSetting: {
                ...this.state.gridSetting,
                PageIndex: newPage
            }
        }, () => this.props.sort(this.state.gridSetting));
    }

    onConfirmDelete = () => {
        this.props.delete(this.state.idDelete)
        this.toggleDeleteDialog();
    }

    toggleDeleteDialog = (id?: string) => {
        this.setState({
            openDialog: !this.state.openDialog,
            idDelete: id || '',
        });
    }

    formatDate(value: string): string {
        if (value !== '' && value !== null) {

            return new Date(value).toLocaleDateString();
        }
        return '';
    }

    renderTitle = () => {
        return this.state.columns.map((column, index) => {
            const { classes } = this.props;
            return (
                <TableCell key={index}>
                    <div className={classes.tableTitle} onClick={() => this.onSort(column)}>
                        {column.isDisplay ? <IconButton size="small">{column.isSort ?
                            <ExpandMoreIcon /> : <ExpandLessIcon />}
                        </IconButton> : null}
                        {column.title}
                    </div>
                </TableCell >
            )
        });
    }

    renderData = (data: any) => this.props.tableConfig.columns.map((column, index) => {
        let value = data[column.value];
        if (column.value === 'updatedAt' || column.value === 'createdAt') {
            value = this.formatDate(value);
        };

        return (
            <StyledTableCell key={index}>{value}</StyledTableCell>
        )
    });

    renderRow = () => {
        return this.props.tableConfig.data.map((data: any, index: number) => {
            return (
                <StyledTableRow hover key={index} onClick={() => null}>
                    {this.renderData(data)}
                    <IconButton ><RestoreIcon style={{ color: green[500] }} /></IconButton>
                    <IconButton onClick={() => this.toggleDeleteDialog(data.id)}><DeleteIcon color="secondary" /></IconButton>
                </StyledTableRow>
            )
        })
    }

    render() {
        
        return (
            <TableContainer component={Paper} >
                <Table className='Data-table' aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {this.renderTitle()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderRow()}
                    </TableBody>
                    <TableFooter>
                        <TableRow >
                            <TablePagination
                                rowsPerPageOptions={[8, 16, 32, { label: 'All', value: -1 }]}
                                count={this.props.tableConfig.rowCount || 0}
                                rowsPerPage={this.state.gridSetting.PageSize}
                                page={this.state.gridSetting.PageIndex}
                                backIconButtonProps={{
                                    'aria-label': 'previous page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'next page',
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                labelRowsPerPage="Items Per Page"
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
                <ConfirmDialog
                    className="confirm-dialog"
                    openDialog={this.state.openDialog}
                    onClose={this.toggleDeleteDialog}
                    onSubmit={this.onConfirmDelete}
                    content={MESSAGE_CONFIRM.DELETE}
                    title="Xác Nhận Xóa"
                />
            </TableContainer>
        )
    }
}
const styles = (theme: any) => ({
    tableTitle: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    }
})
export default withStyles(styles)(TrashTable);