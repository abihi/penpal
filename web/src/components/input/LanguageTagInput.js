import React, { Component } from 'react';
import { connect } from 'react-redux';
import {denormalize} from 'normalizr';
import { getLanguages } from '../../modules/languages/get';
import {language} from '../../modules/entities';
import { Tag, AutoComplete } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class LanguageTagInput extends Component {
  state = {
    selected: []
  };
  componentDidMount = () => {
    const {getLanguages} = this.props;
    getLanguages();
  };

  onSelect = languageName => {
    // find the language object that shares the name with selected language
    const languageObject = this.props.languages.filter(language => language.name === languageName)[0];
    // Append new language to list of selected tags
    const {selected} = this.state;
    selected.push(languageObject);
    this.setState({ selected });
  };

  handleClose = language => {
    // Remove language from list of selected tags
    const selected = this.state.selected.filter(item => item.id !== language.id);
    this.setState({ selected});
  };

  render() {
    const {languages} = this.props;
    const {selected} = this.state;

    const options = languages.map(language => {
      return(
        {value: language.name, id: language.id}
      )
    });

    return (
      <div>
        <div>
        {
          selected.map(language => {
            return (
              <Tag key={language.id}
                   closable={true}
                   onClose={() => this.handleClose(language)}>
                   {language.name}
              </Tag>
            )
          })
        }
        </div>
        <AutoComplete
          style={{width: 200}}
          options={options}
          placeholder="Select languages that you speak"
          onSelect={this.onSelect}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    languages: denormalize(store.languages.get.languages, [language], store.entities),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLanguages: () => dispatch(getLanguages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageTagInput);
