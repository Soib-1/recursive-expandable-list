import React from "react";
import data from "../../shared/list-data.json";
import "./HierarchyList.styles.scss";
import { BiMessageSquareMinus } from "react-icons/bi";
import { BiCircle } from "react-icons/bi";

const departments = data.root;

const DepartmentList = ({ departments, selectedDepartments, onChange }) => {
  const handleDepartmentSelect = (selectedDepartmentId) => {
    if (selectedDepartments[selectedDepartmentId]) {
      delete selectedDepartments[selectedDepartmentId];
    } else {
      selectedDepartments[selectedDepartmentId] = {};
    }

    onChange(selectedDepartments);
  };

  const handleSubDeparmentListChange = (departmentId, subSection) => {
    selectedDepartments[departmentId] = subSection;
    onChange(selectedDepartments);
  };

  return (
    <div className="list-container">
      {departments.map((department) => (
        <ul>
          <Selection
            selected={selectedDepartments[department.id]}
            placeholder={department.placeholder}
            type={department.type}
            onChange={() => {
              handleDepartmentSelect(department.id);
            }}
          />
          {department.children.length > 0 &&
            selectedDepartments[department.id] && (
              <DepartmentList
                departments={department.children}
                selectedDepartments={selectedDepartments[department.id]}
                onChange={(subSection) =>
                  handleSubDeparmentListChange(department.id, subSection)
                }
              />
            )}
        </ul>
      ))}
    </div>
  );
};

const Selection = ({ selected, placeholder, onChange, type }) => {
  return (
    <div>
      <div className="selection" onClick={() => onChange(!selected)}>
        {type === "checkbox" && <BiMessageSquareMinus className="icon" />}
        {type === "radio" && <BiCircle className="icon" />}
        <div className="placeholder">{placeholder}</div>
      </div>
    </div>
  );
};

export default class HierarchyList extends React.Component {
  state = {
    selectedDepartments: {},
  };

  render() {
    return (
      <div className="container">
        <p className="title">Softwarely Task</p>
        <hr />
        <DepartmentList
          departments={departments}
          selectedDepartments={this.state.selectedDepartments}
          onChange={(selectedDepartments) =>
            this.setState({ selectedDepartments })
          }
        />
      </div>
    );
  }
}
