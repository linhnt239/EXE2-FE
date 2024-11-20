import * as React from 'react';

import { PageHeader } from '@ant-design/pro-layout';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import Layout, { Content } from 'antd/lib/layout/layout';
import { ColumnType } from 'antd/lib/table';
import { ExpandableConfig } from 'antd/lib/table/interface';
import clsx from 'clsx';
import _get from 'lodash/get';

import { IPagingDto, ResponseList, SortOrder } from '@/core/models/common';

export interface IActionColum {
    label: string;
    onClick: (record: any) => void;
    isShow?: (record: any) => boolean;
}

interface TableBuilderProps {
    title: string;
    extraFilter?: string[];
    sourceKey: string;
    queryApi: (dto: IPagingDto) => Promise<ResponseList<any>>;
    columns: ColumnType<AnyObject>[];
    onBack?: () => void;

    pageSizes?: number[];
    tableSize?: 'small' | 'middle' | 'large';
    extraButtons?: React.ReactNode;

    extraBulkActions?: (selectRows: any[], setSelectRows: React.Dispatch<React.SetStateAction<any[]>>) => React.ReactNode;
    expandable?: ExpandableConfig<any>;
    actionColumns?: Array<IActionColum>;
}

const TableBuilder: React.FC<TableBuilderProps> = ({
    sourceKey,
    title,
    queryApi,
    columns,
    extraFilter = [],
    onBack,
    pageSizes = [10],
    tableSize = 'middle',

    extraBulkActions,
    extraButtons,
    actionColumns,
    expandable,
}) => {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(pageSizes[0]);
    const [order, setOrder] = React.useState<SortOrder>(SortOrder.DESC);
    const [orderBy, setOrderBy] = React.useState<string>('createdAt');
    const [isShowFilter, setIsShowFilter] = React.useState(false);
    const [selectedRowGroup, setSelectedRowGroup] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (extraFilter.length !== 0) {
            setPage(1);
        }
    }, [extraFilter]);

    const pagingQuery = useQuery(
        [sourceKey, 'paging', page, pageSize, order, orderBy, extraFilter],
        () => {
            return queryApi({
                page: page - 1,
                pageSize,
                orderBy: orderBy ? [`${orderBy}||${order}`] : [`createdAt||${SortOrder.DESC}`],
                filters: [...extraFilter],
            });
        },
        {
            initialData: {
                count: 0,
                data: [],
                totalPage: 0,
            },
        },
    );

    return (
        <div className="fade-in flex gap-4 ">
            <Layout className="!bg-inherit ">
                <Content
                    className={clsx('', {
                        'ml-4': isShowFilter,
                    })}
                >
                    <div>
                        <PageHeader
                            title={title}
                            onBack={onBack}
                            extra={[
                                selectedRowGroup.length === 0 ? null : (
                                    <React.Fragment key="3">{extraBulkActions?.(selectedRowGroup, setSelectedRowGroup)}</React.Fragment>
                                ),
                                extraButtons,
                            ]}
                        />

                        <Table
                            bordered
                            sticky
                            rowSelection={
                                Boolean(extraBulkActions)
                                    ? {
                                          type: 'checkbox',
                                          onChange(selectedRowKeys, selectedRows, info) {
                                              setSelectedRowGroup(selectedRows);
                                          },
                                          selectedRowKeys: selectedRowGroup.map((item) => item.id),
                                      }
                                    : undefined
                            }
                            sortDirections={['ascend', 'descend']}
                            rowKey={(record) => _get(record, 'id', '')}
                            size={tableSize}
                            dataSource={pagingQuery.data.data}
                            columns={[...columns.map((item, index) => ({ sorter: true, ...item, key: item.key, title: item.title }))]}
                            pagination={{
                                current: page,
                                pageSize,
                                total: pagingQuery.data.count,
                            }}
                            expandable={expandable}
                            loading={pagingQuery.isFetching}
                            onChange={(pagination, filters, sorter, extra) => {
                                if (sorter) {
                                    const sortKey = _get(sorter, 'columnKey', '');
                                    const sortOrder = _get(sorter, 'order', undefined);

                                    if (sortOrder) {
                                        setOrderBy(sortKey);
                                        setOrder(sortOrder === 'ascend' ? SortOrder.ASC : SortOrder.DESC);
                                    } else {
                                        setOrderBy('createdAt');
                                        setOrder(SortOrder.ASC);
                                    }
                                }

                                setPage(pagination.current || 0);
                                if (pagination.pageSize !== pageSize) {
                                    setPage(1);
                                    setPageSize(pagination.pageSize || pageSizes[0]);
                                }
                            }}
                        />
                    </div>
                </Content>
            </Layout>
        </div>
    );
};

export default TableBuilder;
