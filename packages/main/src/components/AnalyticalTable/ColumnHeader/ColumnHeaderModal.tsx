import '@ui5/webcomponents-icons/dist/icons/decline';
import { useI18nBundle } from '@ui5/webcomponents-react-base/lib/hooks';
import { ThemingParameters } from '@ui5/webcomponents-react-base/lib/ThemingParameters';
import { enrichEventWithDetails } from '@ui5/webcomponents-react-base/lib/Utils';
import {
  CLEAR_SORTING,
  GROUP,
  SORT_ASCENDING,
  SORT_DESCENDING,
  UNGROUP
} from '@ui5/webcomponents-react/assets/i18n/i18n-defaults';
import { FlexBox } from '@ui5/webcomponents-react/lib/FlexBox';
import { FlexBoxAlignItems } from '@ui5/webcomponents-react/lib/FlexBoxAlignItems';
import { Icon } from '@ui5/webcomponents-react/lib/Icon';
import { List } from '@ui5/webcomponents-react/lib/List';
import { ListItemTypes } from '@ui5/webcomponents-react/lib/ListItemTypes';
import { PlacementType } from '@ui5/webcomponents-react/lib/PlacementType';
import { Popover } from '@ui5/webcomponents-react/lib/Popover';
import { PopoverHorizontalAlign } from '@ui5/webcomponents-react/lib/PopoverHorizontalAlign';
import { StandardListItem } from '@ui5/webcomponents-react/lib/StandardListItem';
import React, { CSSProperties, forwardRef, RefObject, useCallback } from 'react';
import { Ui5PopoverDomRef } from '../../../interfaces/Ui5PopoverDomRef';
import { ColumnType } from '../types/ColumnType';

export interface ColumnHeaderModalProperties {
  column: ColumnType;
  onSort?: (e: CustomEvent<{ column: unknown; sortDirection: string }>) => void;
  onGroupBy?: (e: CustomEvent<{ column: unknown; isGrouped: boolean }>) => void;
}

const staticStyle = { fontWeight: 'normal' };

export const ColumnHeaderModal = forwardRef((props: ColumnHeaderModalProperties, ref: RefObject<Ui5PopoverDomRef>) => {
  const { column, onSort, onGroupBy } = props;
  const showFilter = column.canFilter;
  const showGroup = column.canGroupBy;
  const showSort = column.canSort;

  const { Filter } = column;

  const i18nBundle = useI18nBundle('@ui5/webcomponents-react');

  const handleSort = useCallback(
    (e) => {
      const sortType = e.detail.item.getAttribute('data-sort');

      switch (sortType) {
        case 'asc':
          column.toggleSortBy(false);
          if (typeof onSort === 'function') {
            onSort(
              enrichEventWithDetails(e, {
                column,
                sortDirection: sortType
              })
            );
          }
          break;
        case 'desc':
          column.toggleSortBy(true);
          if (typeof onSort === 'function') {
            onSort(
              enrichEventWithDetails(e, {
                column,
                sortDirection: sortType
              })
            );
          }
          break;
        case 'clear':
          column.clearSortBy();
          if (typeof onSort === 'function') {
            onSort(
              enrichEventWithDetails(e, {
                column,
                sortDirection: sortType
              })
            );
          }
          break;
        case 'group':
          const willGroup = !column.isGrouped;
          column.toggleGroupBy(willGroup);
          if (typeof onGroupBy === 'function') {
            onGroupBy(
              enrichEventWithDetails(e, {
                column,
                isGrouped: willGroup
              })
            );
          }
          break;
      }
      if (ref.current) {
        ref.current.close();
      }
    },
    [column, ref, onGroupBy, onSort]
  );

  const isSortedAscending = column.isSorted && column.isSortedDesc === false;
  const isSortedDescending = column.isSorted && column.isSortedDesc === true;

  return (
    <Popover
      noArrow
      horizontalAlign={PopoverHorizontalAlign.Left}
      placementType={PlacementType.Bottom}
      ref={ref}
      style={staticStyle as CSSProperties}
    >
      <List onItemClick={handleSort}>
        {isSortedAscending && (
          <StandardListItem type={ListItemTypes.Active} icon="decline" data-sort="clear">
            {i18nBundle.getText(CLEAR_SORTING)}
          </StandardListItem>
        )}
        {showSort && !isSortedAscending && (
          <StandardListItem type={ListItemTypes.Active} icon="sort-ascending" data-sort="asc">
            {i18nBundle.getText(SORT_ASCENDING)}
          </StandardListItem>
        )}
        {showSort && !isSortedDescending && (
          <StandardListItem type={ListItemTypes.Active} icon="sort-descending" data-sort="desc">
            {i18nBundle.getText(SORT_DESCENDING)}
          </StandardListItem>
        )}
        {isSortedDescending && (
          <StandardListItem type={ListItemTypes.Active} icon="decline" data-sort="clear">
            {i18nBundle.getText(CLEAR_SORTING)}
          </StandardListItem>
        )}
        {showFilter && !column.isGrouped && (
          <FlexBox
            alignItems={FlexBoxAlignItems.Center}
            style={{
              padding: '0px 1rem',
              height: 'var(--_ui5_custom_list_item_height)',
              borderBottom: `1px solid ${ThemingParameters.sapList_BorderColor}`
            }}
          >
            <Icon name="filter" style={{ paddingRight: '0.5rem', minWidth: '1rem', minHeight: '1rem' }} />
            <Filter column={column} popoverRef={ref} />
          </FlexBox>
        )}
        {showGroup && (
          <StandardListItem type={ListItemTypes.Active} icon="group-2" data-sort={'group'}>
            {i18nBundle.getText(column.isGrouped ? UNGROUP : GROUP)}
          </StandardListItem>
        )}
      </List>
    </Popover>
  );
});
ColumnHeaderModal.displayName = 'ColumnHeaderModal';
