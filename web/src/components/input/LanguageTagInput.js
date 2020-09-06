import React, { Component } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class LanguageTagInput extends Component {
  state = {
    tags: ['Unremovable', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  render() {
    return (
      <input type="text" />
    );
  }
}

export default LanguageTagInput;
