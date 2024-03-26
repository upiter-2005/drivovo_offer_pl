import React from 'react';
import ContentLoader from 'react-content-loader';

export default function Skeleton () {
    const css = {
        margin: "14px"
    }
    return (
        <ContentLoader 
    speed={2}
    width={333}
    height={304}
    style={css}
    viewBox="0 0 333 304"
    backgroundColor="#e9e8e8"
    foregroundColor="#fea26f"
    // {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width="333" height="160" /> 
    <rect x="0" y="180" rx="0" ry="0" width="333" height="34" /> 
    <rect x="0" y="226" rx="0" ry="0" width="333" height="17" /> 
    <rect x="0" y="262" rx="2" ry="2" width="333" height="41" />
      </ContentLoader>
    )

};