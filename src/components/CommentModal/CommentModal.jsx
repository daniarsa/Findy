import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

const CommentModal = ({ comments, onClose }) => {
  return (
<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
<div className="bg-custom-gradient bg-cover p-4 rounded-lg max-w-md w-full overflow-hidden">
        <button onClick={onClose} className="mb-4 text-right"><AiOutlineClose /> </button>
        <h2 className="text-xl font-bold font-balsamiq mb-4">Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="mb-2 font-baloo">
              <strong>{comment.username}</strong>: {comment.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

CommentModal.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentModal;
