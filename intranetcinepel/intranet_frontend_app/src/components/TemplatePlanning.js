import React, { Component,useMemo, useState, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { Redirect } from 'react-router';
import Error from './Error';
import axios from 'axios';
import Table from "./Table";
import {AppProvider, Page} from '@shopify/polaris';

class TemplatePlanning extends Component {
  static contextType = AuthContext
  constructor(props) {
    super(props);
    this.state={
      namePost : '',
      nameTemplate : '',
      columns : [],
      data : null,
      is_created : false,
      error : null,
      is_delete : null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitTemplate = this.submitTemplate.bind(this);
    this.getTemplate = this.getTemplate.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
  };
  
  handleChange(event){    
    this.setState({namePost: event.target.value});
  }
  // store a new template
  submitTemplate(event) {
    event.preventDefault();

    // TODO store elsewhere than session ? see security
    let authed_user = sessionStorage.getItem('authed_user');

    var templateFormData = new FormData();
    templateFormData.append('name', this.state.namePost);
    templateFormData.append('id_create', authed_user);
    axios({
      method: 'post',
      url: 'api/template/',
      data: templateFormData,
    })
    .then((response) => {
      if (response.status === 200) {
        this.setState({ is_created: true });
      }
    })
    .catch((error) => {
      if(error.response) {
        this.setState({
          error: {
            status: error.response.status + ' ' + error.response.statusText,
            detail: error.response.data.detail,
          }
        });
      }
    });
  }

  // TODO get in function of a name (scrolllist where there is all the name of the templates) and so get by the id
  getTemplate(){
    axios({
      method: 'get',
      url: 'api/template/8',
      responseType: 'json',
    })
    .then((response) => {
      if (response.status === 200) {
        this.setState({
          nameTemplate : response.data.name,
          columns: response.data.content,
          data : { tableData: response.data.content },
        });
      }
    })
    .catch((error) => {
      if(error.response) {
        this.setState({
          error: {
            status: error.response.status + ' ' + error.response.statusText,
            detail: error.response.data.detail,
          }
        });
      }
    });
  }
  
  deleteTemplate(){
    axios({
      method: 'delete',
      url: 'api/template/1',
    })
    .then((response) => {
      if (response.status === 200) {
        this.setState({
          is_delete: true,
        });
      }
    })
    .catch((error) => {
      if(error.response) {
        this.setState({
          error: {
            status: error.response.status + ' ' + error.response.statusText,
            detail: error.response.data.detail,
          }
        });
      }
    });
  }

  render(){
    const headings = [
      'Product name',
      'SKU',
      'Stock quantity',
      'Wholesale cost',
      'Sale price',
      'Quantity sold',
      'Gross sales',
      'Net sales',
      'Notes',
    ];
    const rows = [
      [
        'Red and black plaid scarf with thin red stripes and thick black stripes',
        124689325,
        28,
        '$35.00',
        '$60.00',
        12,
        '$720.00',
        '$300.00',
        '',
      ],
    ];
    console.log(this.state.columns)
    if (!this.context.getIsAuthenticated()) {
      return (<Redirect to ="/login"/>);
    }
    if (this.state.error) {
      return (<Error status={this.state.error.status} detail={this.state.error.detail}/>);
    }
    return (
      <div className="container">
        <div className="intranet_classic">
          <form onSubmit={this.submitTemplate}>
            <div className="form-group">
              <label>name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.handleChange}
                />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-danger">post</button>
            </div>
          </form>
          <button onClick={this.getTemplate}>get</button>
          <div>
            <h4>{this.state.nameTemplate}</h4>
          </div>
          <button onClick={this.deleteTemplate}>del</button>
          <AppProvider>
            <Page title="Data table">
              <Table headings={headings} rows={rows} />
            </Page>
          </AppProvider>
        </div>
       </div>
    );
  }
}

export default TemplatePlanning;