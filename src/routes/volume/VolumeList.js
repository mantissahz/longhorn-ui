import React, { PropTypes } from 'react'
import { Table } from 'antd'
import moment from 'moment'
import classnames from 'classnames'
import { DropOption } from '../../components'
import { Link } from 'dva/router'
import { formatMib } from '../../utils/formater'

function list({ loading, dataSource, showAttachHost, showRecurring, showSnapshots, detach, deleteVolume }) {
  const handleMenuClick = (event, record) => {
    switch (event.key) {
      case 'attach':
        showAttachHost(record)
        break
      case 'delete':
        deleteVolume(record)
        break
      case 'detach':
        detach(record.actions.detach)
        break
      case 'recurring':
        showRecurring()
        break
      case 'snapshotList':
        showSnapshots()
        break
      default:
    }
  }
  const getStateWeight = (state) => {
    switch (state) {
      case 'healthy':
        return 0
      case 'faulted':
        return 1
      case 'detached':
        return 2
      default:
        return 99
    }
  }
  dataSource.sort((a, b) => getStateWeight(a.state) - getStateWeight(b.state))
  const columns = [
    {
      title: 'Status',
      dataIndex: 'state',
      key: 'state',
      width: 100,
      render: (text) => {
        return (
          <div className={classnames({ [text.toLowerCase()]: true, capitalize: true })}>
            {text.hyphenToHump()}
          </div>
        )
      },
    }, {
      title: 'Name',
      dataIndex: 'id',
      key: 'id',
      render: (text) => {
        return (
          <div>
            <Link to={`/volume/${text}`}>
              {text}
            </Link>
          </div>
        )
      },
    }, {
      title: 'Host',
      dataIndex: 'host',
      key: 'host',
    }, {
      title: 'Frontend',
      dataIndex: 'endpoint',
      key: 'endpoint',
    }, {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (text) => {
        return (
          <div>
            {formatMib(text)}
          </div>
        )
      },
    }, {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      render: (text) => {
        return (
          <div>
            {moment(new Date(text)).fromNow()}
          </div>
        )
      },
    }, {
      title: '',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        const allActions = [
          { key: 'attach', name: 'Attach' },
          { key: 'detach', name: 'Detach' },
          { key: 'snapshotList', name: 'Snapshots' },
          { key: '5', name: 'Backups' },
          { key: '6', name: 'Recurring Snapshot and Backup' },
        ]
        const availableActions = [{ key: 'delete', name: 'Delete' }]
        allActions.forEach(action => {
          for (const key of Object.keys(record.actions)) {
            if (key === action.key) {
              availableActions.push(action)
            }
          }
        })
        return (
          <DropOption menuOptions={availableActions} onMenuClick={(e) => handleMenuClick(e, record)}
          />
        )
      },
    },
  ]

  const pagination = false

  return (
    <div>
      <Table
        bordered={false}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        simple
        pagination={pagination}
        rowKey={record => record.id}
      />
    </div>
  )
}

list.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  detach: PropTypes.func,
  deleteVolume: PropTypes.func,
  showAttachHost: PropTypes.func,
  showRecurring: PropTypes.func,
  showSnapshots: PropTypes.func,
}

export default list
