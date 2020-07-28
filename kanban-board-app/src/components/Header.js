import React from "react";
import PropTypes from "prop-types";

const Header = ({ projects, onCurrentProjectChange }) => {
  const projectOptions = projects.map((project) => (
    <option key={project.id} value={project.id}>
      {project.name}
    </option>
  ));

  return (
    <div className="project-item">
      Project:
      <select onChange={onCurrentProjectChange} className="project-menu">
        {projectOptions}
      </select>
    </div>
  );
};

Header.defaultProps = {
  projects: [],
  onCurrentProjectChange: (f) => f,
};
Header.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  onCurrentProjectChange: PropTypes.func,
};

export default Header;
