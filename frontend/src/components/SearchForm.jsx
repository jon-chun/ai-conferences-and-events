import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    city: '',
    kidsAges: '',
    availability: { start: '', end: '' },
    milesRange: 50,
    aiInterests: '',
    preferences: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate' || name === 'endDate') {
      setFormData(prev => ({
        ...prev,
        availability: {
          ...prev.availability,
          [name === 'startDate' ? 'start' : 'end']: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.availability.start) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.availability.end) {
      newErrors.endDate = 'End date is required';
    }
    if (!formData.aiInterests.trim()) {
      newErrors.aiInterests = 'AI interests are required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSearch(formData);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="city">City *</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter your city"
          className={errors.city ? 'error' : ''}
        />
        {errors.city && <span className="error-message">{errors.city}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="kidsAges">Kids Ages (optional)</label>
        <input
          type="text"
          id="kidsAges"
          name="kidsAges"
          value={formData.kidsAges}
          onChange={handleChange}
          placeholder="e.g., 8, 12"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Available From *</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.availability.start}
            onChange={handleChange}
            className={errors.startDate ? 'error' : ''}
          />
          {errors.startDate && <span className="error-message">{errors.startDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="endDate">Available Until *</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.availability.end}
            onChange={handleChange}
            className={errors.endDate ? 'error' : ''}
          />
          {errors.endDate && <span className="error-message">{errors.endDate}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="milesRange">Travel Distance (miles)</label>
        <div className="range-container">
          <input
            type="range"
            id="milesRange"
            name="milesRange"
            min="10"
            max="500"
            value={formData.milesRange}
            onChange={handleChange}
          />
          <span>{formData.milesRange} miles</span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="aiInterests">AI Interests *</label>
        <textarea
          id="aiInterests"
          name="aiInterests"
          value={formData.aiInterests}
          onChange={handleChange}
          placeholder="e.g., machine learning, computer vision, NLP, robotics"
          rows="3"
          className={errors.aiInterests ? 'error' : ''}
        />
        {errors.aiInterests && <span className="error-message">{errors.aiInterests}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="preferences">Other Preferences (optional)</label>
        <textarea
          id="preferences"
          name="preferences"
          value={formData.preferences}
          onChange={handleChange}
          placeholder="Any additional requirements or preferences"
          rows="2"
        />
      </div>

      <button type="submit" className="search-button">Search Events</button>
    </form>
  );
};

export default SearchForm;