import * as React from "react";
import {Course, Ordering} from "../types/types";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


type ListCoursesStateApp = {
  error?: any,
  isLoaded?: boolean,
  courses: Course[],
  ordering?: Ordering,
};



export default class CoursesList extends React.Component {


  state: ListCoursesStateApp = {
    courses: []
  };
  
  componentDidMount(){

    fetch('http://localhost:8080/courses')
    .then(res => res.json())
    .then((data) => {
      this.setState({ isLoaded:true, courses: data });
    },
    (error) =>{
      this.setState({
        isLoaded: true,
        error
      });
    });

    document.getElementsByClassName("titleHeader")[0].addEventListener("click",(e)=>{
      if(this.state.ordering === undefined || this.state.ordering === Ordering.DESC){
        this.setState({ordering:Ordering.ASC});
        document.getElementsByClassName("titleHeader")[0].classList.add('-sort-asc');
        document.getElementsByClassName("titleHeader")[0].classList.remove('-sort-desc');
      }else{
        this.setState({ordering:Ordering.DESC})
        document.getElementsByClassName("titleHeader")[0].classList.add('-sort-desc');
        document.getElementsByClassName("titleHeader")[0].classList.remove('-sort-asc');
      }

      fetch('http://localhost:8080/courses?order='+this.state.ordering)
      .then(res => res.json())
      .then((data) => {
        this.setState({courses: data});
      },
      (error) =>{
        this.setState({
          isLoaded: true,
          error
        });
      });
    })
  }

  render(){
        return (
            <div>
              <ReactTable
                data={this.state.courses}
                columns={[
                  {
                    columns: [
                      {
                        Header: "Título",
                        headerClassName:"titleHeader",
                        accessor: "title",
                        sortable: false
                      },
                      {
                        Header: "Profesor",
                        accessor: "teacherName",
                        sortable: false
                      },
                      {
                        Header: "Nivel",
                        accessor: "level",
                        sortable: false
                      },
                      {
                        Header: "Horas",
                        accessor: "hours",
                        sortable: false
                      }
                    ]
                  }
                ]}
                defaultPageSize={5}
                className="-striped center"
                showPageSizeOptions={false}
              />
              <br/>
            </div>
          );
    }
};