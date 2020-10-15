import React, { Component } from 'react';
import { personasServices } from './services/personas.services';
import './App.css';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personas: [],
      persona: {
        id: null,
        nombre: "",
        apellido: "",
        status: true
      }
    }

    this.personasServices = new personasServices();
    this.save = this.save.bind(this);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeApellido = this.onChangeApellido.bind(this);
  }

  componentDidMount() {
    this.getPersonas();
  }
  getPersonas() {
    this.personasServices.getAll()
      .then(res => {
        this.setState({ personas: res })
        console.log(res);
      })
      .catch(e => {
        console.log(e)
      })

  }

  save() {
    var data = {
      name: this.state.nombre,
      last_name: this.state.apellido
    }
    this.personasServices.create(data)
    .then(response => {
      this.setState({
        id: response.data.id,
        nombre: response.data.nombre,
        apellido: response.data.apellido,
      })
      console.log(response)
    })
    .catch(e => {
      console.log(e);
    });
 
  }

  onChangeNombre(e) {
    this.setState({
      nombre: e.target.value
    });
  }
  onChangeApellido(e) {
    this.setState({
      apellido: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <h1> CRUD  </h1>
        <Panel header="TABLA PERSONAS" >

        <span className="p-float-label">
        <InputText id="nombre" value={this.state.nombre} onChange={this.onChangeNombre} />
        <label htmlhtmlFor="nombre">Username</label>
        </span>
        </Panel>
          apellido: <InputText id="apellido" value={this.state.apellido} onChange={this.onChangeApellido} />
        <br/>
        <span className="p-float-label">
          Tipo Documento: <InputText id="apellido" value={this.state.apellido} onChange={this.onChangeApellido} />
          N° Documento: <InputText id="apellido" value={this.state.apellido} onChange={this.onChangeApellido} />
</span>
        <br/>


        <Button onClick={this.save} className="btn btn-success">crear</Button>
        <Panel header="TABLA PERSONAS" >
          <DataTable value={this.state.personas}>
            <Column field="id" header="id"></Column>
            <Column field="name" header="Nombre"></Column>
            <Column field="last_name" header="Apellido"></Column>
            <Column field="address" header="Direccion"></Column>
            <Column field="doc_type" header="Tipo Documento"></Column>
            <Column field="cedula" header="documento"></Column>
            <Column field="date_birth" header="Cumpleaños"></Column>
          </DataTable>
        </Panel>
      </div>
    );
  }
}


