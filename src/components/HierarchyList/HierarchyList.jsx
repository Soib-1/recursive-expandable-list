import React from "react";
import data from "../../shared/list-data.json";
import "./HierarchyList.styles.scss";
import { BsFillDashSquareFill } from "react-icons/bs";
import { ImRadioChecked } from "react-icons/im";

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
    <div>
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
        {type === "checkbox" && <BsFillDashSquareFill className="icon" />}
        {type === "radio" && <ImRadioChecked className="icon" />}
        {placeholder}
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
      <div>
        <h1>Softwarely Task</h1>
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
