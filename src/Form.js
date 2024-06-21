import React, { useState } from 'react';
import { useFormik } from 'formik';
import './Form.css';

const validate = values => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required';
  } else if (!/^\d+$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Must be a number';
  }

  if (!values.applyingForPosition) {
    errors.applyingForPosition = 'Required';
  }
  
  if ((values.applyingForPosition === 'Developer' || values.applyingForPosition === 'Designer') && !values.relevantExperience) {
    errors.relevantExperience = 'Required';
    if(values.relevantExperience === 0) errors.relevantExperience = 'Must be greater than 0';
  } else if (values.relevantExperience && values.relevantExperience <=0) {
    errors.relevantExperience = 'Must be greater than 0';
  }

  if (values.applyingForPosition === 'Designer' && !values.portfolioUrl) {
    errors.portfolioUrl = 'Required';
  } else if (values.portfolioUrl && !/^https?:\/\/.+\..+/.test(values.portfolioUrl)) {
    errors.portfolioUrl = 'Invalid URL';
  }

  if (values.applyingForPosition === 'Manager' && !values.managementExperience) {
    errors.managementExperience = 'Required';
  }

  if (!values.additionalSkills.length) {
    errors.additionalSkills = 'At least one skill must be selected';
  }

  if (!values.preferredInterviewTime) {
    errors.preferredInterviewTime = 'Required';
  }

  return errors;
};

const Form = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      applyingForPosition: '', // No default value to show placeholder
      relevantExperience: '',
      portfolioUrl: '',
      managementExperience: '',
      additionalSkills: [],
      preferredInterviewTime: ''
    },
    validate,
    onSubmit: values => {
      setSubmittedData(values);
      alert("Submitted successfully! Check bottom of the page for the submitted details");
    }
  });

  return (
    <div className="form-container">
    <h1 style={{paddingLeft:"8rem"}}>Job Application Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className="error">{formik.errors.fullName}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="error">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="applyingForPosition">Applying for Position</label>
          <select
            id="applyingForPosition"
            name="applyingForPosition"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.applyingForPosition}
          >
            <option value="">Select position</option> {/* Placeholder option */}
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {formik.touched.applyingForPosition && formik.errors.applyingForPosition ? (
            <div className="error">{formik.errors.applyingForPosition}</div>
          ) : null}
        </div>
        {(formik.values.applyingForPosition === 'Developer' || formik.values.applyingForPosition === 'Designer') && (
          <div className="form-group">
            <label htmlFor="relevantExperience">Relevant Experience (years)</label>
            <input
              id="relevantExperience"
              name="relevantExperience"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.relevantExperience}
            />
            {formik.touched.relevantExperience && formik.errors.relevantExperience ? (
              <div className="error">{formik.errors.relevantExperience}</div>
            ) : null}
          </div>
        )}
        {formik.values.applyingForPosition === 'Designer' && (
          <div className="form-group">
            <label htmlFor="portfolioUrl">Portfolio URL</label>
            <input
              id="portfolioUrl"
              name="portfolioUrl"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.portfolioUrl}
              placeholder='Ex: http:example.com'
            />
            {formik.touched.portfolioUrl && formik.errors.portfolioUrl ? (
              <div className="error">{formik.errors.portfolioUrl}</div>
            ) : null}
          </div>
        )}
        {formik.values.applyingForPosition === 'Manager' && (
          <div className="form-group">
            <label htmlFor="managementExperience">Management Experience</label>
            <textarea
              id="managementExperience"
              name="managementExperience"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.managementExperience}
            />
            {formik.touched.managementExperience && formik.errors.managementExperience ? (
              <div className="error">{formik.errors.managementExperience}</div>
            ) : null}
          </div>
        )}
        <div className="form-group">
          <label>Additional Skills</label>
          <div role="group" aria-labelledby="checkbox-group" className='checkbox'>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="JavaScript"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="CSS"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              CSS
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="Python"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              Python
            </label>
          </div>
          {formik.touched.additionalSkills && formik.errors.additionalSkills ? (
            <div className="error">{formik.errors.additionalSkills}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="preferredInterviewTime">Preferred Interview Time</label>
          <input
            id="preferredInterviewTime"
            name="preferredInterviewTime"
            type="datetime-local"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.preferredInterviewTime}
          />
          {formik.touched.preferredInterviewTime && formik.errors.preferredInterviewTime ? (
            <div className="error">{formik.errors.preferredInterviewTime}</div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
      {submittedData && (
        <div className="submitted-data">
          <h2>Submitted Data</h2>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              {  submittedData.applyingForPosition &&
                <>
                <th>Position</th>
                {(submittedData.applyingForPosition === 'Developer' || submittedData.applyingForPosition === 'Designer' )&&<th>Relevant Experience</th>}
                { submittedData.applyingForPosition === 'Designer' &&<th>Portfolio URL</th>}
                { submittedData.applyingForPosition === 'Manager' &&<th>Management Experience</th>}
                </>
                }
                <th>Additional Skills</th>
                <th>Preferred Interview Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{submittedData.fullName}</td>
                <td>{submittedData.email}</td>
                <td>{submittedData.phoneNumber}</td>
                {submittedData.applyingForPosition &&
                <>
                <td>{submittedData.applyingForPosition}</td>
                
                { (submittedData.applyingForPosition === 'Developer' || submittedData.applyingForPosition === 'Designer') &&
                    <td>{submittedData.relevantExperience}</td>
                }

                { submittedData.applyingForPosition === 'Designer' && <td>{submittedData.portfolioUrl}</td>}
                {submittedData.applyingForPosition === 'Manager' &&<td>{submittedData.managementExperience}</td>}
                </>
                }
                <td>{submittedData.additionalSkills.join(', ')}</td>
                <td>{submittedData.preferredInterviewTime}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Form;
