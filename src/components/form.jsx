import React, { useState } from 'react';
import TerminalDisplay from './output';

export default function MetadataForm() {
  const [formData, setFormData] = useState({
    description: '',
    applicationName: '',
    referrer: 'origin-when-cross-origin',
    keywords: [],
    authors: '',
    creator: '',
    publisher: '',
    formatDetection: {
        email: true,
        address: false,
        telephone: false,
      },
    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        maxVideoPreview: '-1',
        maxImagePreview: 'large',
        maxSnippet: '1',
      },
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split('.');
    
    if (keys[0] === 'formatDetection') {
        setFormData(prevState => ({
          ...prevState,
          formatDetection: {
            ...prevState.formatDetection,
            [keys[1]]: checked,
          },
        }));
        return;
      }
    
    if (name === 'keywords') {
        const keywordsArray = value.split(',').map(keyword => keyword.trim());
        setFormData(prevState => ({
          ...prevState,
          keywords: keywordsArray,
        }));
        return;
      }
    
      // Handling for nested fields
      if (keys.length > 1) {
        setFormData(prevState => {
          let updatedValue = type === 'checkbox' ? checked : value;
    
          // Deeply nested fields (more than one level)
          keys.reduce((acc, key, index) => {
            if (index === keys.length - 1) {
              acc[key] = updatedValue;
            } else {
              if (!acc[key]) acc[key] = {}; // Create nested object if it doesn't exist
              return acc[key];
            }
          }, prevState);
    
          return { ...prevState };
        });
      } else {
        // Handling for regular fields
        setFormData(prevState => ({
          ...prevState,
          [name]: type === 'checkbox' ? checked : value,
        }));
    }

    if (keys.length > 2) {
      setFormData(prevState => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: {
            ...prevState[keys[0]][keys[1]],
            [keys[2]]: type === 'checkbox' ? checked : value,
          },
        },
      }));
    } else if (keys.length > 1) {
      setFormData(prevState => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      // Handle regular fields
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };
  

  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ ...formData });
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className='flex w-screen h-max justify-start items-start'>
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                type="text"
                name="applicationName"
                value={formData.applicationName}
                onChange={handleChange}
                placeholder="Application Name"
            />
            <input
                type="text"
                name="referrer"
                value={formData.referrer}
                onChange={handleChange}
                placeholder="Referrer"
            />
            <input
            type="text"
            name="keywords"
            value={formData.keywords.join(', ')}
            onChange={handleChange}
            placeholder="Keywords (separated by commas)"
            />
            <input
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                placeholder="Authors"
            />
            <input
                type="text"
                name="creator"
                value={formData.creator}
                onChange={handleChange}
                placeholder="Creator"
            />
            <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                placeholder="Publisher"
            />
            <label>
                Format Email Detection:
                <input
                    type="checkbox"
                    name="formatDetection.email"
                    checked={formData.formatDetection.email}
                    onChange={handleChange}
                />
                </label>
                <label>
                Format Address Detection:
                <input
                    type="checkbox"
                    name="formatDetection.address"
                    checked={formData.formatDetection.address}
                    onChange={handleChange}
                />
                </label>
                <label>
                Format Telephone Detection:
                <input
                    type="checkbox"
                    name="formatDetection.telephone"
                    checked={formData.formatDetection.telephone}
                    onChange={handleChange}
                />
            </label>
            <label>
                Robots Index:
                <input
                type="checkbox"
                name="robots.index"
                checked={formData.robots.index}
                onChange={handleChange}
                />
            </label>
            <label>
                Robots Follow:
                <input
                type="checkbox"
                name="robots.follow"
                checked={formData.robots.follow}
                onChange={handleChange}
                />
            </label>
            <label>
                Robots NoCache:
                <input
                type="checkbox"
                name="robots.nocache"
                checked={formData.robots.nocache}
                onChange={handleChange}
                />
            </label>
        {/* Inputs for googleBot fields */}
            <label>
            GoogleBot Index:
            <input
                type="checkbox"
                name="robots.googleBot.index"
                checked={formData.robots.googleBot.index}
                onChange={handleChange}
            />
            </label>
            <label>
            GoogleBot Follow:
            <input
                type="checkbox"
                name="robots.googleBot.follow"
                checked={formData.robots.googleBot.follow}
                onChange={handleChange}
            />
            </label>
            <label>
            GoogleBot No Image Index:
            <input
                type="checkbox"
                name="robots.googleBot.noimageindex"
                checked={formData.robots.googleBot.noimageindex}
                onChange={handleChange}
            />
            </label>
            <label>
            GoogleBot Max Video Preview:
            <input
                type="text"
                name="robots.googleBot.maxVideoPreview"
                value={formData.robots.googleBot.maxVideoPreview}
                onChange={handleChange}
                placeholder="Max Video Preview"
            />
            </label>
            <label>
            GoogleBot Max Image Preview:
            <input
                type="text"
                name="robots.googleBot.maxImagePreview"
                value={formData.robots.googleBot.maxImagePreview}
                onChange={handleChange}
                placeholder="Max Image Preview"
            />
            </label>
            <label>
            GoogleBot Max Snippet:
            <input
                type="text"
                name="robots.googleBot.maxSnippet"
                value={formData.robots.googleBot.maxSnippet}
                onChange={handleChange}
                placeholder="Max Snippet"
            />
            </label>
            <input type="submit" value="Submit" id="submit-button"/>
        </form>
        {submittedData && <TerminalDisplay formData={submittedData} />}
    </div>
  );
}
