import React from "react";
import departments from "../../shared/list-data.json";
import "./HierarchyList.styles.scss";
import { BiMessageSquareMinus } from "react-icons/bi";
import { BiCircle } from "react-icons/bi";

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
        <ul className="li-container">
          <Selection
            selected={selectedDepartments[department.id]}
            placeholder={department.placeholder}
            type={department.type}
            onChange={() => {
              handleDepartmentSelect(department.id);
            }}
            children={department.children.length}
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

const Selection = ({ selected, placeholder, onChange, type, children }) => {
  return (
    <div className="entry">
      <div
        className={children > 0 ? "selection" : "child"}
        onClick={() => onChange(!selected)}
      >
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
        <div className="title-container">
          <p className="title">Recursive List</p>
        </div>
        <div className="list-container">
          <DepartmentList
            departments={departments}
            selectedDepartments={this.state.selectedDepartments}
            onChange={(selectedDepartments) =>
              this.setState({ selectedDepartments })
            }
          />
        </div>
      </div>
    );
  }
}
