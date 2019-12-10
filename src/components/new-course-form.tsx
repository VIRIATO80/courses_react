import * as React from "react";
import {Level, Teacher} from "../types/types";



type NewCourseState = {
    teachers?: Teacher[]
};


export default class NewCourseForm extends React.Component {



    levels: string[] = ['Principiante', 'Intermedio', 'Avanzado'];

    state = {
        title: '',
        level: Level.Principiante,
        teacherId: 1,
        hours: 10,
        active: true,
        submitSuccess: false,
        loading: false,
        teachers: [] as Teacher[]    
    }

    componentDidMount(){

        fetch('http://localhost:8080/teachers')
        .then(res => res.json())
        .then((data) => {
          this.setState({ loading:true, teachers: data });
        },
        (error) =>{
          this.setState({
            loading: true,
            error
          });
        });
    }

    refreshPage() {
      window.location.reload(false);
    }

     private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        this.setState({ loading: true, submitSuccess: true });
        
        fetch('http://localhost:8080/courses', {
            method: 'POST',
            body: JSON.stringify(this.state), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response =>{
             console.log('Success:', response);
          });
    }

    handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleCheck = () =>{
        this.setState({active: !this.state.active});
      }

    render(){
        const { submitSuccess, loading } = this.state;
      return (
          <div>
              <div className={"col-md-12 form-wrapper"}>
                  <h2>Crear nuevo curso</h2>
                  {!submitSuccess && (
                      <div className="alert alert-info" role="alert">
                          Rellena el formulario correctamente para crear un nuevo curso
                  </div>
                  )}
                  {submitSuccess && (
                      <div className="alert alert-success" role="alert">
                          El formulario se ha registrado con éxito
                          </div>
                  )}
                  <form id={"create-course-form"} onSubmit={this.processFormSubmission} >
                      <div className="form-group col-md-6">
                          <label htmlFor="title"> Título </label>
                          <input type="text" id="title" onChange={(e) => this.setState({title: e.target.value})} name="title" className="form-control" placeholder="Nombre del curso" required />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="level">Nivel</label><br/>
                        <select id="level" name="level" value={this.state.level} onChange={(e) => this.setState({level: e.target.value})}>
                            {this.levels.map((level) => <option key={level} value={level}>{level}</option>)}
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                      <label htmlFor="level">Profesor</label><br/>
                        <select id="teacherName" name="teacherName" value={this.state.teacherId} onChange={(e) => this.setState({teacherId: e.target.value})}>
                            {this.state.teachers.map((teacher) => <option key={teacher.teacherId} value={teacher.teacherId}>{teacher.teacherName}</option>)}
                        </select>
                      </div>
                      <div className="form-group col-md-1">
                        <label htmlFor="hours"> Horas</label>
                        <input type="number" id="hours" onChange={(e) => this.handleInputChanges(e)} name="hours" className="form-control" min="10" defaultValue="10" />
                      </div>
                      <div className="form-group col-md-1">
                        <label htmlFor="active"> Activo </label><br/>
                        <input type="checkbox" id="active" onChange={(e) => this.handleCheck()} name="active" className="form-control" defaultChecked={this.state.active} value="true"/>
                       </div>   
                      <div className="form-group col-md-4 pull-right">
                          <button className="btn btn-success" type="submit">
                              Añadir Curso
                          </button>
                          &nbsp;&nbsp;
                          <button className="btn btn-secondary" type="button" onClick={this.refreshPage} >
                              Volver al listado
                          </button>
                          {loading && <span className="fa fa-circle-o-notch fa-spin" />
                          }
                      </div>
                  </form>
              </div>
          </div>
      )
  }
}