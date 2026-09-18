import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useStyles } from './Table.styles';
import { Box, Button, Typography } from '@mui/material';
import { memo, useCallback, useContext, useMemo, useRef } from 'react';
import UserContext from '../../store/userContext';

const initialsFrom = (value) => {
  if (!value || typeof value !== 'string') return '?';
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

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
  const rowData = data || [];
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const gridApi = useRef(null);

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridApi.current?.getSelectedNodes?.() || [];
    const selectedData = selectedNodes.map((node) => node.data);
    updateSelectedRows(selectedData);
  }, [updateSelectedRows]);

  const handleClickInColumn = function (params) {
    showVerifyStatus(params.data.email);
  };

  const IsAdminVerifiedComp = (params) => {
    return params.value ? (
      <Typography className={classes.verified}>Verified</Typography>
    ) : (
      <Button
        className={classes.pending}
        onClick={
          user?.isAdmin ? () => handleClickInColumn(params) : () => {}
        }
        sx={{
          cursor: user?.isAdmin ? 'pointer' : 'default',
        }}
        disableRipple
      >
        Pending
      </Button>
    );
  };

  const CountChip = (params) => (
    <span className={classes.count} onClick={() => showDetails(params)}>
      {params.value ?? 0}
    </span>
  );

  const NameCell = (params) => {
    const label = params.value || '—';
    return (
      <span
        className={classes.nameCell}
        onClick={(e) => {
          e.stopPropagation();
          onRowOpen?.(params.data);
        }}
      >
        <span className={classes.avatar}>{initialsFrom(label)}</span>
        <span className={classes.nameText}>{label}</span>
      </span>
    );
  };

  const GenderPill = (params) => {
    const value = (params.value || '').toString().toLowerCase();
    const kind =
      value === 'female' ? 'female' : value === 'male' ? 'male' : 'other';
    return (
      <span className={`${classes.pill} ${kind}`}>
        {params.value || '—'}
      </span>
    );
  };

  const modifiedColumnDefs = useMemo(() => {
    return colDefs.map((colDef) => {
      const next = { ...colDef };
      if (
        onRowOpen &&
        (next.field === 'name' ||
          next.field === 'types' ||
          next.field === 'type')
      ) {
        next.cellRenderer = NameCell;
      }
      if (next.field === 'gender') {
        next.cellRenderer = GenderPill;
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
        next.cellRenderer = CountChip;
      }
      return next;
    });
  }, [colDefs, user, onRowOpen]);

  const isRowSelectable = useMemo(() => {
    return (params) => {
      return !!params.data && params.data.email !== user?.email;
    };
  }, [user]);

  const getRowStyle = (params) => {
    if (params.data?.email && params.data.email === user?.email) {
      return { background: '#F3F6F1', fontWeight: 600 };
    }
    return null;
  };

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      resizable: true,
      suppressMovable: true,
    }),
    []
  );

  const gridOptions = useMemo(
    () => ({
      rowSelection: 'multiple',
      onSelectionChanged,
      headerHeight: 46,
      rowHeight: 52,
      overlayNoRowsTemplate:
        '<div style="text-align:center;color:#6C6C6C"><div style="font-weight:600;color:#2F2F2F;margin-bottom:4px">Nothing to show</div><div>Try a different search or filter</div></div>',
      animateRows: true,
      suppressCellFocus: true,
      suppressRowClickSelection: true,
    }),
    [onSelectionChanged]
  );

  return (
    <Box className={`ag-theme-quartz ${classes.gridContainer}`}>
      {isPending && (
        <Box className={classes.skeletonWrap}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Box key={i} className={classes.skeletonRow} />
          ))}
        </Box>
      )}
      {isError && (
        <Box className={classes.tableSkeleton}>
          <Typography className="errorMessage">
            Something went wrong while fetching data.
          </Typography>
        </Box>
      )}
      {!isPending && !isError && data && (
        <>
          {onRowOpen && (
            <Typography className={classes.tableHint}>
              Click a name to open · checkbox to select · double-click a row
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
