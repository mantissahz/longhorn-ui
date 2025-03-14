import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Icon, Button, Tooltip } from 'antd'

let id = 0
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 15,
  },
}

class BackupLabelInput extends React.Component {
  remove = k => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  };

  add = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(id++)
    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  handleSubmit = e => e.preventDefault()

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form

    getFieldDecorator('keys', { initialValue: [] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => (
      <div style={{ paddingLeft: 10, display: 'flex', justifyContent: 'space-evenly', alignItems: 'start', height: '60px' }} key={index}>
        <Form.Item
          required={false}
          key={`key${k}`}
          style={{ marginBottom: 0 }}
        >
          {getFieldDecorator(`key[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'key is required',
              },
            ],
          })(<Input placeholder="Labels Key" style={{ marginRight: 8 }} />)}
        </Form.Item>
        <Form.Item
          required={false}
          key={`value${k}`}
          style={{ marginBottom: 0 }}
        >
          {getFieldDecorator(`value[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'value is required',
              },
            ],
          })(<Input placeholder="Value" style={{ marginRight: 8 }} />)}
        </Form.Item>
        {keys.length > 0 && (
          <Tooltip title="Remove label">
            <Icon
              style={{ marginTop: '12px' }}
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          </Tooltip>
        )}
      </div>
    ))
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Labels" style={{ display: 'flex' }} {...formItemLayout}>
          <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
            <Icon type="plus" /> Add Labels
          </Button>
        </Form.Item>
         {formItems}
      </Form>
    )
  }
}

BackupLabelInput.propTypes = {
  form: PropTypes.object,
}

export default BackupLabelInput
