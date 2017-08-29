import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from "../../selectors/selectors";

export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
          course: Object.assign({}, props.course),
          errors: {},
          saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.course.id !== nextProps.course.id) {
        //Necessary to populate from when existing course is loaded directly
        this.setState({course: Object.assign({}, nextProps.course)});
      }
    }

    updateCourseState(event) {
      const field = event.target.name;
      let course = Object.assign({},this.state.course);
      course[field] = event.target.value;
      return this.setState({course: course});
    }

    courseFormIsValid() {
      let formIsValid = true;
      let errors = {};

      if(this.state.course.title.length < 5) {
        errors.title = 'Title must be at least 5 characters.';
        formIsValid = false;
      }

      this.setState({errors: errors});
      return formIsValid;
    }

    saveCourse(event) {
      event.preventDefault();
      if(!this.courseFormIsValid()) {
        return;
      }
      this.setState({saving: true});
      this.props.actions.saveCourse(this.state.course)
        .then(() => this.redirect())
        .catch(error => {
          this.setState({saving: false});
          toastr.error(error);
        });
    }

    redirect() {
      this.setState({saving: false});
      toastr.success('Course saved.');
      this.context.router.push('/courses');
    }

    render() {
        return (
          <CourseForm course={this.state.course}
                      errors={this.state.errors}
                      allAuthors={this.props.authors}
                      saving={this.state.saving}
                      onChange={this.updateCourseState}
                      onSave={this.saveCourse}
          />
        );
    }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if(course.length) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; //from the path `/course/:id`
  let course = {id:'', watchHref:'', title:'', authorId:'', length:'', category:''};

  if(courseId && state.courses.length > 0) {
   course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);