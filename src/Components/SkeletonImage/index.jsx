import React from 'react';
import ContentLoader from 'react-content-loader';

export default function SkeletonImage () {
    const css = {
        margin: "12px"
    }
    return (
        <ContentLoader 
    speed={2}
    width={333}
    height={304}
    style={css}
    viewBox="0 0 333 230"
    backgroundColor="#e9e8e8"
    foregroundColor="#fea26f"
    // {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width="333" height="230" />
      </ContentLoader>
    )

};