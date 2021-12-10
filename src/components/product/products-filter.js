import {useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Divider, Tab, Tabs} from '@material-ui/core';
import {Adjustments as AdjustmentsIcon} from '../../icons/adjustments';
import {
    containsOperator,
    equalOperator,
    greaterThanOperator,
    isAfterOperator,
    isBeforeOperator,
    lessThanOperator,
    notEqualOperator
} from '../../utils/filter-operators';
import {BulkActionsMenu} from '../bulk-actions-menu';
import {FilterDialog} from '../filter-dialog';
import {Query} from '../query';
import {useTranslation} from "react-i18next";

const views = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'In Stock',
        value: 'In Stock'
    },
    {
        label: 'Out of Stock',
        value: 'outOfStock'
    }
];

const filterProperties = [
    {
        label: 'Name',
        name: 'name',
        type: 'string'
    },
    {
        label: 'Updated',
        name: 'updatedAt',
        type: 'date'
    },
    {
        label: 'Status',
        name: 'status',
        type: 'string'
    }
];

const filterOperators = [
    equalOperator,
    notEqualOperator,
    containsOperator,
    greaterThanOperator,
    lessThanOperator,
    isAfterOperator,
    isBeforeOperator
];

export const ProductsFilter = (props) => {
    const {
        disabled,
        filters,
        onFiltersApply,
        onFiltersClear,
        onQueryChange,
        onViewChange,
        query,
        selectedProducts,
        view
    } = props;
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const {t} = useTranslation();

    return (
        <>
            <div>
                <Box
                    sx={{
                        px: {
                            sm: 3
                        }
                    }}
                >
                    <Tabs
                        onChange={(event, value) => onViewChange?.(value)}
                        allowScrollButtonsMobile
                        value={view}
                        variant="scrollable"
                    >
                        {views.map((option) => (
                            <Tab
                                disabled={disabled}
                                key={option.label}
                                label={t(option.label)}
                                value={option.value}
                            />
                        ))}
                    </Tabs>
                </Box>
                <Divider/>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: {
                            sm: selectedProducts.length > 0 ? 'auto 1fr auto' : '1fr auto',
                            xs: 'auto'
                        },
                        justifyItems: 'flex-start',
                        p: 3
                    }}
                >
                    <BulkActionsMenu
                        disabled={disabled}
                        onDelete={() => {
                        }}
                        selectedCount={selectedProducts.length}
                        sx={{
                            display: selectedProducts.length > 0 ? 'flex' : 'none',
                            order: {
                                sm: 1,
                                xs: 2
                            }
                        }}
                    />
                    <Query
                        disabled={disabled}
                        onChange={onQueryChange}
                        sx={{
                            order: {
                                sm: 2,
                                xs: 1
                            }
                        }}
                        value={query}
                    />
                    <Button
                        color="primary"
                        disabled={disabled}
                        onClick={() => setOpenFilterDialog(true)}
                        startIcon={<AdjustmentsIcon/>}
                        size="large"
                        sx={{order: 3}}
                        variant={filters.length ? 'contained' : 'text'}
                    >
                        {t("Filter")}
                    </Button>
                </Box>
            </div>
            <FilterDialog
                onApply={onFiltersApply}
                onClear={onFiltersClear}
                onClose={() => setOpenFilterDialog(false)}
                open={openFilterDialog}
                operators={filterOperators}
                properties={filterProperties}
            />
        </>
    );
};

ProductsFilter.defaultProps = {
    filters: [],
    selectedProducts: [],
    view: 'all'
};

ProductsFilter.propTypes = {
    disabled: PropTypes.bool,
    filters: PropTypes.array,
    onFiltersApply: PropTypes.func,
    onFiltersClear: PropTypes.func,
    onQueryChange: PropTypes.func,
    onViewChange: PropTypes.func,
    query: PropTypes.string,
    selectedProducts: PropTypes.array,
    view: PropTypes.string
};
