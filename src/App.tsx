import React from 'react';
import CoursesList  from "./components/courses-list";
import NewCourseButton from "./components/newCourseButton";
import NewCourseForm from "./components/new-course-form";
import './App.css';

type StateApp = {
  showFormNewCourse?: boolean
};

class App extends React.Component<{},StateApp> {
  

  state: StateApp = {
    showFormNewCourse: false
  };


  showNewCourseForm = () =>{
    this.setState({
      showFormNewCourse: true
    })
  }

  render() {
      return (
       <div>
          {!this.state.showFormNewCourse &&    
            <div>
              <h2>Catálogo de cursos</h2>    
              <div className="flexContainer">
                <div className="tabla">
                  <CoursesList />
                </div>
                <div className="divBoton">
                  <NewCourseButton newCourse={this.showNewCourseForm}/>
                </div>
              </div>
            </div>
          }

          {this.state.showFormNewCourse &&
            <div>
                <NewCourseForm />
            </div>
          }
        </div>
        
      );

  }
}

export default App;
