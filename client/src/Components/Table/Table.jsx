import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useStyles } from './Table.styles';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { memo, useCallback, useContext, useMemo, useRef } from 'react';
import UserContext from '../../store/userContext';

const Table = ({
  data,
  isPending,
  updateSelectedRows,
  showVerifyStatus,
  colDefs,
  showDetails,
  isError,
  onRowOpen,
}) => {
  let rowData;
  if (data) rowData = data;

  const classes = useStyles();
  const { user } = useContext(UserContext);

  const gridApi = useRef(null);

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridApi.current?.getSelectedNodes?.() || [];
    const selectedData = selectedNodes.map((node) => node.data);
    updateSelectedRows(selectedData);
  }, [updateSelectedRows]);

  const gridOptions = useMemo(
    () => ({
      rowSelection: 'multiple',
      onSelectionChanged,
      rowHeight: 30,
      headerHeight: 30,
      overlayNoRowsTemplate: 'No Records Found',
      animateRows: false,
      suppressCellFocus: true,
      rowHeight: 40,
    }),
    [onSelectionChanged]
  );
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
    }),
    []
  );

  const handleClickInColumn = function (params) {
    showVerifyStatus(params.data.email);
  };

  const IsAdminVerifiedComp = (params) => {
    const classes = useStyles();
    return (
      <>
        {params.value ? (
          <Typography className={classes.verified}>Verified</Typography>
        ) : (
          <Button
            className={classes.pending}
            onClick={
              user?.isAdmin ? () => handleClickInColumn(params) : () => { }
            }
            sx={{
              cursor: user?.isAdmin ? 'pointer' : 'default',
            }}
            disableRipple
          >
            Pending
          </Button>
        )}
      </>
    );
  };

  const InfoTable = (params) => {
    const classes = useStyles();

    return (
      <>
        <p className={classes.count} onClick={() => showDetails(params)}>
          {params.value}
        </p>
      </>
    );
  };

  const NameLink = (params) => (
    <span
      className={classes.nameLink}
      onClick={(e) => {
        e.stopPropagation();
        onRowOpen?.(params.data);
      }}
    >
      {params.value}
    </span>
  );

  const modifiedColumnDefs = useMemo(() => {
    return colDefs.map((colDef) => {
      const next = { ...colDef };
      if (
        onRowOpen &&
        (next.field === 'name' ||
          next.field === 'types' ||
          next.field === 'type')
      ) {
        next.cellRenderer = NameLink;
      }
      if (next.field === 'isAdminVerified') {
        next.cellRenderer = IsAdminVerifiedComp;
      }
      if (
        next.field === 'lead_volunteers_count' ||
        next.field === 'volunteers_count' ||
        next.field === 'participants_count' ||
        next.field === 'volunteers' ||
        next.field === 'enrollments' ||
        next.field === 'children'
      ) {
        next.cellRenderer = InfoTable;
      }
      return next;
    });
  }, [colDefs, user, onRowOpen]);

  const isRowSelectable = useMemo(() => {
    return (params) => {
      return !!params.data && params.data.email !== user.email;
    };
  }, [user]);

  const getRowStyle = (params) => {
    if (params.data.email === user.email) {
      return { background: '#f5f5f5', fontWeight: 'bold' }; // Apply specific styles to the row
    }
    return null; // Return null to apply default styles
  };

  return (
    <Box className={`ag-theme-quartz ${classes.gridContainer}`}>
      {isPending && (
        <Box className={classes.tableSkeleton}>
          <CircularProgress className="circularProgress" />
        </Box>
      )}
      {isError && (
        <Box className={classes.tableSkeleton}>
          <Typography className="errorMessage">
            Something went wrong while fetching data.
          </Typography>
        </Box>
      )}
      {data && (
        <>
          {onRowOpen && (
            <Typography className={classes.tableHint}>
              Click a name or double-click a row to open it
            </Typography>
          )}
          <AgGridReact
            className={classes.AgGridMain}
            rowData={rowData}
            defaultColDef={defaultColDef}
            columnDefs={modifiedColumnDefs}
            gridOptions={gridOptions}
            onGridReady={(params) => (gridApi.current = params.api)}
            isRowSelectable={isRowSelectable}
            getRowStyle={getRowStyle}
            onRowDoubleClicked={(e) => {
              const target = e.event?.target;
              if (target?.closest?.('.ag-checkbox, .ag-selection-checkbox')) {
                return;
              }
              onRowOpen?.(e.data);
            }}
          ></AgGridReact>
        </>
      )}
    </Box>
  );
};

export default memo(Table);
