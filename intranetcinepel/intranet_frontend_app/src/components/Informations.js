import React, { Component} from 'react';
import { AuthContext } from './AuthProvider';
import { Redirect } from 'react-router';
import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";

import { Button , Collection , CollectionItem} from 'react-materialize';
import TextareaAutosize from 'react-textarea-autosize';

class Informations extends Component {
  _isMounted = false;
  static contextType = AuthContext
  constructor(props) {
    super(props);
    this.state={
      infos: [],
      content: '',
      error: null,
    };
    this.saveInfo = this.saveInfo.bind(this);
    this.createInfo = this.createInfo.bind(this);
    this.deleteInfo = this.deleteInfo.bind(this);
  }
  
  handleChangeState(){
    axios.get('api/information/', {
      headers: {
        'Authorization': "Token " + this.context.getToken()
      }
    })
    .then((response) => {
      if (response.status === 200) {
        this.setState({
          infos: [],
        });
        let allData = this.state.infos;
        response.data.map(info => allData.push(info));
        this.setState({
          infos: allData,
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

  async createInfo(){
    let authed_user = sessionStorage.getItem('authed_user');
    var infoFormData = new FormData();
    infoFormData.append('id_creator', authed_user);
    
    await axios.post('api/information/', infoFormData,{
      headers: {
        'Authorization': "Token " + this.context.getToken()
      }
    })
    .then((response) => {
      if (response.status === 200) {
        var toastHTML = '<span className="toast">Note d\'information créée</span>';
        M.toast({html: toastHTML});
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
    this.handleChangeState();
  }

  async saveInfo(e){
    var informationsDataEdit = new FormData();
    informationsDataEdit.append('title', document.getElementById(e.id+"title").value)
    informationsDataEdit.append('content', document.getElementById(e.id+"content").value)
    await axios.put('api/information/' + e.id + '/', informationsDataEdit,{
      headers: {
        'Authorization': "Token " + this.context.getToken()
      }
    })
    .then((response) => {
      if (response.status === 200) {
        var toastHTML = '<span className="toast">Note d\'information sauvegardée</span>';
        M.toast({html: toastHTML});
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
    this.handleChangeState();
  }

  async deleteInfo(e){
    await axios.delete('api/information/' + e + '/',{
      headers: {
        'Authorization': "Token " + this.context.getToken()
      }
    })
    .then((response) => {
      if (response.status === 204) {
        var toastHTML = '<span className="toast">Note d\'information supprimée</span>';
        M.toast({html: toastHTML});
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
    this.handleChangeState();
  }

  componentDidMount(){
    this._isMounted = true;
    axios.get('api/information/', {
      headers: {
        'Authorization': "Token " + this.context.getToken()
      }
    })
    .then((response) => {
      if (response.status === 200) {
        let allData = this.state.infos;
        response.data.map(info => allData.push(info));
        this.setState({
          infos: allData,
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


  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let infosList = [];
    if (!this.context.getIsAuthenticated()) {
      return (<Redirect to ="/login"/>);
    }
    if (this.state.error) {
      return (<Error status={this.state.error.status} detail={this.state.error.detail}/>);
    }
    if(this.context.getIsManager()){
      this.state.infos.map(Info =>{
        let infoIdTitle = Info.id + "title"
        let infoIdContent = Info.id + "content"
        let dateToShow = new Date(Info.timestamp)
        dateToShow = dateToShow.getDate() + "-" + dateToShow.getMonth() + "-" + dateToShow.getFullYear()
        infosList.push(
          <CollectionItem key={Info.timestamp}>
              <label className="right">{dateToShow}</label>
              <input 
                id = {infoIdTitle}
                type="text"
                name="title"
                defaultValue={Info.title}
                />
              <TextareaAutosize
                id = {infoIdContent}
                rows="4"
                cols="50"
                name="content"
                defaultValue={Info.content}
                />
              <Button className="button-create" onClick={this.saveInfo.bind(this, Info)}>Sauvegarder</Button>
              <Button className="button-delete" onClick={e =>
                window.confirm("Etes-vous sûr de vouloir supprimer cette note d'info ?") &&
                this.deleteInfo(Info.id)}>Supprimer</Button>
          </CollectionItem>
        )
        infosList.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.key) - new Date(a.key);
        });
      });
      return (
        <div className="intranet-classic">
          <div className="container">
          <Button className="button-create" onClick={this.createInfo}>Créer une nouvelle note d'info</Button>
          <Collection header="Informations">
            {infosList}
          </Collection>
          </div>
        </div>
        );
    }
    else{
      this.state.infos.map(Info =>{
        let dateToShow = new Date(Info.timestamp)
        dateToShow = dateToShow.getDate() + "-" + dateToShow.getMonth() + "-" + dateToShow.getFullYear()
        infosList.push(
          <CollectionItem key={Info.id}>
              <label className="right">{dateToShow}</label>
              <h5>{Info.title}</h5>
              <div>{Info.content}</div>
          </CollectionItem>
        )
        infosList.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.key) - new Date(a.key);
        });
      });
      return(
        <div className="intranet-classic">
          <div className="container">
          <Collection header="Informations">
            {infosList}
          </Collection>
          </div>
        </div>
      )
    }
  }
}

export default Informations;