import React from 'react';
import '../css/author-header.css'

function AuthorHeader({selectedAuthor}) {
    return (
        <h4 className='author-header'>НОВИНИ {selectedAuthor}</h4>
    );
}

export default AuthorHeader;
